export const translate = (str: string, ...rest: string[]): string => {
  return str.replace(/\$\{(\d+)}/g, (_, index) => rest[parseInt(index) - 1]);
};
