import Job from './Job';

export default class JobScheduleProjector {
    Project(input: Job[]): string[] {
        return input.map(job => job.name);
    }
}