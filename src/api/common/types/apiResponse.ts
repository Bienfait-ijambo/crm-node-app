type PaginationConfig={
    count:number;
    totalPages:number;
  }
  
  export type ApiResponse<K extends string,T>=Record<K,T> & PaginationConfig
  
  