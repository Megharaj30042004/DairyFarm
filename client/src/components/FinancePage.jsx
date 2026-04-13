import { useMemo, useState } from "react";
import { financialDefaults } from "../data/mockData";
import FormField from "./FormField";
import PageIntro from "./PageIntro";

export default function FinancePage({ stats, finance, onSave }) {
  const [form, setForm] = useState(finance || financialDefaults);
  const [status, setStatus] = useState("");

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

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSave = async () => {
    try {
      await onSave({
        ...form,
        milkToDairyLiters: Number(form.milkToDairyLiters || 0),
        milkToHouseholdsLiters: Number(form.milkToHouseholdsLiters || 0),
        cattleFeedExpense: Number(form.cattleFeedExpense || 0),
        veterinaryExpense: Number(form.veterinaryExpense || 0)
      });
      setStatus("Financial data saved.");
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div>
      <PageIntro
        eyebrow="Page 04"
        title="Monthly finance calculator"
        copy={`Use your milk sales and expense inputs to estimate monthly net income. Current entered herd milk capacity: ${stats.totalMilkCapacity} liters per day.`}
        actions={<button className="primary-button" onClick={handleSave}>Save Finance</button>}
      />

      {status ? <p className="mb-5 text-sm text-white/65">{status}</p> : null}

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="sub-card grid gap-4 md:grid-cols-2">
          <FormField
            label="Milk sold to dairy (L/month)"
            type="number"
            value={form.milkToDairyLiters}
            onChange={(event) => updateField("milkToDairyLiters", event.target.value)}
          />
          <FormField
            label="Milk sold to households (L/month)"
            type="number"
            value={form.milkToHouseholdsLiters}
            onChange={(event) =>
              updateField("milkToHouseholdsLiters", event.target.value)
            }
          />
          <FormField
            label="Feed / food expense"
            type="number"
            value={form.cattleFeedExpense}
            onChange={(event) => updateField("cattleFeedExpense", event.target.value)}
          />
          <FormField
            label="Veterinary medicine expense"
            type="number"
            value={form.veterinaryExpense}
            onChange={(event) => updateField("veterinaryExpense", event.target.value)}
          />
        </div>

        <div className="sub-card bg-gradient-to-br from-ambermilk/20 to-white/5">
          <p className="text-xs uppercase tracking-[0.26em] text-ambermilk">
            Financial Summary
          </p>
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white/60">Gross Revenue</span>
              <strong className="text-2xl text-white">
                ₹{summary.grossRevenue.toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-white/60">Total Expenses</span>
              <strong className="text-2xl text-white">
                ₹{summary.totalExpenses.toLocaleString("en-IN")}
              </strong>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Net Income</span>
              <strong className="text-3xl text-meadow">
                ₹{summary.netIncome.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
