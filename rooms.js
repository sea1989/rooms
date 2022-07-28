/* Rooms */

const tooltip = document.querySelector('.tooltip');
const rooms = document.querySelectorAll('.room');

const tooltipClose = tooltip.querySelector('.tooltip-close');

rooms.forEach(room => {
  room.addEventListener('click', function (e) {

    tooltip.classList.remove('active');

    /* Создаем и отсылаем новый запрос через фетч*/
    fetch("https://smart.firpo.ru/services/rooms/?nc_ctpl=1264&room_id=2")
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
            data.results.forEach(addElement);
          });
        }
      )
      /*если нет ответа выводим ошибку */
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });

    /* функция для создания элементов */
    function addElement(data) {

      /* Создаём новый элемент */

      var newTR = document.createElement("tr");

      /* и добавляем в него немного контента */

      // newTR.innerHTML = `<td>${data.name}</td><td>${data.mass}</td><td>${data.height}</td>`;
      newTR.innerHTML = `<li class="employee-item">
                          <div class="employee-fio">
                          ${data.users}
                          </div>
                          <div class="employee-position">Управление развития цифровой инфраструктуры
                          Начальник начальников</div>
                        </li>`;



      /*находим элемент куда будем добавлять */

      tableElement = tooltip.querySelector('.room-id');

      /* Добавляем только что созданный элемент в дерево DOM */

      tableElement.append(newTR);
    }


    let scrollY = window.scrollY;
    var rect = e.target.getBoundingClientRect();
    posX = rect.left;
    posY = rect.top;

    /*  tooltip.innerText = this.dataset.title; */
    rooms.forEach(room => {
      room.classList.remove('room--active');
    })
    room.classList.add('room--active')
    /*  tooltip.querySelector('.room-id').innerText = this.dataset.title; */
    tooltip.style.top = (rect.y - 240 + scrollY) + 'px';
    tooltip.style.left = (rect.x - 158 + rect.width / 2) + 'px';
    /* tooltip.style.display = 'block'; */
    tooltip.classList.add('active')
  })
})

tooltipClose.addEventListener('click', function () {
  rooms.forEach(room => {
    room.classList.remove('room--active');
  });
  /* tooltip.style.display = 'none';*/
  tooltip.classList.remove('active')
});

/* tabs room */

const tabsBtn = document.querySelectorAll('.tabs__nav-btn');
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

    if (!currentBtn.classList.contains('active')) {
      tabsBtn.forEach(function (item) {
        item.classList.remove('active');
      });
      tabsNumbers.forEach(function (item) {
        item.classList.remove('active');
      });
    }

    tabsItems.forEach(function (item) {
      item.classList.remove('active');
    });

    currentBtn.classList.add('active');
    currentTab.classList.add('active');
    CurrentTabsNumbers.classList.add('active');
  })
})

/* tabs room */

const tabsBuilding = document.querySelectorAll('.tabs__building-btn');
const tabsItemsBuilding = document.querySelectorAll('.tabs-building__item');

tabsBuilding.forEach(function (item) {
  item.addEventListener('click', function () {
    let currentBtn = item;
    let tabId = currentBtn.getAttribute('data-tab');
    let currentTab = document.querySelector(tabId);

    if (!currentBtn.classList.contains('active')) {
      tabsBuilding.forEach(function (item) {
        item.classList.remove('active');
      });
    }

    tabsItemsBuilding.forEach(function (item) {
      item.classList.remove('active');
    });

    currentBtn.classList.add('active');
    currentTab.classList.add('active');
    currentTab.querySelector('.tabs__item').classList.add('active');
  })
})