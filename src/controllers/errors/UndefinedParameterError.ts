export class UndefinedParameterError extends Error {
    private static readonly message = `Missing parameter`;

    constructor() {
        super(UndefinedParameterError.message);
        this.stack = new Error().stack;
    }
}