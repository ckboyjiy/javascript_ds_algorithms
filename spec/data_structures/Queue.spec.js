import {assert, expect} from 'chai';
import {Queue} from "../../data_structures/queue/Queue";
const fs = require('fs');

describe('Queue class test', () => {
    const queue = new Queue();
    it('Should be create Queue class', () => {
        expect(queue instanceof Queue).to.be.true;
    });

    it('Should be empty', () => {
        expect(queue.empty()).to.equal(true);
    });

    it('Should be add', () => {
        queue.enqueue('A');
        expect(queue.back()).to.equal('A');
        queue.enqueue('B');
        expect(queue.back()).to.equal('B');
        queue.enqueue('C');
        expect(queue.back()).to.equal('C');
    });

    it('Should be get it from the front and it not exist in Queue after', () => {
        expect(queue.dequeue()).to.equal('A');
        expect(queue.front()).to.not.equals('A');
    });

    it('Should be get it from the front without deleting it in Queue', () => {
        expect(queue.front()).to.equals('B');
        expect(queue.front()).to.equals('B');
    });

    it('Should be get it from the most back without deleting it in Queue', () => {
        expect(queue.back()).to.equal('C');
    });

    it('Should be get string from Queue data', () => {
        expect(queue.toString()).to.equal('B,C');
        expect(queue.toString(';')).to.equal('B;C');
    });

    it('should be get count which remain queue', () => {
        expect(queue.count()).to.equal(2);
    });

    it('Should be able to use to dance party simulation', () => {
        const males = new Queue();
        const females = new Queue();
        const file = fs.readFileSync('./spec/data_structures/Queue.spec.txt', 'utf-8');
        file.split('\n').forEach( v => {
            const dancer = v.split(' ');
            if (dancer[0] === 'F') {
                females.enqueue({
                    sex: dancer[0],
                    name: dancer[1]
                });
            } else {
                males.enqueue({
                    sex: dancer[0],
                    name: dancer[1]
                })
            }
        })

        const matchDancer = new Queue();
        while (!females.empty() && !males.empty()) {
            matchDancer.enqueue(`Female dancer is: ${females.dequeue().name} and the male dancer is: ${males.dequeue().name}`);
        }

        expect(matchDancer.dequeue()).to.equal('Female dancer is: Allison and the male dancer is: Frank');
        expect(matchDancer.dequeue()).to.equal('Female dancer is: Cheryl and the male dancer is: Mason');
        expect(matchDancer.dequeue()).to.equal('Female dancer is: Jennifer and the male dancer is: Clayton');
        expect(matchDancer.dequeue()).to.equal('Female dancer is: Aurora and the male dancer is: Raymond');

        expect(females.count()).to.equal(0);
        expect(males.count()).to.equal(3);
    });

    it('Should be able to use to radix sort', () => {
        const nums = [1, 10, 1001, 5, 55, 5005, 501, 15, 101, 1005, 11, 505, 5001, 51, 105];
        const maxdigit = 4;

        const queues = [];
        for (let i = 0; i < 10; i++) {
            queues.push(new Queue());
        }

        let target = nums;
        for (let i = 0; i < maxdigit; i++) {
            target.forEach( v => {
                const idx = v >= Math.pow(10, i) ? Math.floor(v / Math.pow(10, i)) % 10 : 0;
                queues[idx].enqueue(v);
            });

            target = [];
            queues.forEach(v => {
                while (!v.empty()) {
                    target.push(v.dequeue());
                }
            });
        }
        expect(target.join(',')).to.equal('1,5,10,11,15,51,55,101,105,501,505,1001,1005,5001,5005');
    })

    it('Should be able to use to bank simulation', () => {
        class BankTeller {
            constructor(name) {
                this.name = name;
            }
            receive(q) {
                if (q.front() !== undefined) {
                    let guest = q.dequeue();
                    console.log(this.name, guest);
                    if (typeof guest === 'number') {
                        setTimeout(()=> {
                            this.receive(q);
                        }, guest * 1000);
                    }
                }
            };
        }

        queue.enqueue(5);
        queue.enqueue(2);
        queue.enqueue(2);
        queue.enqueue(4);
        queue.enqueue(6);
        queue.enqueue(2);
        queue.enqueue(3);
        queue.enqueue(1);
        queue.enqueue(5);
        queue.enqueue(2);

        const A = new BankTeller('A');
        const B = new BankTeller('B');
        const C = new BankTeller('C');
        A.receive(queue);
        B.receive(queue);
        C.receive(queue);
    })
})