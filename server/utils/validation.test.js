const expect = require('expect');

const {isRealString} = require('./validation');

describe('isRealString', () => {
    it('sould reject non-string values', () => {
        const str = true;
        const result = isRealString(str);

        expect(result).toBe(false);
    });
    it('sould reject string with only spaces', () => {
        const str = '       ';
        const result = isRealString(str);

        expect(result).toBe(false);
    });
    it('sould allow string with non-space characters', () => {
        const str = ' Test    ';
        const result = isRealString(str);

        expect(result).toBe(true);
    });
});

describe('generateLocationMessage', () => {
});
