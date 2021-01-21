export default class JobError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}