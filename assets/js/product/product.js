const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const apiUser = "http://localhost:3000/user";
const apiProduct = "http://localhost:3000/products";



function start() {
    renderProduct()
}
start()


function renderProduct() {
    const selectProduct = JSON.parse(localStorage.getItem("productSelect"))
    const wrap = $('.product-briefing-wrap')
    const wrap2 = $('.product-about__description-content')
    const wrap3 = $('.product-about__details p')

    console.log(wrap2, wrap3);
    let htmlOption = ''
    console.log(selectProduct.detail);
    selectProduct.option.forEach(element => {
        let name = element.shift()
        let listItemOption = element.map((e) => {
            return `<a class="product-option__color-items">${e}</a>`
        }).join('')
        htmlOption += `   <div class="product-option__items">
        <div class="product-option__items-name"> ${name}
        </div>
        <div class="product-option__items-content product-option__color">
           ${listItemOption}
        </div>
        </div>`
    });
    wrap.innerHTML = ` <div class="product-briefing">
                            <div class="product-briefing__img">
                            </div>
                            <div class="product-briefing__slider">
                                <div class="product-briefing__slider-items">
                                </div>
                                <div class="product-briefing__slider-items">
                                </div>
                                <div class="product-briefing__slider-items">
                                </div>
                                <div class="product-briefing__slider-items">
                                </div>
                                <div class="product-briefing__slider-items">
                                </div>
                            </div>
                            <div class="product-briefing__group">
                                <div class="product-briefing__sharing">
                                    <p>Chia sẻ :</p>
                                    <i class="ti-instagram"></i>
                                    <i class="ti-facebook"></i>
                                    <i class="ti-pinterest"></i>
                                    <i class="ti-twitter"></i>
                                </div>
                                <div class="product-briefing__vote">
                                    <i class="ti-heart"></i>
                                    <p>Đã thích (6,8k)</p>
                                </div>
                            </div>
                        </div>
                        <div class="product-option">
                            <div class="product-option-wrap">
                                <div class="product-option__title">
                                    <p>${selectProduct.name}</p>
                                </div>
                                <div class="product-option__vote">
                                    <div class="product-option__vote-rate">
                                        <span>0.0</span>
                                        <i class="ti-star"></i>
                                        <i class="ti-star"></i>
                                        <i class="ti-star"></i>
                                        <i class="ti-star"></i>
                                        <i class="ti-star"></i>
                                    </div>
                                    <div class="product-option__vote-review">
                                        <p>5.7k đánh giá</p>
                                    </div>
                                    <div class="product-option__vote-sold">
                                        <p>${(selectProduct.sold / 1000).toFixed(1)}k đã bán</p>
                                    </div>
                                </div>
                                <div class="product-option__list-items">
                                    <div class="product-option__items">
                                        <div class="product-option__items-name">Mã Giảm Giá Của Shop</div>
                                        <div class="product-option__items-content product-option__voucher">
                                            <i>${selectProduct.voucher}%</i>
                                            
                                        </div>
                                    </div>
                                    <div class="product-option__items">
                                        <div class="product-option__items-name">Vận Chuyển
                                        </div>
                                        <div class="product-option__items-content product-option__transport">
                                            <div class="product-option__transport-to">
                                                <i class="ti-truck"></i>
                                                <p>Vận chuyển tới : TP Vinh .</p>
                                            </div>
                                            <div class="product-option__transport-price">
                                                <p>Phí vận chuyển : 1.000 đ. </p>
                                            </div>
                                        </div>
                                    </div>
                                    ${htmlOption}
                                    <div class="product-option__items">
                                        <div class="product-option__items-name">Số Lượng</div>
                                        <div class="product-option__items-content product-option__amount">
                                            <div class="product-option__amount-number">
                                                <i class="ti-minus"></i>
                                                <input type="text">
                                                <i class="ti-plus"></i>
                                            </div>
                                            <p class="product-option__amount-inventory">${selectProduct.amount} sản phẩm </p>
                                        </div>
                                    </div>
                                    <div class="product-option__items">
                                        <button class="product-option__btn-addcart">
                                            Thêm vào giỏ hàng</button>
                                        <button class="product-option__btn-submit">Mua Ngay</button>
                                    </div>
                                    <div class="product-option__items">
                                        <div class="product-option__items-note">
                                            <p> Shopee Đảm Bảo </p>
                                            <p>3 Ngày Trả Hàng / Hoàn Tiền </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
    wrap2.innerHTML = selectProduct.detail.map((value) => {
        return ` <div class="product-about__description-content-wrap">
        <div class="product-about__description-content-left">${value[0]}</div>
        <div class="product-about__description-content-right">${value[1]}</div>
         </div> `
    }).join('');
    wrap3.innerHTML = selectProduct.describe.map((value) => {
        return `${value}<br/> `
    }).join('');
}