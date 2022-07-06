export interface IFindByDate {
  date: string;
  method: MethodType;
}

export type MethodType = 'partial' | 'total';
