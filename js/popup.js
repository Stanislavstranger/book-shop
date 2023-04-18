setTimeout(function () {
    const popupLinks = document.querySelectorAll('.book__container'); console.log(popupLinks);
    const body = document.querySelector('body');
    const lockPadding = document.querySelectorAll('.lock-padding');

    let unlock = true;

    const timeout = 300;

    /* Selecting the name of the popup window to open */

    if (popupLinks.length > 0) {
        for (let i = 0; i < popupLinks.length; i++) {
            const popupLink = popupLinks[i];
            popupLink.addEventListener('click', function (e) {
                /* const popupName = popupLink.getAttribute('href').replace('#', '');
                const currentPopup = document.getElementById(popupName); */
                /* popupOpen(currentPopup); console.log(currentPopup); */
                createPopup(this.id);
                popupOpen(popup); console.log(popup);
                e.preventDefault();

            });
        }
    }

    /* Getting all elements serving as a close button */

    const popupCloseIcon = document.querySelectorAll('.close-popup');

    if (popupCloseIcon.length > 0) {
        for (let i = 0; i < popupCloseIcon.length; i++) {
            const elem = popupCloseIcon[i];
            elem.addEventListener('click', function (e) {
                popupClose(elem.closest('.popup'));
                e.preventDefault();
            });
        }
    }

    /* Open popup */

    function popupOpen(currentPopup) {
        if (currentPopup && unlock) {
            const popupActive = document.querySelector('.popup.open');
            if (popupActive) {
                popupClose(popupActive, false);
            } else {
                bodyLock();
            }
            currentPopup.classList.add('open');
            currentPopup.addEventListener('click', function (e) {
                if (!e.target.closest('.popup__content')) {
                    popupClose(e.target.closest('.popup'));
                }
            });
        }
    }

    function popupClose(popupActive, doUnlock = true) {
        if (unlock) {
            popupActive.querySelector('.popup__content').innerHTML = ''; // очистка содержимого popup
            popupActive.classList.remove('open');
            if (doUnlock) {
                bodyUnLock();
            }
        }
    }

    /* Lock elements */

    function bodyLock() {
        const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

            for (let i = 0; i < lockPadding.length; i++) {
                const elem = lockPadding[i];
                elem.style.paddingRight = lockPaddingValue;
            }
            body.style.paddingRight = lockPaddingValue;
            body.classList.add('_lock');

            unlock = false;
            setTimeout(function () {
                unlock = true;
            }, timeout);

    }

    /* Unlock elements */

    function bodyUnLock() {
        setTimeout(function () {
            for (let i = 0; i < lockPadding.length; i++) {
                const elem = lockPadding[i];
                elem.style.paddingRight = '0px';
            }
            body.style.paddingRight = '0px';
            body.classList.remove('_lock');
        }, timeout);

        unlock = false;
        setTimeout(function () {
            unlock = true;
        }, timeout);
    }

    /* Close by Escape button */

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const popupActive = document.querySelector('.popup.open');
            popupClose(popupActive);
        }
    });


    (function () {
        // Полифил для метода closest
        if (!Element.prototype.closest) {
            Element.prototype.closest = function (selector) {
                var el = this;
                while (el) {
                    if (el.matches(selector)) {
                        return el;
                    }
                    el = el.parentElement;
                }
                return null;
            };
        }
    })();

    (function () {
        // Полифил для свойства matches
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.matchesSelector ||
                Element.prototype.webkitMatchesSelector;
        }
    })();

    /* create Popup */

    function createPopup(elem) {
        const fragment = document.createDocumentFragment();

        const img = document.createElement('img');
        img.src = books[elem].imageLink;
        img.alt = books[elem].title;
        img.classList.add('popup__image');

        const text = document.createElement('div');
        text.classList.add('popup__text');

        const title = document.createElement('div');
        title.classList.add('popup__title');
        title.textContent = books[elem].title;

        const subtitle = document.createElement('h4');
        subtitle.classList.add('popup__subtitle');
        subtitle.textContent = books[elem].author;

        const description1 = document.createElement('p');
        description1.classList.add('popup__description');
        description1.textContent = books[elem].description;

        const description2 = document.createElement('p');
        description2.classList.add('popup__description');
        description2.textContent = books[elem].price;

        text.appendChild(title);
        text.appendChild(subtitle);
        text.appendChild(description1);
        text.appendChild(description2);

        fragment.appendChild(img);
        fragment.appendChild(text);

        const container = document.querySelector('.popup__content');
        container.appendChild(fragment);
    }
    bodyLock();
    bodyUnLock();
}, 300);

