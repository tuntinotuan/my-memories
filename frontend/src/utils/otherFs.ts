export function generateId() {
  return Math.floor(Math.random() * 10001);
}
export function replaceAllTrim(str: string, newKey?: string) {
  if (newKey) return str.trim().replace(/\s+/g, newKey).toLowerCase();
  return str.trim().replace(/\s+/g, "-").toLowerCase();
}
export function cutIdFromSlug(str: string, key: string) {
  const getIndex = str.lastIndexOf(key);
  return str.slice(getIndex).replace(/\D/g, "");
}
