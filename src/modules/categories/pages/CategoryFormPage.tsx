import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRegistry } from "@/services/api";
import type { CommodityPayload, UnitRecord } from "@/services/api/endpoints/catalog.endpoint";

type DraftCommodity = Omit<CommodityPayload, "category_id">;

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Unable to save category");

const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const makeImageMeta = (name: string, fallback: string) => {
  const safe = slugify(name || fallback) || fallback;
  return {
    image_name: `${safe}.png`,
    image_url: `https://cdn.example.com/${safe}.png`,
  };
};

const parseGrades = (value: string) =>
  value
    .split(",")
    .map((grade) => grade.trim().replace(/^grade\s+/i, "").toUpperCase())
    .filter((grade) => ["A", "B", "C", "D"].includes(grade));

const Field = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => (
  <label className="block">
    <span className="mb-2 block text-base font-extrabold text-slate-600">{label}</span>
    {children}
  </label>
);

const inputClass =
  "h-[58px] w-full rounded-[14px] border border-slate-200 bg-slate-50 px-5 text-lg font-semibold text-ink outline-none focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100";

export const CategoryFormPage = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState<UnitRecord[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [commodities, setCommodities] = useState<DraftCommodity[]>([]);
  const [commodityName, setCommodityName] = useState("");
  const [unitId, setUnitId] = useState("");
  const [currency, setCurrency] = useState<"PKR" | "USD">("PKR");
  const [commissionScope, setCommissionScope] = useState<"same" | "different">("same");
  const [commissionType, setCommissionType] = useState<"percentage" | "flat">("percentage");
  const [commissionValue, setCommissionValue] = useState("");
  const [sellerCommissionType, setSellerCommissionType] = useState<"percentage" | "flat">("percentage");
  const [sellerCommissionValue, setSellerCommissionValue] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const [grades, setGrades] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const data = await apiRegistry.masterData.listUnits();
        setUnits(data.filter((unit) => unit.is_active));
      } catch (err) {
        setError(getErrorMessage(err));
      }
    };

    void loadUnits();
  }, []);

  const previewCommodityCount = commodities.length;
  const selectedUnit = useMemo(() => units.find((unit) => unit.id === unitId), [unitId, units]);

  const addCommodity = () => {
    const name = commodityName.trim();
    if (!name) {
      setError("Commodity name is required");
      return;
    }

    const image = makeImageMeta(name, "commodity");
    const buyerValue = Number(commissionValue || 0);
    const sellerValue = commissionScope === "same" ? buyerValue : Number(sellerCommissionValue || 0);

    setCommodities((current) => [
      ...current,
      {
        name,
        description: "",
        ...image,
        default_unit_id: unitId || undefined,
        currency,
        commission_scope: commissionScope,
        buyer_commission_type: commissionType,
        buyer_commission_value: buyerValue,
        seller_commission_type: commissionScope === "same" ? commissionType : sellerCommissionType,
        seller_commission_value: sellerValue,
        minimum_quantity: minimumQuantity ? Number(minimumQuantity) : undefined,
        grades: parseGrades(grades),
        is_active: true,
      },
    ]);

    setCommodityName("");
    setCommissionValue("");
    setSellerCommissionValue("");
    setMinimumQuantity("");
    setGrades("");
    setError(null);
  };

  const saveCategory = async (event: FormEvent) => {
    event.preventDefault();
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const category = await apiRegistry.catalog.createCategory({
        name: categoryName.trim(),
        ...makeImageMeta(categoryName, "category"),
        is_active: isActive,
      });

      await Promise.all(
        commodities.map((commodity) =>
          apiRegistry.catalog.createCommodity({
            ...commodity,
            category_id: category.id,
          }),
        ),
      );

      navigate(`/categories/${category.id}`, { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <form className="-mx-5 -mt-6 sm:-mx-8" onSubmit={saveCategory}>
      <header className="bg-[linear-gradient(110deg,#185038_0%,#3a8d5c_100%)] px-8 py-8 text-white">
        <div className="mb-5 text-lg font-bold text-white/60">Categories <span className="mx-2">›</span> New Category</div>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => navigate("/categories")} className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/20 bg-white/10 text-3xl">
              ‹
            </button>
            <div>
              <h1 className="text-[36px] font-extrabold leading-none">New Category</h1>
              <p className="mt-3 text-xl font-semibold text-white/60">Create a category with commodities and commission rules</p>
            </div>
          </div>
          <button type="submit" disabled={saving} className="rounded-[16px] bg-white px-8 py-3 text-lg font-extrabold text-[#245f36] disabled:opacity-70">
            ✓ {saving ? "Saving..." : "Save Category"}
          </button>
        </div>
      </header>

      <main className="grid gap-8 px-5 py-8 sm:px-8 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-6">
          <section className="rounded-[26px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-extrabold text-ink">Category Details</h2>
            <div className="mt-8 space-y-6">
              <Field label="Category Name *">
                <input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} placeholder="e.g. Grains" className={inputClass} />
              </Field>
              <Field label="Category Image *">
                <div className="flex h-44 items-center justify-center rounded-[18px] border-2 border-dashed border-slate-200 bg-slate-50 text-center text-slate-500">
                  <div>
                    <p className="text-2xl">📷</p>
                    <p className="mt-3 text-xl font-extrabold">Click to upload</p>
                    <p className="font-semibold">PNG, JPG up to 2MB</p>
                  </div>
                </div>
              </Field>
              <Field label="Status">
                <select value={isActive ? "active" : "inactive"} onChange={(event) => setIsActive(event.target.value === "active")} className={inputClass}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </Field>
            </div>
          </section>

          <section className="rounded-[26px] border border-emerald-200 bg-emerald-50 p-8">
            <h2 className="text-xl font-extrabold text-[#245f36]">Preview</h2>
            <div className="mt-6 rounded-[22px] bg-white p-7 shadow-[0_8px_22px_rgba(15,23,42,0.06)]">
              <div className="flex items-start justify-between">
                <span className="flex h-16 w-16 items-center justify-center rounded-[18px] bg-emerald-50 text-2xl">📦</span>
                <span className="rounded-full bg-emerald-100 px-5 py-2 text-base font-extrabold text-emerald-700">• {isActive ? "Active" : "Inactive"}</span>
              </div>
              <h3 className="mt-5 text-2xl font-extrabold text-ink">{categoryName || "Category Name"}</h3>
              <p className="text-lg font-semibold text-slate-500">{previewCommodityCount} commodities</p>
            </div>
          </section>
        </div>

        <section className="rounded-[26px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
          <h2 className="text-2xl font-extrabold text-ink">Add Commodity</h2>
          <p className="mt-2 text-lg font-semibold text-slate-500">Add commodities with individual commission structures for buyer and seller.</p>
          <div className="mt-7 rounded-[22px] border border-slate-100 bg-slate-50 p-7">
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="lg:col-span-2">
                <Field label="Commodity Name *">
                  <input value={commodityName} onChange={(event) => setCommodityName(event.target.value)} placeholder="e.g. Basmati Rice" className={inputClass} />
                </Field>
              </div>
              <Field label="Unit">
                <select value={unitId} onChange={(event) => setUnitId(event.target.value)} className={inputClass}>
                  <option value="">Select unit</option>
                  {units.map((unit) => (
                    <option key={unit.id} value={unit.id}>{unit.code || unit.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Currency">
                <select value={currency} onChange={(event) => setCurrency(event.target.value as "PKR" | "USD")} className={inputClass}>
                  <option value="PKR">PKR</option>
                  <option value="USD">USD</option>
                </select>
              </Field>
              <div className="lg:col-span-2">
                <Field label="Commission Structure">
                  <div className="grid rounded-[14px] border border-slate-200 bg-white p-1 lg:grid-cols-2">
                    {[
                      ["same", "Same for Both"],
                      ["different", "Buyer & Seller Separate"],
                    ].map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setCommissionScope(value as "same" | "different")}
                        className={`h-12 rounded-[12px] text-base font-extrabold ${commissionScope === value ? "bg-[#2f7a42] text-white" : "text-slate-500"}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </Field>
              </div>
              <Field label="Buyer Commission">
                <div className="grid grid-cols-[110px_1fr] gap-3">
                  <select value={commissionType} onChange={(event) => setCommissionType(event.target.value as "percentage" | "flat")} className={inputClass}>
                    <option value="percentage">%</option>
                    <option value="flat">Flat</option>
                  </select>
                  <input value={commissionValue} onChange={(event) => setCommissionValue(event.target.value)} placeholder="e.g. 2" className={inputClass} />
                </div>
              </Field>
              {commissionScope === "different" ? (
                <Field label="Seller Commission">
                  <div className="grid grid-cols-[110px_1fr] gap-3">
                    <select value={sellerCommissionType} onChange={(event) => setSellerCommissionType(event.target.value as "percentage" | "flat")} className={inputClass}>
                      <option value="percentage">%</option>
                      <option value="flat">Flat</option>
                    </select>
                    <input value={sellerCommissionValue} onChange={(event) => setSellerCommissionValue(event.target.value)} placeholder="e.g. 500" className={inputClass} />
                  </div>
                </Field>
              ) : null}
              <Field label="Minimum Quantity">
                <input value={minimumQuantity} onChange={(event) => setMinimumQuantity(event.target.value)} placeholder={`e.g. 10 ${selectedUnit?.code ?? "bags"}`} className={inputClass} />
              </Field>
              <Field label="Grades (comma separated)">
                <input value={grades} onChange={(event) => setGrades(event.target.value)} placeholder="A, B, C" className={inputClass} />
              </Field>
            </div>
            <div className="mt-5 flex h-16 items-center justify-center rounded-[16px] border-2 border-dashed border-slate-200 bg-white text-base font-extrabold text-slate-500">
              📷 Upload commodity image (optional)
            </div>
            <button type="button" onClick={addCommodity} className="mt-5 h-14 w-full rounded-[14px] bg-[#2f7a42] text-xl font-extrabold text-white shadow-[0_8px_18px_rgba(36,95,54,0.22)]">
              + Add Commodity
            </button>
          </div>

          {error ? <p className="mt-5 rounded-[16px] bg-red-50 px-5 py-4 text-sm font-bold text-red-700">{error}</p> : null}
          <div className="mt-8 space-y-3">
            {commodities.length ? (
              commodities.map((commodity) => (
                <div key={commodity.name} className="rounded-[16px] border border-emerald-200 bg-emerald-50 px-5 py-4">
                  <p className="font-extrabold text-ink">{commodity.name}</p>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    Unit: {units.find((unit) => unit.id === commodity.default_unit_id)?.code ?? "none"} · {commodity.buyer_commission_value}% commission
                  </p>
                </div>
              ))
            ) : (
              <p className="pt-5 text-center text-lg font-semibold text-slate-400">No commodities added yet</p>
            )}
          </div>
        </section>
      </main>
    </form>
  );
};
