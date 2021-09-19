const productCenter = document.querySelector(".product-center")
const btnCart = document.querySelector(".cart-btn")
const basket = document.querySelector(".module-dom")
const section = document.querySelector("section")
const body = document.querySelector("body")
const sumPriceDom = document.querySelector(".sum-price")
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".product-basket")



import { Products } from "./productData.js";

let Cart = [];

//  read product 
class products {
    get readProduct() {
        return Products;
    }
}


// show product in html

class UI {

    showProduct(pruducts) {
        let result = "";
        pruducts.forEach(item => {
            result += ` <section class="product">
            <div class="image-container">
                <img src="${item.imageUrl}" alt="p -1" class="product-image">
            </div>
            <div class="product-des">
                <p class="product-title"> <strong>${item.title}</strong> </p><br>

                <p class=" discont-price"> <span class="discount">33%</span> <sub><del>30000</del> </sub> </p>
                <p class="product-price">

                    <strong>
                        ${item.price}
                    </strong>
                </p>
            </div>
            <!-- <div class="btn-box"> -->
            <button class="add-to-cart" data-id=${item.id}> add to cart </button>
            <!-- </div> -->

        </section>`
            productCenter.innerHTML = result;



        })
    }
    addBasket() {
        const btnAdd = document.querySelectorAll(".add-to-cart")

        const btnItem = [...btnAdd]
        btnItem.forEach(btn => {
            const id = btn.dataset.id
            const ischeked = Cart.find(item => item.id === parseInt(id))


            if (ischeked) {
                btn.innerText = "ثبت شده"
                btn.style.color = "red"
            }





            btn.addEventListener("click", event => {
                event.target.innerText = "ثبت شده"
                event.target.style.color = "red";
                event.target.disabaled = true;

                // read product Previous and product new th
                const productItem = { ...storage.getproductCart(id), quantity: 1 };
                console.log(productItem)
                Cart = [...Cart, productItem]
                console.log(productItem)
                storage.setProductCart(Cart)
                this.setSumPrice(Cart);
                this.addProductItem(productItem)

            })
        });

    }
    setSumPrice(Cart) {
        let sum = 0;
        const sumPrice = Cart.reduce((acc, curr) => {
            sum += curr.quantity;
            return acc + curr.quantity * curr.price;

        }, 0)
        sumPriceDom.innerText = `مبلغ کل${sumPrice.toFixed(3)}`
        cartItems.innerText = sum;


    }
    addProductItem(itemproduct) {
        const div = document.createElement("div");
        div.classList.add("product-child")
        div.innerHTML = `     <img class="image-product-dhild" src="${itemproduct.imageUrl}" alt="">
        <div class="item-product">
            <div class="contaner-product">
                <div class="title-and-price">
                    <h3>
                        ${itemproduct.title}
                    </h3>
                    <h6>
                    ${itemproduct.price}

                    </h6>
                </div>
                <div class="number-product">
                    <i class="fas fa-sort-up"></i>
                    <span>
                        ${itemproduct.quantity}
                    </span>
                    <i class="fas fa-caret-down"></i>
                </div>
            </div>
        </div>`
        cartContent.appendChild(div);
    }
    setUp() {
        Cart = storage.getcart() || [];
        Cart.forEach(element => this.addProductItem(element))
        this.setSumPrice(Cart);


    }


}


class storage {
    // saved product in storage
    static savedStorage(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    // read product in basket
    static getproductCart(id) {
        const _products = JSON.parse(localStorage.getItem("products"))

        return _products.find(p => p.id === parseInt(id))
    }
    static setProductCart(cart) {
        return localStorage.setItem(("carts"), JSON.stringify(cart))
    }
    static getcart() {
        return JSON.parse(localStorage.getItem("carts"))

    }

}



document.addEventListener("DOMContentLoaded", event => {
    const pruduct = new products();
    const productData = pruduct.readProduct
    const ui = new UI()
    ui.setUp();
    ui.showProduct(productData)
    storage.savedStorage(productData);
    ui.addBasket();



})

btnCart.addEventListener("click", addToCart);
function addToCart(e) {
    basket.style.transform = "translateY(20vh)";
    basket.style.opacity = "1";
    basket.classList.add("close");


}
section.addEventListener("click", closeBasket);

function closeBasket() {

    basket.style.transform = "translateY(-400vh)";
    basket.style.opacity = "0";

}



