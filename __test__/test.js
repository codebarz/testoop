const functions = require("../main");
describe("To test if all normal user activities", () => {
    test("should check if a user was successfully created", () => {
        let createdUser = [];
        let newUser = new functions("whitehox", "white@gmail.com", "123", "admin");
        createdUser.push(JSON.stringify(newUser));
        console.log(createdUser);
        expect(createdUser).toEqual([ '{"username":"whitehox","email":"white@gmail.com","password":"123","access":"admin"}' ]);
    });
    // test("should check if a  user can be checked with his ID", () => {
    //     let result = functions.prototype.searchUserById(1, "admin", "admin");
    //     console.log(result);
    //     expected("tega").toBe("tega");
    // })
});