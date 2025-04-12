import { Module } from '@nestjs/common';
import { VmService } from './vm.service';
import { VmController } from './vm.controller';
import { WsModule } from '../ws/ws.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [WsModule, PrismaModule],
  controllers: [VmController],
  providers: [VmService],
})
export class VmModule {}