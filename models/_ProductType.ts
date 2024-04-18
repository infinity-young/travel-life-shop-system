import { ProductCategory } from './ProductCategory'; 
import { ShopType } from './ShopType';
import { ProductImgType } from './ProductImgType';
import { readonly } from 'vue';
export interface nonnull_t{
    productId: number;
    productName: string;
    productDesc: string;
    imgAddr: string;
    normalPrice: string;
    promotionPrice: string;
    priority: number;
    createTime: number;
    lastEditTime: number;
    enableStatus: number;
    productImgList: ProductImgType.nonnull_t[];
    productCategory: ProductCategory.nonnull_t
    shop:ShopType.nonnull_t;
}
export interface t{
    productId?: number;
    productName?: string;
    productDesc?: string;
    imgAddr?: string;
    normalPrice?: string;
    promotionPrice?: string;
    priority?: number;
    createTime?: number;
    lastEditTime?: number;
    enableStatus?: number;
    productImgList?: ProductImgType.t[];
    productCategory?: ProductCategory.t;
    shop:ShopType.t;
}
export interface safe_t{
   readonly productId: number;
   readonly productName: string;
   readonly productDesc: string;
   readonly imgAddr: string;
   readonly normalPrice: string;
   readonly promotionPrice: string;
   readonly priority: number;
   readonly createTime: number;
   readonly lastEditTime: number;
   readonly enableStatus: number;
   readonly productImgList: ProductImgType.safe_t[];
   readonly productCategory: ProductCategory.safe_t
   readonly shop:ShopType.safe_t;
}
export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.productId = u.productId || 0;
    s.productName = u.productName || '';
    s.productDesc = u.productDesc || '';
    s.imgAddr = u.imgAddr || '';
    s.normalPrice = u.normalPrice || '';
    s.promotionPrice = u.promotionPrice || '';
    s.priority = u.priority || 0;
    s.createTime = u.createTime || 0;
    s.lastEditTime = u.lastEditTime || 0;
    s.enableStatus = u.enableStatus || 0;
    s.productImgList = u.productImgList == null ? [] : u.productImgList.map((item: ProductImgType.t) => { return ProductImgType.from(item) });
    s.productCategory = u.productCategory == null ? ProductCategory.from(<ProductCategory.t>{}) : ProductCategory.from(u.productCategory);
    s.shop = u.shop == null ? ShopType.from(<ShopType.t>{}) : ShopType.from(u.shop);
    return s;
}