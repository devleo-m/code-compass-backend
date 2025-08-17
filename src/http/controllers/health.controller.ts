import type { Request, Response, NextFunction } from 'express';
import { successResponse } from '../../utils/response';
import dayjs from 'dayjs';

export class HealthController {
  // Health check básico
  static check(_req: Request, res: Response, next: NextFunction) {
    try {
        successResponse(res, 'Servidor funcionando', {
            status: 'healthy',
            uptime: process.uptime(),
            timestamp: dayjs().format('YYYY-MM-DD HH:mm'),
        })
    } catch (error) {
        next(error)
    }
  }

  // Health check detalhado
//   static detailed(req: Request, res: Response): void {
//     const memoryUsage = process.memoryUsage();

//     successResponse(res, 'Health check detalhado', {
//       status: 'healthy',
//       uptime: process.uptime(),
//       environment: process.env.NODE_ENV || 'development',
//       version: '1.0.0',
//       memory: {
//         used: Math.round((memoryUsage.heapUsed / 1024 / 1024) * 100) / 100,
//         total: Math.round((memoryUsage.heapTotal / 1024 / 1024) * 100) / 100,
//         external: Math.round((memoryUsage.external / 1024 / 1024) * 100) / 100,
//         rss: Math.round((memoryUsage.rss / 1024 / 1024) * 100) / 100,
//       },
//       cpu: {
//         usage: process.cpuUsage(),
//       },
//       platform: process.platform,
//       nodeVersion: process.version,
//     });
//   }

  // Readiness probe (para Kubernetes/Docker)
//   static ready(req: Request, res: Response): void {
//     // Aqui você pode adicionar verificações de dependências
//     // Por exemplo: banco de dados, Redis, etc.
    
//     successResponse(res, 'Aplicação pronta para receber tráfego', {
//       status: 'ready',
//       checks: {
//         database: 'ok', // Futuramente conectar ao banco
//         redis: 'ok',     // Futuramente conectar ao Redis
//         filesystem: 'ok',
//       },
//     });
//   }

  // Liveness probe (para Kubernetes/Docker)
//   static live(req: Request, res: Response): void {
//     successResponse(res, 'Aplicação está viva', {
//       status: 'alive',
//       uptime: process.uptime(),
//     });
//   }
}
