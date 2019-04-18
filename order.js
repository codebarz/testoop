let fs = require('fs');
let dbData = JSON.parse(fs.readFileSync('db.json'));
let ret = [];
function Order() {
}
Order.prototype = {
    constructor: Order,
    createOrder : function(id) {
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
    }
};
module.exports = Order;