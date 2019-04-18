let Users = require("./main");
let Order = require("./order");
let fs = require('fs');
let dbData= JSON.parse(fs.readFileSync('db.json'));

function Admin(username, email, password, access) {
    Users.call(this, username, email, password, access);
}

Admin.prototype = Object.create(Users.prototype);
Admin.constructor = Admin;
Admin.prototype = {
    searchAllUsers: function(userType) {
        this.usertype = userType;
        if(this.usertype === "admin") {
            console.log(dbData.admin);
        }
        else if(this.usertype === "users") {
            console.log(dbData.users);
        }
        else {
            console.log("Kindly use either admin or users as the account type");
        }
    },
    searchSingleUserByName : function(username, accountType) {
        this.username = username;
        this.searchType = accountType;
        if (this.searchType === "admin") {
            for (let i in dbData.admin) {
                if (dbData.admin[i].username === this.username) {
                    console.log(dbData.admin[i]);
                } else {
                    console.log("There is no user registered with this username");
                }
            }
        }
        else if (this.searchType === "users") {
            for (let i in dbData.users) {
                if (dbData.users[i].username === this.username) {
                    console.log(dbData.users[i]);
                } else {
                    console.log("There is no user registered with this username");
                }
            }
        }
    },
    deleteSingleUser : function(id, accountType) {
        this.id = id;
        this.accountType = accountType;
        if(this.accountType === "admin") {
            for(let i in dbData.admin) {
                if(dbData.admin[i].id === this.id) {
                    dbData.admin.splice(i, 1);
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    console.log(dbData);
                }
                else {
                    console.log("There is no user registered with this ID");
                }
            }
        }
        if(this.accountType === "users") {
            for(let i in dbData.admin) {
                if(dbData.users[i].id === this.id) {
                    dbData.users.splice(i, 1);
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    console.log(dbData);
                }
                else {
                    console.log("There is no user registered with this ID");
                }
            }
        }
    },
    deleteAllUsers : function (access) {
        this.access = access;
        if(access === "admin") {
            dbData.users = [];
            fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
            console.log(dbData);
        }
        else {
            console.log("Only admin is allowed to delete users data");
        }
    }
};
Object.assign(Admin.prototype, Order.prototype);
module.exports = Admin;