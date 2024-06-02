
import { AreaType } from './AreaType';
import { ShopCategory } from './ShopCategory';
export interface nonnull_t{
    shopCategoryList: ShopCategory.nonnull_t[]
    success: boolean;
    areaList:AreaType.t[]
}
export interface t{
    shopCategoryList?: ShopCategory.t[]
    success?: boolean;
    areaList?:AreaType.t[]
}
export interface safe_t{
   readonly shopCategoryList: ShopCategory.safe_t[]
   readonly success: boolean;
   readonly areaList:AreaType.t[]
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.shopCategoryList = u.shopCategoryList == null ? [] : u.shopCategoryList.map((item: ShopCategory.t) => { return ShopCategory.from(item) })
    s.success = u.success || false;
    s.areaList = u.areaList == null ? [] : u.areaList.map((item: AreaType.t) => { return AreaType.from(item) });
    return s;
}