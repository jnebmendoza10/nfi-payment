import { UserRequest, UserResponse } from '../models/base/user';
import { UserRepository } from '../repositories/UserRepository';
import { InsufficientBalanceError } from './errors/InsufficientBalanceError';
import { UserNotFoundError } from './errors/UserNotFoundError';
import { UserService } from './UserService';

export class DefaultUserService implements UserService{

    constructor(private readonly userRepository: UserRepository){}

    async withdraw(id: number, balance: string): Promise<string> {
        const user = await this.userRepository.getUser(id);
        if(user === undefined){
            throw new UserNotFoundError();
        }
        const newBalance = user.balance - Number(balance);

        if (newBalance < 0){
            throw new InsufficientBalanceError();
        }

        await this.userRepository.updateBalance(id, newBalance.toFixed(3))
        
        return newBalance.toFixed(3);
    }

    async deposit(id: number, balance: string): Promise<string> {
        const user = await this.userRepository.getUser(id);
        if(user === undefined){
            throw new UserNotFoundError();
        }
        const newBalance = user.balance + Number(balance);

        await this.userRepository.updateBalance(id, newBalance.toFixed(3))
        
        return newBalance.toFixed(3);
    }

    async register(user: UserRequest): Promise<UserResponse> {
        const id = await this.userRepository.insertUser(user);
        const userResult = await this.userRepository.getUser(id);

        const result : UserResponse = {
            id: id,
            balance: userResult.balance
        }

        return result;
    }  
}