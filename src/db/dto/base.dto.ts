import { Expose } from 'class-transformer';
import { IBase } from '../interface';

@Expose()
export abstract class BaseDto implements IBase {
  id: string;
}
