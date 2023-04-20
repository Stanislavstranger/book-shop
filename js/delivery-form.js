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
    const streetName = mainForm['street-name'];
    const houseNumber = mainForm['house-number'];
    const FlatNumber = mainForm['flat-number'];
    const deliveryDate = mainForm['delivery-date'];
    const paymentMethod = mainForm['payment-method'];
    const chooseGift = mainForm['choose-gift'];

    function isValidName(name) {
        const regex = /^[a-zA-Zа-яА-Я]{4,}$/; // только строки, длина не менее 4 символов
        return regex.test(name);
    }

    function isValidLastName(lastName) {
        const regex = /^[a-zA-Zа-яА-Я]{5,}$/; // только строки, длина не менее 5 символов
        return regex.test(lastName);
    }

    function isValidCity(city) {
        const regex = /^[a-zA-Zа-яА-Я]{5,}$/; // только строки, длина не менее 5 символов
        return regex.test(city);
    }

    function isValidStreet(street) {
        const regex = /^[a-zA-Z0-9]{5,}$/; // только строки, длина не менее 5 символов, допускаются цифры
        return regex.test(street);
    }

    function isValidHouseNumber(houseNumber) {
        const regex = /^[1-9][0-9]*$/; // только цифры, только положительные числа
        return regex.test(houseNumber);
    }

    function isValidFlatNumber(flatNumber) {
        const regex = /^[1-9][0-9]*(-[1-9][0-9]*)?$/; // только цифры, только положительные числа, разрешен символ тире
        return regex.test(flatNumber);
    }

    function addError(i) {
        i.classList.add('_error');
        i.nextElementSibling.classList.add('_error');
    }

    function removeError(i) {
        i.classList.remove('_error');
        i.nextElementSibling.classList.remove('_error');
    }

    const inputs = document.querySelectorAll('input');
    const placeholders = {};

    inputs.forEach(input => {
        placeholders[input.name] = input.getAttribute('placeholder');
    });

    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.removeAttribute('placeholder');
        });
    });

    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            const value = input.value.trim();
            if (!value) {
                removeError(input);
                input.setAttribute('placeholder', placeholders[input.name]);
            } else {
                switch (input.name) {
                    case 'first-name':
                        if (!isValidName(value)) {
                            addError(input);
                        } else {
                            removeError(input);
                        }
                        break;
                    case 'last-name':
                        if (!isValidLastName(value)) {
                            addError(input);
                        } else {
                            removeError(input);
                        }
                        break;
                    case 'city-name':
                        if (!isValidCity(value)) {
                            addError(input);
                        } else {
                            removeError(input);
                        }
                        break;
                    case 'street-name':
                        if (!isValidStreet(value)) {
                            addError(input);
                        } else {
                            removeError(input);
                        }
                        break;
                    case 'house-number':
                        if (!isValidHouseNumber(value)) {
                            addError(input);
                        } else {
                            removeError(input);
                        }
                        break;
                    case 'flat-number':
                        if (!isValidFlatNumber(value)) {
                            addError(input);
                        } else {
                            removeError(input);
                        }
                        break;
                    default:
                        console.log('Неизвестное поле');
                        break;
                }
            }
        });
    });

    /* ------------------------------------format delivery date------------------------------------- */

    function formatDeliveryDate() {
        const deliveryDateInput = document.getElementById('delivery-date');
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const formattedDate = tomorrow.toISOString().substr(0, 10);
        deliveryDateInput.setAttribute('min', formattedDate);
    }

    formatDeliveryDate();

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