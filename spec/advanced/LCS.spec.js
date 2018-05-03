import {expect} from 'chai';
import {LCS} from "../../advanced/LCS";
describe('LCS class test', ()=> {
    const isDebug = true;
    it('longest common subsequence test', ()=> {
        let lcs = new LCS(isDebug);
        expect(lcs.iter('ABCDGH', 'AEDFHR')).to.equal(3);
        expect(lcs.iter('ABCDGH', '')).to.equal(0);
    })
})