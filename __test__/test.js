let fs = require('fs');
const Users = require("../main");
const Admin = require("../admin");
const order = require("../order");
let mocks = require("../__mocks__/functions");
let dbData = JSON.parse(fs.readFileSync('db.json'));
function checkId() {
    let currentid = 0;
    if(dbData.orders.length === 0) {
        currentid = 1;
    }
    else {
        currentid = (dbData.orders[dbData.orders.length - 1].id) + 1
    }
    return currentid;
}
describe("To test if all normal user activities", () => {
    test("should check if an admin account can be successfully created", () => {
        let newUser = new Users("whitehox", "white@gmail.com", "123", "admin");
        let success = newUser.createUser();
        expect(success).toBe("Your administrator account has been successfully created");
    });
    test("Should check if a user account can be successfully created", () => {
        let newUser = new Users("whitehox", "white@gmail.com", "123", "user");
        let success = newUser.createUser();
        expect(success).toBe("Your user account has been successfully created");
    });
    test("Should return an error message if a wrong account type was used", () => {
        let newUser = new Users("whitehox", "white@gmail.com", "123", "foreign");
        let error = newUser.createUser();
        expect(error).toBe("A user can not be created with this access level. Kindly use either admin or user");
    });
    test("should check if a  user can be checked with his ID", () => {
        let result;
        let search = Users.prototype.searchSingleUserById(1, "admin");
        result = search;
        console.log(result);
        expect(result).toEqual([dbData.admin[0]]);
        expect(result).toBeDefined();
    });
    // test("Should check if a user account was successfully updated", () => {
    //     let response = Users.prototype.updateUser("michael", "11861538da", "michael", "oketegah@gmail.com", "11861538da", "user");
    //     expect(response).toBe("Your user account has been successfully updated");
    // });
    test("should check if a user entered right username or password", () => {
        let response = Users.prototype.updateUser("kolokolokolo", "11861538da", "whitehox", "oketegah@gmail.com", "11861538da", "user");
        expect(response).toBe("Incorrect username or password");
    });
    test("should check if a admin entered right username or password", () => {
        let response = Users.prototype.updateUser("kolokolokolo", "11861538da", "whitehox", "oketegah@gmail.com", "11861538da", "admin");
        expect(response).toBe("Incorrect username or password");
    });
});

describe("To test all administrator privileges", () => {
    test("Should check if admin can search all users", () => {
       let response = Admin.prototype.searchAllUsers("user");
       expect(response).toBe("Here are your search results for users");
    });
    test("Should check if admin can search all admins", () => {
        let response = Admin.prototype.searchAllUsers("admin");
        expect(response).toBe("Here are your search results for admin");
    });
    test("Should check if wrong account type can search both", () => {
        let response = Admin.prototype.searchAllUsers("foreign");
        expect(response).toBe("Kindly use either admin or user as the account type");
    });
    test("Should check if admin can search f with wrong details", () => {
       let response = Admin.prototype.searchSingleUserByName("witehox", "user");
       expect(response).toBe("There is no user registered with this username");
    });
});

describe("To test all order functionality", () => {
   test("If a user can't make an order with fake id", () => {
       let toBeTested = Users.prototype.makeOrder(0, "garri", "rice", "beans");
       expect(toBeTested).toBe("There is no user registered with this ID");
   });
   test("If admin can read all Users", () => {
      let result = mocks.admin.readAllOrder();
      expect(result).toEqual(mocks.mockDb.orders);
   });
   test("If admin can read one user", () => {
       let result;
       result = Admin.handling.readOneOrder(2);
       let compare = [];
       let target = result[0].id;
       for(let i in dbData.orders) {
           if(dbData.orders[i].id === target) {
               compare.pop();
               compare.push(dbData.orders[i]);
           }
       }
       expect(result).toEqual(compare);
   });
});
