import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDriverDto {

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  license: string;

  @IsString()
  @IsNotEmpty()
  phone: string;
}