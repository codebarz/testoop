function Order(id, product, orderTime, orderDate) {
    this.id = id;
    this.product = product;
    let inDate = new Date();
    this.orderTime = `${inDate.getHours()}:${inDate.getMinutes()}`;
    this.orderDate = `${inDate.getDate()}/${inDate.getMonth()}/${inDate.getFullYear()}`;
    this.createOrder = function() {
        return new  Order(this.id, this.product, this.orderTime, this.orderDate);
    }
}
Order.prototype = {
    constructor : Order,
    createOrder : function() {
        return new  Order(this.id, this.product, this.orderTime, this.orderDate);
    }
};
console.log(Order.createOrder());

module.exports = Order;