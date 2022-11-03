export type User = {
    id: number,
    name: string,
    address: string,
    balance: number
};

export type UserRequest = Omit<User, "id" | "balance">;

export type UserResponse = Omit<User, "name" | "address">;