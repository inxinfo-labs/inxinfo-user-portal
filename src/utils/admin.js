/**
 * Whether the user has admin role. Backend may send role === 'ADMIN' or isAdmin === true.
 */
export function isAdmin(user) {
  if (!user) return false;
  return user.role === "ADMIN" || user.isAdmin === true;
}
