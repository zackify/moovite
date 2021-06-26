export const urlToFilePath = (url: string) => {
  let lastCharacter = url[url.length - 1];
  if (lastCharacter === "/") return `${url}index.tsx`;
  return `${url}.tsx`;
};

export const urlToFileName = (url: string) => {
  let lastCharacter = url[url.length - 1];
  if (lastCharacter === "/") return `${url}index`;
  return `${url}`;
};
