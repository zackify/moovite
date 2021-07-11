export const urlToFilePath = (url: string) => {
  let lastCharacter = url[url.length - 1];
  if (lastCharacter === "/") return `${url}index.tsx`;
  return `${url}.tsx`;
};
