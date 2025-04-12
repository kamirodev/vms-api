import { Injectable, NotFoundException } from '@nestjs/common';
import { VmGateway } from '../ws/vm.gateway';
import { CreateVmDto } from 'src/vm/dto/create-vm.dto';
import { UpdateVmDto } from 'src/vm/dto/update-vm.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class VmService {
    private prisma: PrismaClient;

    constructor(private vmGateway: VmGateway) {
        this.prisma = new PrismaClient();
    }

    async create(createVmDto: CreateVmDto, userId: number) {
        const vm = await this.prisma.vm.create({
            data: {
                ...createVmDto,
                user_id: userId,
            },
        });

        // Notify connected clients about the new VM
        this.vmGateway.notifyVmCreated(vm);

        return vm;
    }

    async findAll() {
        return this.prisma.vm.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });
    }

    async findOne(id: number) {
        const vm = await this.prisma.vm.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });

        if (!vm) {
            throw new NotFoundException(`VM with ID ${id} not found`);
        }

        return vm;
    }

    async update(id: number, updateVmDto: UpdateVmDto) {
        // First check if VM exists
        await this.findOne(id);

        const updatedVm = await this.prisma.vm.update({
            where: { id },
            data: updateVmDto,
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                    },
                },
            },
        });

        // Notify connected clients about the VM update
        this.vmGateway.notifyVmUpdated(updatedVm);

        return updatedVm;
    }

    async remove(id: number) {
        // First check if VM exists
        await this.findOne(id);

        const deletedVm = await this.prisma.vm.delete({
            where: { id },
        });

        // Notify connected clients about the VM deletion
        this.vmGateway.notifyVmDeleted(id);

        return deletedVm;
    }
}