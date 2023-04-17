const popupLinks = document.querySelectorAll('.book'); console.log(popupLinks);
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

/* Close popup */

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

/* Lock elements */

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
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

console.log(books.imageLink);

/* create Popup */

function createPopup(elem) {
    document.querySelector('.popup__content').innerHTML =
    `<img src="${books[elem].imageLink}" alt="${books[elem].title}" class="popup__image">
    <div class="popup__text">
        <div class="popup__title">${books[elem].title}</div>
        <h4 class="popup__subtitle">${books[elem].author}</h4>
        <p class="popup__description">${books[elem].description}</p>
        <p class="popup__description">${books[elem].price}</p>
    </div>`;
}

bodyLock();
bodyUnLock();