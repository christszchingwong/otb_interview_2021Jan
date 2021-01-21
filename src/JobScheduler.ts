import JobSchedulerFactory from './JobSchedulerFactory';

export default class JobScheduler {
    private constructor() {};
    private static scheduler = new JobSchedulerFactory();
    static Schedule(input: string): string[] {
        return JobScheduler.scheduler.Schedule(input);
    }
}