import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class VmGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    private logger = new Logger('VmGateway');

    handleConnection(client: any, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: any) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    // Method to emit VM changes to all connected clients
    notifyVmCreated(vm: any) {
        this.server.emit('vm:created', vm);
    }

    notifyVmUpdated(vm: any) {
        this.server.emit('vm:updated', vm);
    }

    notifyVmDeleted(vmId: number) {
        this.server.emit('vm:deleted', { id: vmId });
    }
}