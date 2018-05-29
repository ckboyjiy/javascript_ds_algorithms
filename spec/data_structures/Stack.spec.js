import {assert, expect} from 'chai';
import {Stack} from '../../data_structures/stack/Stack';

describe('Stack class test', () => {
    const stack = new Stack();

    it('Should be create stack class', () => {
        expect(stack instanceof Stack).to.be.true;
    });

    it('Should be empty', () => {
        expect(stack.empty()).to.equal(true);
    });

    it('Should be add', () => {
        stack.push('A');
        expect(stack.size()).to.equal(1);
        stack.push('B');
        expect(stack.size()).to.equal(2);
        stack.push('C');
        expect(stack.size()).to.equal(3);
    });

    it('Should be take it from the front and it not exist in Stack after', () => {
        expect(stack.pop()).to.equal('C');
        expect(stack.peek()).to.equal('B');
    });

    it('Should be check a last value', () => {
        expect(stack.peek()).to.equal('B');
    });

    it('Should be search a value', () => {
        expect(stack.search('A')).to.equal(0);
        expect(stack.search('C')).to.equals(-1);
    });

    it('Should be right current length', () => {
        expect(stack.size()).to.equal(2);
    });

    it('Should be empty', () => {
        stack.clear();
        expect(stack.size()).to.equal(0);
    })

    it('Should be able to use to convert decimal to binary number', () => {
        const s = new Stack();
        let num = 32;
        do {
            s.push(num % 2);
            num = Math.floor(num / 2);
        } while (num > 0);
        let converted = '';
        while (s.peek() !== null) {
            converted += s.pop();
        }
        expect(converted).to.equal('100000');
    });

    it('Should be able to use to check whether it is a palindrome', () => {
        const s = new Stack();
        for(let w of 'hello') {
            s.push(w);
        }
        let rword = '';
        while (s.size() > 0) {
            rword += s.pop();
        }
        expect('hello' === rword).to.be.false;

        s.clear();

        for(let w of 'racecar') {
            s.push(w);
        }
        rword = '';
        while (s.size() > 0) {
            rword += s.pop();
        }
        expect('racecar' === rword).to.be.true;
    })
})