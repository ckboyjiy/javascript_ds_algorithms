import {expect} from 'chai';
import {ShellSort} from "../../sort/ShellSort";

describe('ShellSort class test', ()=> {
    it('should be sort a array', ()=> {
        const arr = new ShellSort();
        arr.setData(100000);
        let start = new Date().getTime();
        arr.shellSort();
        let stop = new Date().getTime();
        let elapsed = stop - start;
        console.log(`The elapsed time was ${elapsed} milliseconds`);

        arr.clear();
        arr.setData(100000);
        start = new Date().getTime();
        arr.dynamicShellSort();
        stop = new Date().getTime();
        elapsed = stop - start;
        console.log(`The elapsed time was ${elapsed} milliseconds`);
    })
})