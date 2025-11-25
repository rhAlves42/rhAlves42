/**
 * Checks if a given string path exists in an object.
 * Supports dot notation (e.g., "a.b.c").
 *
 * @param obj - The object to check.
 * @param path - The string path (dot notation).
 * @returns True if the path exists, false otherwise.
 */
export default function hasPath(obj: any, path: string): boolean {
  if (!obj || typeof path !== "string") return false;
  if (typeof obj !== "object") {
    console.log("Invalid object provided to hasPath:", obj, path);
    return false;
  }
  return (
    path.split(".").reduce((acc, key) => {
      if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
        return acc[key];
      }
      return undefined;
    }, obj) !== undefined
  );
}
