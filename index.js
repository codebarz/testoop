let User = require("./main");
let Admin = require("./admin");
let Order = require("./order");
let db = require("./db");

//Create a user
let userOne = new User("michael", "oketegah@gmail.com", "1186", "user");
userOne.createUser();

//Update a user
console.log(User.prototype.updateUser("michael", "1186", "mikel", "oketegah@gmail.com", "1234", "user"));

//Search a single user by id
User.prototype.searchSingleUserById(1, "user");

//Create admin
let adminOne = new Admin("oke", "oke@gmail.com", "123", "admin");
adminOne.createUser();

//Make order with a user
User.prototype.makeOrder(1, 1, "eba", "milk");

//Update single order
Admin.handling.updateSingleOrder(1, "admin", "fish");

//Search all users
Admin.prototype.searchAllUsers("user");

//Search single user
Admin.prototype.searchSingleUserByName("michael", "user");

//Read all order
Admin.handling.readAllOrder();

//Read one order
Admin.handling.readOneOrder(1);

//Admin delete user
Admin.prototype.deleteSingleUser(2, "user");

//Admin delete all users
Admin.prototype.deleteAllUsers("admin");

//Delete single order
Admin.handling.deleteSingleOrder(1, "admin");

//Delete all orders
Admin.handling.deleteAllOrders("admin");

console.log(db);