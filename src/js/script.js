/* Прелоадер */
const hellopreloader = document.getElementById("hellopreloader_preload");

function fadeOutnojquery(el) {
    el.style.opacity = 1;
    let interhellopreloader = setInterval(function () {
        el.style.opacity = el.style.opacity - 0.05;
        if (el.style.opacity <= 0.05) {
            clearInterval(interhellopreloader);
            hellopreloader.style.display = "none";
        }
    }, 16);
}
window.onload = function () {
    setTimeout(function () {
        fadeOutnojquery(hellopreloader);
    }, 1000);
};
/* После загрузки страницы */
window.addEventListener('DOMContentLoaded', () => {
    /* Меню */
    const menuTrigger = document.querySelectorAll('[data-triggermenu]'),
          menu = document.querySelector('.menu');
    
    function menuOpen() {
        menu.classList.add('active');
    }
    function menuClose() {
        menu.classList.remove('active');
    }
    menuTrigger.forEach(btn => {
        btn.addEventListener('click', menuOpen);
    });
    menu.addEventListener('click', (e) => {
        /* if (e.target === menu || e.target.getAttribute('data-close') == '') {
            menuClose();
        } */
        menuClose();
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && menu.classList.contains('show')) {
            menuClose();
        }
    });
    /* Модальные окна */
    
    /* Как получить скидку? */
    const btnHowGetSale = document.querySelector('#howGetSale'),
          modalHowGetSale = document.querySelector('#modalHowGetSale');
    
    function modalSaleOpen() {
        modalHowGetSale.classList.add('active');
    }
    function modalSaleClose() {
        modalHowGetSale.classList.remove('active');
    }
    btnHowGetSale.addEventListener('click', modalSaleOpen);
    modalHowGetSale.addEventListener('click', (e) => {
        if (e.target === modalHowGetSale || e.target.getAttribute('data-close') == '') {
            modalSaleClose();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalHowGetSale.classList.contains('show')) {
            modalSaleClose();
        }
    });

    /* Вкладки */
    const tabs = document.querySelectorAll('.catalog__tab'),
          tabsParent = document.querySelector('.catalog__tabs'),
          tabsContent = document.querySelectorAll('.catalog__products');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show-grid', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('catalog__tab_active');
        });
    }
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show-grid', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('catalog__tab_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target.closest('.catalog__tab');
        
        if (target) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    /* Создание карточек товара */
    class ToysCard {
        constructor(id, category, src, alt, name, descr,
             priceNew, priceOld, size, color, 
             ...classes) {
                 this.id = id;
                 this.category = category;
                 this.src = src;
                 this.alt = alt;
                 this.name = name;
                 this.descr = descr;
                 this.priceNew = priceNew;
                 this.priceOld = priceOld;
                 this.size = size;
                 this.color = color;
                 this.changeParentAndStyle();
                 this.classes = classes;
             }
        /* Распределение по категориям */
        changeParentAndStyle() {
            if (this.category == 'mythical') {
                this.parent = document.querySelector('#mythicals');
                this.catClass = 'myth';
            } else if (this.category == 'sea') {
                this.parent = document.querySelector('#seas');
                this.catClass = 'sea';
            } else {
                this.parent = document.querySelector('#beasts');
                this.catClass = 'beast';
            }
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'catalog-product';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            /* Добавления класса, отвечающего за стиль карточки */
            element.classList.add(this.catClass);            

            element.innerHTML = `
            <div class="catalog-product__wrapper">
                <div class="catalog-product__front catalog-product__front_active">
                    <img src=${this.src} alt=${this.alt} class="catalog-product__img">
                    <div class="catalog-product__name">${this.name}</div>
                    <div class="catalog-product__descr">${this.descr}</div>
                    <a href="#" class="catalog-product__action ${this.catClass}_action">Подробнее</a>
                </div>
                <div class="catalog-product__back">
                    <div class="catalog-product__info">
                        <div class="catalog-product__size-title">
                            Размер
                        </div>
                        <div class="catalog-product__size-value">
                            <span>${this.size}</span> см
                        </div>
                        <div class="catalog-product__color-title">
                            Цвет игрушки
                        </div>
                        <div class="catalog-product__color-value">
                            <span>${this.color}</span>
                        </div>
                    </div>
                    <a href="#" class="catalog-product__back_close">Закрыть</a>
                </div>
            </div>
            <hr>
            <div class="catalog-product__footer">
                <div class="catalog-product__prices">
                    <div class="catalog-product__old-price ${this.catClass}_old-price">${this.priceOld} руб.</div>
                    <div class="catalog-product__price ${this.catClass}_price">${this.priceNew} руб.</div>
                </div>
                <button data-order class="catalog-product__button ${this.catClass}_button">КУПИТЬ</button>
            </div>
            `;

            this.parent.append(element);
        }
    }

    new ToysCard(
        1, 
        "mythical", 
        "img/products/product_id1.png", 
        "Игрушка Волшебный единорог", 
        "Волшебный единорог", 
        "Осуществит любое Ваше желание, поспит на ручках и наколдует счастья", 
        "1490", 
        "1700", 
        55, 
        "снежно-розовый"
        ).render();
    new ToysCard(
        2, 
        "beast", 
        "img/products/product_id2.png", 
        "Игрушка Бегемотик Тоша", 
        "Бегемотик Тоша", 
        "Будет отличным охранником покоя, а еще с удовольствием слопает арбузик", 
        "1290", 
        "1500", 
        60, 
        "грифельный"
        ).render();
    new ToysCard(
        3, 
        "mythical", 
        "img/products/product_id3.png", 
        "Игрушка Малышка единорожка", 
        "Малышка единорожка", 
        "Готова перебраться к Вам из тридевятого королевства", 
        "1090", 
        "1300", 
        55, 
        "Розовая вишня"
        ).render();
    new ToysCard(
        4, 
        "beast", 
        "img/products/product_id4.png", 
        "Игрушка Милое авокадо", 
        "Милое авокадо", 
        "Ваши обнимашки - все, что ему требуется", 
        "1190", 
        "1400", 
        60, 
        "Ярко-зеленый"
        ).render();
    new ToysCard(
        5, 
        "beast", 
        "img/products/product_id5.png", 
        "Игрушка Хома разогрей-ка", 
        "Хома разогрей-ка", 
        "Согреет Вас даже в самый холодный денек", 
        "1290", 
        "1600", 
        40, 
        "Маме"
        ).render();
    new ToysCard(
        6, 
        "beast", 
        "img/products/product_id6.png", 
        "Игрушка Зайка-арбузайка", 
        "Зайка-арбузайка", 
        "Сладкий как арбузик (не в прямом смысле :)", 
        "1290", 
        "1500", 
        55, 
        "Арбузно-зеленый"
        ).render();
    new ToysCard(
        7, 
        "sea", 
        "img/products/product_id7.png", 
        "Игрушка Акулка не из икеи", 
        "Акулка не из икеи", 
        "Легендарная акулка, покинувшая старые берега", 
        "1090", 
        "1300", 
        80, 
        "Берлинская лазурь"
        ).render();
    new ToysCard(
        8, 
        "sea", 
        "img/products/product_id8.png", 
        "Игрушка Грозный акулёнок", 
        "Грозный акулёнок", 
        "Любит кусаться, но не больно", 
        "490", 
        "700", 
        25, 
        "Клубнично-кремовый"
        ).render();
    new ToysCard(
        9, 
        "mythical", 
        "img/products/product_id9.png", 
        "Игрушка Малышка пони", 
        "Малышка пони", 
        "Милое маленькое создание ищет свой новый дом", 
        "1190", 
        "1400", 
        37, 
        "Тиффани"
        ).render();
    new ToysCard(
        10, 
        "mythical", 
        "img/products/product_id10.png", 
        "Игрушка Мама лама", 
        "Мама лама", 
        "Создаст яркую атмосферу в любом доме и раскрасит самые серые будни", 
        "1190", 
        "1600", 
        45, 
        "Цвета радуги"
        ).render();
    new ToysCard(
        11, 
        "sea", 
        "img/products/product_id11.png", 
        "Игрушка Дружелюбный дельфинчик", 
        "Дружелюбный дельфинчик", 
        "Хочет переехать из моря к Вам, любит играть даже без мячика", 
        "1290", 
        "1400", 
        55, 
        "Морская волна"
        ).render();


    /* Открытие информации в карточке товара */
    let wrapperCard = document.querySelectorAll('.catalog-product__wrapper');
    wrapperCard.forEach(card => {
        let btnOpenInfoCard = card.querySelector('.catalog-product__action'),
        btnCloseInfoCard = card.querySelector('.catalog-product__back_close'),
        frontCard = card.querySelector('.catalog-product__front'),
        backCard = card.querySelector('.catalog-product__back');
        
        btnOpenInfoCard.addEventListener('click', (e) => {
            e.preventDefault();
            frontCard.classList.toggle('catalog-product__front_active');
            backCard.classList.toggle('catalog-product__back_active');
        });
        btnCloseInfoCard.addEventListener('click', (e) => {
            e.preventDefault();
            frontCard.classList.toggle('catalog-product__front_active');
            backCard.classList.toggle('catalog-product__back_active');
        });
    });
    /* Я его рот ебал... надо переделать */

    /* Timer Promo */
    let endPromo = '2020-11-15';
    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }
    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
        
        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.textContent = getZero(t.days);
            hours.textContent = getZero(t.hours);
            minutes.textContent = getZero(t.minutes);
            seconds.textContent = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }
    setClock('.timer', endPromo);
    /* End Timer */

    /* Order Toy Inner */
    let cardsToy = document.querySelectorAll('.catalog-product');    
    cardsToy.forEach(cardToy => {
        let btnOrder = cardToy.querySelector('[data-order]'),
            nameToys = cardToy.querySelector('.catalog-product__name').textContent,
            modalOrder = document.querySelector('#modalOrder'),
            orderNameToys = modalOrder.querySelector('#order_toy');

            btnOrder.addEventListener('click', (e) => {
                e.preventDefault();
                orderNameToys.textContent = nameToys;
                modalOrder.classList.add('active');
            });            
    });

    const modalOrderSel = document.querySelector('#modalOrder');
    modalOrderSel.addEventListener('click', (e) => {
        if (e.target === modalOrderSel || e.target.getAttribute('data-close') == '') {
            modalOrderSel.classList.remove('active');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modalOrderSel.classList.contains('active')) {
            modalOrderSel.classList.remove('active');
        }
    });

    /* End Order Inner */

    const promoOrderBtn = document.querySelector('#promo_order');
    promoOrderBtn.addEventListener('click', (e) => {
        const promoNameToy = document.querySelector('#promo_toy_name').textContent,
        modalOrderPromo = document.querySelector('#modalOrder'),
        orderNameToy = modalOrderPromo.querySelector('#order_toy');
        e.preventDefault();
        orderNameToy.textContent = `${promoNameToy} по акции "Игрушка недели"`;
        modalOrderPromo.classList.add('active');

    });
});