export interface JwtPayload {
    sub: string; // This will represent the user ID
    email: string; // This will be the user's email (or any other unique identifier)
    roles: string[]; // The roles associated with the user (e.g., ['ADMIN', 'MANAGER'])
  }
  