/**
 * Utility functions for JWT token handling
 */

export interface DecodedToken {
  userId: string;
  role: string;
  iat?: number;
  exp?: number;
}

/**
 * Decode JWT token and extract user information
 * @param token - JWT token string
 * @returns Decoded token payload or null if invalid
 */
export const decodeToken = (token: string): DecodedToken | null => {
  try {
    // JWT tokens have 3 parts separated by dots
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload));
    
    return decoded as DecodedToken;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Check if token is expired
 * @param token - JWT token string
 * @returns true if token is expired, false otherwise
 */
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token);
  if (!decoded || !decoded.exp) {
    return true;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  return decoded.exp < currentTime;
};

/**
 * Get user ID from token
 * @param token - JWT token string
 * @returns user ID or null if token is invalid/expired
 */
export const getUserIdFromToken = (token: string): string | null => {
  if (isTokenExpired(token)) {
    return null;
  }

  const decoded = decodeToken(token);
  return decoded?.userId || null;
};
