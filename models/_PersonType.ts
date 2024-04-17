export interface nonnull_t{
    userId: number,
    name: string,
    profileImg: string,
    email: string,
    gender: string,
    enableStatus: boolean ,
    userType: number,
    createTime: number,
    lastEditTime: number
}

export interface t{
    userId?: number,
    name?: string,
    profileImg?: string,
    email?: string,
    gender?: string,
    enableStatus?: boolean ,
    userType?: number,
    createTime?: number,
    lastEditTime?: number
}

export interface safe_t{
   readonly userId: number,
   readonly name: string,
   readonly profileImg: string,
   readonly email: string,
   readonly gender: string,
   readonly enableStatus: boolean ,
   readonly userType: number,
   readonly createTime: number,
   readonly lastEditTime: number
}

export function from(m: t): safe_t{
    const u = m == null ? ({} as t) : m;
    const s = {} as nonnull_t
    s.userId = u.userId || 0;
    s.name = u.name || '';
    s.profileImg = u.profileImg || '';
    s.email = u.email || '';
    s.gender = u.gender || '';
    s.enableStatus = u.enableStatus || false;
    s.userType = u.userType || 0;
    s.createTime = u.createTime || 0;
    s.lastEditTime = u.lastEditTime || 0;
    return s;
}