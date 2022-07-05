import api from '../../../pages/api';
import { IFindByDate } from './dtos/requests/findByDate.request';
import { IFindByDateDTO } from './dtos/responses/findByDate.response';

export class CasesServices {
  static async findByDate({ date, method }: IFindByDate) {
    if (method === 'partial') 
      return api.from<IFindByDateDTO>('cases').select('*').eq('date', date);
    return api.from<IFindByDateDTO>('cases').select('*').lte('date', date);
  }
}
