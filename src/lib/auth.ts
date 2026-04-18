export function isAdminAuthenticated(token: string | undefined): boolean {
  if (!token) return false;
  const adminPassword = process.env.ADMIN_PASSWORD || "bareface2024";
  return token === adminPassword;
}

export function hashPassword(password: string): string {
  // Simple hash for demo - in production use bcrypt
  return Buffer.from(password).toString("base64");
}
