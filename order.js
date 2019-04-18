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
    updateSingleOrder : function(orderid, access, ...newOrder) {
        this.id = orderid;
        this.newOrder = newOrder;
        this.access = access;
        let date = new Date();
        let updatedOn = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

        if (this.access === "admin") {
            for (let i in dbData.orders) {
                if(dbData.orders[i].id === this.id) {
                    dbData.orders[i].products = this.newOrder;
                    dbData.orders[i].updatedOn = updatedOn;
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    console.log("The order has been successfully updated");
                }
                else {
                    console.log("There is no Id with thi is user");
                }
            }
        }
        else {
            console.log("You are not allowed to update any order");
        }
    },
    deleteSingleOrder: function(id, access) {
        this.id = id;
        this.access = access;
        if(this.access === "admin") {
            for(let i in dbData.orders) {
                if(dbData.orders[i].id === this.id) {
                    dbData.orders.splice(i, 1);
                    fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
                    console.log(dbData);
                    return dbData.orders;
                }
                else {
                    console.log("No order was made with this ID");
                }
            }
        }
    },
    deleteAllOrders : function(access){
        this.access = access;
        if(access === "admin") {
            dbData.orders = [];
            fs.writeFileSync('db.json', JSON.stringify(dbData, null, 2));
            console.log(dbData);
            return dbData.orders;
        }
        else {
            console.log("Only admin is allowed to delete orders");
        }
    }
};
Order.prototype.updateSingleOrder(1, "admin", "rice", "beans");
module.exports = Order;