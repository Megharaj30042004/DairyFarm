import FinancialRecord from "../models/FinancialRecord.js";

export async function getFinance(request, response) {
  try {
    const record =
      (await FinancialRecord.findOne({ owner: request.user.id })) ||
      (await FinancialRecord.create({ owner: request.user.id }));

    return response.json(record);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}

export async function upsertFinance(request, response) {
  try {
    const {
      milkToDairyLiters = 0,
      milkToHouseholdsLiters = 0,
      cattleFeedExpense = 0,
      veterinaryExpense = 0,
      rates = { dairy: 38, households: 45 }
    } = request.body;

    const record = await FinancialRecord.findOneAndUpdate(
      { owner: request.user.id },
      {
        owner: request.user.id,
        milkToDairyLiters,
        milkToHouseholdsLiters,
        cattleFeedExpense,
        veterinaryExpense,
        rates
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return response.json(record);
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
}
