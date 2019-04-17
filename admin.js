let Users = require("./main");

function Admin(username, email, password, access) {
    Users.call(this, username, email, password, access);
}

Admin.prototype = Object.create(Users.prototype);
Admin.constructor = Admin;