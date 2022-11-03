export class InsufficientBalanceError extends Error {
    private static readonly message = `You have insufficient balance`;

    constructor() {
        super(InsufficientBalanceError.message);
        this.stack = new Error().stack;
    }
}