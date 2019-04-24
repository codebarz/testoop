let db = require("./db");
function Order() {
}
Order.createOrder = function(id, userid, ...products) {
    this.id = id;
    this.userid = userid;
    this.products = products[0];
    console.log(this.products);
    let inDate = new Date();
    this.orderTime = `${inDate.getHours()}:${inDate.getMinutes()}`;
    this.orderDate = `${inDate.getDate()}/${inDate.getMonth()}/${inDate.getFullYear()}`;

    if(db.orders.length === 0) {
        this.id = 1;
        db.orders.push({
            timeOfOrder: this.orderTime,
            dateOfOrder: this.orderDate,
            id: this.id,
            userid: this.userid,
            products : this.products
        });
    }
    else {
        this.id = (db.orders[db.orders.length - 1].id) + 1;
        db.orders.push({
            timeOfOrder: this.orderTime,
            dateOfOrder: this.orderDate,
            id: this.id,
            userid: this.userid,
            products : this.products
        });
    }
    console.log(db.orders);
    console.log("Order successfully created");
    return "Order successfully created";
};
Order.action = {
    readAllOrder : function () {
        console.log(db.orders);
        return db.orders;
    },
    readOneOrder : function (orderid) {
        this.orderid = orderid;
        let result = [];
        if (db.orders.length > 0) {
            for(let i in db.orders) {
                if(db.orders[i].id === this.orderid) {
                    result.pop();
                    result.push(db.orders[i]);
                    break;
                }
            }
        }
        else {
            console.log("There are currently no orders");
            return "There are currently no orders";
        }
            console.log(result);
            return result;
    },
    updateSingleOrder : function(orderid, access, ...newOrder) {
        this.id = orderid;
        this.newOrder = newOrder;
        this.access = access;
        let date = new Date();
        let updatedOn = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;

        let result = "";

        if (this.access === "admin") {
            for (let i in db.orders) {
                if(db.orders[i].id === this.id) {
                    db.orders[i].products = this.newOrder;
                    db.orders[i].updatedOn = updatedOn;
                    result = "The order has been successfully updated";
                    console.log(db.orders);
                    break;
                }
            }
        }
        else {
            result = "You are not allowed to update any order";
        }
        console.log(result);
        return result;
    },
    deleteSingleOrder: function(id, access) {
        this.id = id;
        this.access = access;

        let result = "";
        console.log(db.orders);

        if(this.access === "admin") {
            for(let i in db.orders) {
                if(db.orders[i].id === this.id) {
                    db.orders.splice(i, 1);
                    result = "The order has been deleted";
                    console.log("order deleted" + db.orders);
                    break;
                }
            }
        }

        console.log(result);
        return result;

    },
    deleteAllOrders : function(access){
        this.access = access;
        if(access === "admin") {
            db.orders = [];
            console.log("Orders deleted" + db.orders);
            return [];
        }
        else {
            console.log("Only admin is allowed to delete orders");
            return "Only admin is allowed to delete orders";
        }
    }
};
module.exports = Order;