export const loadImageAsFile = async (
  path: string,
  name: string
): Promise<File> => {
  const response = await fetch(path);
  const blob = await response.blob();
  return new File([blob], name, { type: blob.type });
};
