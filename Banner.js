document.addEventListener('DOMContentLoaded', function () {
  // ====== БАННЕР ======
  if (!window.bannerInserted) {
    window.bannerInserted = true;

    const img = document.createElement('img');
    const isMobile = window.innerWidth <= 768;
    img.src = isMobile
      ? 'https://static.tildacdn.pub/tild3330-6531-4563-a537-353433653531/Group_48097498.png'
      : 'https://static.tildacdn.pub/tild3330-6531-4563-a537-353433653531/Group_48097498.png';

    img.alt = 'Banner Image';
    img.style.width = '100%';
    img.style.height = 'auto';

    const bannerWrapper = document.createElement('div');
    bannerWrapper.classList.add('custom-banner');
    bannerWrapper.appendChild(img);

    const container = document.querySelector('.container');
    if (container) {
      container.insertBefore(bannerWrapper, container.firstChild);
    } else {
      const streamTable = document.querySelector('.xdget-root');
      if (streamTable) streamTable.parentNode.insertBefore(bannerWrapper, streamTable);
    }
  }

  // ====== АКТУАЛЬНЫЕ СОБЫТИЯ / РАСПИСАНИЕ ======
  if (!window.scheduleInserted) {
    window.scheduleInserted = true;

    const targetContainer = document.querySelector('.col-md-4');
    if (!targetContainer) return;

    if (targetContainer.querySelector('.xdget-lessonSchedule')) return;

    fetch('/teach/control/stream/index')
      .then(response => response.text())
      .then(htmlText => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const lessonSchedule = doc.querySelector('.xdget-lessonSchedule');

        if (lessonSchedule) {
          const clone = lessonSchedule.cloneNode(true);
          targetContainer.appendChild(clone);
        }
      })
      .catch(err => {
        console.error('Ошибка при загрузке расписания:', err);
      });
  }
});
