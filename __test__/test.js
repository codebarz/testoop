let fs = require('fs');
const users = require("../main");
const admin = require("../admin");
const order = require("../order");
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
    test("should check if a user was successfully created", () => {
        let createdUser = [];
        let newUser = new users("whitehox", "white@gmail.com", "123", "admin");
        createdUser.push(JSON.stringify(newUser));
        expect(createdUser).toEqual([ '{"username":"whitehox","email":"white@gmail.com","password":"123","access":"admin"}' ]);
    });
    test("should check if a  user can be checked with his ID", () => {
        let result = [];
        let search = users.prototype.searchSingleUserById(1, "admin");
        result.push(search);
        expect(result).toEqual([{ id: 1, username: 'white', email: 'whitehox@gmail.com', password: '1234', access: 'admin' }]);
        expect(result).toBeDefined();
    })
});

describe("To test all administrator priviledges", () => {

});

describe("To test all order functionality", () => {
   test("If a user can successfully make an order with", () => {
       let result = [];
       let inDate = new Date();
       let orderTime = `${inDate.getHours()}:${inDate.getMinutes()}`;
       let orderDate = `${inDate.getDate()}/${inDate.getMonth()}/${inDate.getFullYear()}`;
       let currentid = checkId();
       let toBeTested = users.prototype.makeOrder(2, "garri", "rice", "beans");
       result.push(toBeTested);
       expect(result).toEqual([{ userid: 2, timeOfOrder: orderTime, dateOfOrder: orderDate, id: currentid, products: [ 'garri', 'rice', 'beans' ] }]);
   });
   test("If admin can read all users", () => {
      let result = admin.prototype.readAllOrder();
      expect(result).toEqual(dbData.orders);
   });
   test("If admin can read one user", () => {
       let result;
       result = admin.prototype.readOneOrder(2);
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
