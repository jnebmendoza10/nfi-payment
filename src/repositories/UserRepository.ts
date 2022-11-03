import { User, UserRequest } from '../models/base/user';


export interface UserRepository {
    getUser(id: number): Promise<User>;
    insertUser(user: UserRequest): Promise<number>;
    updateBalance(id: number, newBalance: string): Promise<void>;
}