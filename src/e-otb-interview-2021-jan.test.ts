import scheduler from './e-otb-interview-2021-jan';

const testNotImplemented = `Test Not Implemented`;

describe('scheduler', () => {
    it ('Given you’re passed an empty string (no jobs), the result should be an empty sequence.', () => {
        expect(scheduler('')).toEqual([]);
    });

    it ('Given "a=>", The result should be a sequence consisting of a single job a.', () => {
        // TODO implement test
        throw new Error(testNotImplemented);
    });
    it ('Given "a=>,b=>,c=>", The result should be a sequence containing all three jobs abc in no significant order.', () => {
        // TODO implement test
        throw new Error(testNotImplemented);
    });
    it ('Given "a =>,    b => c,    c => f,    d => a,    e => b,    f =>", The result should be a sequence that positions f before c, c before b, b before e and a before d containing all six jobs abcdef.', () => {
        // TODO implement test
        throw new Error(testNotImplemented);
    });
    it ('Given " a =>,    b =>,    c => c", The result should be an error stating that jobs can’t depend on themselves.', () => {
        // TODO implement test
        throw new Error(testNotImplemented);
    });
    it ('Given "a =>,    b => c,    c => f,    d => a,    e =>,    f => b", The result should be an error stating that jobs can’t have circular dependencies.', () => {
        // TODO implement test
        throw new Error(testNotImplemented);
    });
});