export type Maybe<T> = T | undefined | null;


export type BrandType<TValue,TName>=TValue&{__brandName:TName}