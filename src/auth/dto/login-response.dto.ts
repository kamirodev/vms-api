import { ApiProperty } from '@nestjs/swagger';

export class UserInfo {
    @ApiProperty({ example: 1, description: 'The user ID' })
    id: number;

    @ApiProperty({ example: 'admin@vm.com', description: 'User email' })
    email: string;

    @ApiProperty({ example: 'Administrator', description: 'User role' })
    role: string;
}
export class LoginResponseDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        description: 'JWT access token',
    })
    access_token: string;

    @ApiProperty({
        type: UserInfo,
        description: 'User information',
    })
    user: UserInfo;
}