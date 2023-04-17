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

/* Create book card */

let buttonSlider = document.querySelectorAll('.button-slider');

function createBookCard() {
    setTimeout(function () {
        for (i = 0; i < cards.length; i++) {
            cards[i].innerHTML = `<img src="${pets[sliderArray[i]].img}" alt=${pets[sliderArray[i]].name} class="popup-link">
                <h3>${pets[sliderArray[i]].name}</h3>
                <button class="button border">Learn more</button>`;
            cards[i].id = sliderArray[i];
        }
        ;
    }, 300);
}

createCard();

