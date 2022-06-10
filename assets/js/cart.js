var products = [

    {
        id: 0,
        nameprice: 'product1',
        price: 100,
        quantity: 5,
        valuevoucher: 0.1,
    }, {

        id: 1,
        nameprice: 'product2',
        price: 50,
        quantity: 2,
        valuevoucher: 0.2,
    }
]

let totalPrice = products.reduce(function (a, b) {
    return a + (b.price * b.quantity * b.valuevoucher);
}, 1)
console.log(totalPrice)