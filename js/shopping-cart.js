function deleteBook(bookId) {
    const bookContainer = document.getElementById(bookId); console.log(bookContainer);
    if (bookContainer) {
        bookContainer.parentNode.removeChild(bookContainer);
    }
}

setTimeout(function () {
    const shoppingCartLinks = document.querySelectorAll(".shopping-cart");
    const observer = new MutationObserver(function (mutations) {
        const checkAvailabilityOfBooks = document.querySelectorAll(
            ".in-shopping-cart"
        );
        console.log(checkAvailabilityOfBooks);
        const delButtons = document.getElementsByClassName("delete");
        console.log(delButtons);

        if (delButtons.length > 0) {
            for (let i = 0; i < delButtons.length; i++) {
                const deleteButton = delButtons[i];
                deleteButton.addEventListener("click", function (e) {
                    deleteBook(this.parentNode.getAttribute("id"));
                    e.preventDefault();
                });
            }
        }
    });

    // настройте наблюдение за изменениями в DOM
    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    if (shoppingCartLinks.length > 0) {
        for (let i = 0; i < shoppingCartLinks.length; i++) {
            const shoppingCartLink = shoppingCartLinks[i];
            shoppingCartLink.addEventListener("click", function (e) {
                if (!checkIfBookInCart(this.id)) {
                    addBooks(this.id);
                }
                e.preventDefault();
            });
        }
    }


    function checkIfBookInCart(bookId) {
        const checkAvailabilityOfBooks = document.querySelectorAll('.in-shopping-cart');
        for (let i = 0; i < checkAvailabilityOfBooks.length; i++) {
            const bookContainer = checkAvailabilityOfBooks[i];
            if (bookContainer.getAttribute('id') === bookId) {
                return true;
            }
        }
        return false;
    }

    function addBooks(i) {
        const fragment = document.createDocumentFragment();

        const book = document.createElement("div");
        book.classList.add("book", "delete");
        book.setAttribute('id', `b + ${i}`);

        const bookContainer = document.createElement("div");
        bookContainer.classList.add("book__container", "in-shopping-cart", "magnifier-plus");
        /* bookContainer.setAttribute('id', i); */

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

        // Создаем копию фрагмента и добавляем его в bookContainer
        const fragmentInputCopy = fragmentInput.cloneNode(true);
        const inputField = fragmentInputCopy.querySelector('input');
        inputField.setAttribute('id', i);

        const deleteButton = document.createElement("button");

        deleteButton.classList.add("delete", "button", "button_active");
        deleteButton.textContent = "delete";

        bookContainer.appendChild(bookCover);
        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookPrice);
        bookContainer.appendChild(fragmentInputCopy);


        book.appendChild(bookContainer);
        book.appendChild(deleteButton);
        fragment.appendChild(book);

        transferArea.appendChild(fragment);
    }
}, 400);