import { useEffect, useMemo, useState } from "react";
import { financialDefaults } from "../data/mockData";
import FormField from "./FormField";
import PageIntro from "./PageIntro";

function ChartBar({ label, value, maxValue, colorClass }) {
  const width = maxValue > 0 ? Math.max((value / maxValue) * 100, 4) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-white/65">
        <span>{label}</span>
        <span>{value.toLocaleString("en-IN")}</span>
      </div>
      <div className="h-3 rounded-full bg-white/10">
        <div
          className={`h-3 rounded-full ${colorClass}`}
          style={{ width: `${Math.min(width, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function FinanceWorkspace({
  stats,
  finance,
  cows,
  buffaloes,
  onSave
}) {
  const [form, setForm] = useState(finance || financialDefaults);
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (finance) {
      setForm(finance);
    }
  }, [finance]);

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

  const analytics = useMemo(() => {
    const cowMilkDaily = cows.reduce(
      (sum, animal) => sum + Number(animal.milkYieldPerDay || 0),
      0
    );
    const buffaloMilkDaily = buffaloes.reduce(
      (sum, animal) => sum + Number(animal.milkYieldPerDay || 0),
      0
    );
    const totalDaily = cowMilkDaily + buffaloMilkDaily;
    const totalMonthly = totalDaily * 30;
    const soldMonthly =
      Number(form.milkToDairyLiters || 0) + Number(form.milkToHouseholdsLiters || 0);
    const unsoldMonthly = Math.max(totalMonthly - soldMonthly, 0);

    return {
      cowMilkDaily,
      buffaloMilkDaily,
      totalDaily,
      totalMonthly,
      soldMonthly,
      unsoldMonthly
    };
  }, [buffaloes, cows, form]);

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const useAutoLiters = () => {
    const totalMonthly = analytics.totalMonthly;
    const dairyLiters = Math.round(totalMonthly * 0.7);
    const householdLiters = Math.max(totalMonthly - dairyLiters, 0);

    setForm((current) => ({
      ...current,
      milkToDairyLiters: dairyLiters,
      milkToHouseholdsLiters: householdLiters
    }));
    setStatus("Milk sold values updated from entered herd milk yield.");
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
        copy={`Use your milk sales and expense inputs to estimate monthly net income. Herd milk entered from records is ${stats.totalMilkCapacity} liters per day, projected to ${analytics.totalMonthly.toLocaleString(
          "en-IN"
        )} liters per month.`}
        actions={
          <>
            <button className="ghost-button" onClick={useAutoLiters}>
              Use Herd Milk Data
            </button>
            <button className="primary-button" onClick={handleSave}>
              Save Finance
            </button>
          </>
        }
      />

      {status ? <p className="mb-5 text-sm text-white/65">{status}</p> : null}

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="sub-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">
            Cow Milk / Day
          </p>
          <p className="mt-3 text-3xl font-bold text-ambermilk">
            {analytics.cowMilkDaily} L
          </p>
        </div>
        <div className="sub-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">
            Buffalo Milk / Day
          </p>
          <p className="mt-3 text-3xl font-bold text-meadow">
            {analytics.buffaloMilkDaily} L
          </p>
        </div>
        <div className="sub-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">
            Projected Monthly Milk
          </p>
          <p className="mt-3 text-3xl font-bold text-white">
            {analytics.totalMonthly.toLocaleString("en-IN")} L
          </p>
        </div>
        <div className="sub-card">
          <p className="text-xs uppercase tracking-[0.24em] text-white/50">
            Unsold Potential
          </p>
          <p className="mt-3 text-3xl font-bold text-alert">
            {analytics.unsoldMonthly.toLocaleString("en-IN")} L
          </p>
        </div>
      </div>

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

          <div className="mt-8 space-y-4">
            <ChartBar
              label="Projected Monthly Milk"
              value={analytics.totalMonthly}
              maxValue={Math.max(analytics.totalMonthly, analytics.soldMonthly, 1)}
              colorClass="bg-white"
            />
            <ChartBar
              label="Milk Sold"
              value={analytics.soldMonthly}
              maxValue={Math.max(analytics.totalMonthly, analytics.soldMonthly, 1)}
              colorClass="bg-ambermilk"
            />
            <ChartBar
              label="Unsold Potential"
              value={analytics.unsoldMonthly}
              maxValue={Math.max(analytics.totalMonthly, analytics.soldMonthly, 1)}
              colorClass="bg-alert"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
