import express from 'express';
import { errorHandler } from '../middleware/errorHandler';
import sequelize from '../utils/connection';
import { Router } from 'express';
import hpp from 'hpp';
import helmet from 'helmet';

export class Application {
    app: express.Application = express();

    constructor(route: Router) {
        this.appConfig(route);
        this.routeConfig();
    }

    
    private routeConfig() {
        this.app.use(errorHandler)
    }

    private appConfig(route: Router) {
        this.app.use(express.json({ limit: '5kb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '5kb' }));
        this.app.use(hpp({ checkBody: true, checkBodyOnlyForContentType: 'urlencoded', checkQuery: true }));
        this.app.use(helmet());
        this.app.use('/api/v1', route);
    }

    initializePort(port: number): void {
        this.app.listen(port, async () => {
            await sequelize.sync();
            console.log(`Listening on port ${port}`);
        });
    }
} 