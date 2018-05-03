import {expect} from 'chai';
import {BubbleSort} from "../../sort/BubbleSort";

describe('BubbleSort class test', ()=> {
    let arr;
    beforeEach(()=> {
        arr = new BubbleSort();
    });
    it('should be sort array', () => {
        arr.setData(10);
        arr.bubbleSort();
        expect(arr.getArray().filter((val,idx, arr)=> val > arr[idx+1]).length).to.equal(0);
    })
})