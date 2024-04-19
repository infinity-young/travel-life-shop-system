import { ProductCategory } from './ProductCategory';
import { ProductType } from './ProductType';
export interface nonnull_t{
    product: ProductType.nonnull_t;
    productCategoryList: ProductCategory.nonnull_t[];
    success: boolean;
}
export interface t{
    product?: ProductType.t;
    productCategoryList?: ProductCategory.t[];
    success?: boolean;
}
export interface safe_t{
  readonly  product: ProductType.safe_t;
  readonly  productCategoryList: ProductCategory.safe_t[];
  readonly  success: boolean;
}
export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.product = u.product == null ? ProductType.from(<ProductType.t>{}) : ProductType.from(u.product);
    s.productCategoryList = u.productCategoryList == null ? [] : u.productCategoryList.map((item: ProductCategory.t) => { return ProductCategory.from(item) });
    s.success = u.success || false;
    return s;

}