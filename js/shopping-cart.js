function deleteBook(bookId) {
    const book = document.getElementById(bookId); console.log(book);
    if (book) {
        book.parentNode.removeChild(book);
    }
}

setTimeout(function () {
    const shoppingCartLinks = document.querySelectorAll(".shopping-cart");
    const observer = new MutationObserver(function (mutations) {
        const checkAvailabilityOfBooks = document.querySelectorAll(".in-shopping-cart");
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

        console.log(delButtons.length);

        if (delButtons.length > 0) {
            checkOutActive();
        } else {
            checkOutInActive();
        }

        function totalAll() {
            const transferArea = document.querySelector('.transfer-area');
            const prices = transferArea.querySelectorAll('.book__price');

            let total = 0;

            prices.forEach(price => {
                const priceText = price.textContent.replace('$', '');
                const priceValue = parseFloat(priceText);
                total += priceValue;
            });

            console.log(total);
            return total;
        }

        function checkOutActive() {
            const checkOutActiveButton = document.querySelector(".checkout-link");
            console.log(checkOutActiveButton);
            checkOutActiveButton.classList.remove("button_inactive");
            checkOutActiveButton.classList.add("button_active");
            console.log(delButtons.length);
            addedBooks.textContent = `Added: ${delButtons.length}`;
            total.textContent = `Added: $${totalAll()}`;

        }

        function checkOutInActive() {
            const checkOutActiveButton = document.querySelector(".checkout-link");
            console.log(checkOutActiveButton);
            checkOutActiveButton.classList.remove("button_active");
            checkOutActiveButton.classList.add("button_inactive");
            addedBooks.textContent = "Added: 0";
            total.textContent = "Total: 0";
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
        const checkAvailabilityOfBooks = document.querySelectorAll('.in-shopping-cart'); console.log(checkAvailabilityOfBooks);
        for (let i = 0; i < checkAvailabilityOfBooks.length; i++) {
            const book = checkAvailabilityOfBooks[i];
            if (book.getAttribute('id').slice(1) === bookId) {
                return true;
            }
        }
        return false;
    }

    function addBooks(i) {
        const fragment = document.createDocumentFragment();

        const book = document.createElement("div");
        book.classList.add("book", "in-shopping-cart");
        book.setAttribute('id', `b${i}`);

        const bookContainer = document.createElement("div");
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