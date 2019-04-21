let fs = require('fs');
const Users = require("../main");
const Admin = require("../admin");
//jest.setMock("../admin", require("../__mocks__/admin"));
const order = require("../order");
//let mocks = require("../__mocks__/admin");
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
    test("Should check instance of user", () => {
        let newUser = new Users("w", "w@gmail.com", "w", "user");
        expect(newUser).toEqual({username: 'w', email: 'w@gmail.com', password: 'w', access: 'user' });
    });
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
    test("Should check if a user account was successfully updated", () => {
        let response = Users.prototype.updateUser("ainah", "54321", "ainah", "oluwa@gmail.com", "54321", "user");
        expect(response).toBe("Your user account has been successfully updated");
    });
    test("should check if a user entered right username or password", () => {
        let response = Users.prototype.updateUser("kolokolokolo", "11861538da", "whitehox", "oketegah@gmail.com", "11861538da", "user");
        expect(response).toBe("Incorrect username or password");
    });
    test("should check if a admin entered right username or password", () => {
        let response = Users.prototype.updateUser("kolokolokolo", "11861538da", "whitehox", "oketegah@gmail.com", "11861538da", "admin");
        expect(response).toBe("Incorrect username or password");
    });
    test("Should check if non-existing user can make an order", () => {
        expect(Users.prototype.makeOrder("1", "garri", "milk")).toBe("There is no user registered with this ID");
    });
});

describe("To test all administrator privileges", () => {
    test("Should check for instance of admin", () => {
        let newUser = new Admin("h", "h@gmail.com", "access", "admin");
        expect(newUser).toEqual({username: 'h', email: 'h@gmail.com', password: 'access', access: 'admin' });
    });
    test("Should check admin can search by Id", () => {
        let response = Admin.prototype.searchSingleUserById(0, "admin");
        expect(response).toBe("User not found");
    });
    test("Should check admin can search by Id", () => {
        let response = Admin.prototype.searchSingleUserById(dbData.admin[0].id, "admin");
        expect(response).toBe("Haha!.. Here you go.");
    });
    test("Should check user can be searched by Id", () => {
        let response = Users.prototype.searchSingleUserById(dbData.users[0].id, "user");
        expect(response).toBe("Haha!.. Here you go.");
    });
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
    test("Should check if admin can search a user by name", () => {
       let response = Admin.prototype.searchSingleUserByName(dbData.users[dbData.users.length - 1].username, "user");
        expect(response).toBe("Here is the result of the user you searched for");
    });
    test("Should check if admin can search an admin by name", () => {
        let response = Admin.prototype.searchSingleUserByName(dbData.admin[0].username, "admin");
        expect(response).toBe("Here is the result of the admin you searched for");
    });
    test("Should check if admin can search with wrong details", () => {
       let response = Admin.prototype.searchSingleUserByName("witehox", "user");
       let responseAdmin = Admin.prototype.searchSingleUserByName("bbb", "admin");
       expect(response).toBe("There is no user registered with this username");
       expect(responseAdmin).toBe("There is no user registered with this username");
    });
    test("Should check if admin can delete with a wrong id", () => {
        let response = Admin.prototype.deleteSingleUser(0, "user");
        expect(response).toBe("There is no user registered with this ID");
    });
    test("Should check if admin can delete a user", () => {
        let response = Admin.prototype.deleteSingleUser(dbData.users[dbData.users.length-1].id, "user");
        expect(response).toBe("Account successfully deleted");
    });
    test("If a user or wrong access tries to delete all users", () => {
        let response = Admin.prototype.deleteAllUsers("foreign");
        expect(response).toBe("Only admin is allowed to delete users data");
    });
    test("If admin can successfully delete all users", () => {
        let response = Admin.prototype.deleteAllUsers("admin");
        expect(response).toBe("All users have been deleted");
    });
    test("Should check if admin can read all orders", () => {
        expect(Admin.handling.readAllOrder()).toEqual(dbData.orders);
    });
    test("Should check if admin search non-existing order", () => {
        expect(Admin.handling.readOneOrder(0)).toBe("There is no order with this Id");
    });
    test("Should check if admin can read one order", () => {
            expect(Admin.handling.readOneOrder(dbData.orders[0].id)).toEqual([dbData.orders[0]]);
    });
    test("Should check if admin can delete with wrong access level", () => {
        expect(Admin.handling.deleteAllOrders("foreign")).toBe("Only admin is allowed to delete orders");
    });
    test("Should check if admin can delete all orders", () => {
        expect(Admin.handling.deleteAllOrders("admin")).toEqual([]);
    });
    test("Should check if admin can delete an order", () => {
        console.log(dbData.users[-2]);
        //expect(Admin.handling.deleteSingleOrder(dbData.users[dbData.users.length - 1].id, "admin")).toBe("The order has been deleted")
    });
});

describe("To test all order functionality", () => {
   test("If a user can't make an order with fake id", () => {
       let toBeTested = Users.prototype.makeOrder(0, "garri", "rice", "beans");
       expect(toBeTested).toBe("There is no user registered with this ID");
   });
   test("Should check for wrong access level on orders updates", () => {
       let response = Admin.handling.updateSingleOrder(1, "aaa", "bean");
       expect(response).toBe("You are not allowed to update any order");
   });
    test("Should check if orders can be updated", () => {
        let response = Admin.handling.updateSingleOrder(1, "admin", "bean");
        expect(response).toBe("The order has been successfully updated");
    });
});
