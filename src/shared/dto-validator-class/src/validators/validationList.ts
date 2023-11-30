export enum ValidationList{
    EMAIL='IsEmail',
    BOOL='IsBoolean',
    NUMBER='IsNumber',
    DATE='IsDate',
    REQUIRED='Required', 
    LENGTH='Length',
}

export type ValidationListType= keyof typeof ValidationList
