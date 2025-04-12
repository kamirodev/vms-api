import { SetMetadata, applyDecorators } from '@nestjs/common';
import { ApiUnauthorizedResponse, ApiForbiddenResponse } from '@nestjs/swagger';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) =>
    applyDecorators(
        SetMetadata(ROLES_KEY, roles),
        ApiUnauthorizedResponse({ description: 'Unauthorized - Invalid token or no token provided' }),
        ApiForbiddenResponse({ description: 'Forbidden - User does not have required role' })
    );