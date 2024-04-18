
export interface nonnull_t{
    productImgId: number;
    imgAddr: string;
    imgDesc: string;
    priority: number;
    productId: number;
    createTime: number;
}
export interface t{
    productImgId?: number;
    imgAddr?: string;
    imgDesc?: string;
    priority?: number;
    productId?: number;
    createTime?: number;
}
export interface safe_t{
   readonly productImgId: number;
   readonly imgAddr: string;
   readonly imgDesc: string;
   readonly priority: number;
   readonly productId: number;
   readonly createTime: number;
}
export function from(m:t):safe_t {
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.productImgId = u.productImgId || 0;
    s.imgAddr = u.imgAddr || '';
    s.imgDesc = u.imgDesc || '';
    s.priority = u.priority || 0;
    s.productId = u.productId || 0;
    s.createTime = u.createTime || 0;
    return s;
}