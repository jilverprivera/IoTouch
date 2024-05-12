export function convertToCamelCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertToCamelCase(item));
  }

  return Object.keys(obj).reduce((acc: any, key: string) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    const value = obj[key];
    acc[camelCaseKey] = convertToCamelCase(value);
    return acc;
  }, {});
}
