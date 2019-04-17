let fs = require('fs');
let loggedInUser = [];
let dbData= JSON.parse(fs.readFileSync('db.json'));

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
    searchUserById : function(id, access, searchType) {
        this.id = id;
        this.access = access;
        this.searchType = searchType;
        if(this.access === "admin") {
            if (this.searchType === "admin") {
                for (let i in dbData.admin) {
                    if (dbData.admin[i].id === this.id) {
                        console.log(dbData.admin[i]);
                    }
                    else {
                        console.log("User does not exist");
                    }
                }
            }
            else if(this.searchType === "users") {
                for (let i in dbData.admin) {
                    if (dbData.admin[i].id === this.id) {
                        console.log(dbData.admin[i]);
                    }
                    else {
                        console.log("User does not exist");
                    }
                }
            }
            else {
                console.log("Kindly search for either a user or an admin");
            }
        }
    },
    updateUser : function(id, username, access) {
        this.id = id;
        this.username = username;
        this.access = access;

        if(this.access === "admin") {

        }
    }
};
//Users.prototype.searchUserById(1, "admin", "admin");

module.exports = Users;