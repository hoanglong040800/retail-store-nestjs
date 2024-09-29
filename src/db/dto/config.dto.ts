import { AdminDivisionDto } from './admin-division.dto';
import { CategoryDto } from './category.dto';

export type ConfigAdminDivision = Omit<AdminDivisionDto, 'parentDivision'>;

export class GetGlobalConfigDto {
  categories: CategoryDto[];
  // deliveryProvinces: ConfigAdminDivision[];
}
