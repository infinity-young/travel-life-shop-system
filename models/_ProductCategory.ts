
export interface nonnull_t{
    productCategoryId: number;
    shopId: number;
    productCategoryName: string;
    priority: number;
    createTime: number;
}
export interface t{
    productCategoryId?: number;
    shopId?: number;
    productCategoryName?: string;
    priority?: number;
    createTime?: number;
}
export interface safe_t{
   readonly productCategoryId: number;
   readonly shopId: number;
   readonly  productCategoryName: string;
   readonly   priority: number;
   readonly  createTime: number;
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.productCategoryId = u.productCategoryId || 0;
    s.shopId = u.shopId || 0;
    s.productCategoryName = u.productCategoryName || '';
    s.priority = u.priority || 0;
    s.createTime = u.createTime || 0;
    return s;
}