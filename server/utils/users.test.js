const expect = require('expect');

const {Users} = require('./users');


describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'ABC',
            room: 'Room 1'
        }, {
            id: '2',
            name: 'XYZ',
            room: 'Room 2'
        }, {
            id: '3',
            name: 'MNO',
            room: 'Room 1'
        }];
    });

    it ('should add new user', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Atharv',
            room: 'Assassins'
        };
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it ('should remove a user', () => {
        const resUser = users.removeUser('2');
        expect(resUser.id).toBe('2');
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        const resUser = users.removeUser('99');
        expect(resUser).toBeFalsy();
    });

    it('should find a user', () => {
        const resUser = users.getUser('1');
        expect(resUser).toEqual(users.users[0]);
    });

    it('should not find a user', () => {
        const resUser = users.getUser('99');
        expect(resUser).toBeFalsy();
    });

    it('should return names for room 1', () => {
        var userList = users.getUserList('Room 1');

        expect(userList).toEqual(['ABC', 'MNO']);
    });
    it('should return names for room 2', () => {
        var userList = users.getUserList('Room 2');

        expect(userList).toEqual(['XYZ']);
    });
});