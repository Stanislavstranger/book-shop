const checkOutActiveButton = document.querySelector(".checkout-link");

function checkOutInActive() {
    checkOutActiveButton.classList.remove("button_active");
    checkOutActiveButton.classList.add("button_inactive");
    addedBooks.textContent = "Position added: 0";
    total.textContent = "Total: 0";
}

function deleteBook(bookId) {
    const book = document.getElementById(bookId);
    if (book) {
        book.parentNode.removeChild(book);
    }
}

setTimeout(function () {
    const shoppingCartLinks = document.querySelectorAll(".shopping-cart");
    const checkAvailabilityOfBooks = document.querySelectorAll(".in-shopping-cart");

    function delBtn() {
        const delButtons = document.getElementsByClassName("delete");

        if (delButtons.length > 0) {
            for (let i = 0; i < delButtons.length; i++) {
                const deleteButton = delButtons[i];
                deleteButton.addEventListener("click", function (e) {
                    deleteBook(this.parentNode.getAttribute("id"));
                    if (delButtons.length > 0) {
                        checkOutActive();
                    } else {
                        checkOutInActive();
                    }
                    e.preventDefault();
                });
            }
        }
    }

    function checkOutActive() {
        const delButtons = document.getElementsByClassName("delete");
        checkOutActiveButton.classList.remove("button_inactive");
        checkOutActiveButton.classList.add("button_active");
        addedBooks.textContent = `Position added: ${delButtons.length}`;
        total.textContent = `Total: $${totalAll()}`;
    }

    function totalAll() {
        const transferArea = document.querySelector('.transfer-area');
        const inputElements = transferArea.querySelectorAll('input');
        let total = 0;

        inputElements.forEach(function (inputElement) {
            const quantity = parseFloat(inputElement.value);
            if (isNaN(quantity)) {
                return;
            }

            const priceElement = inputElement.closest('.book__container').querySelector('.book__price');
            if (!priceElement) {
                return;
            }

            const priceText = priceElement.textContent.replace('$', '');
            const priceValue = parseFloat(priceText);

            total += priceValue * quantity;
        });

        return total;
    }

    function inputEvent() {
        const transferArea = document.querySelector('.transfer-area');
        const inputElements = transferArea.querySelectorAll('input');
        inputElements.forEach(function (inputElement) {
            inputElement.addEventListener('input', function () {
                total.textContent = `Total: $${totalAll()}`;
            });
        });
    }

    transferArea.addEventListener("mouseover", function (e) {
        delBtn();
        inputEvent();
    });



    function dropInit() {
        const dropAreaOut = document.querySelector('.content');
        const dropAreaIn = document.querySelector('.shopping-cart-all');
        const dropItems = dropAreaOut.querySelectorAll('.book__container');
        let draggedItem;
        for (let i = 0; i < dropItems.length; i++) {
            dropItems[i].draggable = true;
            dropItems[i].onmousedown = function () {
                draggedItem = dropItems[i].id;
            };
        }

        dropAreaIn.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        dropAreaIn.addEventListener(`drop`, (e) => {
            if ((draggedItem) && (!checkIfBookInCart(draggedItem))) {
                addBooks(draggedItem);
                checkOutActive();
            }
        });
    }

    dropInit();

    if (shoppingCartLinks.length > 0) {
        for (let i = 0; i < shoppingCartLinks.length; i++) {
            const shoppingCartLink = shoppingCartLinks[i];
            shoppingCartLink.addEventListener("click", function (e) {
                if (!checkIfBookInCart(this.id)) {
                    addBooks(this.id);
                    checkOutActive();
                }
                e.preventDefault();
            });
        }
    }

    function checkIfBookInCart(bookId) {
        const checkAvailabilityOfBooks = document.querySelectorAll('.in-shopping-cart');
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