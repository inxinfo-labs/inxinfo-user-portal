/**
 * Central API response/error codes. Aligns with backend ErrorCodes (DOMAIN_HTTP_SEQUENCE).
 * Supports both legacy numeric codes and new string error codes for consistent error handling.
 */
export const ApiCodes = {
  // Legacy numeric (still supported)
  SUCCESS: 1000,
  OTP_SENT: 1001,
  PROFILE_FETCHED: 1002,
  PROFILE_UPDATED: 1003,
  PASSWORD_UPDATED: 1004,
  PROFILE_PIC_UPLOADED: 1005,
  VALIDATION_ERROR: 4001,
  NOT_FOUND: 4004,
  UNAUTHORIZED: 4010,
  DUPLICATE: 4009,
  SERVER_ERROR: 5000,
};

/** User-friendly messages for legacy numeric codes */
const NumericCodeMessages = {
  [ApiCodes.VALIDATION_ERROR]: "Please check your input and try again.",
  [ApiCodes.NOT_FOUND]: "The requested resource was not found.",
  [ApiCodes.UNAUTHORIZED]: "Invalid email/username or password.",
  [ApiCodes.DUPLICATE]: "This value is already in use.",
  [ApiCodes.SERVER_ERROR]: "Something went wrong. Please try again.",
};

/** User-friendly messages for backend string error codes (ErrorCodes enum) */
export const ErrorCodeMessages = {
  AUTH_400_001: "Please check your input and try again.",
  AUTH_400_002: "Only Gmail addresses are allowed for registration.",
  AUTH_400_003: "Only Gmail addresses are allowed for password reset.",
  AUTH_400_004: "Email or phone is required.",
  AUTH_400_005: "Email/phone and OTP are required.",
  AUTH_400_006: "OTP not found or expired. Please request a new one.",
  AUTH_400_007: "OTP expired. Please request a new one.",
  AUTH_400_008: "Invalid OTP.",
  AUTH_400_009: "Invalid token or password (min 6 characters).",
  AUTH_400_010: "Invalid or expired reset link. Please request a new one.",
  AUTH_401_001: "Invalid email/phone or password.",
  AUTH_401_002: "Account is disabled.",
  AUTH_401_003: "No account found with this email or phone number.",
  AUTH_401_004: "User not found.",
  AUTH_403_001: "Access denied.",
  AUTH_429_001: "Too many requests. Please try again later.",
  AUTH_409_001: "Email already registered.",
  AUTH_409_002: "Mobile number already registered.",
  USER_400_001: "Please check your input.",
  USER_400_002: "Old password is incorrect.",
  USER_400_003: "File is empty.",
  USER_400_004: "Only JPG/PNG images are allowed.",
  USER_404_001: "User not found.",
  USER_404_002: "User not found.",
  USER_500_001: "Upload failed. Please try again.",
  CONTACT_503_001: "Failed to send message. Please try again later.",
  SYS_400_001: "Bad request.",
  SYS_404_001: "Resource not found.",
  SYS_500_001: "Something went wrong. Please try again or contact support.",
  SYS_500_002: "Failed to send email.",
};

/** Combined map for getApiErrorMessage: supports both numeric and string codes */
export const ApiCodeMessages = {
  ...NumericCodeMessages,
  ...ErrorCodeMessages,
};
