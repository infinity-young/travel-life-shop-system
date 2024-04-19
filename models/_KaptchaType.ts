
export interface nonnull_t{
    kaptchaCode: string;
    url: string;
}
export interface t{
    kaptchaCode?: string;
    url?: string;
}
export interface safe_t{
   readonly kaptchaCode: string;
   readonly url: string;
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t;
    s.kaptchaCode = u.kaptchaCode || '';
    s.url = u.url || '';
    return s;
}