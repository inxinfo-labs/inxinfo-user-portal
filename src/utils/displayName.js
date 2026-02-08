/**
 * Get display name for the current user: FirstName (or FirstName LastName), never show full email.
 * Supports camelCase (firstName, lastName) and snake_case (first_name, last_name) from API.
 * If no name is set, uses username or the part of email before @ (e.g. testtest1 from testtest1@gmail.com).
 */
export function getDisplayName(user) {
  if (!user) return "Username";
  const first = user.firstName ?? user.first_name;
  const last = user.lastName ?? user.last_name;
  const firstLast = [first, last].filter(Boolean).join(" ").trim();
  if (firstLast) return firstLast;
  if (user.name) return user.name;
  if (user.username) return user.username;
  const email = user.email;
  if (email && typeof email === "string") {
    const local = email.split("@")[0]?.trim();
    if (local) return local;
  }
  return "Username";
}

/**
 * For navbar/header: show only actual name (first + last or name). Never show email.
 */
export function getDisplayNameForNav(user) {
  if (!user) return "My Account";
  const first = user.firstName ?? user.first_name;
  const last = user.lastName ?? user.last_name;
  const firstLast = [first, last].filter(Boolean).join(" ").trim();
  if (firstLast) return firstLast;
  if (user.name) return user.name;
  return "My Account";
}

/**
 * For dashboard welcome: show name, then username. Never show email.
 */
export function getDisplayNameForDashboard(user) {
  if (!user) return "Member";
  const first = user.firstName ?? user.first_name;
  const last = user.lastName ?? user.last_name;
  const firstLast = [first, last].filter(Boolean).join(" ").trim();
  if (firstLast) return firstLast;
  if (user.name) return user.name;
  if (user.username) return user.username;
  return "Member";
}
