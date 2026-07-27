import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // إذا ما كانتش الأدوار محددة فوق الـ Endpoint، يُسمح بالمرور
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    // إذا كان المستخدم غير موجود أو ما عندوش Role
    if (!user || !user.role) {
      return false;
    }

    // التحقق هل دور المستخدم يوجد ضمن الأدوار المسموح لها
    return requiredRoles.includes(user.role);
  }
}