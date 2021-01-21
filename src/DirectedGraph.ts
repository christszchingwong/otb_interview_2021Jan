import { IDirectedGraph } from "./Interfaces";

export class DirectedGraph<T> implements IDirectedGraph<T> {
    public readonly nodes: Set<T>;
    public readonly edges: Map<T, Set<T>>;

    // private properties
    constructor(nodes: Set<T>, edges: Map<T, Set<T>>) {
        this.nodes = nodes ?? new Set<T>();
        this.edges = new Map<T, Set<T>>();
        [...edges].forEach(([node, edges]) => {
            [...edges].forEach(edge => {
                this.addEdge(node, edge);
            });
        })
    }

    addEdge(fromNode: T, toNode: T) {
        if (!this.nodes.has(fromNode) || !this.nodes.has(toNode)) {
            throw new Error(`Adding Edge for non-existing Node(s)`);
        }
        if (!this.edges.has(fromNode)) {
            this.edges.set(fromNode, new Set<T>());
        }
        this.edges.get(fromNode).add(toNode);
    }

    calculateNodeDegrees() {
        const result = {
            inDegree: new Map([...this.nodes].map(node=> [node, 0])),
            outDegree: new Map([...this.nodes].map(node=> [node, 0])),
        };
        // calculate in/out degree of nodes
        [...this.edges].forEach(([node, edges]) => {
            [...edges].forEach(edge => {
                result.outDegree.set(node, result.outDegree.get(node) + 1);
                result.inDegree.set(edge, result.inDegree.get(edge) + 1);
            });
        });
        return result;
    }

    hasSelfDependency() {
        return [...this.edges].some(([node, edges]) => edges.has(node));
    }

    // gut feeling tell us to do a depth first search,
    // but I think wiki provide a better solution:
    // https://en.wikipedia.org/wiki/Topological_sorting
    // Implementing `Kahn's Algorithm` here
    // 1. calculate in-degree of graph
    // 2. stop the algorithm if pre-condition is not satisfied
    // 3. do tree shaking by
    //     a. remove nodes that is not required by any other node one by one
    //     b. update the in-degree of graph
    sort() {
        // preliminary check
        // DAG has at least one node with in-degree of 0 and at least one node with out-degree of 0
        const {inDegree, outDegree} = this.calculateNodeDegrees();
        const hasNodeWithZeroInDegree = [...inDegree].some(([_node, degree]) => degree == 0);
        const hasNodeWithZeroOutDegree = [...outDegree].some(([_node, degree]) => degree == 0);
        if (!hasNodeWithZeroInDegree || !hasNodeWithZeroOutDegree) {
            throw new Error(`Circular Dependency detected`);
        }

        // Kahn's Algorithm
        let result : T[] = [];
        let visitedNodes = 0;
        let zeroInDegreeEntry: [T, number];
        // note: the following operation are not pure
        // tree shaking
        while( (zeroInDegreeEntry = [...inDegree].find(([_node, degree]) => degree == 0)) != undefined) {
            const node = zeroInDegreeEntry[0]; // key of Map Entry
            result.push(node);
            visitedNodes += 1;
            const nextNodes = this.edges.get(node) ?? [];
            nextNodes.forEach(nextNode => {
                inDegree.set(nextNode, inDegree.get(nextNode) - 1);
            });
            inDegree.delete(node);
        }
        if (visitedNodes == this.nodes.size) {
            return result;
        }
        throw new Error(`Circular Dependency detected`);
    }
}