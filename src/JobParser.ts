import Parser from './lib/Parser';
import Job from './Job';

export default class JobParser extends Parser<Job> {
    static Parse(input: string): Job[] {
        const nonEmptyLines = input.split(/\r?\n|,/).map(line => line.trim()).filter(line => line !== ``);
        const jobs = new Map<string, Set<string>>();
        nonEmptyLines.forEach(line => {
            const matches = /^([a-zA-Z]*)\s*=>\s*([a-zA-Z]*)$/.exec(line);
            if (matches == null) {
                throw new Error(`Failed to parse line: ${line}`);
            }
            const name = matches[1].trim();
            if (!jobs.has(name)) {
                jobs.set(name, new Set<string>());
            }
            const dependencies = matches[2].trim().split(``);
            dependencies.forEach(dependency => {
                jobs.get(name).add(dependency);
            });
        });
        return [...jobs].map(([jobName, dependencies]) => new Job(jobName, dependencies));
    }
}