import { Request, Response, NextFunction } from 'express';
import { UndefinedParameterError } from '../controllers/errors/UndefinedParameterError';
import { InsufficientBalanceError } from '../services/errors/InsufficientBalanceError';
import { UserNotFoundError } from '../services/errors/UserNotFoundError';


export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    if (error instanceof UndefinedParameterError || InsufficientBalanceError) {
        res.status(400).json({
            title: error.name,
            message: error.message,
        });
    } else if (error instanceof UserNotFoundError) {
        res.status(404).json({
            title: error.name,
            message: error.message,
        });
    }
}