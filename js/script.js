/* ------------------------------------wrapper--------------------------------------------- */

const fragmentWrapper = document.createDocumentFragment();
const wrapperBody = document.createElement('div');
wrapperBody.classList.add('wrapper');
fragmentWrapper.appendChild(wrapperBody);

const bodyElement = document.querySelector('body');
console.log(bodyElement);
console.log(wrapperBody);
console.log(fragmentWrapper);

document.body.appendChild(fragmentWrapper);

/* ------------------------------------header--------------------------------------------- */

const header = document.createElement("header");
header.classList.add("header");

const headerContainer = document.createElement("div");
headerContainer.classList.add("header__container", "_container");

const logo = document.createElement("div");
logo.classList.add("logo");

const logoTitleLink = document.createElement("a");
logoTitleLink.href = "#";
logoTitleLink.classList.add("logo__title");

const logoTitle = document.createElement("h1");
logoTitle.textContent = "Bookshelf";

const logoSubtitle = document.createElement("h2");
logoSubtitle.classList.add("logo__subtitle");
logoSubtitle.innerHTML = '"Software is a great combination <br> of artistry and engineering." - Bill Gates.';

logoTitleLink.appendChild(logoTitle);
logo.appendChild(logoTitleLink);
logo.appendChild(logoSubtitle);

const burgerButton = document.createElement("button");
burgerButton.classList.add("burger__button");
burgerButton.id = "burger__button";

const burgerLine = document.createElement("span");
burgerLine.classList.add("burger__line");

burgerButton.appendChild(burgerLine);

const headerMenu = document.createElement("nav");
headerMenu.classList.add("header__menu");

const menuList = document.createElement("ul");
menuList.classList.add("menu__list");

const menuItems = [
    {
        text: "About Bookshelf",
        href: "#",
    },
    {
        text: "New books",
        href: "#",
    },
    {
        text: "Help",
        href: "#",
    },
    {
        text: "Contacts",
        href: "#contacts",
    },
];

for (let i = 0; i < menuItems.length; i++) {
    const menuItem = document.createElement("li");
    menuItem.classList.add("menu__item");

    const menuLink = document.createElement("a");
    menuLink.classList.add("menu__link");
    menuLink.href = menuItems[i].href;
    menuLink.textContent = menuItems[i].text;

    menuItem.appendChild(menuLink);
    menuList.appendChild(menuItem);
}

headerMenu.appendChild(menuList);

headerContainer.append(logo, burgerButton, headerMenu);
header.appendChild(headerContainer);

const blackout = document.createElement("div");
blackout.classList.add("blackout");

fragmentWrapper.append(blackout, header);

const wrapper = document.querySelector(".wrapper");
wrapper.insertAdjacentElement("afterbegin", header);
wrapper.insertAdjacentElement("afterbegin", blackout);

/* ------------------------------------main--------------------------------------------- */

const fragmentMain = document.createDocumentFragment();

const main = document.createElement("main");
main.classList.add("main");

const mainContainer = document.createElement("div");
mainContainer.classList.add("main__container", "_container");

const sectionMain = document.createElement("section");
sectionMain.classList.add("content");

mainContainer.appendChild(sectionMain);
main.appendChild(mainContainer);
fragmentMain.appendChild(main);

wrapper.appendChild(fragmentMain);

/* ------------------------------------create book------------------------------------------- */

function createBookCard() {
    setTimeout(function () {
        const fragmentBook = document.createDocumentFragment();

        for (let i = 0; i < books.length; i++) {
            const book = document.createElement("div");
            book.classList.add("book");

            const bookContainer = document.createElement("div");
            bookContainer.setAttribute('id', i);
            bookContainer.classList.add("book__container", "magnifier-plus");

            const bookCover = document.createElement("div");
            bookCover.classList.add("book__cover");

            const img = document.createElement("img");
            img.src = books[i].imageLink;
            img.alt = books[i].title;

            bookCover.appendChild(img);

            const bookTitle = document.createElement("h2");
            bookTitle.classList.add("book__title");
            bookTitle.textContent = books[i].title;

            const bookAuthor = document.createElement("h3");
            bookAuthor.classList.add("book__autor");
            bookAuthor.textContent = books[i].author;

            const bookPrice = document.createElement("span");
            bookPrice.classList.add("book__price");
            bookPrice.textContent = `$${books[i].price}`;

            const bookIcons = document.createElement("div")
            bookIcons.classList.add("book__icons");

            const magnifierPlusLink = document.createElement("a");
            magnifierPlusLink.href = "#";
            magnifierPlusLink.classList.add("magnifier-plus");
            magnifierPlusLink.setAttribute('id', i);

            const magnifierPlusImg = document.createElement("img");
            magnifierPlusImg.src = "../assets/icons/magnifier-plus.svg";
            magnifierPlusImg.alt = "magnifier-plus";

            const shoppingCartLink = document.createElement("a");
            shoppingCartLink.href = "#";
            shoppingCartLink.classList.add("shopping-cart");
            shoppingCartLink.setAttribute('id', i);

            const shoppingCartImg = document.createElement("img");
            shoppingCartImg.src = "../assets/icons/shopping-cart.svg";
            shoppingCartImg.alt = "shopping-cart";

            const tooltip = document.createElement("span");
            tooltip.classList.add("tooltip");
            tooltip.textContent = "Liked? Hold down the left key and carry to the shopping cart";

            bookContainer.appendChild(bookCover);
            bookContainer.appendChild(bookTitle);
            bookContainer.appendChild(bookAuthor);
            bookContainer.appendChild(bookPrice);
            bookIcons.appendChild(magnifierPlusLink);
            magnifierPlusLink.appendChild(magnifierPlusImg);
            bookIcons.appendChild(shoppingCartLink);
            shoppingCartLink.appendChild(shoppingCartImg);

            book.appendChild(bookContainer);
            book.appendChild(bookIcons);
            book.appendChild(tooltip);
            fragmentBook.appendChild(book);
        }

        const contentBook = document.querySelector(".content");
        contentBook.appendChild(fragmentBook);
    }, 400);
}

createBookCard();

/* ------------------------------------shopping cart--------------------------------------------- */

const fragmentShoppingCart = document.createDocumentFragment();

const sectionShoppingCart = document.createElement("section");
sectionShoppingCart.classList.add("shopping-cart-all");

const infoShoppingCart = document.createElement("section");
infoShoppingCart.classList.add("info-shopping-cart");

const addedBooks = document.createElement("h4");
addedBooks.classList.add("added-books");
addedBooks.textContent = "Position added: 0";

const imgShoppingCart = document.createElement("div");
imgShoppingCart.classList.add("img-shopping-cart");

const total = document.createElement("h4");
total.classList.add("total");
total.textContent = "Total: 0";

const checkoutLink = document.createElement("button");
checkoutLink.href = "#";
checkoutLink.classList.add("checkout-link", "button", "button_inactive");
checkoutLink.textContent = "checkout";

const transferHere = document.createElement("h4");
transferHere.classList.add("transfer-here");
transferHere.textContent = "transfer here";

const containerTransferArea = document.createElement("div");
containerTransferArea.classList.add("container-transfer-area");

const transferArea = document.createElement("section");
transferArea.classList.add("transfer-area");

sectionShoppingCart.appendChild(infoShoppingCart);
sectionShoppingCart.appendChild(containerTransferArea);
infoShoppingCart.appendChild(addedBooks);
infoShoppingCart.appendChild(imgShoppingCart);
infoShoppingCart.appendChild(total);
infoShoppingCart.appendChild(checkoutLink);
infoShoppingCart.appendChild(transferHere);
containerTransferArea.appendChild(transferArea);
fragmentShoppingCart.appendChild(sectionShoppingCart);

mainContainer.appendChild(fragmentShoppingCart);

/* ------------------------------------create input--------------------------------------------- */

const fragmentInput = document.createDocumentFragment();

const inputLabel = document.createElement("label");
inputLabel.for ="quantity";
inputLabel.textContent = "Quantity";

const quantityInput = document.createElement("div");
quantityInput.classList.add("quantity-input");

const minusButton = document.createElement("button");
minusButton.type = "button";
minusButton.classList.add("minus-button");
minusButton.name = "button";

const fasFaMinus = document.createElement("i");
fasFaMinus.classList.add("fas", "fa-minus");

const inputField = document.createElement("input");
inputField.type = "number";
inputField.id = "quantity";
inputField.name = "quantity";
inputField.min = "1";
inputField.max = "10";
inputField.value = "1";

const plusButton = document.createElement("button");
minusButton.type = "button";
minusButton.classList.add("plus-button");
minusButton.name = "button";

const fasFaPlus = document.createElement("i");
fasFaPlus.classList.add("fas", "fa-plus");

quantityInput.appendChild(minusButton);
minusButton.appendChild(fasFaMinus);
quantityInput.appendChild(inputField);
quantityInput.appendChild(plusButton);
plusButton.appendChild(fasFaPlus);

fragmentInput.appendChild(inputLabel);
fragmentInput.appendChild(quantityInput);

/* ------------------------------------footer--------------------------------------------- */

const fragmentFooter = document.createDocumentFragment();

const footer = document.createElement("footer");
footer.classList.add("footer");

const footerContainer = document.createElement("div");
footerContainer.id = "contacts";
footerContainer.classList.add("footer__container", "_container");

const githubLink = document.createElement("a");
githubLink.href = "https://github.com/Stanislavstranger";
githubLink.target = "_blank";
githubLink.classList.add("my-github");
githubLink.textContent = "My GitHub";

const yearSpan = document.createElement("span");
yearSpan.classList.add("year");
yearSpan.textContent = "2023";

const rsSchoolLink = document.createElement("a");
rsSchoolLink.href = "https://rs.school/js/";
rsSchoolLink.target = "_blank";
rsSchoolLink.classList.add("link-rs-school", "_ibg");

const rsSchoolImg = document.createElement("img");
rsSchoolImg.src = "../assets/image/logo-rsschool3.png";
rsSchoolImg.alt = "rs-school-logo";

rsSchoolLink.appendChild(rsSchoolImg);
footerContainer.append(githubLink, yearSpan, rsSchoolLink);
footer.appendChild(footerContainer);
fragmentFooter.appendChild(footer);

wrapper.appendChild(fragmentFooter);

/* ------------------------------------popup--------------------------------------------- */

const fragmentPopup = document.createDocumentFragment();

const popupDiv = document.createElement('div');
popupDiv.setAttribute('id', 'popup');
popupDiv.classList.add('popup');

const popupBodyDiv = document.createElement('div');
popupBodyDiv.classList.add('popup__body');

const popupContainerDiv = document.createElement('div');
popupContainerDiv.classList.add('popup__container');

const closeButton = document.createElement('button');
closeButton.classList.add('button-round', 'close-popup');
const closeIcon = document.createElement('img');
closeIcon.setAttribute('src', '../assets/icons/close.svg');
closeIcon.setAttribute('alt', 'close');
closeButton.appendChild(closeIcon);

const popupContentDiv = document.createElement('div');
popupContentDiv.classList.add('popup__content');

popupContainerDiv.appendChild(closeButton);
popupContainerDiv.appendChild(popupContentDiv);
popupBodyDiv.appendChild(popupContainerDiv);
popupDiv.appendChild(popupBodyDiv);

fragmentPopup.appendChild(popupDiv);

wrapper.appendChild(fragmentPopup);

/* --------------------------------Read json data from the file------------------------------------------ */

let books;

fetch("../assets/json/books.json") //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        books = data;
        console.log(books);
    });

/* --------------------------------input logic------------------------------------------ */

minusButton.addEventListener('click', function (event) {
    event.preventDefault();
    let currentValue = parseInt(inputField.value);
    if (currentValue > 1) {
        inputField.value = currentValue - 1;
    }
});

plusButton.addEventListener('click', function (event) {
    event.preventDefault();
    let currentValue = parseInt(inputField.value);
    if (currentValue < 100) {
        inputField.value = currentValue + 1;
    }
});

/* --------------------------------control before unload----------------------------------- */

function BeforeUnload(event) {
    event.preventDefault();
    event.returnValue = " ";
}

window.addEventListener("beforeunload", BeforeUnload);