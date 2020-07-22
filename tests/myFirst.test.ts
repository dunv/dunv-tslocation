import { expect } from 'chai';
import { assignParams, parseParams } from '../src/helpers';

describe('parse', function () {
    it('with ?', function () {
        const params = parseParams('?hello=world');
        expect(params['hello']).equal('world');
    });
});

describe('assign', function () {
    it('assign add', function () {
        const qs = assignParams('?hello=world', { add: { myParam: '1' } });
        expect(qs).equal('hello=world&myParam=1');
    });

    it('assign remove', function () {
        const qs = assignParams('?hello=world', { remove: ['hello'] });
        expect(qs).equal('');
    });

    it('assign add and remove', function () {
        const qs = assignParams('?hello=world', { add: { myParam: '1' }, remove: ['hello'] });
        expect(qs).equal('myParam=1');
    });
});
