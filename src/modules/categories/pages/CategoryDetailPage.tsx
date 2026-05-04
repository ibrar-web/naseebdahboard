import { FormEvent, type ReactNode, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiRegistry } from "@/services/api";
import type {
  CategoryRecord,
  CommodityRecord,
  CommodityPayload,
  UnitRecord,
} from "@/services/api/endpoints/catalog.endpoint";

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Unable to load category");

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

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <label className="block">
    <span className="mb-2 block text-base font-extrabold text-slate-600">{label}</span>
    {children}
  </label>
);

const inputClass =
  "h-[58px] w-full rounded-[14px] border border-slate-200 bg-slate-50 px-5 text-lg font-semibold text-ink outline-none focus:border-emerald-300 focus:bg-white focus:ring-4 focus:ring-emerald-100";

export const CategoryDetailPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryRecord | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [commodities, setCommodities] = useState<CommodityRecord[]>([]);
  const [units, setUnits] = useState<UnitRecord[]>([]);
  const [commodityName, setCommodityName] = useState("");
  const [unitId, setUnitId] = useState("");
  const [commissionType, setCommissionType] = useState<"percentage" | "flat">("percentage");
  const [commissionValue, setCommissionValue] = useState("");
  const [minimumQuantity, setMinimumQuantity] = useState("");
  const [grades, setGrades] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!categoryId) {
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const [categories, allCommodities, nextUnits] = await Promise.all([
          apiRegistry.catalog.listCategories(),
          apiRegistry.catalog.listCommodities(),
          apiRegistry.masterData.listUnits(),
        ]);
        const selected = categories.find((item) => item.id === categoryId) ?? null;
        if (!selected) {
          throw new Error("Category not found");
        }
        const categoryCommodities = allCommodities.filter((commodity) => commodity.category?.id === categoryId);
        setCategory(selected);
        setCategoryName(selected.name);
        setIsActive(selected.is_active);
        setCommodities(categoryCommodities);
        setUnits(nextUnits.filter((unit) => unit.is_active));
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    void loadData();
  }, [categoryId]);

  const selectedUnit = useMemo(() => units.find((unit) => unit.id === unitId), [unitId, units]);

  const saveChanges = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!categoryId || !categoryName.trim()) {
      setError("Category name is required");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const updated = await apiRegistry.catalog.updateCategory(categoryId, {
        name: categoryName.trim(),
        is_active: isActive,
      });
      setCategory(updated);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const deactivate = async () => {
    setIsActive(false);
    if (!categoryId) {
      return;
    }

    try {
      const updated = await apiRegistry.catalog.updateCategory(categoryId, { is_active: false });
      setCategory(updated);
      setIsActive(updated.is_active);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const addCommodity = async () => {
    if (!categoryId || !commodityName.trim()) {
      setError("Commodity name is required");
      return;
    }

    const name = commodityName.trim();
    const image = makeImageMeta(name, "commodity");
    const payload: CommodityPayload = {
      name,
      description: "",
      ...image,
      category_id: categoryId,
      default_unit_id: unitId || undefined,
      currency: "PKR",
      commission_scope: "same",
      buyer_commission_type: commissionType,
      buyer_commission_value: Number(commissionValue || 0),
      seller_commission_type: commissionType,
      seller_commission_value: Number(commissionValue || 0),
      minimum_quantity: minimumQuantity ? Number(minimumQuantity) : undefined,
      grades: parseGrades(grades),
      is_active: true,
    };

    setError(null);
    try {
      const commodity = await apiRegistry.catalog.createCommodity(payload);
      setCommodities((current) => [...current, commodity]);
      setCommodityName("");
      setCommissionValue("");
      setMinimumQuantity("");
      setGrades("");
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  const categoryImage = category?.image_url;
  const postsCount = 0;

  return (
    <form className="-mx-5 -mt-6 sm:-mx-8" onSubmit={saveChanges}>
      <header className="bg-[linear-gradient(110deg,#185038_0%,#3a8d5c_100%)] px-8 py-8 text-white">
        <div className="mb-5 text-lg font-bold text-white/60">
          Categories <span className="mx-2">›</span> {categoryName || "Category"}
        </div>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-6">
            <button type="button" onClick={() => navigate("/categories")} className="flex h-16 w-16 items-center justify-center rounded-[18px] border border-white/20 bg-white/10 text-3xl">
              ‹
            </button>
            <div>
              <h1 className="text-[36px] font-extrabold leading-none">{categoryName || "Category"}</h1>
              <p className="mt-3 text-xl font-semibold text-white/60">
                {commodities.length} commodities · {postsCount} posts
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={deactivate} className="rounded-[16px] bg-amber-100 px-8 py-3 text-lg font-extrabold text-amber-700">
              Deactivate
            </button>
            <button type="submit" disabled={saving} className="rounded-[16px] bg-white px-8 py-3 text-lg font-extrabold text-[#245f36] disabled:opacity-70">
              ✓ {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </header>

      <main className="grid gap-8 px-5 py-8 sm:px-8 xl:grid-cols-[480px_1fr]">
        <div className="space-y-6">
          <section className="rounded-[26px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-extrabold text-ink">Category Details</h2>
            <div className="mt-7 flex h-48 items-center justify-center overflow-hidden rounded-[20px] border-2 border-dashed border-emerald-300 bg-emerald-50 text-center text-emerald-700">
              {categoryImage ? <img src={categoryImage} alt="" className="h-full w-full object-cover" /> : <p className="text-xl font-extrabold">Click to change image</p>}
            </div>
            <div className="mt-6 space-y-6">
              <Field label="Category Name">
                <input value={categoryName} onChange={(event) => setCategoryName(event.target.value)} className={inputClass} />
              </Field>
              <div className="flex items-center justify-between">
                <p className="text-base font-extrabold text-slate-600">Status</p>
                <button
                  type="button"
                  onClick={() => setIsActive((current) => !current)}
                  className={`rounded-full px-5 py-2 text-base font-extrabold ${
                    isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                  }`}
                >
                  • {isActive ? "Active" : "Inactive"}
                </button>
              </div>
            </div>
          </section>

          <section className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-7">
            <h2 className="text-xl font-extrabold text-[#245f36]">Summary</h2>
            <div className="mt-5 space-y-3 text-lg font-bold text-[#245f36]">
              <p className="flex justify-between border-b border-emerald-200 pb-2"><span>Commodities</span><span>{commodities.length}</span></p>
              <p className="flex justify-between border-b border-emerald-200 pb-2"><span>Posts</span><span>{postsCount}</span></p>
              <p className="flex justify-between"><span>Status</span><span>{isActive ? "Active" : "Inactive"}</span></p>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-[26px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-extrabold text-ink">Add Commodity</h2>
            <div className="mt-7 grid gap-5 lg:grid-cols-2">
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
              <Field label="Commission Type">
                <select value={commissionType} onChange={(event) => setCommissionType(event.target.value as "percentage" | "flat")} className={inputClass}>
                  <option value="percentage">pct</option>
                  <option value="flat">flat</option>
                </select>
              </Field>
              <Field label="Commission % *">
                <input value={commissionValue} onChange={(event) => setCommissionValue(event.target.value)} placeholder="e.g. 2" className={inputClass} />
              </Field>
              <Field label="Minimum Quantity">
                <input value={minimumQuantity} onChange={(event) => setMinimumQuantity(event.target.value)} placeholder={`e.g. 10 ${selectedUnit?.code ?? "bags"}`} className={inputClass} />
              </Field>
              <div className="lg:col-span-2">
                <Field label="Grades (comma separated)">
                  <input value={grades} onChange={(event) => setGrades(event.target.value)} placeholder="e.g. Grade A, Grade B, Grade C" className={inputClass} />
                </Field>
              </div>
            </div>
            <div className="mt-5 flex h-28 items-center justify-center rounded-[16px] border-2 border-dashed border-slate-200 bg-slate-50 text-base font-extrabold text-slate-500">
              📷 Click to upload commodity image
            </div>
            <button type="button" onClick={addCommodity} className="mt-5 h-14 w-full rounded-[14px] bg-[#2f7a42] text-xl font-extrabold text-white shadow-[0_8px_18px_rgba(36,95,54,0.22)]">
              + Add Commodity
            </button>
          </section>

          <section className="rounded-[26px] bg-white p-8 shadow-[0_8px_22px_rgba(15,23,42,0.08)]">
            <h2 className="text-2xl font-extrabold text-ink">Commodities ({commodities.length})</h2>
            <div className="mt-6 space-y-4">
              {commodities.map((commodity) => (
                <div key={commodity.id} className="flex items-center justify-between gap-4 rounded-[18px] border border-emerald-200 bg-emerald-50 px-6 py-5">
                  <div className="flex items-center gap-5">
                    <span className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-white text-2xl">📦</span>
                    <div>
                      <p className="text-xl font-extrabold text-ink">{commodity.name}</p>
                      <p className="text-base font-semibold text-slate-500">
                        Unit: {commodity.default_unit?.code ?? commodity.default_unit?.name ?? "none"} · {commodity.buyer_commission_value}
                        {commodity.buyer_commission_type === "percentage" ? "% commission" : " flat commission"}
                      </p>
                    </div>
                  </div>
                  <button type="button" className="text-2xl text-red-300" aria-label={`Deactivate ${commodity.name}`}>
                    ▯
                  </button>
                </div>
              ))}
              {!commodities.length && !loading ? <p className="text-center text-lg font-semibold text-slate-400">No commodities yet</p> : null}
            </div>
          </section>

          {error ? <p className="rounded-[16px] bg-red-50 px-5 py-4 text-sm font-bold text-red-700">{error}</p> : null}
          {loading ? <p className="rounded-[16px] bg-white px-5 py-4 text-sm font-bold text-slate-500">Loading category...</p> : null}
        </div>
      </main>
    </form>
  );
};
