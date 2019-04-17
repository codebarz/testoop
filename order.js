function Order(id, product, orderTime, orderDate) {
    this.id = id;
    this.product = product;
    this.orderTime = orderTime;
    this.orderDate = orderDate;
}

module.exports = Order;