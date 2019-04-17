let Users = require("./main");
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
  }
};

Admin.prototype.searchAllUsers("admin");