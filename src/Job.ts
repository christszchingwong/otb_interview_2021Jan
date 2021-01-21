import JobError from './lib/JobError';

export default class Job {
    public readonly name: string;
    public readonly dependencies: Set<string>; // contains name of depending jobs
    constructor(name, dependencies) {
        this.name = name;
        if (this.name.length > 1) throw new JobError(`job name is always a single character`);
        this.dependencies = dependencies ?? [];
        if ([...this.dependencies].some(dependency =>  dependency.length > 1)) throw new JobError(`job name is always a single character`);
    }
}