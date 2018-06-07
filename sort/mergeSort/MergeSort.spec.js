import {expect} from 'chai';
import {MergeSort} from "./MergeSort";

describe('zz', () => {
    it('aa', () => {
        let arr = new MergeSort();
        arr.setData(10000);
        let start = new Date().getTime();
        arr.mergeSort();
        let stop = new Date().getTime();
        let elapsed = stop - start;
        console.log(`The elapsed time was ${elapsed} milliseconds`);
        expect(arr.getArray().filter((val,idx, arr)=> val > arr[idx+1]).length).to.equal(0);
    })
})