
export interface nonnull_t{
    vuekaptchaCode: string;
    vuekaptchaImg: string;
}
export interface t{
    vuekaptchaCode?: string;
    vuekaptchaImg?: string;
}
export interface safe_t{
   readonly vuekaptchaCode: string;
   readonly vuekaptchaImg: string;
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.vuekaptchaCode = u.vuekaptchaCode || '';
    s.vuekaptchaImg = u.vuekaptchaImg || '';
    return s;
}