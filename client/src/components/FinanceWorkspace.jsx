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

  const updateRate = (rateKey, value) => {
    setForm((current) => ({
      ...current,
      rates: {
        ...(current?.rates || { dairy: 38, households: 45 }),
        [rateKey]: value
      }
    }));
  };

  const summary = useMemo(() => {
    const dairyRate = Number(form?.rates?.dairy ?? 38);
    const householdRate = Number(form?.rates?.households ?? 45);
    const dairyRevenue = Number(form.milkToDairyLiters || 0) * dairyRate;
    const householdRevenue =
      Number(form.milkToHouseholdsLiters || 0) * householdRate;
    const grossRevenue = dairyRevenue + householdRevenue;
    const totalExpenses =
      Number(form.cattleFeedExpense || 0) + Number(form.veterinaryExpense || 0);

    return {
      dairyRate,
      householdRate,
      dairyRevenue,
      householdRevenue,
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
    setStatus("");
    const dairyRate = Number(form?.rates?.dairy);
    const householdRate = Number(form?.rates?.households);
    const dairyLiters = Number(form.milkToDairyLiters);
    const householdLiters = Number(form.milkToHouseholdsLiters);
    const feedExp = Number(form.cattleFeedExpense);
    const vetExp = Number(form.veterinaryExpense);

    if (form?.rates?.dairy === "" || isNaN(dairyRate) || dairyRate < 0) {
      const msg = "Validation Failed: Please enter a valid Dairy Rate (₹/Liter).";
      setStatus(msg);
      throw new Error(msg);
    }
    if (form?.rates?.households === "" || isNaN(householdRate) || householdRate < 0) {
      const msg = "Validation Failed: Please enter a valid Household Rate (₹/Liter).";
      setStatus(msg);
      throw new Error(msg);
    }
    if (form.milkToDairyLiters === "" || isNaN(dairyLiters) || dairyLiters < 0) {
      const msg = "Validation Failed: Please enter valid milk sold to dairy (L/month).";
      setStatus(msg);
      throw new Error(msg);
    }
    if (form.milkToHouseholdsLiters === "" || isNaN(householdLiters) || householdLiters < 0) {
      const msg = "Validation Failed: Please enter valid milk sold to households (L/month).";
      setStatus(msg);
      throw new Error(msg);
    }
    if (form.cattleFeedExpense === "" || isNaN(feedExp) || feedExp < 0) {
      const msg = "Validation Failed: Please enter a valid feed expense amount.";
      setStatus(msg);
      throw new Error(msg);
    }
    if (form.veterinaryExpense === "" || isNaN(vetExp) || vetExp < 0) {
      const msg = "Validation Failed: Please enter a valid veterinary expense amount.";
      setStatus(msg);
      throw new Error(msg);
    }

    try {
      await onSave({
        ...form,
        milkToDairyLiters: dairyLiters,
        milkToHouseholdsLiters: householdLiters,
        cattleFeedExpense: feedExp,
        veterinaryExpense: vetExp,
        rates: {
          dairy: dairyRate,
          households: householdRate
        }
      });
      setStatus("Financial data and rates saved successfully.");
    } catch (error) {
      setStatus(error.message || "Failed to save financial data.");
      throw error;
    }
  };


  return (
    <div>
      <PageIntro
        eyebrow="Page 04"
        title="Monthly finance calculator"
        copy={`Set your per liter milk price for dairy & households, sales volume, and expenses to estimate monthly net income. Herd milk entered from records is ${stats.totalMilkCapacity} liters per day, projected to ${analytics.totalMonthly.toLocaleString(
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

      {status ? <p className="mb-4 text-xs sm:text-sm text-white/65">{status}</p> : null}

      <div className="mb-6 grid grid-cols-2 gap-2.5 sm:gap-4 xl:grid-cols-4">
        <div className="sub-card p-3 sm:p-5">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 truncate">
            Cow Milk / Day
          </p>
          <p className="mt-1.5 sm:mt-3 text-xl sm:text-3xl font-bold text-ambermilk">
            {analytics.cowMilkDaily} L
          </p>
        </div>
        <div className="sub-card p-3 sm:p-5">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 truncate">
            Buffalo Milk / Day
          </p>
          <p className="mt-1.5 sm:mt-3 text-xl sm:text-3xl font-bold text-meadow">
            {analytics.buffaloMilkDaily} L
          </p>
        </div>
        <div className="sub-card p-3 sm:p-5">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 truncate">
            Projected Monthly
          </p>
          <p className="mt-1.5 sm:mt-3 text-xl sm:text-3xl font-bold text-white">
            {analytics.totalMonthly.toLocaleString("en-IN")} L
          </p>
        </div>
        <div className="sub-card p-3 sm:p-5">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white/50 truncate">
            Unsold Potential
          </p>
          <p className="mt-1.5 sm:mt-3 text-xl sm:text-3xl font-bold text-alert">
            {analytics.unsoldMonthly.toLocaleString("en-IN")} L
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
        <div className="sub-card grid gap-4 grid-cols-1 sm:grid-cols-2">
          <div className="sm:col-span-2 border-b border-white/10 pb-2 mb-1">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-ambermilk">
              Milk Price Settings (₹ / Liter)
            </h4>
          </div>
          <FormField
            label="Dairy Rate (₹/Liter)"
            type="number"
            value={form?.rates?.dairy ?? 38}
            onChange={(event) => updateRate("dairy", event.target.value)}
            placeholder="38"
          />
          <FormField
            label="Household Rate (₹/Liter)"
            type="number"
            value={form?.rates?.households ?? 45}
            onChange={(event) => updateRate("households", event.target.value)}
            placeholder="45"
          />

          <div className="sm:col-span-2 border-b border-white/10 pb-2 mb-1 mt-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-ambermilk">
              Monthly Sales & Expense Inputs
            </h4>
          </div>
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
            label="Feed / food expense (₹)"
            type="number"
            value={form.cattleFeedExpense}
            onChange={(event) => updateField("cattleFeedExpense", event.target.value)}
          />
          <FormField
            label="Veterinary medicine expense (₹)"
            type="number"
            value={form.veterinaryExpense}
            onChange={(event) => updateField("veterinaryExpense", event.target.value)}
          />
        </div>

        <div className="sub-card bg-gradient-to-br from-slate-900/90 via-slate-950 to-emerald-950/30 border-ambermilk/30 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <p className="text-xs uppercase tracking-[0.26em] text-ambermilk font-extrabold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-ambermilk animate-ping" />
              Financial Summary
            </p>
            <span className="px-2.5 py-0.5 text-[10px] font-extrabold rounded-full bg-ambermilk/20 text-ambermilk border border-ambermilk/30">
              Real-time Net
            </span>
          </div>

          <div className="mt-5 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs sm:text-sm text-slate-300 font-semibold block">Dairy Milk Sales</span>
                <span className="text-[11px] text-slate-400">
                  ₹{summary.dairyRate}/L × {Number(form.milkToDairyLiters || 0).toLocaleString("en-IN")} L
                </span>
              </div>
              <strong className="text-sm sm:text-base font-extrabold text-white">
                ₹{summary.dairyRevenue.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-xs sm:text-sm text-slate-300 font-semibold block">Household Direct Sales</span>
                <span className="text-[11px] text-slate-400">
                  ₹{summary.householdRate}/L × {Number(form.milkToHouseholdsLiters || 0).toLocaleString("en-IN")} L
                </span>
              </div>
              <strong className="text-sm sm:text-base font-extrabold text-white">
                ₹{summary.householdRevenue.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3 bg-white/[0.03] p-3 rounded-xl">
              <span className="text-xs sm:text-sm text-slate-200 font-extrabold">Gross Revenue</span>
              <strong className="text-lg sm:text-2xl font-extrabold text-ambermilk">
                ₹{summary.grossRevenue.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="flex items-center justify-between border-b border-white/10 pb-3 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
              <span className="text-xs sm:text-sm text-red-300 font-extrabold">Total Farm Expenses</span>
              <strong className="text-lg sm:text-2xl font-extrabold text-red-400">
                - ₹{summary.totalExpenses.toLocaleString("en-IN")}
              </strong>
            </div>

            <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-emerald-500/20 via-emerald-500/10 to-transparent border border-emerald-500/30 shadow-emerald-glow">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] text-emerald-400 font-extrabold block">
                  Estimated Net Income
                </span>
                <span className="text-[10px] text-slate-400">Monthly Profit After Costs</span>
              </div>
              <strong className="text-2xl sm:text-4xl font-extrabold text-emerald-300 tracking-tight">
                ₹{summary.netIncome.toLocaleString("en-IN")}
              </strong>
            </div>
          </div>

          <div className="mt-8 space-y-4 pt-4 border-t border-white/10">
            <ChartBar
              label="Projected Monthly Milk Production"
              value={analytics.totalMonthly}
              maxValue={Math.max(analytics.totalMonthly, analytics.soldMonthly, 1)}
              colorClass="bg-gradient-to-r from-sky-400 to-blue-500"
            />
            <ChartBar
              label="Milk Volume Sold"
              value={analytics.soldMonthly}
              maxValue={Math.max(analytics.totalMonthly, analytics.soldMonthly, 1)}
              colorClass="bg-gradient-to-r from-ambermilk to-amber-400"
            />
            <ChartBar
              label="Unsold Capacity Margin"
              value={analytics.unsoldMonthly}
              maxValue={Math.max(analytics.totalMonthly, analytics.soldMonthly, 1)}
              colorClass="bg-gradient-to-r from-red-500 to-rose-600"
            />
          </div>
        </div>
      </div>


    </div>
  );
}
