/**
 * Gmail-only validation for registration.
 * Allows: user@gmail.com, user.name@gmail.com, user+label@gmail.com
 */
const GMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export function isGmailEmail(email) {
  if (!email || typeof email !== "string") return false;
  return GMAIL_REGEX.test(email.trim());
}

export function getGmailValidationError(email) {
  if (!email || !email.trim()) return "Email is required.";
  if (!isGmailEmail(email)) return "Only Gmail addresses are allowed (e.g. you@gmail.com).";
  return null;
}
