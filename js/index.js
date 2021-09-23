const productCenter = document.querySelector(".product-center")
const btnCart = document.querySelector(".cart-btn")
const basket = document.querySelector(".module-dom")
const section = document.querySelector("section")
const body = document.querySelector("body")
const sumPriceDom = document.querySelector(".sum-price")
const cartItems = document.querySelector(".cart-items");
const cartContent = document.querySelector(".product-basket")
const btnTrash = document.querySelector(".fa-trash")
const btnCleareAll = document.querySelector(".dlete")



import { Products } from "./productData.js";
import { showAndCloseNotfiction } from "./notification.js";
let Cart = [];

//  read product 
class products {
    get readProduct() {
        return Products;
    }
}
let buttnsDOM = [];
let x;

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
        const btnAdd = [...document.querySelectorAll(".add-to-cart")]
        buttnsDOM = btnAdd;


        const btnItem = [...btnAdd]
        btnItem.forEach(btn => {
            const id = btn.dataset.id
            const ischeked = Cart.find(item => item.id === parseInt(id))


            if (ischeked) {
                btn.innerText = "ثبت شده"

            }





            btn.addEventListener("click", event => {

                event.target.innerText = "ثبت شده"

                event.target.disabaled = true;
           showAndCloseNotfiction(x)
              

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
        sumPriceDom.innerText = `مبلغ کل${sumPrice.toFixed()}`
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
                    <i class="fas fa-sort-up"  data-id=${itemproduct.id}></i>
                    <span>
                        ${itemproduct.quantity}
                    </span>
                    <i class="fas fa-caret-down  data-id=${itemproduct.id}"></i>
                </div>
                <i class="fa fa-trash" aria-hidden="true" data-id=${itemproduct.id}></i>
            </div>
        </div>`
        cartContent.appendChild(div);

    }
    setUp() {
        Cart = storage.getcart() || [];
        Cart.forEach(element => this.addProductItem(element))
        this.setSumPrice(Cart);
        basket.style.transform = "translateY(-400vh)";
        basket.style.opacity = "0"


    }
    cartLogic() {
        btnCleareAll.addEventListener("click", () => this.removeDOm())
        cartContent.addEventListener("click", event => {
            if (event.target.classList.contains("fa-sort-up")) {
                //  get item from cart
                const addQuntity = event.target;
                const addedItem = Cart.find(i => i.id == addQuntity.dataset.id);
                addedItem.quantity++
                // update cart value
                this.setSumPrice(Cart)


                // save cart
                storage.setProductCart(Cart)

                //update in ui
                addQuntity.nextElementSibling.innerText = addedItem.quantity

            }
            else if (event.target.classList.contains("fa-trash")) {
                const remove1 = event.target;
                // read product 
                const _removeItem = Cart.find(item => item.id == remove1.dataset.id);
                // remove product 
                this.removeItem(_removeItem.id)
                // saved product
                storage.setProductCart(Cart)
                // remove in ui
                cartContent.removeChild(remove1.parentElement.parentElement.parentElement)

            }

        })
    }
    removeDOm() {
        Cart.forEach(cItem => this.removeItem(cItem.id))
        console.log(cartContent.children)
        while (cartContent.children.length) {
            cartContent.removeChild(cartContent.children[0])
        }
        closeBasket();

    }
    removeItem(id) {
        // read product id
        Cart = Cart.filter(item => item.id !== id);
        // save product in cart
        storage.setProductCart(Cart);
        // update sum price in basket
        this.setSumPrice(Cart)

        this.getSingleButtons(id);

    }
    getSingleButtons(id) {
        const buttns = buttnsDOM.find(btn => parseInt(btn.dataset.id) === parseInt(id));
        buttns.innerText = "اضافه به سبد خرید"
        buttns.disabaled = false;
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
    ui.cartLogic();



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



