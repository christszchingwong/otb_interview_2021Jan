export default class GraphError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}