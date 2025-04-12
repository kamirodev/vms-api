
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('Starting seed...');

    // Clear existing data
    console.log('Clearing database...');
    await prisma.vm.deleteMany();
    await prisma.user.deleteMany();
    await prisma.role.deleteMany();
    console.log('Database cleared successfully!');

    // Seed roles
    console.log('Seeding roles...');
    const roles = [
        { id: 1, name: 'Administrator' },
        { id: 2, name: 'Client' },
    ];

    for (const role of roles) {
        await prisma.role.create({
            data: role,
        });
    }
    console.log(`${roles.length} roles created!`);

    // Seed users
    console.log('Seeding users...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminPassword = await bcrypt.hash('Ale123.', 10);

    const users = [
        { email: 'kamirodev.co@gmail.com', password: adminPassword, role_id: 1 }, // Usuario admin específico
        { email: 'admin@example.com', password: hashedPassword, role_id: 1 },
        { email: 'client1@example.com', password: hashedPassword, role_id: 2 },
        { email: 'client2@example.com', password: hashedPassword, role_id: 2 },
        { email: 'tech.admin@example.com', password: hashedPassword, role_id: 1 },
        { email: 'support@example.com', password: hashedPassword, role_id: 2 },
    ];

    for (const user of users) {
        await prisma.user.create({
            data: user,
        });
    }
    console.log(`${users.length} users created!`);

    // Seed VMs
    console.log('Seeding VMs...');
    const operatingSystems = [
        'Ubuntu 20.04 LTS',
        'Windows Server 2019',
        'CentOS 8',
        'Debian 11',
        'Red Hat Enterprise Linux 8',
        'Windows 10 Pro',
        'macOS Big Sur',
    ];

    const statuses = ['running', 'stopped', 'paused', 'error', 'provisioning'];
    const vms: {
        name: string;
        cores: number;
        ram: number;
        disk: number;
        os: string;
        status: string;
        user_id: number;
    }[] = [];

    // Create 10 random VMs
    for (let i = 1; i <= 10; i++) {
        const randomOS = operatingSystems[Math.floor(Math.random() * operatingSystems.length)];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

        // Assign to random user (client1, client2, or support)
        const userIdPool = [2, 3, 5]; // User IDs for clients
        const randomUserId = userIdPool[Math.floor(Math.random() * userIdPool.length)];

        vms.push({
            name: `VM-${i}`,
            cores: Math.floor(Math.random() * 8) + 1, // 1-8 cores
            ram: (Math.floor(Math.random() * 16) + 1) * 2, // 2-32 GB in 2GB increments
            disk: (Math.floor(Math.random() * 10) + 1) * 50, // 50-500 GB in 50GB increments
            os: randomOS,
            status: randomStatus,
            user_id: randomUserId,
        });
    }

    // Create each VM
    for (const vm of vms) {
        await prisma.vm.create({
            data: vm,
        });
    }
    console.log(`${vms.length} VMs created!`);

    console.log('Seed completed successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });