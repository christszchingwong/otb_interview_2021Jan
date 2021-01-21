import { expect } from 'chai';
import JobScheduler from '../src/JobScheduler';

const testNotImplemented = `Test Not Implemented`;

describe('scheduler', () => {
    it('Given you’re passed an empty string (no jobs), the result should be an empty sequence.', () => {
        expect(JobScheduler.Schedule('')).to.deep.equal([]);
    });

    it('Given "a =>", The result should be a sequence consisting of a single job a.', () => {
        const input = `
          a =>
        `;
        const output = JobScheduler.Schedule(input);
        const expected = ['a'];
        expect(output).to.have.members(expected);
    });
    it('Given "a =>,b =>,c =>", The result should be a sequence containing all three jobs abc in no significant order.', () => {
        const input = `
          a =>
          b =>
          c =>
        `;
        const output = JobScheduler.Schedule(input);
        expect(output).to.include.members(['a','b','c']);
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
        const output = JobScheduler.Schedule(input);
        const aPosition = output.findIndex(o => o==='a');
        const bPosition = output.findIndex(o => o==='b');
        const cPosition = output.findIndex(o => o==='c');
        const dPosition = output.findIndex(o => o==='d');
        const ePosition = output.findIndex(o => o==='e');
        const fPosition = output.findIndex(o => o==='f');
        expect(output).to.include.members(['a','b','c','d','e','f']);
        expect(fPosition).to.be.below(cPosition);
        expect(cPosition).to.be.below(bPosition);
        expect(bPosition).to.be.below(ePosition);
        expect(aPosition).to.be.below(dPosition);
    });
    it('Given " a =>,    b =>,    c => c", The result should be an error stating that jobs can’t depend on themselves.', () => {
        const input = `
            a =>
            b =>
            c => c
        `;
        expect(()=>JobScheduler.Schedule(input)).to.throw(`jobs can't depend on themselves`);
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
        expect(()=>JobScheduler.Schedule(input)).to.throw(`jobs can’t have circular dependencies`);
    });

    it ('Given "a=>b,c=>d" with result jobs can’t have unreachable dependency', () => {
        const input = `a=>b,c=>d`;
        expect(()=>JobScheduler.Schedule(input)).to.throw(`jobs can’t depend on a non-existing job`);
    });

    it ('Given mixed input "a=>b \\n b=> c, c=>", The result should give "cba"', () => {
        const input = `
            a=>b
            b=>c, c =>`;
        const output = JobScheduler.Schedule(input);
        const expected = ['c','b','a'];
        expect(output).to.have.members(expected);
    });

    it ('Given "abc=>", It should complains task with more than 1 character length', () => {
        const input = `abc=>`;
        expect(()=>JobScheduler.Schedule(input)).to.throw(`job name is always a single character`);
    });

    it ('Given "a => b, b => a", The result should be an error stating that jobs can’t have circular dependencies.', () => {
        const input = `a => b, b => a`;
        expect(()=>JobScheduler.Schedule(input)).to.throw(`jobs can’t have circular dependencies`);
    });

    it ('Given trash input, The result should be an error', () => {
        const input = `this is not in correct format`;
        expect(()=>JobScheduler.Schedule(input)).to.throw();
    });

    it('Given multiple dependencies, The result should give correct order', () => {
        const input = `
          a => bc
          b =>
          c => b
          d => c
          a => d
        `;
        const output = JobScheduler.Schedule(input);
        expect(output).to.include.members(['a','b','c','d']);
        const aPosition = output.findIndex(o => o==='a');
        const bPosition = output.findIndex(o => o==='b');
        const cPosition = output.findIndex(o => o==='c');
        const dPosition = output.findIndex(o => o==='d');
        expect(bPosition).to.be.below(aPosition);
        expect(cPosition).to.be.below(aPosition);
        expect(dPosition).to.be.below(aPosition);
        expect(bPosition).to.be.below(cPosition);
        expect(cPosition).to.be.below(dPosition);
    });
});