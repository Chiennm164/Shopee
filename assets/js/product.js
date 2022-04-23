let carts = [

    {
        id: 0,
        name: 'sanpham1',
        vote: 4.7,
        rate: 5,
        address: "Vinh",
        img: "0",
        color: 2,
        getColor: function() {
            switch (this.color) {
                case 1:
                    console.log('mau đỏ nhân 1 giá')
                    return 1;
                case 2:
                    console.log('mau đỏ nhân 2 giá')
                    return 2;
                case 3:
                    console.log('mau đỏ nhân 3 giá')
                    return 3;
                case 4:
                    console.log('mau đỏ nhân 4 giá')
                    return 4;
            }
        },
        size: 2,
        getSize: function() {
            switch (this.size) {
                case 1:
                    console.log('size 41')
                    return 1;
                case 2:
                    console.log('size 42')
                    return 2;
                case 3:
                    console.log('size 43')
                    return 3;
                case 4:
                    console.log('size 44')
                    return 4;
            }
        },
        // voucher: 2,
        // getVoucher: function() {
        //     switch (this.voucher) {
        //         case 1:
        //             console.log('giảm 10%')
        //             return 0.1;
        //         case 2:
        //             console.log('giảm 20%')
        //             return 0.2;
        //         case 3:
        //             console.log('giảm 30%')
        //             return 0.3;
        //         case 4:
        //             console.log('giảm 40%')
        //             return 0.4;
        //     }
        // },
        price: 100,
        getPrice: function() {
            return this.price * this.getColor() * this.getSize()
        },
        voucher: [{
                id: 0,
                voucher: 1,
            },

            {
                id: 1,
                voucher: 1,
            },

            {
                id: 2,
                voucher: 1,
            },

            {
                id: 3,
                voucher: 1,
            },
        ]
    }
]

// var gia = carts[0].getPrice() - (carts[0].getPrice() * carts[0].getVoucher())
// console.log(gia)
console.log(carts[0].voucher[0].id)