let fs = require('fs');
let dbData = JSON.parse(fs.readFileSync('db.json'));
let ret = [];
function Order(...product) {
    this.product = product;
    let inDate = new Date();
    this.orderTime = `${inDate.getHours()}:${inDate.getMinutes()}`;
    this.orderDate = `${inDate.getDate()}/${inDate.getMonth()}/${inDate.getFullYear()}`;
}
Order.prototype.createOrder = function(id) {
    this.id = id;
    if(dbData.orders.length === 0) {
        this.id = 1
    }
    else {
        this.id = (dbData.orders[dbData.orders.length - 1].id) + 1
    }
    let ret = {
        userid: this.id,
        timeOfOrder: this.orderTime,
        dateOfOrder: this.orderDate,
        id: this.id,
        products: this.product
    };
    console.log(ret);
};
module.exports = Order;