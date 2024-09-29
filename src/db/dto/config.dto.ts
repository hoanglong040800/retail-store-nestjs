import { AdminDivisionDto } from './admin-division.dto';
import { CategoryDto } from './category.dto';

export type ConfigAdminDivision = Omit<
  AdminDivisionDto,
  'parentDivision' | 'areaCode' | 'code'
>;

export class GetGlobalConfigDto {
  categories: CategoryDto[];
  deliveryProvinces: ConfigAdminDivision[];
}
