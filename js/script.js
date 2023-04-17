const fragmentWrapper = document.createDocumentFragment();

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
document.body.insertBefore(fragmentWrapper, wrapper);

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

document.body.appendChild(fragmentFooter);

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

// Добавляем фрагмент на страницу в нужное место
const targetElement = document.querySelector('footer');
targetElement.appendChild(fragmentPopup);

/* Read json data from the file */

let books;

fetch("../assets/json/books.json") //path to the file with json data
    .then(response => {
        return response.json();
    })
    .then(data => {
        books = data;
        console.log(books);
    });

/* ------------------------------------Create book card-------------------------------------- */

let content = document.querySelector('.content');

function createBookCard() {
    setTimeout(function () {
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < books.length; i++) {
            const bookCard = document.createElement("div");
            bookCard.classList.add("book");

            const bookContainer = document.createElement("div");
            bookContainer.setAttribute('id', i);
            bookContainer.classList.add("book__container");

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
            bookPrice.textContent = `${books[i].price}$`;

            bookContainer.appendChild(bookCover);
            bookContainer.appendChild(bookTitle);
            bookContainer.appendChild(bookAuthor);
            bookContainer.appendChild(bookPrice);

            bookCard.appendChild(bookContainer);
            fragment.appendChild(bookCard);
        }

        const content = document.querySelector(".content");
        content.appendChild(fragment);
    }, 300);
}

createBookCard();
