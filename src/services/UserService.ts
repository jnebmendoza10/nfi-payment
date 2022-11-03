import { UserRequest, UserResponse } from '../models/base/user';


export interface UserService {
    withdraw(id: number, balance: string): Promise<string>;
    deposit(id: number, balance: string): Promise<string>;
    register(user: UserRequest): Promise<UserResponse>;
}