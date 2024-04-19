import { readonly } from 'vue';
import { ProductType } from './ProductType';
export interface nonnull_t{
    product: ProductType.nonnull_t;
    success: boolean;
}
export interface t {
    product?: ProductType.t;
    success?: boolean;
}
export interface safe_t{
   readonly product: ProductType.safe_t;
   readonly success: boolean;
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.product = u.product == null ? ProductType.from(<ProductType.t>{}) : ProductType.from(u.product);
    s.success = u.success || false;
    return s;
}