import Job from './Job';
import JobParser from './JobParser';
import JobGraphOrderSorter from './JobOrderSorter';
import JobScheduleProjector from './JobSchedulerProjector';
import SchedulerFactory from './lib/SchedulerFactory';


export default class JobSchedulerFactory extends SchedulerFactory<Job> {
    constructor() {
        super(new JobParser(), new JobGraphOrderSorter(), new JobScheduleProjector() );
    }
}