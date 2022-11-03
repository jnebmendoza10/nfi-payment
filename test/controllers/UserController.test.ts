import { NextFunction, request, Request, response, Response } from "express";
import { mock, mockClear, mockReset } from "jest-mock-extended"
import { UndefinedParameterError } from "../../src/controllers/errors/UndefinedParameterError";
import { UserController } from "../../src/controllers/UserController";
import { UserService } from "../../src/services/UserService";



describe('UserController tests', () => {
   
    const req = {
        body: {},
        params: {}
    } as Request;
    const res = {
        json: {},
        status: {}
    } as Response;
    const next: NextFunction = jest.fn();

    const mockUserService = mock<UserService>();
    let userController : UserController;

    beforeEach(() => {
        mockReset(mockUserService);
        mockClear(mockUserService);

        mockReset(next);
        mockClear(next);

        jest.resetAllMocks();
        
        userController = new UserController(mockUserService);
    })

    describe('registerAccount () - ', () => {
        it('should successfully register an account', async () => {
        
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            req.body = {
                name: 'benj', 
                address: 'Angeles City',
            }
            const {name, address} = req.body;
            const dummyResponse = {
                id: 1,
                balance: 0
            };
            mockUserService.register.mockResolvedValue(dummyResponse);

            await userController.registerAccount(req, res, next)

            expect(next).toBeCalledTimes(0);
            expect(mockUserService.register).toBeCalledTimes(1);
            expect(mockUserService.register).toBeCalledWith(req.body);
            expect(res.status).toBeCalledTimes(1);
            expect(res.status).toBeCalledWith(201);
            expect(res.json).toBeCalledTimes(1);
            expect(res.json).toBeCalledWith(dummyResponse)
        })

        it('should call next function if the system failed to create a user', async () => {
            req.body = {name: 'idk'};
            const error = new Error();

            mockUserService.register.mockRejectedValueOnce(error);
            
            await userController.registerAccount(req, res, next);
           
           expect(mockUserService.register).toBeCalledTimes(1);
           expect(mockUserService.register).toBeCalledWith(req.body);
           expect(next).toBeCalledTimes(1);
           expect(next).toBeCalledWith(error);
        })
    })

    describe('withdrawBalance () - ', () => {
        it('should successfully withdraw balance', async () => {

            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            req.params = {
                userId: '1'
            };
            req.body = {
                balance: '100'
            }
            mockUserService.withdraw.mockResolvedValue('0');

            await userController.withdrawBalance(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockUserService.withdraw).toBeCalledTimes(1);
           expect(mockUserService.withdraw).toBeCalledWith(Number(req.params.userId), req.body.balance);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith({ newbalance: '0' });
        })

        it('should call the next function if user has insufficient balance', async () => {
            const error = new Error();

            mockUserService.withdraw.mockRejectedValueOnce(error);

            await userController.withdrawBalance(req, res, next);

            expect(mockUserService.withdraw).toBeCalledTimes(1);
            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(error);
        })

        it('should throw an error if the userId input is empty or invalid', async () => {
            req.params = {
                userId: undefined
            }
            
            await userController.withdrawBalance(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new UndefinedParameterError());
        })
    })

    describe('depositBalance() - ', () => {
        it('should successfully deposit the new balance', async () => {
            res.status = jest.fn().mockReturnThis();
            res.json = jest.fn();
            req.params = {
                userId: '1'
            };
            req.body = {
                balance: '100'
            }
            mockUserService.deposit.mockResolvedValue(req.body.balance);

            await userController.depositBalance(req, res, next);

           expect(next).toBeCalledTimes(0);
           expect(mockUserService.deposit).toBeCalledTimes(1);
           expect(mockUserService.deposit).toBeCalledWith(Number(req.params.userId), req.body.balance);
           expect(res.status).toBeCalledTimes(1);
           expect(res.status).toBeCalledWith(200);
           expect(res.json).toBeCalledTimes(1);
           expect(res.json).toBeCalledWith({ newbalance: '100' });
            
        })

        it('should throw an error if the userId input is empty or invalid', async () => {
            req.params = {
                userId: undefined
            }
            
            await userController.depositBalance(req, res, next);

            expect(next).toBeCalledTimes(1);
            expect(next).toBeCalledWith(new UndefinedParameterError());
        })
    })
})