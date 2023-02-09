let cart= document.querySelector('.cart__blocks');
window.addEventListener('click', more);


function more(e){
   const tar = e.target;

   let kilk = tar.closest('.quantity').querySelector('.quantity__text');
   if(tar.closest('.quantity-plus')){
     kilk.innerText = ++kilk.innerText;
   }

   if(tar.closest('.quantity-minus')){
      if(kilk.innerText > 1){
         kilk.innerText = --kilk.innerText;
      }
       else if(tar.closest('.cart__blocks')&& parseInt(kilk.innerText)==1){
         tar.closest('.cart__block').remove();

         toggleCartStatus();
         calcCARTpRICE();
      }
      
   }
   //перевіряємо клік на + або - всередині корзини
   if(tar.hasAttribute('data-action')&& tar.closest('.cart__blocks') ){
      calcCARTpRICE()
   }
      }



window.addEventListener('click', function(e){
   if(e.target.hasAttribute('data-btn')){
      const item = e.target.closest('.item');
      console.log(item )

      //зібрати дані і записати в обєкт

      const productInfo = {
         
         id: item.dataset.id,
         img: item.querySelector('img').getAttribute('src'),
         title:item.querySelector('.content-item__title').innerText,
         quantityText: item.querySelector('.quantity__text').innerText,
         quantityPruse: item.querySelector('.quantity__prise').innerText,
      }
      // перевіряємо чи є такий елемент в корзині
      const itemIncart = cart.querySelector(`[data-id="${productInfo.id}"]`)
      //перевіряємо чи є товар в корзині, якщо так то збільшити кількість
      if(itemIncart){
         const counterElement = itemIncart.querySelector('[data-counter]');
         console.log(counterElement)
         counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.quantityText);
      }
      else {
         console.log(productInfo)
         const cartItemHtml = 
         `
         <div data-id="${productInfo.id}" class="cart__block block-cart">
         <div class="block-cart__img">
            <img src="${productInfo.img}">
         </div>
         <div class="block-cart__content ">
            <div class="block-cart__title">${productInfo.title}</div>
            <div class="content-item__quantity quantity quantity-in-cart">
               <div data-action class="quantity-minus">-</div>
               <div class="quantity__text" data-counter>${productInfo.quantityText}</div>
               <div data-action class="quantity-plus" >+</div>
               <div class="quantity__prise">${productInfo.quantityPruse}</div>
            </div>
         </div>
      </div>
         `
         
         cart.insertAdjacentHTML('beforeend',cartItemHtml);
         
      }
      item.querySelector('[data-counter]').innerText = "1";
      //функція відобрадення статусу корзини пуста\повна
      toggleCartStatus();
      calcCARTpRICE();
   }
   
})

function toggleCartStatus(){
   const cartEmptyBadge = document.querySelector('[data-cart-empty]');
   const orderBlock = document.querySelector('#order-form');

   console.log(cartEmptyBadge)
   if(cart.children.length > 0){
      cartEmptyBadge.classList.add('none');
      orderBlock.classList.remove('none');
   } else {
      cartEmptyBadge.classList.remove('none')
      orderBlock.classList.add('none');
   }
}
function calcCARTpRICE(){
   // cart.
   const cartItem = document.querySelectorAll('.cart__block');
 let totalPrice = 0;
 const totalPricEl = document.querySelector('.total-price');

 //обходито всі блоки з товарами в корзині
   cartItem.forEach(function (item) {

   //находимо кількість товару
      const amountEl = item.querySelector('[data-counter]');
      const priceEl = item.querySelector('.quantity__prise');;
      
      const currentPrice = parseInt(amountEl.innerText) * parseInt(priceEl.innerText);
     
      totalPrice  += currentPrice;
   });
   //відображаємо загальну ціну на сторінці
   totalPricEl.innerText =  totalPrice
}