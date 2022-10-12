import type { AbstractDto } from '../common/abstract.dto';
import type { AbstractEntity } from '../common/abstract.entity';
import type { Constructor } from '../common/constructor-types';

export function UseDto(
  dtoClass: Constructor<AbstractDto, [AbstractEntity, unknown]>,
): ClassDecorator {
  return (ctor) => {
    ctor.prototype.dtoClass = dtoClass;
  };
}
