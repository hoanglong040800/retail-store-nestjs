import { GetSearchQuery } from '@/db/input';
import { ApiQueryOptions } from '@nestjs/swagger';

const searchQueryExamples: Record<string, { value: string }> = {
  'Normal Text': {
    value: 'thịt bò',
  },

  'Case sensitive': {
    value: 'THỊT bò',
  },

  'Without accents': {
    value: 'thit bo',
  },

  'With space': {
    value: '  thịt bò ',
  },
};

// TODO update swagger
export const getSearchQueryOptions: ApiQueryOptions = {
  name: 'searchText',
  type: GetSearchQuery,
  examples: searchQueryExamples,
};
