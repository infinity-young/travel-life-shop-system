import { ShopType } from './ShopType';
import { PersonType } from './PersonType';
export interface nonnull_t{
    shopList: ShopType.nonnull_t[];
    success: boolean;
    user: PersonType.nonnull_t
}
export interface t{
    shopList?: ShopType.t[];
    success?: boolean;
    user?: PersonType.t
}
export interface safe_t{
   readonly shopList: ShopType.safe_t[];
   readonly success: boolean;
   readonly user: PersonType.safe_t
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.shopList = u.shopList == null ? [] : u.shopList.map((item: ShopType.t) => { return ShopType.from(item) });
    s.success = u.success || false;
    s.user = u.user == null ? PersonType.from(<PersonType.t>{}) : PersonType.from(u.user);
    return s;

}