import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { Route } from "./Route";



export class DefaultUserRouter implements Route {
    router = Router();

    constructor(private readonly userController: UserController){
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.route('/user/register').post(this.userController.registerAccount);
        this.router.route('/user/withdraw/:userId').patch(this.userController.withdrawBalance)
        this.router.route('/user/deposit/:userId').patch(this.userController.depositBalance)
    }
}