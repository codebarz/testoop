const functions = require("../main");
describe("To test if a user creation", () => {
    test("should check if a user was successfully created", () => {
        let createdUser = [];
        let newUser = new functions("whitehox", "white@gmail.com", "123", "admin");
        createdUser.push(JSON.stringify(newUser));
        console.log(createdUser);
        expect(createdUser).toEqual([ '{"username":"whitehox","email":"white@gmail.com","password":"123","access":"admin"}' ]);
    })
});