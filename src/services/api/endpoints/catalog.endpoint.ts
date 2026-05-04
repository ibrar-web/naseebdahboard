import { http } from "@/services/api/core/client";

type WrappedResponse<T> = {
  data: T;
};

const unwrap = <T>(response: T | WrappedResponse<T>): T => {
  if (response && typeof response === "object" && "data" in response) {
    return (response as WrappedResponse<T>).data;
  }

  return response as T;
};

export interface UnitRecord {
  id: string;
  name: string;
  code: string;
  is_active: boolean;
}

export interface MasterDataRecord {
  id: string;
  name: string;
  is_active: boolean;
}

export interface CategoryRecord {
  id: string;
  name: string;
  image_name: string;
  image_url: string;
  is_active: boolean;
  commodities?: CommodityRecord[];
}

export interface CommodityRecord {
  id: string;
  name: string;
  description?: string | null;
  image_name: string;
  image_url: string;
  category?: CategoryRecord | null;
  default_unit?: UnitRecord | null;
  currency: "PKR" | "USD";
  commission_scope: "same" | "different";
  buyer_commission_type: "percentage" | "flat";
  buyer_commission_value: number;
  seller_commission_type: "percentage" | "flat";
  seller_commission_value: number;
  minimum_quantity?: number | null;
  grades: string[];
  is_active: boolean;
}

export interface CategoryPayload {
  name: string;
  image_name: string;
  image_url: string;
  is_active: boolean;
}

export interface CommodityPayload {
  name: string;
  description?: string;
  image_name: string;
  image_url: string;
  category_id: string;
  default_unit_id?: string;
  currency: "PKR" | "USD";
  commission_scope: "same" | "different";
  buyer_commission_type: "percentage" | "flat";
  buyer_commission_value: number;
  seller_commission_type: "percentage" | "flat";
  seller_commission_value: number;
  minimum_quantity?: number;
  grades: string[];
  is_active: boolean;
}

export const catalogEndpoint = {
  async listCategories() {
    const response = await http.get<CategoryRecord[] | WrappedResponse<CategoryRecord[]>>("/admin/commodities/categories");
    return unwrap<CategoryRecord[]>(response);
  },
  async createCategory(payload: CategoryPayload) {
    const response = await http.post<CategoryRecord | WrappedResponse<CategoryRecord>, CategoryPayload>(
      "/admin/commodities/categories",
      payload,
    );
    return unwrap<CategoryRecord>(response);
  },
  async updateCategory(id: string, payload: Partial<CategoryPayload>) {
    const response = await http.patch<CategoryRecord | WrappedResponse<CategoryRecord>, Partial<CategoryPayload>>(
      `/admin/commodities/categories/${id}`,
      payload,
    );
    return unwrap<CategoryRecord>(response);
  },
  async listCommodities() {
    const response = await http.get<CommodityRecord[] | WrappedResponse<CommodityRecord[]>>("/admin/commodities");
    return unwrap<CommodityRecord[]>(response);
  },
  async getCommodity(id: string) {
    const response = await http.get<CommodityRecord | WrappedResponse<CommodityRecord>>(`/admin/commodities/${id}`);
    return unwrap<CommodityRecord>(response);
  },
  async createCommodity(payload: CommodityPayload) {
    const response = await http.post<CommodityRecord | WrappedResponse<CommodityRecord>, CommodityPayload>(
      "/admin/commodities",
      payload,
    );
    return unwrap<CommodityRecord>(response);
  },
  async updateCommodity(id: string, payload: Partial<CommodityPayload>) {
    const response = await http.patch<CommodityRecord | WrappedResponse<CommodityRecord>, Partial<CommodityPayload>>(
      `/admin/commodities/${id}`,
      payload,
    );
    return unwrap<CommodityRecord>(response);
  },
};

export const masterDataEndpoint = {
  async listUnits() {
    const response = await http.get<UnitRecord[] | WrappedResponse<UnitRecord[]>>("/admin/master-data/units");
    return unwrap<UnitRecord[]>(response);
  },
  async createUnit(payload: { name: string; code: string; is_active: boolean }) {
    const response = await http.post<UnitRecord | WrappedResponse<UnitRecord>, typeof payload>(
      "/admin/master-data/units",
      payload,
    );
    return unwrap<UnitRecord>(response);
  },
  async updateUnit(id: string, payload: Partial<{ name: string; code: string; is_active: boolean }>) {
    const response = await http.patch<UnitRecord | WrappedResponse<UnitRecord>, typeof payload>(
      `/admin/master-data/units/${id}`,
      payload,
    );
    return unwrap<UnitRecord>(response);
  },
  async listPaymentTerms() {
    const response = await http.get<MasterDataRecord[] | WrappedResponse<MasterDataRecord[]>>(
      "/admin/master-data/payment-terms",
    );
    return unwrap<MasterDataRecord[]>(response);
  },
  async createPaymentTerm(payload: { name: string; is_active: boolean }) {
    const response = await http.post<MasterDataRecord | WrappedResponse<MasterDataRecord>, typeof payload>(
      "/admin/master-data/payment-terms",
      payload,
    );
    return unwrap<MasterDataRecord>(response);
  },
  async updatePaymentTerm(id: string, payload: Partial<{ name: string; is_active: boolean }>) {
    const response = await http.patch<MasterDataRecord | WrappedResponse<MasterDataRecord>, typeof payload>(
      `/admin/master-data/payment-terms/${id}`,
      payload,
    );
    return unwrap<MasterDataRecord>(response);
  },
  async listPaymentOptions() {
    const response = await http.get<MasterDataRecord[] | WrappedResponse<MasterDataRecord[]>>(
      "/admin/master-data/payment-options",
    );
    return unwrap<MasterDataRecord[]>(response);
  },
  async createPaymentOption(payload: { name: string; is_active: boolean }) {
    const response = await http.post<MasterDataRecord | WrappedResponse<MasterDataRecord>, typeof payload>(
      "/admin/master-data/payment-options",
      payload,
    );
    return unwrap<MasterDataRecord>(response);
  },
  async updatePaymentOption(id: string, payload: Partial<{ name: string; is_active: boolean }>) {
    const response = await http.patch<MasterDataRecord | WrappedResponse<MasterDataRecord>, typeof payload>(
      `/admin/master-data/payment-options/${id}`,
      payload,
    );
    return unwrap<MasterDataRecord>(response);
  },
};
