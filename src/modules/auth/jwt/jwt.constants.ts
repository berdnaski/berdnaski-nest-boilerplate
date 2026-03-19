export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'default_secret',
  expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600', 10),
};
