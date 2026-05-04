import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRegistry } from "@/services/api";
import type { CategoryRecord } from "@/services/api/endpoints/catalog.endpoint";

const SearchIcon = () => (
  <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill="none">
    <path d="m20 20-4.4-4.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Unable to load categories");

const getPostsCount = (category: CategoryRecord) => {
  const record = category as CategoryRecord & { posts_count?: number; posts?: unknown[] };
  return record.posts_count ?? record.posts?.length ?? 0;
};

export const CategoriesPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<CategoryRecord[]>([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiRegistry.catalog.listCategories();
        setCategories(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    };

    void loadCategories();
  }, []);

  const visibleCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesQuery = category.name.toLowerCase().includes(query.trim().toLowerCase());
      const matchesFilter =
        filter === "all" || (filter === "active" ? category.is_active : !category.is_active);
      return matchesQuery && matchesFilter;
    });
  }, [categories, filter, query]);

  return (
    <div className="space-y-7 pb-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-[34px] font-extrabold leading-none text-ink">Categories</h1>
          <p className="mt-2 text-xl font-semibold text-slate-500">
            {visibleCategories.length} of {categories.length} categories
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate("/categories/new")}
          className="inline-flex h-12 items-center justify-center gap-3 rounded-[16px] bg-[#245f36] px-7 text-lg font-extrabold text-white shadow-[0_8px_22px_rgba(36,95,54,0.22)]"
        >
          <span className="text-2xl leading-none">+</span>
          New Category
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <label className="relative block w-full max-w-[360px]">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search categories..."
            className="h-12 w-full rounded-[14px] border border-slate-200 bg-white pl-12 pr-4 text-base font-semibold outline-none focus:border-emerald-300 focus:ring-4 focus:ring-emerald-100"
          />
        </label>
        {[
          ["all", "All"],
          ["active", "Active"],
          ["inactive", "Inactive"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value as "all" | "active" | "inactive")}
            className={`h-11 rounded-full border px-7 text-base font-extrabold ${
              filter === value
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-slate-200 bg-slate-50 text-slate-500"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error ? <p className="rounded-[16px] bg-red-50 px-5 py-4 text-sm font-bold text-red-700">{error}</p> : null}
      {loading ? <p className="rounded-[16px] bg-white px-5 py-4 text-sm font-bold text-slate-500">Loading categories...</p> : null}

      <section className="grid gap-6 md:grid-cols-2 2xl:grid-cols-4">
        {visibleCategories.map((category) => (
          <button
            key={category.id}
            type="button"
            onClick={() => navigate(`/categories/${category.id}`)}
            className="min-h-[220px] rounded-[26px] bg-white p-8 text-left shadow-[0_8px_22px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[22px] bg-emerald-50 text-3xl">
                {category.image_url ? (
                  <img src={category.image_url} alt="" className="h-full w-full object-cover" />
                ) : (
                  category.name.slice(0, 2).toUpperCase()
                )}
              </span>
              <span
                className={`inline-flex h-8 items-center rounded-full px-4 text-sm font-extrabold ${
                  category.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                • {category.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <h2 className="mt-7 text-[26px] font-extrabold leading-none text-ink">{category.name}</h2>
            <p className="mt-3 text-lg font-semibold text-slate-500">
              {category.commodities?.length ?? 0} commodities · {getPostsCount(category)} posts
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(category.commodities ?? []).slice(0, 3).map((commodity) => (
                <span key={commodity.id} className="rounded-full bg-slate-100 px-4 py-1 text-sm font-extrabold text-slate-600">
                  {commodity.name}
                </span>
              ))}
            </div>
          </button>
        ))}
      </section>
    </div>
  );
};
