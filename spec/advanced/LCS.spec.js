import {expect} from 'chai';
import {LCS} from "../../advanced/LCS";
describe('LCS(Longest Common Subsequence) class test', ()=> {
    const isDebug = false;
    const word1 = 'ABCDGH';
    const word2 = 'AEDFHR';
    const result = 3;
    it('should be get max lsc number with iterative', ()=> {
        let lcs = new LCS(isDebug);
        const start = new Date().getTime();
        expect(lcs.iter(word1, word2)).to.equal(result);
        const stop = new Date().getTime();
        console.log(`iterative time -  ${stop-start} milliseconds`);
        expect(lcs.iter(word1, '')).to.equal(0);
    });
    it('should be get max lcs number with recursive DP', ()=> {
        let lcs = new LCS(isDebug);
        const start = new Date().getTime();
        expect(lcs.recursionDP(word1, word2)).to.equal(result);
        const stop = new Date().getTime();
        console.log(`recursive time -  ${stop-start} milliseconds`);
        expect(lcs.recursion(word1, '')).to.equal(0);
    })
    it('should be get max lcs number with recursive', ()=> {
        let lcs = new LCS(isDebug);
        const start = new Date().getTime();
        expect(lcs.recursion(word1, word2)).to.equal(result);
        const stop = new Date().getTime();
        console.log(`recursive time -  ${stop-start} milliseconds`);
        expect(lcs.recursion(word1, '')).to.equal(0);
    });
})