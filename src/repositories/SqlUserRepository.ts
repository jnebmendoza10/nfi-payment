import { User, UserRequest } from '../models/base/user';
import { UserRepository } from './UserRepository';
import { UserModel } from '../models/sequelize/user.sequelize';

export class SqlUserRepository implements UserRepository{


    async getUser(id: number): Promise<User> {
        const user = await UserModel.findOne({ where: { id: id } });
        const mappedUser : User = {
            id: user!.id,
            name: user!.name,
            address: user!.address,
            balance: user!.balance
        };

        return mappedUser;
    }
    async insertUser(user: UserRequest): Promise<number> {
        const result = await UserModel.create(user);

        return result.id;
    }
    async updateBalance(id: number, newBalance: string): Promise<void> {
        await UserModel.update({ balance: Number(newBalance) }, {where: { id: id } });
    }
}
