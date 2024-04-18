
import { ProductType } from './ProductType';
export interface nonnull_t{
   success: boolean;
   count: number;
   productList:ProductType.nonnull_t[]
}

export interface t{
    success?: boolean;
    count?: number;
    productList?:ProductType.t[]
}

export interface safe_t{
  readonly success: boolean;
  readonly count: number;
  readonly productList:ProductType.safe_t[]
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.success = u.success || false;
    s.count = u.count || 0;
    s.productList = u.productList == null ? [] : u.productList.map((item: ProductType.t) => { return ProductType.from(item) });
    return s;
}