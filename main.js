let fs = require('fs');
let Order = require('./Order');
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
        let response = "";
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
                response = "Your user account has been successfully created";
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
                response = "Your user account has been successfully created";
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
                response = "Your administrator account has been successfully created";
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
                response = "Your administrator account has been successfully created";
            }
        }
        else {
            response = "A user can not be created with this access level. Kindly use either admin or user";
        }
        console.log(response);
        return response;
    },
    searchSingleUserById : function(id, accountType) {
        this.id = id;
        this.searchType = accountType;
        let result = [];
        let response = "";
            if (this.searchType === "admin") {
                for(let i in dbData.admin) {
                    if(dbData.admin[i].id === this.id) {
                        result.pop();
                        result.push(dbData.admin[i]);
                    }
                }
            }
            else if(this.searchType === "user") {
                for (let i in dbData.users) {
                    if(dbData.users[i].id === this.id) {
                        result.pop();
                        result.push(dbData.users[i]);
                    }
                }
            }
            else {
                console.log("Kindly search using either users or an admin as account type");
                return "Kindly search using either users or an admin as account type";
            }
            if(result.length === 0) {
                console.log("User not found");
                response =  "User not found";
            }
            else {
                console.log(result);
                response = "Haha!.. Here you go.";
            }
            console.log(response);
            return response;
    },
    updateUser : function(username, password, newUsername, newEmail, newPassword, access) {
        this.username = username;
        this.newUsername = newUsername;
        this.password = password;
        this.newPassword = newPassword;
        this.access = access;
        this.newEmail = newEmail;

        let response = "";

        if(this.access === "admin") {
            for(let i in dbData.admin) {
                if(this.username === dbData.admin[i].username && this.password === dbData.admin[i].password) {
                    dbData.admin[i].username = this.newUsername;
                    dbData.admin[i].password = this.newPassword;
                    dbData.admin[i].email = this.newEmail;
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    response = "Your administrator account has been successfully updated";
                    break;
                }
                else {
                    response = "Incorrect username or password";
                }
            }
        }
        else if(this.access === "user") {
            for(let i in dbData.users) {
                if(this.username === dbData.users[i].username && this.password === dbData.users[i].password) {
                    dbData.users[i].username = this.newUsername;
                    dbData.users[i].password = this.newPassword;
                    dbData.users[i].email = this.newEmail;
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    response = "Your user account has been successfully updated";
                    break;
                }
                else {
                    response = "Incorrect username or password";
                }
            }
        }
        console.log(response);
        return response;
    },
    makeOrder : function(userId, ...userProducts) {
        this.userid = userId;
        this.userProducts = userProducts;

        let result = "";

        for(let i in dbData.users) {
            if (dbData.users[i].id === this.userid) {
                let newOrder = new Order();
                let OrderForm = newOrder.constructor.createOrder();
                OrderForm.products = this.userProducts;
                OrderForm.userid = this.userid;
                dbData.orders.push(OrderForm);
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                result = "Your order has been successfully made!.";
                break;
            }
            else {
                result = "There is no user registered with this ID";
            }
        }
        console.log(result);
        return result;
    }
};
Users.prototype.makeOrder(1, "fish");
module.exports = Users;