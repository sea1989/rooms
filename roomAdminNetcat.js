/* Rooms */
const tooltip = document.querySelector('.tooltip');
const rooms = document.querySelectorAll('.room');
const tooltipClose = tooltip.querySelector('.tooltip-close');
/*находим элемент куда будем добавлять */
const tableElement = tooltip.querySelector('.room-id');

/* функция для создания элементов */
function addElement(data) {

    /* Создаём новый элемент */
    var newList = document.createElement("li");

    /* и добавляем в него контент */
    newList.insertAdjacentHTML("afterbegin", `<div class="employee-item">
                          <div class="employee-fio">
                          ${data.user_name}
                          </div>
                          <div class="employee-position">${data.user_position}</div>
                        </div>`)

    /* Добавляем только что созданный элемент в дерево DOM */

    tableElement.append(newList);
}

/* функция для Error */
function addError() {

    var newList = document.createElement("li");

    newList.insertAdjacentHTML("afterbegin", `<div class="employee-item">
                          <div class="employee-fio">
                          Нет данных
                          </div>
                          <div class="employee-position">Нет данных</div>
                        </div>`)

    tableElement.append(newList);
}

function offset(item, tooltip) {
    tooltip.classList.add('active');
    const rect1 = document.querySelector('.rooms-main').getBoundingClientRect();
    const rect2 = item.getBoundingClientRect();
    const x = rect2.left - rect1.left
    const y = rect2.top - rect1.top
    tooltip.style.top = (y - tooltip.offsetHeight - 20) + 'px';
    tooltip.style.left = (x - tooltip.offsetWidth / 2 + 30) + 'px';
}

rooms.forEach(room => {
    room.addEventListener('click', function (e) {

        /*очищаю старое значение*/
        tableElement.textContent = '';

        let room_id = this.dataset.id;

        /* Создаем и отсылаем новый запрос через фетч*/
        fetch(`/services/rooms/?nc_ctpl=1264&room_id=${room_id}`)
            .then(
                function (response) {
                    /* анализируем HTTP-статус ответа*/
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    /* если ответ 200 переводим данные с сервера в тип объект и отрисовываем через ф-цию addElement */

                    response.json().then(function (data) {
                        /* addElement(data)*/
                        if (!data.error) {
                            Object.keys(data.users).forEach((key) => { addElement(data.users[key]) });
                            tooltip.classList.add('active');
                            offset(room, tooltip);
                        }
                        else {
                            addError();
                            offset(room, tooltip);
                        }

                    });
                }
            )
            /*если нет ответа выводим ошибку */
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });




        let scrollY = window.scrollY;
        let rect = e.target.getBoundingClientRect();
        posBottom = rect.bottom;

        rooms.forEach(room => {
            room.classList.remove('room--active');
        })
        room.classList.add('room--active')

    })
})

tooltipClose.addEventListener('click', function () {
    rooms.forEach(room => {
        room.classList.remove('room--active');
    });
    tooltip.classList.remove('active');
});

/* tabs room */
const tabsBtn = document.querySelectorAll('.tabs__nav-button');
const tabsItems = document.querySelectorAll('.tabs__item');
const tabsNumbers = document.querySelectorAll('.tabs__number');

tabsBtn.forEach(function (item) {
    item.addEventListener('click', function () {
        let currentBtn = item;
        let tabId = currentBtn.getAttribute('data-tab');
        let currentTab = document.querySelector(tabId);
        let CurrentTabsNumbers = currentBtn.querySelector('.tabs__number');

        rooms.forEach(room => {
            room.classList.remove('room--active');
        });
        tooltip.classList.remove('active')

        if (!currentBtn.classList.contains('hollow')) {
            tabsBtn.forEach(function (item) {
                item.classList.remove('hollow');
            });
            tabsNumbers.forEach(function (item) {
                item.classList.remove('hollow');
            });
        }

        tabsItems.forEach(function (item) {
            item.classList.remove('hollow');
        });

        currentBtn.classList.add('hollow');
        currentTab.classList.add('hollow');
        CurrentTabsNumbers.classList.add('hollow');
    })
})


$('body').on('click', '.person-card__content', function () {

    console.log($(this).data('userid'));


    fetch(`/services/rooms/?nc_ctpl=1263&user_id=${$(this).data('userid')}`)
        .then(
            function (response) {
                /* анализируем HTTP-статус ответа*/
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                /* если ответ 200 переводим данные с сервера в тип объект и отрисовываем через ф-цию  */
                response.json().then(function (data) {
                    if (!data.error) {

                        Object.keys(data.rooms).forEach((key) => {

                            tabsBtn.forEach(btn => {
                                if (btn.dataset.tab === `#tab_${data.rooms[key].floor_id}`) {
                                    btn.click();
                                }
                            })

                            rooms.forEach(item => {
                                item.classList.remove('room--active');
                                if (item.dataset.id === data.rooms[key].room_id) {
                                    item.classList.add('room--active');

                                    /*очищаю старое значение*/
                                    tableElement.textContent = '';

                                    fetch(`/services/rooms/?nc_ctpl=1264&room_id=${data.rooms[key].room_id}`)
                                        .then(
                                            function (response) {
                                                /* анализируем HTTP-статус ответа*/
                                                if (response.status !== 200) {
                                                    console.log('Looks like there was a problem. Status Code: ' +
                                                        response.status);
                                                    return;
                                                }

                                                /* если ответ 200 переводим данные с сервера в тип объект и отрисовываем через ф-цию addElement */
                                                response.json().then(function (data) {

                                                    if (!data.error) {
                                                        Object.keys(data.users).forEach((key) => { addElement(data.users[key]) });
                                                        offset(item, tooltip);
                                                    }
                                                    else {
                                                        console.log('ошибка')
                                                    }
                                                });
                                            }
                                        )
                                        /*если нет ответа выводим ошибку */
                                        .catch(function (err) {
                                            console.log('Fetch Error :-S', err);
                                        });
                                }
                            })
                        }
                        )
                    }
                    else {
                        console.log('еррор')
                    }
                });
            }
        )

});

//Автокомплит каталог
$(function () {
    var sub = $('#autocomplete-user').data('sub');
    $('#autocomplete-user').autocomplete({

        serviceUrl: sub + '?isNaked=1&nc_ctpl=1262',
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Ничего не найдено',
        formatResult: function (suggestion) {
            return '<div style="display:flex;justify-content: left;"><div class="person-card__image" style="flex: 1 0 50px;min-width: 50px;max-width: 50px;"><img src="' + suggestion.imageUrl + '" class="lazyload" style="width:44px;" /></div><div class="person-card__content" data-userid="' + suggestion.id + '"><span class="person-card__name" >' + suggestion.value + '</span><span class="person-card__desc">' + suggestion.division + ', ' + suggestion.position + '</span></div></div>';
        },

    });
});