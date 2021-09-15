const productCenter = document.querySelector(".product-center")

import { Products } from "./productData.js";



//  read product 
class products{
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


}



document.addEventListener("DOMContentLoaded", event => {
    const pruduct = new products();
    const productData=pruduct.readProduct
    const ui=new UI()
    ui.showProduct(productData)

})

