import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVmDto {
    @ApiProperty({
        example: 'Web Server',
        description: 'Name of the virtual machine',
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 4,
        description: 'Number of CPU cores',
    })
    @IsNumber()
    @IsNotEmpty()
    cores: number;

    @ApiProperty({
        example: 8,
        description: 'RAM in GB',
    })
    @IsNumber()
    @IsNotEmpty()
    ram: number;

    @ApiProperty({
        example: 500,
        description: 'Disk space in GB',
    })
    @IsNumber()
    @IsNotEmpty()
    disk: number;

    @ApiProperty({
        example: 'Ubuntu 20.04 LTS',
        description: 'Operating System',
    })
    @IsString()
    @IsNotEmpty()
    os: string;

    @ApiProperty({
        example: 'running',
        description: 'Current status of the VM (running, stopped, etc.)',
    })
    @IsString()
    @IsNotEmpty()
    status: string;
}