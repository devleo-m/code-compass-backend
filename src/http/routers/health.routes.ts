import { Router } from 'express'
import { HealthController } from '../controllers'

const healthRoutes = Router()

// GET /health - Health check básico
healthRoutes.get('/health', HealthController.check)

// GET /health/detailed - Health check detalhado
// healthRoutes.get('/detailed', HealthController.detailed);

// GET /health/ready - Readiness probe
// healthRoutes.get('/ready', HealthController.ready);

// GET /health/live - Liveness probe
// healthRoutes.get('/live', HealthController.live);

export { healthRoutes }
