import { registerAs } from '@nestjs/config';

export default registerAs('logger', () => ({
  level: ['production', 'test'].includes(process.env.NODE_ENV || 'development')
    ? 'warn'
    : 'debug',
}));
