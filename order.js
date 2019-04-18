let fs = require('fs');
let dbData = JSON.parse(fs.readFileSync('db.json'));
let ret = [];
function Order() {
}
Order.createOrder = function(id) {
    this.id = id;
    let inDate = new Date();
    this.orderTime = `${inDate.getHours()}:${inDate.getMinutes()}`;
    this.orderDate = `${inDate.getDate()}/${inDate.getMonth()}/${inDate.getFullYear()}`;
    if(dbData.orders.length === 0) {
        this.id = 1
    }
    else {
        this.id = (dbData.orders[dbData.orders.length - 1].id) + 1
    }
    let ret = {
        timeOfOrder: this.orderTime,
        dateOfOrder: this.orderDate,
        id: this.id
    };
    //console.log(ret);
    return ret;
};
Order.prototype = {
    constructor: Order,
    readAllOrder : function () {
        console.log(dbData.orders);
        return dbData.orders;
    },
    readOneOrder : function (orderid) {
        this.orderid = orderid;
        let result = [];
        for(let i in dbData.orders) {
            if(dbData.orders[i].id === this.orderid) {
                result.pop();
                result.push(dbData.orders[i]);
            }
        }
        if(result.length === 0) {
            console.log("There is no order with this Id");
            return "There is no order with this Id";
        }
        else {
            console.log(result);
            return result;
        }
    },
    deleteOneOrder : function(access){
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
module.exports = Order;