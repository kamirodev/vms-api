import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        example: 'user@example.com',
        description: 'User email address',
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        example: 'StrongP@ssw0rd',
        description: 'User password (min 6 characters)',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: 2,
        description: 'Role ID (1 for Admin, 2 for Client)',
    })
    @IsNumber()
    @IsNotEmpty()
    role_id: number;
}