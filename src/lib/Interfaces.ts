// notice this interface is not used.
// It is solely created to show that you can not always inherit in programming.
// Please check the definition on Graph and Directed Graph
// [Graph](https://en.wikipedia.org/wiki/Graph_(topology))
// [Directed Graph](https://en.wikipedia.org/wiki/Directed_graph)
export interface IGraph<T> {
    nodes: Set<T>;
    edges: Set<[T, T]>;
}

export interface IDirectedGraph<T> {
    nodes: Set<T>;
    edges: Map<T, Set<T>>;
}

export interface IScheduler {
    Schedule: (input: string) => any[];
}

export interface IParser<T> {
    Parse: (input: string) => T[];
}

export interface IOrderSorter<T> {
    Sort: (input: T[]) => T[];
}

export interface IProjector<T> {
    Project: (input: T[]) => any[];
}

export type JobError = Error;
export type GraphError = Error;
export type ParserError = Error;
export type OrderSorterError = Error;
export type ProjectorError = Error;