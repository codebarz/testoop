let updateUser = function(username, password, newUsername, newEmail, newPassword, access) {
    this.username = username;
    this.newUsername = newUsername;
    this.password = password;
    this.newPassword = newPassword;
    this.access = access;
    this.newEmail = newEmail;

    let response = "";

    if(this.access === "admin") {
        for(let i in db.admin) {
            if(this.username === db.admin[i].username && this.password === db.admin[i].password) {
                db.admin[i].username = this.newUsername;
                db.admin[i].password = this.newPassword;
                db.admin[i].email = this.newEmail;;
                response = "Your administrator account has been successfully updated";
                console.log(db.admin[0]);
                break;
            }
            else {
                response = "Incorrect username or password";
            }
        }
    }
    else if(this.access === "user") {
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
};