const productCenter = document.querySelector(".product-center")
const btnCart = document.querySelector(".cart-btn")
const basket = document.querySelector(".module-dom")
const section = document.querySelector("section")
const body = document.querySelector("body")


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

            const ischeked = Cart.find(item => item.id ===parseInt)
            if (ischeked) {
                btn.innerText = "aaaaaaaaaaa"
                btn.style.color="red"
            }


            btn.addEventListener("click", addcart => {

                const str = new storage();
                // read product Previous and product new th
                const productItem = str.getproductCart(id);
                console.log(productItem)
                Cart = [...Cart, { productItem, quantity: 1 }]
                storage.setProductCart(Cart)
            })
        });
    }


}


class storage {
    // saved product in storage
    static savedStorage(products) {
        localStorage.setItem("products", JSON.stringify(products))
    }
    // read product in basket
    getproductCart(id) {
        const _products = JSON.parse(localStorage.getItem("products"))

        return _products.find(p => p.id === parseInt(id))
    }
    static setProductCart(cart) {
        return localStorage.setItem(("carts"), JSON.stringify(cart))
    }

}



document.addEventListener("DOMContentLoaded", event => {
    const pruduct = new products();
    const productData = pruduct.readProduct
    const ui = new UI()
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

    basket.style.transform = "translateY(-100vh)";
    basket.style.opacity = "0";

}



