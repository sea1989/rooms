/* Rooms */

const tooltip = document.querySelector('.tooltip');
const rooms = document.querySelectorAll('.room');

const tooltipClose = tooltip.querySelector('.tooltip-close');

rooms.forEach(room => {
  room.addEventListener('click', function (e) {
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
    tooltip.style.display = 'block';
  })
})

tooltipClose.addEventListener('click', function () {
  rooms.forEach(room => {
    room.classList.remove('room--active');
  });
  tooltip.style.display = 'none';
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
