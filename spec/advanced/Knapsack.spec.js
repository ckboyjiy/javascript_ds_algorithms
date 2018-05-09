import {expect} from 'chai';
import {Knapsack} from "../../advanced/Knapsack";
describe('Knapsack class test', ()=> {
    const capacity = 16;
    const things = [
        {w: 3, v: 4},
        {w :4, v: 5},
        {w: 7, v: 10},
        {w: 8, v: 11},
        {w: 9, v: 13}
    ]

    it('should be able to prepare a knapsack', ()=> {
        let knapsack = new Knapsack(capacity);
        expect(knapsack instanceof Knapsack).to.be.true;
    });
    it('should be able to prepare something to put in a this knapsack', ()=> {
        let knapsack = new Knapsack(capacity);
        knapsack.initThings(things);
        expect(knapsack.getThings().length).to.equal(5);
    });
    it('should be get a maximum value which put in a this knapsack, with a recursive method', ()=> {
        let knapsack = new Knapsack(capacity);
        expect(knapsack.recursion(things)).to.equal(23);
    });
    it('should be get a maximum value which put in a this knapsack, with a recursive DP method', ()=> {
        let knapsack = new Knapsack(capacity);
        expect(knapsack.recursionDP(things)).to.equal(23);
        console.log('values of array by recursive DP');
        for (let row = 0; row <= things.length; row++) {
            let cols = '';
            for (let col = 0; col <= capacity; col++) {
                cols += `${knapsack.debugArray[row][col] ? knapsack.debugArray[row][col] : '-'}\t`;
            }
            console.log(cols);
        }
    });
    it('should be get a maximum value wich put in a this knapsack, with a iterative DP method', ()=> {
        let knapsack = new Knapsack(capacity);
        expect(knapsack.iterDP(things)).to.equal(23);
        console.log('values of array by iterative DP');
        for (let row = 0; row <= things.length; row++) {
            let cols = '';
            for (let col = 0; col <= capacity; col++) {
                cols += `${knapsack.debugArray[row][col]}\t`;
            }
            console.log(cols);
        }
    })
})