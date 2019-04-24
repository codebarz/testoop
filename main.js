let fs = require('fs');
let Order = require('./Order');
let db = require("./db");

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
            if (db.users.length === 0) {
                this.id = 1;
                db.users.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                response = "Your user account has been successfully created";
                console.log(db.users[0]);
            } else {
                this.id = (db.users[db.users.length - 1].id) + 1;
                db.users.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                response = "Your user account has been successfully created";
                console.log(db.users[0]);
            }
        }
        else if (this.access === "admin") {
            this.id = id;
            if (db.admin.length === 0) {
                this.id = 1;
                db.admin.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                response = "Your administrator account has been successfully created";
                console.log(db.admin[0]);
            } else {
                this.id = (db.admin[db.admin.length - 1].id) + 1;
                db.admin.push({
                    id: this.id,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    access: this.access
                });
                response = "Your administrator account has been successfully created";
                console.log(db.admin[0]);
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
                for(let i in db.admin) {
                    if(db.admin[i].id === this.id) {
                        result.pop();
                        result.push(db.admin[i]);
                    }
                }
            }
            else if(this.searchType === "user") {
                for (let i in db.users) {
                    if(db.users[i].id === this.id) {
                        result.pop();
                        result.push(db.users[i]);
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

        if(this.access === "user") {
            for(let i in db.users) {
                if(this.username === db.users[i].username && this.password === db.users[i].password) {
                    db.users[i].username = this.newUsername;
                    db.users[i].password = this.newPassword;
                    db.users[i].email = this.newEmail;
                    response = "Your user account has been successfully updated";
                    console.log(db.users[0]);
                    break;
                }
                else {
                    response = "Incorrect username or password";
                }
                console.log(db.users[i]);
            }
        }
        console.log(response);
        return response;
    },
    makeOrder : function(id, userid, ...products) {
        this.id = id;
        this.userid = userid;
        this.products = products;
        return Order.createOrder(this.id, this.userid, this.products);
    }
};
module.exports = Users;