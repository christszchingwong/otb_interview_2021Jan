import scheduler from './e-otb-interview-2021-jan';

const testNotImplemented = `Test Not Implemented`;

describe('scheduler', () => {
    it('Given you’re passed an empty string (no jobs), the result should be an empty sequence.', () => {
        expect(scheduler('')).toEqual([]);
    });

    it('Given "a =>", The result should be a sequence consisting of a single job a.', () => {
        const input = `
          a=>
        `;
        const output = scheduler(input);
        const expected = ['a'];
        expect(output).toEqual(expect.arrayContaining(expected));
        expect(expected).toEqual(expect.arrayContaining(output));
    });
    it('Given "a =>,b =>,c =>", The result should be a sequence containing all three jobs abc in no significant order.', () => {
        const input = `
          a =>
          b =>
          c =>
        `;
        const output = scheduler(input);
        expect(output).toEqual(expect.arrayContaining(['a','b','c']));
    });
    it('Given "a =>,    b => c,    c => f,    d => a,    e => b,    f =>", The result should be a sequence that positions f before c, c before b, b before e and a before d containing all six jobs abcdef.', () => {
        const input = `
            a =>
            b => c
            c => f
            d => a
            e => b
            f =>
        `;
        const output = scheduler(input);
        const a_position = output.findIndex(o => o=='a');
        const b_position = output.findIndex(o => o=='b');
        const c_position = output.findIndex(o => o=='c');
        const d_position = output.findIndex(o => o=='d');
        const e_position = output.findIndex(o => o=='e');
        const f_position = output.findIndex(o => o=='f');
        expect(output).toEqual(expect.arrayContaining(['a','b','c','d','e','f']));
        expect(f_position).toBeLessThan(c_position);
        expect(c_position).toBeLessThan(b_position);
        expect(b_position).toBeLessThan(e_position);
        expect(a_position).toBeLessThan(d_position);
    });
    it('Given " a =>,    b =>,    c => c", The result should be an error stating that jobs can’t depend on themselves.', () => {
        const input = `
            a =>
            b =>
            c => c
        `;
        expect(()=>scheduler(input)).toThrowError(`jobs can't depend on themselves`);
    });
    it('Given "a =>,    b => c,    c => f,    d => a,    e =>,    f => b", The result should be an error stating that jobs can’t have circular dependencies.', () => {
        const input = `
            a =>
            b => c
            c => f
            d => a
            e =>
            f => b
        `;
        expect(()=>scheduler(input)).toThrowError(`jobs can’t have circular dependencies`);
    });
});