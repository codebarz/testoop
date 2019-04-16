let users = [];
let admin = [];

function Users(username, email, password, id, access) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.id = id;
    this.access = access;
}
Users.prototype = {
    constructor : Users,
    createUser : function() {
        users.push({id : this.id, username : this.username, email: this.email, password: this.password, access : this.access})
    }
};

let userOne = new Users(1, "oketega", "oketegah@gmail.com", "1234", "admin");
let userTwo = new Users(2, "mike", "mike@gmail.com", "1234", "user");
userOne.createUser();
userTwo.createUser();
console.log(userOne);
console.log(userTwo);
console.log(users);