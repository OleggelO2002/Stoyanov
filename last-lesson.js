(function () {
  // Защита от повторного добавления
  if (window.lastLessonInserted) return;
  window.lastLessonInserted = true;

  // Селекторы контейнеров
  const desktopSelector = '.xdget-lessonSchedule';
  const mobileSelector = '.xdget-block.col-md-4';

  // Создание блоков
  function createLessonBlocks(lessonTitle, lessonUrl) {
    // Последний урок
    const lessonBlock = document.createElement('div');
    lessonBlock.className = 'lastLessonBlock';
    lessonBlock.style.cssText = `
      margin-top: 20px; padding: 20px; background-color: #fdfdfd;
      border: 1px solid #eee; border-radius: 8px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.05);
    `;
    lessonBlock.innerHTML = `
      <div class="lesson-title">Вы остановились на уроке:</div>
      <div class="lesson-name">${lessonTitle}</div>
      <a href="${lessonUrl}" class="lesson-btn">Продолжить учиться</a>
    `;

    // Полезные ссылки
    const linksBlock = document.createElement('div');
    linksBlock.className = 'useful-links-block';
    linksBlock.style.marginTop = '20px';
    linksBlock.innerHTML = `
      <div class="useful-links-header">Полезные ссылки:</div>
      <a href="https://t.me/example" target="_blank" class="useful-link-item">
        <img src="https://static.tildacdn.pub/tild3039-6635-4232-b935-336233343336/Mask_group.png" class="useful-link-img">
        <span class="useful-link-text">Telegram канал</span>
      </a>
      <div class="useful-link-divider"></div>
      <a href="https://instagram.com/example" target="_blank" class="useful-link-item">
        <img src="https://static.tildacdn.pub/tild6637-6163-4336-b134-646664386463/Mask_group-1.png" class="useful-link-img">
        <span class="useful-link-text">Instagram</span>
      </a>
      <div class="useful-link-divider"></div>
      <a href="https://t.me/example" target="_blank" class="useful-link-item">
        <img src="https://static.tildacdn.pub" class="useful-link-img">
        <span class="useful-link-text">Цифровой салон будущего</span>
      </a>
      <div class="useful-link-divider"></div>
      <a href="https://instagram.com/example" target="_blank" class="useful-link-item">
        <img src="https://static.tildacdn.pub" class="useful-link-img">
        <span class="useful-link-text">НКО</span>
      </a>
    `;

    return { lessonBlock, linksBlock };
  }

  // Fetch данных last-lesson
  function fetchLessonData(callback) {
    fetch(`${window.location.origin}/last-lesson-out`)
      .then(response => {
        if (!response.ok) throw new Error(`Ошибка загрузки страницы: ${response.statusText}`);
        return response.text();
      })
      .then(html => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        const rawBlock = tempDiv.querySelector('.last-lesson-out');
        if (!rawBlock) return console.log('Блок с классом .last-lesson-out не найден');

        const rawText = rawBlock.textContent.trim();
        const urlMatch = rawText.match(/https:\/\/academy\.business-stoyanov\.com\/pl\/teach\/control\/lesson\/view\?id=\d+/);
        const titleMatch = rawText.match(/^(.*?)(?=\s*https:\/\/)/);

        if (!urlMatch || !titleMatch) return console.log('Не удалось найти ссылку или заголовок');

        callback(titleMatch[0].trim(), urlMatch[0]);
      })
      .catch(error => console.error('Ошибка при загрузке HTML:', error));
  }

  // Функция вставки блоков
  function insertBlocks(container, lessonTitle, lessonUrl) {
    const { lessonBlock, linksBlock } = createLessonBlocks(lessonTitle, lessonUrl);
    container.appendChild(lessonBlock);
    container.appendChild(linksBlock);
    console.log('Блоки last-lesson и полезных ссылок добавлены внутрь контейнера!');
  }

  // Наблюдатель за появлением контейнера
  const observer = new MutationObserver(() => {
    const container = document.querySelector(desktopSelector) 
                   || document.querySelector(mobileSelector);
    if (container) {
      observer.disconnect(); // остановить наблюдение
      fetchLessonData((title, url) => insertBlocks(container, title, url));
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // На случай, если контейнер уже есть при DOMContentLoaded
  const existingContainer = document.querySelector(desktopSelector) 
                         || document.querySelector(mobileSelector);
  if (existingContainer) {
    observer.disconnect();
    fetchLessonData((title, url) => insertBlocks(existingContainer, title, url));
  }

})();
