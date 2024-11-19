export const keyBy = (array: any[], key: string): Record<string, any> =>
  (array || []).reduce((r, x) => ({ ...r, [key ? x[key] : x]: x }), {});

export const castArray = (data = []) => (Array.isArray(data) ? data : [data]);
