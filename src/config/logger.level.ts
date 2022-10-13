import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'warn',
}));
