export default class OrderSorterError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}