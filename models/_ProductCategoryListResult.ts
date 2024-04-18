import { ProductCategory } from './ProductCategory';
export interface nonnull_t{
    success: boolean;
    data: ProductCategory.nonnull_t[];
    errorMsg: string;
    errorCode: number;
}
export interface t{
    success?: boolean;
    data?: ProductCategory.t[];
    errorMsg?: string;
    errorCode?: number;
}
export interface safe_t{
   readonly success: boolean;
   readonly data: ProductCategory.safe_t[];
   readonly errorMsg: string;
   readonly errorCode: number;
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.success = u.success || false;
    s.data = u.data == null ? [] : u.data.map((item: ProductCategory.t) => { return ProductCategory.from(item) });
    s.errorMsg = u.errorMsg || '';
    s.errorCode = u.errorCode || 0;
    return s;
}