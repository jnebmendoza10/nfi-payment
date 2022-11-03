import { mock, mockClear, mockReset } from 'jest-mock-extended';
import { UserRepository } from '../../src/repositories/UserRepository';
import { DefaultUserService } from '../../src/services/DefaultUserService';
import { InsufficientBalanceError } from '../../src/services/errors/InsufficientBalanceError';
import { UserNotFoundError } from '../../src/services/errors/UserNotFoundError';


describe('DefaultUserService tests', () => {
    const mockUserRepository = mock<UserRepository>();

    let defaultUserService : DefaultUserService;

    beforeEach(() => {
        mockReset(mockUserRepository);
        mockClear(mockUserRepository);


        jest.resetAllMocks();

        defaultUserService = new DefaultUserService(mockUserRepository);
    });

    describe('withdraw () - ', () => {
        it('should successfully withdraw balance given a user id and return the new balance', async () => {
            const id = 1;
            const expectedBalance = "9900.000";
            const balance = "100";
            const mockedUser = {
                id: 1,
                name: 'benj', 
                address: 'Angeles City',
                balance: 10000
            };
            mockUserRepository.getUser.mockResolvedValue(mockedUser);

            const newBalance = await defaultUserService.withdraw(id, balance);

            expect(mockUserRepository.getUser).toBeCalledTimes(1);
            expect(mockUserRepository.getUser).toBeCalledWith(id);
            expect(newBalance).toBe(expectedBalance);
        })

        it('should throw UserNotFoundError if user not found', async () => {
            const id = 55;
            const error = new UserNotFoundError();
            const balance = "100";
            const mockedUser = {
                id: 1,
                name: 'benj', 
                address: 'Angeles City',
                balance: 10000
            };
            mockUserRepository.getUser.mockRejectedValueOnce(error);
           
            await expect( defaultUserService.withdraw(id, balance)).
            rejects.toThrowError(UserNotFoundError);
        })

        it('should throw InsufficientBalanceError if balance is insufficient', async () => {
            const id = 1;
            const balance = "1000000000000";
            const mockedUser = {
                id: 1,
                name: 'benj', 
                address: 'Angeles City',
                balance: 10000
            };
            mockUserRepository.getUser.mockResolvedValue(mockedUser);
           
            await expect( defaultUserService.withdraw(id, balance)).
            rejects.toThrowError(InsufficientBalanceError);
        })
    })

    describe('deposit () - ', () => {
        it('should successfully deposit the balance and return the new balance', async () => {
            const id = 1;
            const balance = "100";
            const expectedBalance = "10100.000";
            const mockedUser = {
                id: 1,
                name: 'benj', 
                address: 'Angeles City',
                balance: 10000
            };
            mockUserRepository.getUser.mockResolvedValue(mockedUser);

            const newBalance = await defaultUserService.deposit(id, balance);
            
            expect(mockUserRepository.getUser).toBeCalledTimes(1);
            expect(mockUserRepository.getUser).toBeCalledWith(id);
            expect(newBalance).toBe(expectedBalance);
        })

        it('should throw UserNotFoundError if user not found', async () => {
            const id = 55;
            const balance = "100";
            const error = new UserNotFoundError();
            const mockedUser = {
                id: 1,
                name: 'benj', 
                address: 'Angeles City',
                balance: 10000
            };
            mockUserRepository.getUser.mockRejectedValueOnce(error);
           
            await expect( defaultUserService.deposit(id, balance)).
            rejects.toThrowError(UserNotFoundError);
        })
    })

    describe('register () - ', () => {
        it('should successfully register the new user and return id and initial balance', async () => {
            const id = 1;
            const balance = '0';
            const mockRequest = {
                name: 'benj',
                address: 'Angeles City'
            }
            const mockedUser = {
                id: 1,
                name: 'benj', 
                address: 'Angeles City',
                balance: 0
            };
            const expectedResponse = {
                id: 1,
                balance: 0
            }
            mockUserRepository.insertUser.mockResolvedValue(id);
            mockUserRepository.getUser.mockResolvedValue(mockedUser);

            const response = await defaultUserService.register(mockRequest);

            expect(mockUserRepository.insertUser).toBeCalledTimes(1);
            expect(mockUserRepository.insertUser).toBeCalledWith(mockRequest);
            expect(mockUserRepository.getUser).toBeCalledTimes(1);
            expect(mockUserRepository.getUser).toBeCalledWith(id);
            expect(response).toEqual(expectedResponse);
        })
    })
});
