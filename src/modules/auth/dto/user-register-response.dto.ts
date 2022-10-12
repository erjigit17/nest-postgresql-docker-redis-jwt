import { ApiProperty } from '@nestjs/swagger';

import { Uuid } from '../../../types-interfaces';

export class UserRegisterResponseDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJmOWMxOWNjNC02M2EwLTQ3NzAtYTZiNy1mZjBjMzdlZmJkYzkiLCJyb2xlIjoiVVNFUiIsInR5cGUiOiJBQ0NFU1NfVE9LRU4iLCJpYXQiOjE2NjU1Njk2MzcsImV4cCI6MTY2NTkyOTYzN30.SZLp7ZJ6Y1rPF1DdDK4-3xzbWzHC_kC07w_Q2qN3iU4',
  })
  AccessToken: string;

  @ApiProperty({ example: '9c19cc4-63a0-4770-a6b7-ff0c37efbdc9' })
  guid: Uuid;
}
