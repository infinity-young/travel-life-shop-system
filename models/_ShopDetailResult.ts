import { ShopType } from './ShopType'
import { AreaType } from './AreaType'
export interface nonnull_t{
    shop: ShopType.nonnull_t,
    success: boolean,
    areaList:AreaType.nonnull_t[]
}
export interface t{
    shop?: ShopType.t,
    success?: boolean,
    areaList?:AreaType.t[]
}
export interface safe_t{
    shop: ShopType.safe_t,
    success: boolean,
    areaList:AreaType.safe_t[]
}
export function from(m:t):safe_t {
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.shop = u.shop == null ? ShopType.from(<ShopType.t>{}) :ShopType.from( u.shop);
    s.success = u.success || false;
    s.areaList = u.areaList == null ? [] : u.areaList.map((item: AreaType.t) => { return AreaType.from(item) })
    return s;
}