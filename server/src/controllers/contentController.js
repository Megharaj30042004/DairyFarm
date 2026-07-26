import Disease from "../models/Disease.js";
import EmergencyContact from "../models/EmergencyContact.js";
import User from "../models/User.js";
import { diseaseSeed, districtEmergencySeed, emergencyPrioritySeed } from "../utils/seedData.js";

export async function ensureContentSeeded() {
  const diseaseCount = await Disease.countDocuments();
  if (!diseaseCount) {
    await Disease.insertMany(diseaseSeed);
  }

  // Refresh emergency contacts with distinct district phone numbers
  await EmergencyContact.deleteMany({});
  await EmergencyContact.insertMany([
    ...emergencyPrioritySeed,
    ...districtEmergencySeed
  ]);
}

export async function getDiseases(_request, response) {
  try {
    const diseases = await Disease.find().sort({ createdAt: 1 });
    return response.json(diseases);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function getEmergencyContacts(_request, response) {
  try {
    const priority = await EmergencyContact.find({ priority: "high" }).sort({ createdAt: 1 });
    const districts = await EmergencyContact.find({ priority: { $ne: "high" } }).sort({
      district: 1
    });

    return response.json({
      priority,
      districts
    });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function chatWithAi(request, response) {
  try {
    const { prompt, conversationHistory = [] } = request.body;
    const apiKey = process.env.OPENROUTER_API_KEY;

    const userId = request.user?.id || request.user?._id;
    const todayStr = new Date().toISOString().split("T")[0];
    let userDoc = null;

    if (userId) {
      userDoc = await User.findById(userId);
    }

    if (userDoc) {
      if (userDoc.lastChatDate !== todayStr) {
        userDoc.lastChatDate = todayStr;
        userDoc.dailyChatCount = 0;
      }

      if (userDoc.dailyChatCount >= 5) {
        return response.status(429).json({
          message: "Daily free AI chat limit reached (5/5 prompts used today). Please return tomorrow!",
          remainingChats: 0,
          chatsUsedToday: 5,
          limitReached: true
        });
      }
    }

    if (!apiKey) {
      return response.status(400).json({
        message: "OPENROUTER_API_KEY is not set in server/.env",
        fallback: true
      });
    }

    const messages = [
      {
        role: "system",
        content: "You are 'Pashu Mitra AI', an expert veterinary doctor, livestock nutritionist, and dairy farm consultant. You assist dairy farmers in managing cows and buffaloes, milk fat & SNF improvement, feed ratios, disease prevention, calf care, and dairy finances. Answer clearly, accurately, and politely with markdown structure. Keep answers practical for Indian dairy farming."
      },
      ...conversationHistory.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text
      })),
      { role: "user", content: prompt }
    ];

    const openRouterResponse = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "DairyFarm OS",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openrouter/auto",
        messages
      })
    });

    if (!openRouterResponse.ok) {
      const errorText = await openRouterResponse.text();
      console.error("OpenRouter API error:", errorText);
      return response.status(502).json({
        message: "OpenRouter API returned an error.",
        error: errorText,
        fallback: true
      });
    }

    const data = await openRouterResponse.json();
    const replyText = data.choices?.[0]?.message?.content || "No response generated.";

    if (userDoc) {
      userDoc.dailyChatCount += 1;
      await userDoc.save();
    }

    const chatsUsedToday = userDoc ? userDoc.dailyChatCount : 1;
    const remainingChats = Math.max(0, 5 - chatsUsedToday);

    return response.json({
      reply: replyText,
      model: data.model || "openrouter",
      chatsUsedToday,
      remainingChats
    });
  } catch (error) {
    console.error("AI Chat Error:", error.message);
    return response.status(500).json({ message: error.message, fallback: true });
  }
}
