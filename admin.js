let Users = require("./main");
let Order = require("./order");
let db = require("./db");

function Admin(username, email, password, access) {
    Users.call(this, username, email, password, access);
}

Admin.prototype = Object.create(Users.prototype);
Admin.constructor = Admin;
Admin.prototype.searchAllUsers = function(userType) {
    this.usertype = userType;

    let response = "";

    if(this.usertype === "admin") {
        response = "Here are your search results for admin";
        console.log(db.admin);
    }
    else if(this.usertype === "user") {
        response = "Here are your search results for users";
        console.log(db.users);
    }
    else {
        response = "Kindly use either admin or user as the account type";
    }
    console.log(response);
    return response;
};
Admin.prototype.searchSingleUserByName = function(username, accountType) {
    this.username = username;
    this.searchType = accountType;

    let response = "";

    if (this.searchType === "admin") {
        for (let i in db.admin) {
            if (db.admin[i].username === this.username) {
                response = "Here is the result of the admin you searched for";
                console.log("Single user result" + db.admin[i]);
                break;
            } else {
                response = "There is no user registered with this username";
            }
        }
    }
    else if (this.searchType === "user") {
        for (let i in db.users) {
            if (db.users[i].username === this.username) {
                response = "Here is the result of the user you searched for";
                console.log("single user result" + db.users[i]);
            } else {
                response = "There is no user registered with this username";
            }
        }
    }
    console.log(response);
    return response;
};
Admin.prototype.deleteSingleUser = function(id, accountType) {
    this.id = id;
    this.accountType = accountType;
    console.log(db.users);
    let response = "";

    if(this.accountType === "user") {
        for(let i in db.users) {
            if(db.users[i].id === this.id) {
                db.users.splice(i, 1);
                console.log(db.users);
                response = "Account successfully deleted";
                break;
            }
            else {
                response = "There is no user registered with this ID";
            }
        }
    }
    else {
        response = "Kindly use a valid account type";
    }
    console.log(response);
    return response;
};
Admin.prototype.deleteAllUsers = function (access) {
    this.access = access;

    let response = "";

    if(access === "admin") {
        db.users = [];
        console.log(db.users);
        response = "All users have been deleted";
    }
    else {
        response = "Only admin is allowed to delete users data";
    }
    console.log(response);
    return response;
};

Admin.handling = {
    readAllOrder : function () {
        return Order.action.readAllOrder();
    },
    readOneOrder : function (orderid) {
        this.id = orderid;
        return Order.action.readOneOrder(this.id);
    },
    updateSingleOrder : function(orderid, access, ...newOrder) {
        this.orderid = orderid;
        this.access = access;
        this.newOrder = newOrder[0];
        return Order.action.updateSingleOrder(this.orderid, this.access, this.newOrder);
    },
    deleteSingleOrder : function(id, access) {
        this.id = id;
        this.access = access;
        return Order.action.deleteSingleOrder(this.id, this.access);
    },
    deleteAllOrders : function (access) {
        this.access = access;
        return Order.action.deleteAllOrders(this.access);
    }
};
module.exports = Admin;