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
        this.id = id;
        if(dbData.length === 0) {
            this.id = 1;
            dbData.push({id : this.id, username : this.username, email: this.email, password: this.password, access : this.access});
            fs.writeFileSync('db.json', JSON.stringify(dbData,null,2))
        }
        else {
            this.id = (dbData[dbData.length-1].id) + 1;
            dbData.push({id : this.id, username : this.username, email: this.email, password: this.password, access : this.access});
            fs.writeFileSync('db.json', JSON.stringify(dbData,null,2));
        }
    }
};

let userOne = new Users("oketega", "oketegah@gmail.com", "1234", "admin");
let userTwo = new Users("mike", "mike@gmail.com", "1234", "user");
let userThree = new Users("mike", "mikel@gmail.com", "5234", "user");
let userFour = new Users("Tolu", "tolu@yahoo.com", "3344", "user");
let userFive = new Users("Ibrahim", "josephibrahi@gmail.com", "3388", "admin");
userFive.createUser();

console.log(dbData);
//let a=[];
//let data1=[];
 //var data = fs.readFileSync('db.json', 'utf8', function (error, data) {
   //return JSON.parse(data)
     //return data;
//});

//console.log(data);
 //a.push.apply(a,data1) ;
//a.push.apply(a,data) ;

//data.push({name: 1});
 //console.log(a);