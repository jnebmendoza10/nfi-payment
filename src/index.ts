import { Application } from './application/Application';
import { UserController } from './controllers/UserController';
import { SqlUserRepository } from './repositories/SqlUserRepository';
import { DefaultUserRouter } from './routes/DefaultUserRoute';
import { DefaultUserService } from './services/DefaultUserService';

const userRepository = new SqlUserRepository();
const userService = new DefaultUserService(userRepository);
const userController = new UserController(userService);
const userRoute = new DefaultUserRouter(userController).router;



const application: Application = new Application(userRoute);
application.initializePort(4444);
