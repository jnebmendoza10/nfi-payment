
import { UserRequest } from '../../src/models/base/user';
import { UserModel } from '../../src/models/sequelize/user.sequelize';
import { SqlUserRepository } from '../../src/repositories/SqlUserRepository';



describe('SqlUserRepository tests', () => {

    let userRepository : SqlUserRepository

    beforeEach(() => {
        userRepository = new SqlUserRepository();
    })
    describe('getUser () - ', () => {
        it('should successfully retrieve a user by id', async () => {
            const id = 1;
            const mockedUserResponse =  {
                id: '1',
                name: 'Benj',
                address: 'Angeles',
                balance: 10000,
            }
            UserModel.findOne = jest.fn().mockResolvedValue(mockedUserResponse);

            const user = await userRepository.getUser(id);
            
            expect(user).toStrictEqual(mockedUserResponse);
            expect(UserModel.findOne).toBeCalledTimes(1);
            expect(UserModel.findOne).toBeCalledWith({where: {id: id}});
        })
    })

    describe('insertUser () - ', () => {
        it('should successfully insert a user to database', async () => {
            const id = 1;
            const response = {
                id: '1',
                name: 'Benj',
                address: 'Angeles City',
                balance: 0
            }
            UserModel.create = jest.fn().mockResolvedValue(response);
            const mockedRequest : UserRequest = {
                name: 'Benj',
                address: 'Angeles City'
            }

            const result = await userRepository.insertUser(mockedRequest);

            expect(result).toBe(response.id);
            expect(UserModel.create).toBeCalledTimes(1);
            expect(UserModel.create).toBeCalledWith(mockedRequest);
        })
    })
    describe('updateBalance () - ', () => {
        it('should successfully update balance', async () => {
            const id = 1;
            const balance = "1000";
            UserModel.update = jest.fn();

            await userRepository.updateBalance(id, balance);

            expect(UserModel.update).toBeCalledTimes(1);
            expect(UserModel.update).toBeCalledWith({ balance: Number(balance) }, {where: { id: id } });
            
        })
    })
})