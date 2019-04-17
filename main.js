let fs = require('fs');
let dbData= JSON.parse(fs.readFileSync('db.json'));
let db = [];
function Users(username, email, password, access) {
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
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2))
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
        else if (this.access === "admin" || this.access === "administrator") {
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
                fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2))
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
    }
};