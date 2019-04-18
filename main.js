let fs = require('fs');
let order = require('./order');
let dbData = JSON.parse(fs.readFileSync('db.json'));

function Users (username, email, password, access) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.access = access;
}
Users.prototype = {
    constructor : Users,
    createUser : function(id) {
        if(this.access === "users" || this.access === "user") {
            this.id = id;
            if (dbData.users.length === 0) {
                this.id = 1;
                dbData.users.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                console.log("Your account has been successfully created");
            } else {
                this.id = (dbData.users[dbData.users.length - 1].id) + 1;
                dbData.users.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                console.log("Your account has been successfully created");
            }
        }
        else if (this.access === "admin") {
            this.id = id;
            if (dbData.admin.length === 0) {
                this.id = 1;
                dbData.admin.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                console.log("Your administrator account has been successfully created");
            } else {
                this.id = (dbData.admin[dbData.admin.length - 1].id) + 1;
                dbData.admin.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                console.log("Your administrator account has been successfully created");
            }
        }
        else {
            console.log("A user can not be created with this access level. Kindly use either admin or user");
        }
    },
    searchSingleUserById : function(id, accountType) {
        this.id = id;
        this.searchType = accountType;
            if (this.searchType === "admin") {
                for (let i in dbData.admin) {
                    dbData.admin[i].id === this.id ? console.log(dbData.admin[i]) : console.log("");
                    return dbData.admin[i];
                }
            }
            else if(this.searchType === "users") {
                for (let i in dbData.users) {
                    dbData.users[i].id === this.id ? console.log(dbData.users[i]) : console.log("");
                    return dbData.users[i];
                }
            }
            else {
                console.log("Kindly search using either users or an admin as account type");
                return "Kindly search using either users or an admin as account type";
            }
    },
    updateUser : function(username, password, newUsername, newEmail, newPassword, access) {
        this.username = username;
        this.newUsername = newUsername;
        this.password = password;
        this.newPassword = newPassword;
        this.access = access;
        this.newEmail = newEmail;

        if(this.access === "admin") {
            for(let i in dbData.admin) {
                if(this.username === dbData.admin[i].username && this.password === dbData.admin[i].password) {
                    dbData.admin[i].username = this.newUsername;
                    dbData.admin[i].password = this.newPassword;
                    dbData.admin[i].email = this.newEmail;
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    console.log("Your account has been successfully updated");
                }
                else {
                    console.log("Incorrect username or password");
                }
            }
        }
        else if(this.access === "users") {
            for(let i in dbData.users) {
                if(this.username === dbData.users[i].username && this.password === dbData.users[i].password) {
                    dbData.users[i].username = this.newUsername;
                    dbData.users[i].password = this.newPassword;
                    dbData.users[i].email = this.newEmail;
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    console.log("Your account has been successfully updated");
                }
                else {
                    console.log("Incorrect username or password");
                }
            }
        }
    },
    makeOrder : function(userId, ...userProducts) {
        this.userid = userId;
        this.userProducts = userProducts;
        let newOrder = new order();
        let orderForm = newOrder.constructor.prototype.createOrder();
        orderForm.products = this.userProducts;
        orderForm.userid = this.userid;
        dbData.orders.push(orderForm);
        fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
        return orderForm;
    }
};
module.exports = Users;