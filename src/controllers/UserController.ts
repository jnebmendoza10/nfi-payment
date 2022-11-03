import { UserService } from '../services/UserService';
import { NextFunction, Request, Response } from "express";
import { UserRequest } from '../models/base/user';
import { UndefinedParameterError } from './errors/UndefinedParameterError';


export class UserController {

    constructor(private readonly userService: UserService){}

    registerAccount = async (request: Request, response: Response, next: NextFunction ): Promise<void> => {
        try {
            const userRequest : UserRequest = {
                name: request.body.name,
                address: request.body.address
            }
            const result = await this.userService.register(userRequest);
            response.status(201).json(result);
        } catch (error) {
            next(error);
        }
    }

    withdrawBalance = async (request: Request, response: Response, next: NextFunction ): Promise<void> => {
        try {
            const { userId } = request.params;
            if (userId === undefined) {
                throw new UndefinedParameterError();
            }
            const result = await this.userService.withdraw(Number(userId), request.body.balance);
            response.status(200).json({ newbalance: result });
        } catch (error) {
            next(error);
        }
    }

    depositBalance = async (request: Request, response: Response, next: NextFunction ): Promise<void> => {
        try {
            const { userId } = request.params;
            if (userId === undefined) {
                throw new UndefinedParameterError();
            }
            const result = await this.userService.deposit(Number(userId), request.body.balance);
            response.status(200).json({ newbalance: result });
        } catch (error) {
            next(error);
        }
    }
}