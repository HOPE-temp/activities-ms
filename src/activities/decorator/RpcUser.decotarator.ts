import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RpcUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    // Obtenemos el user inyectado por el guard
    const contextAsAny = ctx as any;
    return contextAsAny.user;
  },
);
