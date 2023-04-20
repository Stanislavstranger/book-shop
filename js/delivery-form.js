setTimeout(function () {
    const content = document.querySelector('.content');
    const shoppingCartAll = document.querySelector('.shopping-cart-all');
    const imgShoppingCart = document.querySelector('.img-shopping-cart');
    const checkoutLink = document.querySelector('.checkout-link');
    const transferHere = document.querySelector('.transfer-here');
    const transferArea = document.querySelector('.transfer-area');
    const deliveryForm = document.querySelector('.delivery-form');
    const mainContainer = document.querySelector('.main__container');

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
                deliveryForm.classList.toggle('_active');

                mainContainer.appendChild(deliveryForm);
            })
        }
    }

    checkoutToggle();

    const mainForm = document.forms.main;
    const firstName = mainForm['first-name'];
    const lastName = mainForm['last-name'];
    const cityName = mainForm['city-name'];
    const streetNumber = mainForm['street-number'];
    const houseNumber = mainForm['house-number'];
    const apartmentNumber = mainForm['apartment-number'];
    const phoneNumber = mainForm['phone-number'];
    const deliveryDate = mainForm['delivery-date'];
    const paymentMethod = mainForm['payment-method'];
    const chooseGift = mainForm['choose-gift'];
    const placeholder = mainForm

    function hiddenPlaceholder() {
        const inputs = document.querySelectorAll('input');
        let mainFormInputPlaceholder;

        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                mainFormInputPlaceholder = input.getAttribute('placeholder')
                input.removeAttribute('placeholder');
            });

            input.addEventListener('blur', () => {
                input.setAttribute('placeholder', mainFormInputPlaceholder);
            });
        });

    }

    hiddenPlaceholder();

    /* ------------------------------------choose gift radios (only two)------------------------------------- */

    const chooseGiftCheckboxes = document.querySelectorAll('input[name="choose-gift"]');
    let checkedCount = 0;

    chooseGiftCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                checkedCount++;
            } else {
                checkedCount--;
            }

            if (checkedCount >= 2) {
                chooseGiftCheckboxes.forEach(checkbox => {
                    if (!checkbox.checked) {
                        checkbox.disabled = true;
                    }
                });
            } else {
                chooseGiftCheckboxes.forEach(checkbox => {
                    checkbox.disabled = false;
                });
            }
        });
    });

}, 500);