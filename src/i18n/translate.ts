export const translate = (str: string, ...rest: string[]): string => {
  try {
    return str.replace(/\$\{(\d+)}/g, (_, index) => rest[parseInt(index) - 1]);
  } catch (e) {
    return "???";
  }
};
