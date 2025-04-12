import { Module } from '@nestjs/common';
import { VmGateway } from './vm.gateway';

@Module({
    providers: [VmGateway],
    exports: [VmGateway],
})
export class WsModule { }