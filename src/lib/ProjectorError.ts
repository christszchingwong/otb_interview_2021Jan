export default class ProjectorError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}