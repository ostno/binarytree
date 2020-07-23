import { Node } from "./index";

describe('binary tree', () => {

    function createSimpleTree(): Node {
        const node = new Node(2);
        node.insert(1);
        node.insert(3);
        node.insert(4);
        return node;
    }

    function createComplexTree(): Node {
        const node = new Node(5);
        node.insert(1);
        node.insert(6);
        node.insert(3);
        node.insert(4);
        node.insert(9);
        return node;
    }

    describe('single node', () => {

        test('single node should return 1', () => {
            const node = new Node(1);
            expect(node.value).toEqual(1);
            expect(node.left).not.toBeDefined();
            expect(node.right).not.toBeDefined();
        });
    });

    describe('node insertion', () => {

        test('greater than is on the right', () => {
            const node = new Node(2);
            node.insert(3);
            expect(node.right.value).toEqual(3);
        });

        test('less than is on the left', () => {
            const node = new Node(2);
            node.insert(1);
            expect(node.left.value).toEqual(1);
        });

        test('a fourth node greater than any other should be on the right', () => {
            const node = createSimpleTree();
            expect(node.right.right.value).toEqual(4)
        });

    });

    describe('flatten', () => {

        test('should returns an array of values (simple tree)', () => {
            const node = createSimpleTree();
            const result = node.flatten();
            expect(result).toEqual([2, 1, 3, 4]);
        });

        test('should returns an array of values (complex tree)', () => {
            const node = createComplexTree();
            const result = node.flatten();
            expect(result).toEqual([5, 1, 3, 4, 6, 9]);
        });

    });

    describe('double', () => {

        test('should double the value for each node', () => {
            const node = createSimpleTree();
            node.double();
            const result = node.flatten();
            expect(result).toEqual([4, 2, 6, 8]);
        });

    });

    describe('sum', () => {

        test('should return the sum of all nodes', () => {
            const node = createSimpleTree();
            const result = node.sum();
            expect(result).toEqual(10);
        });

    });

});
