const expect = require('expect');

const {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('sould generate correct message object', () => {
        const from = 'John';
        const text = 'Some message';
        const message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});
