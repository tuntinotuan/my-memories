export function generateId() {
  return Math.floor(Math.random() * 10001);
}
export function replaceAllTrim(str: string, newKey?: string) {
  if (newKey)
    return str.trim().replace(/\s+/g, newKey).replace(",", "").toLowerCase();
  return str.trim().replace(/\s+/g, "-").replace(",", "").toLowerCase();
}
export function cutIdFromSlug(str: string, key: string) {
  const getIndex = str.lastIndexOf(key);
  return str.slice(getIndex).replace(/\D/g, "");
}
export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function convertSlug(str: string) {
  const textId = str.slice(str.lastIndexOf("id"));
  const removeId = str.replaceAll("-", " ").replace(textId, "");
  return capitalizeFirstLetter(removeId);
}
