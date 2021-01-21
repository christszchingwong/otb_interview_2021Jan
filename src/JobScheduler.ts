import { DirectedGraph } from './DirectedGraph';
import Job from './Job';
import JobParser from './JobParser';
import JobError from './lib/GraphError';
import Scheduler from './lib/Scheduler';

export default class JobScheduler extends Scheduler {
    private constructor() { super() };

    // notice this code reverse the dependency direction
    // Under "jobs" perspective a depending job directs to its dependent
    // but under a directed graph a dependent node points to its depending nodes
    // this is actually taken care of under the fp version (note the difference between .push and .unshift in Kahn's Algorithm)
    private static convertJobsToDirectedGraph(jobs: Job[]): DirectedGraph<Job> {
        const allJobs = new Set<Job>([...jobs]);
        const allJobDependencies = new Map<Job, Set<Job>>();
        jobs.forEach(dependingJob => {
            dependingJob.dependencies.forEach(dependedJobName => {
                const dependedJob = jobs.find(job => job.name === dependedJobName);
                if (dependedJob !== undefined) {
                    if (!allJobDependencies.has(dependedJob)) {
                        allJobDependencies.set(dependedJob, new Set<Job>());
                    }
                    allJobDependencies.get(dependedJob).add(dependingJob);
                } else {
                    throw new JobError(`jobs can’t depend on a non-existing job`);
                }
            });
        });
        return new DirectedGraph<Job>(allJobs, allJobDependencies);
    }
    static Schedule(input: string): string[] {
        // simple case first
        if (input.length === 0) return [];

        const jobs = JobParser.Parse(input);
        const graph = JobScheduler.convertJobsToDirectedGraph(jobs);

        // check self-dependency - special case of circular dependency
        // it is explicitly asked by the document to separate it out
        // (also means a slightly better performance)
        if (graph.hasSelfDependency()) {
            throw new JobError(`jobs can't depend on themselves`);
        }

        // key method : sort topologically
        try {
            const topologicalSortedTasks = graph.sort();
            return topologicalSortedTasks.map(job => job.name);
        } catch (ex) {
            throw new JobError(`jobs can’t have circular dependencies`);
        }
    }
}