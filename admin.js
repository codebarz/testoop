let Users = require("./main");
let Order = require("./order");
let fs = require('fs');
let dbData= JSON.parse(fs.readFileSync('db.json'));

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
        console.log(dbData.admin);
    }
    else if(this.usertype === "user") {
        response = "Here are your search results for users";
        console.log(dbData.users);
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
        for (let i in dbData.admin) {
            if (dbData.admin[i].username === this.username) {
                response = "Here is the result of the admin you searched for";
                console.log(dbData.admin[i]);
            } else {
                response = "There is no user registered with this username";
            }
        }
    }
    else if (this.searchType === "user") {
        for (let i in dbData.users) {
            if (dbData.users[i].username === this.username) {
                response = "Here is the result of the user you searched for";
                console.log(dbData.users[i]);
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

    let response = "";

    if(this.accountType === "admin") {
        for(let i in dbData.admin) {
            if(dbData.admin[i].id === this.id) {
                dbData.admin.splice(i, 1);
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                console.log(dbData.admin);
                response = "Account successfully deleted";
            }
            else {
                response = "There is no user registered with this ID";
            }
        }
    }
    if(this.accountType === "user") {
        for(let i in dbData.users) {
            if(dbData.users[i].id === this.id) {
                dbData.users.splice(i, 1);
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                console.log(dbData.users);
                response = "Account successfully deleted";
            }
            else {
                response = "There is no user registered with this ID";
            }
        }
    }
    console.log(response);
    return response;
};
Admin.prototype.deleteAllUsers = function (access) {
    this.access = access;
    if(access === "admin") {
        dbData.users = [];
        fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
        console.log(dbData);
    }
    else {
        console.log("Only admin is allowed to delete users data");
    }
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
        this.newOrder = newOrder;
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
Admin.handling.deleteSingleOrder(3, "admin");
module.exports = Admin;