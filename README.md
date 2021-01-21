# otb_interview_2021Jan

![Circle CI status](https://circleci.com/gh/christszchingwong/otb_interview_2021Jan.svg?style=shield)

## Tasks walk through

1. Read the document carefully to understand the issue and the scope.
1. Plan my actions
   1. Decide project management tool- simple public github repo this time.
   1. Decide tech stack - for quick prototyping I used typescript. Asked if I should use Ruby for demo purpose.
   1. Decide if I can import libraries or should I implement it myself - as this sounds like a technical test I chose the latter one. If this is not an technical test, I think I try a few libraries [here](https://www.npmjs.com/search?q=topological%20sort) instead of implementing them myself.
   1. Ask for proper input samples as the format look a little bit ambiguous to me.
1. Devops
   1. Setup Dev environment - reuse my usual node.js vagrant box
   2. Generate vscode project from `yeoman` generator (`yo`) from `ts-jest`
   3. Migrate unit test with `mocha` after `vscode` debugger couldn't recognize breakpoint on `ts-jest`
   4. Add `nodemon` to make sure the code always pass unit tests
   5. Add necessary comments / TODO / documents while implementing
   6. Daily sit-rep.
2. Implementation
   1. Implement Unit Tests
   2. Implement `Kahn's Algorithm`
3. Artifacts
   1. Setup Circle CI - it is a free single pipeline.
   2. Generate code coverage with istanbul (`nyc`)
4. Documentation
5. Follow up : review the implementation with QA / product owner to check any discrepancies (fix if any).


## Entry Point
`src/JobScheduler.ts`

## Implementation Plan

1. [x] Rush for a js version for agent to deliver asap
1. [x] Align parser and output with clarified spec
1. [x] Replace `JEST` with `MOCHA` to enable step-in debugging
1. [x] Conduct further tests on edge cases
1. ~~[ ] Port the program into Ruby to learn the language~~
1. [x] Convert the program to OOP
   1. [x] Interface for exceptions and IGraph
   2. [x] Implement a concrete graph class
   3. [x] Use Factory Pattern for Scheduler class

## Algorithm References

- [Topological sort](https://en.wikipedia.org/wiki/Topological_sorting)
- [Kahn's Algorithm](https://www.educative.io/edpresso/what-is-topological-sort)