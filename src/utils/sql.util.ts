import { EBase } from '@/db/entities';
import { Repository } from 'typeorm';

export const mapRawResultToOneEntity = <TEntity extends EBase>(
  repo: Repository<TEntity>,
  rawResults: object[],
  alias?: string,
): TEntity[] => {
  if (!repo || !rawResults?.length) {
    return [];
  }

  const columnsMap = new Map<string, string>(
    repo.metadata.columns.map((c) => [c.databaseName, c.propertyName]),
  );

  if (!columnsMap) {
    return [];
  }

  const entities = rawResults.map((raw) => {
    const obj = repo.create();

    for (const [key, value] of Object.entries(raw)) {
      const newKey = getNewKey(key, columnsMap, alias);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (obj as any)[newKey] = value;
    }

    return obj;
  });

  return entities;
};

const getNewKey = (
  key: string,
  columnsMap: Map<string, string>,
  alias?: string,
): string => {
  // Ex: p_name should be name
  const charNeedToSlice = alias ? alias.length + 1 : 0;

  let formattedKey = key;

  if (key.startsWith(`${alias}_`) && charNeedToSlice) {
    formattedKey = key.slice(charNeedToSlice);
  }

  const propertyName = columnsMap.get(formattedKey);
  const newKey: string = propertyName || key;

  return newKey;
};
