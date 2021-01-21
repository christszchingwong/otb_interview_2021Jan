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
