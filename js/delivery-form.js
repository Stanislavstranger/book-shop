setTimeout(function () {
    const content = document.querySelector('.content');
    const shoppingCartAll = document.querySelector('.shopping-cart-all');
    const imgShoppingCart = document.querySelector('.img-shopping-cart');
    const checkoutLink = document.querySelector('.checkout-link');
    const transferHere = document.querySelector('.transfer-here');
    const transferArea = document.querySelector('.transfer-area'); console.log(checkoutLink);

    function checkoutToggle() {
        if (checkoutLink) {
            checkoutLink.addEventListener('click', function (e) {
                content.classList.toggle('content__inactive');
                shoppingCartAll.classList.toggle('_changed');
                imgShoppingCart.classList.toggle('_changed');
                checkoutLink.classList.toggle('_changed');
                transferHere.classList.toggle('_changed');
                transferArea.classList.toggle('_changed');
                if (checkoutLink.textContent === "checkout") {
                    checkoutLink.textContent = "back to the store";
                } else checkoutLink.textContent = "checkout";
            })
        }
    }

    checkoutToggle();

}, 500);