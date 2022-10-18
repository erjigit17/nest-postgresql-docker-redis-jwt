import { registerAs } from '@nestjs/config';

export default registerAs('typeorm-logger', () => ({
  level: ['production', 'test'].includes(process.env.NODE_ENV || 'development')
    ? ['error']
    : ['query', 'error'],
}));
