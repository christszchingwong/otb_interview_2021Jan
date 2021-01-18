type Graph = {
    nodes: Set<string>;
    edges: Map<string, Set<string>>;
}

const parseInputAsGraph: (input: string) => Graph = (input) => {
    const result = {
        nodes: new Set<string>(),
        edges: new Map<string, Set<string>>()
    }
    const nonEmptyLines = input.split(`\n`).map(line => line.trim()).filter(line => line != ``);
    nonEmptyLines.forEach(line => {
        const matches = /(.*)=>(.*)/.exec(line);
        const name = matches[1].trim();
        const dependencies = matches[2].trim().split(``);
        if (!result.nodes.has(name)) {
            result.nodes.add(name);
            result.edges.set(name, new Set(dependencies));
        } else {
            const existingEdges = result.edges.get(name);
            dependencies.forEach(d => existingEdges.add(d));
        }
    });
    return result;
};

const checkSelfDependency: (input: Graph) => boolean = (input) => {
    return [...input.nodes].some(node => input.edges.get(node).has(node));
}

// Kahn's Algorithm
const topologicalSort: (input: Graph) => string[] = (input) => {
    // construct in-degree for nodes
    const inDegree: Map<string, number> = new Map([...input.nodes].map(node => [node, 0]));
    const outDegree: Map<string, number> = new Map([...input.nodes].map(node => [node, 0]));
    [...input.edges].forEach(([node, edges]) => {
        [...edges].forEach(edge => {
            inDegree.set(edge, inDegree.get(edge) + 1);
            outDegree.set(node, outDegree.get(node) + 1);
        });
    });

    // DAG has at least one node with in-degree of 0 and at least one node with out-degree of 0
    const hasNodeWithZeroInDegree = [...inDegree].some(([_node, degree]) => degree == 0);
    const hasNodeWithZeroOutDegree = [...outDegree].some(([_node, degree]) => degree == 0);
    if (!hasNodeWithZeroInDegree || !hasNodeWithZeroOutDegree) {
        throw new Error(`jobs can’t have circular dependencies`);
    }

    const zeroInDegreeQueue = [...inDegree].filter(([_node, degree]) => degree == 0);

    while(zeroInDegreeQueue.length > 0) {
        /// TODO continue the implementation
    }
    let result: string[] = [];
    return result;
}

const scheduler: (input: string) => string[] = (input) => {
    // simple case first
    if (input.length == 0) return [];

    let graph = parseInputAsGraph(input);

    // check self-dependency
    const hasSelfDependingTask = checkSelfDependency(graph);
    if (hasSelfDependingTask) {
        throw new Error(`jobs can't depend on themselves`);
    }
    // want: do a topological sort on the tasks
    // gut feeling tell us to do a depth first search,
    // but I think wiki provide a better solution:
    // https://en.wikipedia.org/wiki/Topological_sorting
    const topologicalSortedTasks = topologicalSort(graph);

    return topologicalSortedTasks;
}

export default scheduler;
