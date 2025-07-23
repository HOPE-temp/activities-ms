import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtRpcAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();

    const token = data?.token;
    if (!token) return false;

    try {
      const user = jwt.verify(token, 'tu_secreto_jwt');
      // Aquí podemos "inyectar" el user en el contexto para el handler
      // Aprovecharemos la propiedad 'getContext' para pasar datos
      // Pero como no hay objeto Request, usaremos metadata custom en el contexto

      // Guardamos user en context para recuperarlo luego
      (context as any).user = user; // no es oficial pero sirve para este caso
      return true;
    } catch {
      return false;
    }
  }
}
