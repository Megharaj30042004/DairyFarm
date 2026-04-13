import { useMemo, useState } from "react";
import { financialDefaults } from "../data/mockData";

export default function FinancialCalculator() {
  const [form, setForm] = useState(financialDefaults);

  const summary = useMemo(() => {
    const dairyRevenue = Number(form.milkToDairyLiters || 0) * form.rates.dairy;
    const householdRevenue =
      Number(form.milkToHouseholdsLiters || 0) * form.rates.households;
    const grossRevenue = dairyRevenue + householdRevenue;
    const totalExpenses =
      Number(form.cattleFeedExpense || 0) + Number(form.veterinaryExpense || 0);

    return {
      grossRevenue,
      totalExpenses,
      netIncome: grossRevenue - totalExpenses
    };
  }, [form]);

  const handleChange = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  };

  return (
    <section className="section-shell">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.35em] text-ambermilk">
          Module 02
        </p>
        <h2 className="font-display text-3xl text-white md:text-4xl">
          Dairy Financial Calculator
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="field-label">Milk Sold to Dairy (L/month)</label>
            <input
              className="field"
              type="number"
              value={form.milkToDairyLiters}
              onChange={(event) =>
                handleChange("milkToDairyLiters", event.target.value)
              }
            />
            <p className="mt-2 text-xs text-white/55">Rate: ₹38 per liter</p>
          </div>
          <div>
            <label className="field-label">Milk Sold to Households (L/month)</label>
            <input
              className="field"
              type="number"
              value={form.milkToHouseholdsLiters}
              onChange={(event) =>
                handleChange("milkToHouseholdsLiters", event.target.value)
              }
            />
            <p className="mt-2 text-xs text-white/55">Rate: ₹45 per liter</p>
          </div>
          <div>
            <label className="field-label">Cattle Feed Expense</label>
            <input
              className="field"
              type="number"
              value={form.cattleFeedExpense}
              onChange={(event) =>
                handleChange("cattleFeedExpense", event.target.value)
              }
            />
          </div>
          <div>
            <label className="field-label">Veterinary Medicine Expense</label>
            <input
              className="field"
              type="number"
              value={form.veterinaryExpense}
              onChange={(event) => handleChange("veterinaryExpense", event.target.value)}
            />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-ambermilk/20 bg-gradient-to-br from-ambermilk/20 to-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.3em] text-ambermilk">
            Monthly Summary
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white/65">Gross Revenue</span>
              <strong className="text-2xl text-white">
                ₹{summary.grossRevenue.toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white/65">Total Expenses</span>
              <strong className="text-2xl text-white">
                ₹{summary.totalExpenses.toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="flex items-center justify-between pt-2">
              <span className="text-white/80">Final Net Income (Salary)</span>
              <strong className="text-3xl text-meadow">
                ₹{summary.netIncome.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
