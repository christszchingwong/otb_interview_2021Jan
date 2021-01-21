import { IParser, IOrderSorter, IProjector, IScheduler } from "./Interfaces";

export default abstract class SchedulerFactory<T> implements IScheduler {
    parser: IParser<T>;
    orderSorter: IOrderSorter<T>;
    projector: IProjector<T>;

    constructor(parser: IParser<T>, orderSorter: IOrderSorter<T>, projector: IProjector<T>) {
        this.parser = parser;
        this.orderSorter = orderSorter;
        this.projector = projector;
    }
    Schedule(input: string): any[] {
        const objects = this.parser.Parse(input);
        const sortedObjects = this.orderSorter.Sort(objects);
        const result = this.projector.Project(sortedObjects);
        return result;
    }
}