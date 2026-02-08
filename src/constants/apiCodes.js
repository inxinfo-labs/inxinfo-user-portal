/**
 * Central API response/error codes. Match backend AuthConstants / ApiResponseCodes.
 * Use for consistent error handling and display.
 */
export const ApiCodes = {
  // Success (1xxx)
  SUCCESS: 1000,
  OTP_SENT: 1001,
  PROFILE_FETCHED: 1002,
  PROFILE_UPDATED: 1003,
  PASSWORD_UPDATED: 1004,
  PROFILE_PIC_UPLOADED: 1005,

  // Client/validation (4xxx)
  VALIDATION_ERROR: 4001,
  NOT_FOUND: 4004,
  UNAUTHORIZED: 4010,
  DUPLICATE: 4009,

  // Server (5xxx)
  SERVER_ERROR: 5000,
};

/** User-friendly messages for known error codes */
export const ApiCodeMessages = {
  [ApiCodes.VALIDATION_ERROR]: "Please check your input and try again.",
  [ApiCodes.NOT_FOUND]: "The requested resource was not found.",
  [ApiCodes.UNAUTHORIZED]: "Please sign in again.",
  [ApiCodes.DUPLICATE]: "This value is already in use.",
  [ApiCodes.SERVER_ERROR]: "Something went wrong. Please try again.",
};
