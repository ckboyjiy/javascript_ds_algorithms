import {expect} from 'chai';
import {Fibonacci} from "../../advanced/Fibonacci";
describe('The dynamic programming test', ()=> {
    it('should be compute the fibonacci numbers', ()=> {
        const n = 50;
        let fibo = new Fibonacci();
        let start = 0;
        let stop = 0;

        start = new Date().getTime();
        console.log(fibo.iter(n));
        stop = new Date().getTime();
        console.log(`iterative time -  ${stop-start} milliseconds`);

        start = new Date().getTime();
        console.log(fibo.dynamic(n));
        stop = new Date().getTime();
        console.log(`dynamic programming time -  ${stop-start} milliseconds`);

        start = new Date().getTime();
        console.log(fibo.recursion(n));
        stop = new Date().getTime();
        console.log(`recursive time -  ${stop-start} milliseconds`);
    });
    it('lcs test', ()=> {
        let prog = new Fibonacci();
        console.log(prog.lcs('AGGTAB', 'GXTXAYB'));
    })
})