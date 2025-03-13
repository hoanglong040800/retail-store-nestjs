import { ECategory, EProduct } from '@/db/entities';

export type TopCategory = Pick<ECategory, 'id' | 'name'> & {
  totalSold: string;
};

export type TopProductsByCate = { [key: string]: EProduct[] };
