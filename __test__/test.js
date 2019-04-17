const functions = require("../main");
const admin = require("../admin");
describe("To test if all normal user activities", () => {
    test("should check if a user was successfully created", () => {
        let createdUser = [];
        let newUser = new functions("whitehox", "white@gmail.com", "123", "admin");
        createdUser.push(JSON.stringify(newUser));
        console.log(createdUser);
        expect(createdUser).toEqual([ '{"username":"whitehox","email":"white@gmail.com","password":"123","access":"admin"}' ]);
    });
    test("should check if a  user can be checked with his ID", () => {
        let result = [];
        let search = functions.prototype.searchSingleUserById(1, "admin");
        result.push(search);
        expect(result).toEqual([{ id: 1,
            username: 'white',
            email: 'whitehox@gmail.com',
            password: '1234',
            access: 'admin' }]);
        expect(result).toBeDefined();
    })
});

describe("To test all administrator priviledges", () => {

});