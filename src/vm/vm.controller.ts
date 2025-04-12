import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    UseGuards,
    Request,
} from '@nestjs/common';
import { VmService } from './vm.service';
import { CreateVmDto } from './dto/create-vm.dto';
import { UpdateVmDto } from './dto/update-vm.dto';
import { Roles } from '../auth/roles.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('VM')
@ApiBearerAuth()
@Controller('vms')
export class VmController {
    constructor(private readonly vmService: VmService) { }

    @Post()
    @Roles('Administrator')
    @ApiOperation({ summary: 'Create a new VM (Admin only)' })
    @ApiResponse({ status: 201, description: 'VM created successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Only Administrators can create VMs' })
    create(@Body() createVmDto: CreateVmDto, @Request() req) {
        return this.vmService.create(createVmDto, req.user.id);
    }

    @Get()
    @ApiOperation({ summary: 'Get all VMs (Admin and Client)' })
    @ApiResponse({ status: 200, description: 'Return all VMs' })
    findAll() {
        return this.vmService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get VM by ID (Admin and Client)' })
    @ApiResponse({ status: 200, description: 'Return the VM' })
    @ApiResponse({ status: 404, description: 'VM not found' })
    findOne(@Param('id') id: string) {
        return this.vmService.findOne(+id);
    }

    @Put(':id')
    @Roles('Administrator')
    @ApiOperation({ summary: 'Update a VM (Admin only)' })
    @ApiResponse({ status: 200, description: 'VM updated successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Only Administrators can update VMs' })
    @ApiResponse({ status: 404, description: 'VM not found' })
    update(@Param('id') id: string, @Body() updateVmDto: UpdateVmDto) {
        return this.vmService.update(+id, updateVmDto);
    }

    @Delete(':id')
    @Roles('Administrator')
    @ApiOperation({ summary: 'Delete a VM (Admin only)' })
    @ApiResponse({ status: 200, description: 'VM deleted successfully' })
    @ApiResponse({ status: 403, description: 'Forbidden - Only Administrators can delete VMs' })
    @ApiResponse({ status: 404, description: 'VM not found' })
    remove(@Param('id') id: string) {
        return this.vmService.remove(+id);
    }
}