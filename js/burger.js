setTimeout(function () {
    const burgerButton = document.querySelector('#burger__button');
    const menuList = document.querySelector('.menu__list');
    const headerMenu = document.querySelector('.header__menu');
    const blackout = document.querySelector('.blackout');

    const burgerToggle = () => {
        if (burgerButton) {
            burgerButton.addEventListener('click', function (e) {
                document.body.classList.toggle('_lock');
                burgerButton.classList.toggle('_active');
                headerMenu.classList.toggle('_active');
                blackout.classList.toggle('_active');
                headerContainer.classList.toggle('_active');
            });
        }
    }

    const burgerClose = () => {
        if (menuList) {
            menuList.addEventListener('click', function (e) {
                document.body.classList.remove('_lock');
                burgerButton.classList.remove('_active');
                headerMenu.classList.remove('_active');
                blackout.classList.remove('_active');
                headerContainer.classList.remove('_active');
            });
        }
        blackout.addEventListener('click', function (e) {
            document.body.classList.remove('_lock');
            burgerButton.classList.remove('_active');
            headerMenu.classList.remove('_active');
            blackout.classList.remove('_active');
            headerContainer.classList.remove('_active');
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                document.body.classList.remove('_lock');
                burgerButton.classList.remove('_active');
                headerMenu.classList.remove('_active');
                blackout.classList.remove('_active');
                headerContainer.classList.remove('_active');
            }
        });
    }
    burgerToggle();
    burgerClose();
}, 300);