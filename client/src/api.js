const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? "http://localhost:8080/api"
    : "https://dairyfarm-sjvo.onrender.com/api");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.token
        ? {
            Authorization: `Bearer ${options.token}`
          }
        : {}),
      ...(options.headers || {})
    },
    ...options
  });

  const contentType = response.headers.get("content-type") || "";
  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(data?.message || "Request failed.");
  }

  return data;
}

export const api = {
  login: (payload) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  register: (payload) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload)
    }),
  logout: () =>
    request("/auth/logout", {
      method: "POST"
    }),
  me: (token) => request("/auth/me", { token }),
  getFarm: (token) => request("/farm", { token }),
  saveFarm: (token, payload) =>
    request("/farm", {
      method: "PUT",
      token,
      body: JSON.stringify(payload)
    }),
  getCows: (token) => request("/cows", { token }),
  saveCows: (token, animals) =>
    request("/cows/bulk", {
      method: "PUT",
      token,
      body: JSON.stringify({ animals })
    }),
  getBuffaloes: (token) => request("/buffaloes", { token }),
  saveBuffaloes: (token, animals) =>
    request("/buffaloes/bulk", {
      method: "PUT",
      token,
      body: JSON.stringify({ animals })
    }),
  getFinance: (token) => request("/finance", { token }),
  saveFinance: (token, payload) =>
    request("/finance", {
      method: "PUT",
      token,
      body: JSON.stringify(payload)
    }),
  getMarketplace: () => request("/marketplace"),
  createMarketplaceListing: (token, payload) =>
    request("/marketplace", {
      method: "POST",
      token,
      body: JSON.stringify(payload)
    }),
  updateMarketplaceListing: (token, id, payload) =>
    request(`/marketplace/${id}`, {
      method: "PUT",
      token,
      body: JSON.stringify(payload)
    }),
  deleteMarketplaceListing: (token, id) =>
    request(`/marketplace/${id}`, {
      method: "DELETE",
      token
    }),
  getEmergencyContacts: () => request("/content/emergency-contacts"),
  getDiseases: () => request("/content/diseases"),
  sendAiChat: (token, prompt, conversationHistory = []) =>
    request("/content/chat", {
      method: "POST",
      token,
      body: JSON.stringify({ prompt, conversationHistory })
    })
};

