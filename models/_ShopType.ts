import { AreaType } from './AreaType.ts'
import { ShopCategory } from './ShopCategory.ts'
import { PersonType } from './PersonType.ts'
export interface nonnull_t{
    shopId: number,
    shopName: string,
    shopAddr: string,
    shopDesc: string,
    phone: string,
    shopImg:string,
    priority: number,
    createTime: number,
    lastEditTime: number,
    enableStatus: boolean,
    advice: string,
    area:AreaType.nonnull_t,
    owner: PersonType.nonnull_t,
    ShopCategory: ShopCategory.nonnull_t
}
export interface t{
    shopId?: number,
    shopName?: string,
    shopAddr?: string,
    shopDesc?: string,
    phone?: string,
    shopImg?:string,
    priority?: number,
    createTime?: number,
    lastEditTime?: number,
    enableStatus?: boolean,
    advice?: string,
    area?:AreaType.t,
    owner?: PersonType.t,
    ShopCategory?: ShopCategory.t
}
export interface safe_t{
   readonly shopId: number,
   readonly shopName: string,
   readonly  shopAddr: string,
   readonly  shopDesc: string,
   readonly  phone: string,
   readonly  shopImg:string,
   readonly  priority: number,
   readonly  createTime: number,
   readonly lastEditTime: number,
   readonly enableStatus: boolean,
   readonly advice: string,
   readonly area:AreaType.nonnull_t,
   readonly owner: PersonType.safe_t,
   readonly ShopCategory: ShopCategory.safe_t
}
export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.shopId = u.shopId || 0;
    s.shopName = u.shopName || '';
    s.shopAddr = u.shopAddr || '';
    s.shopDesc = u.shopDesc || '';
    s.phone = u.phone || '';
    s.shopImg = u.shopImg || '';
    s.priority = u.priority || 0;
    s.createTime = u.createTime || 0;
    s.lastEditTime = u.lastEditTime || 0;
    s.enableStatus = u.enableStatus || false;
    s.advice = u.advice || '';
    s.owner = u.owner==null?PersonType.from(<PersonType.t>{}):PersonType.from(u.owner);
    s.ShopCategory = u.ShopCategory == null ? ShopCategory.from(<ShopCategory.t>{}) : ShopCategory.from(u.ShopCategory);
    return s;
}