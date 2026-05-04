import { useEffect, useMemo, useState } from "react";
import { apiRegistry } from "@/services/api";
import type { MasterDataRecord, UnitRecord } from "@/services/api/endpoints/catalog.endpoint";

type ListKind = "units" | "paymentTerms" | "paymentOptions";

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Something went wrong");

const ConfigIcon = ({ tone }: { tone: "green" | "blue" | "amber" }) => {
  const className =
    tone === "green"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "blue"
        ? "bg-blue-50 text-blue-600"
        : "bg-amber-50 text-amber-700";

  return (
    <span className={`flex h-[70px] w-[70px] shrink-0 items-center justify-center rounded-[22px] text-3xl ${className}`}>
      {tone === "green" ? "|||" : tone === "blue" ? "$" : "◷"}
    </span>
  );
};

const Chip = ({ label, onRemove }: { label: string; onRemove: () => void }) => (
  <span className="inline-flex h-10 items-center gap-3 rounded-full border border-slate-200 bg-white px-5 text-base font-extrabold text-slate-700">
    {label}
    <button type="button" onClick={onRemove} className="text-red-200 transition hover:text-red-500" aria-label={`Deactivate ${label}`}>
      ×
    </button>
  </span>
);

export const SettingsPage = () => {
  const [units, setUnits] = useState<UnitRecord[]>([]);
  const [paymentTerms, setPaymentTerms] = useState<MasterDataRecord[]>([]);
  const [paymentOptions, setPaymentOptions] = useState<MasterDataRecord[]>([]);
  const [inputs, setInputs] = useState<Record<ListKind, string>>({
    units: "",
    paymentTerms: "",
    paymentOptions: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const activeUnits = useMemo(() => units.filter((item) => item.is_active), [units]);
  const activePaymentTerms = useMemo(() => paymentTerms.filter((item) => item.is_active), [paymentTerms]);
  const activePaymentOptions = useMemo(() => paymentOptions.filter((item) => item.is_active), [paymentOptions]);
  const fixedTerms = activePaymentTerms.filter((term) => !term.name.includes("%"));
  const weeklyTerms = activePaymentTerms.filter((term) => term.name.includes("%"));

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [nextUnits, nextTerms, nextOptions] = await Promise.all([
        apiRegistry.masterData.listUnits(),
        apiRegistry.masterData.listPaymentTerms(),
        apiRegistry.masterData.listPaymentOptions(),
      ]);
      setUnits(nextUnits);
      setPaymentTerms(nextTerms);
      setPaymentOptions(nextOptions);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const updateInput = (kind: ListKind, value: string) => {
    setInputs((current) => ({ ...current, [kind]: value }));
  };

  const addItem = async (kind: ListKind) => {
    const value = inputs[kind].trim();
    if (!value) {
      return;
    }

    setError(null);
    try {
      if (kind === "units") {
        const unit = await apiRegistry.masterData.createUnit({
          name: value,
          code: slugify(value),
          is_active: true,
        });
        setUnits((current) => [...current, unit]);
      }

      if (kind === "paymentTerms") {
        const term = await apiRegistry.masterData.createPaymentTerm({ name: value, is_active: true });
        setPaymentTerms((current) => [...current, term]);
      }

      if (kind === "paymentOptions") {
        const option = await apiRegistry.masterData.createPaymentOption({ name: value, is_active: true });
        setPaymentOptions((current) => [...current, option]);
      }

      updateInput(kind, "");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const deactivateItem = async (kind: ListKind, item: UnitRecord | MasterDataRecord) => {
    setError(null);
    try {
      if (kind === "units") {
        const unit = item as UnitRecord;
        const updated = await apiRegistry.masterData.updateUnit(unit.id, { is_active: false });
        setUnits((current) => current.map((entry) => (entry.id === updated.id ? updated : entry)));
      }

      if (kind === "paymentTerms") {
        const updated = await apiRegistry.masterData.updatePaymentTerm(item.id, { is_active: false });
        setPaymentTerms((current) => current.map((entry) => (entry.id === updated.id ? updated : entry)));
      }

      if (kind === "paymentOptions") {
        const updated = await apiRegistry.masterData.updatePaymentOption(item.id, { is_active: false });
        setPaymentOptions((current) => current.map((entry) => (entry.id === updated.id ? updated : entry)));
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <div className="space-y-7 pb-8">
      <div className="inline-flex rounded-[24px] bg-white p-2 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
        {["Platform Config", "Notifications", "Business Information"].map((tab, index) => (
          <button
            key={tab}
            type="button"
            className={`rounded-[18px] px-8 py-4 text-lg font-extrabold ${
              index === 0 ? "bg-[#2f7a42] text-white" : "text-slate-500"
            }`}
          >
            {index === 0 ? "⚙ " : index === 1 ? "🔔 " : "🏢 "}
            {tab}
          </button>
        ))}
      </div>

      {error ? <p className="rounded-[16px] bg-red-50 px-5 py-4 text-sm font-bold text-red-700">{error}</p> : null}
      {loading ? <p className="rounded-[16px] bg-white px-5 py-4 text-sm font-bold text-slate-500">Loading settings...</p> : null}

      <section className="rounded-[28px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-5">
          <ConfigIcon tone="green" />
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Units</h2>
            <p className="text-lg font-semibold text-slate-500">Available quantity units in listing forms</p>
          </div>
        </div>
        <div className="my-7 border-t border-slate-100" />
        <div className="flex flex-wrap gap-3">
          {activeUnits.map((unit) => (
            <Chip key={unit.id} label={unit.code || unit.name} onRemove={() => deactivateItem("units", unit)} />
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <input
            value={inputs.units}
            onChange={(event) => updateInput("units", event.target.value)}
            placeholder="e.g. quintal"
            className="h-12 min-w-0 flex-1 rounded-[14px] border border-slate-200 bg-white px-5 text-base font-semibold outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
          />
          <button type="button" onClick={() => addItem("units")} className="rounded-[14px] bg-[#46a354] px-7 text-base font-extrabold text-white">
            + Add
          </button>
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-5">
          <ConfigIcon tone="blue" />
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Payment Terms</h2>
            <p className="text-lg font-semibold text-slate-500">Configure fixed day options and weekly % options</p>
          </div>
        </div>
        <div className="my-7 border-t border-slate-100" />
        <div className="grid gap-8 xl:grid-cols-2">
          <div>
            <h3 className="text-lg font-extrabold text-ink">Fixed Days</h3>
            <p className="mt-2 text-base font-semibold text-slate-500">Number of days after deal for full payment</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {fixedTerms.map((term) => (
                <Chip key={term.id} label={term.name} onRemove={() => deactivateItem("paymentTerms", term)} />
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <input
                value={inputs.paymentTerms}
                onChange={(event) => updateInput("paymentTerms", event.target.value)}
                placeholder="e.g. 90 days"
                className="h-12 min-w-0 flex-1 rounded-[14px] border border-slate-200 px-5 text-base font-semibold outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
              />
              <button type="button" onClick={() => addItem("paymentTerms")} className="rounded-[14px] bg-[#46a354] px-7 text-base font-extrabold text-white">
                + Add
              </button>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-ink">Weekly Percentage</h3>
            <p className="mt-2 text-base font-semibold text-slate-500">Instalment % values for weekly payment schedule</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {weeklyTerms.map((term) => (
                <Chip key={term.id} label={term.name} onRemove={() => deactivateItem("paymentTerms", term)} />
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <input
                value={inputs.paymentTerms}
                onChange={(event) => updateInput("paymentTerms", event.target.value)}
                placeholder="e.g. 33%"
                className="h-12 min-w-0 flex-1 rounded-[14px] border border-slate-200 px-5 text-base font-semibold outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-100"
              />
              <button type="button" onClick={() => addItem("paymentTerms")} className="rounded-[14px] bg-blue-500 px-7 text-base font-extrabold text-white">
                + Add
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
        <div className="flex items-center gap-5">
          <ConfigIcon tone="amber" />
          <div>
            <h2 className="text-2xl font-extrabold text-ink">Payment Options</h2>
            <p className="text-lg font-semibold text-slate-500">Delivery method options (Delivered, EX Load, etc.)</p>
          </div>
        </div>
        <div className="my-7 border-t border-slate-100" />
        <div className="flex flex-wrap gap-3">
          {activePaymentOptions.map((option) => (
            <Chip key={option.id} label={option.name} onRemove={() => deactivateItem("paymentOptions", option)} />
          ))}
        </div>
        <div className="mt-4 flex gap-3">
          <input
            value={inputs.paymentOptions}
            onChange={(event) => updateInput("paymentOptions", event.target.value)}
            placeholder="e.g. DDP"
            className="h-12 min-w-0 flex-1 rounded-[14px] border border-slate-200 px-5 text-base font-semibold outline-none focus:border-amber-300 focus:ring-4 focus:ring-amber-100"
          />
          <button type="button" onClick={() => addItem("paymentOptions")} className="rounded-[14px] bg-amber-700 px-7 text-base font-extrabold text-white">
            + Add
          </button>
        </div>
      </section>
    </div>
  );
};
