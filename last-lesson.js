(function () {
  // Защита от повторного добавления
  if (window.lastLessonInserted) return;
  window.lastLessonInserted = true;

  // Селекторы контейнеров
  const desktopSelector = '.xdget-lessonSchedule';
  const mobileSelector = '.col-md-4';

  // Создание блоков
  function createLessonBlocks(lessonTitle, lessonUrl) {
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

    const linksBlock = document.createElement('div');
    linksBlock.className = 'useful-links-block';
    linksBlock.style.marginTop = '20px';
    linksBlock.innerHTML = `
      <div class="useful-links-header">Полезные ссылки:</div>
      <a href="https://t.me/example" target="_blank" class="useful-link-item">Telegram канал</a>
      <div class="useful-link-divider"></div>
      <a href="https://instagram.com/example" target="_blank" class="useful-link-item">Instagram</a>
      <div class="useful-link-divider"></div>
      <a href="https://t.me/example" target="_blank" class="useful-link-item">Цифровой салон будущего</a>
      <div class="useful-link-divider"></div>
      <a href="https://instagram.com/example" target="_blank" class="useful-link-item">НКО</a>
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

  // Функция вставки блоков внутрь контейнера
  function insertBlocks(container, lessonTitle, lessonUrl) {
    // Защита от повторного добавления в контейнер
    if (container.querySelector('.lastLessonBlock')) return;
    const { lessonBlock, linksBlock } = createLessonBlocks(lessonTitle, lessonUrl);
    container.appendChild(lessonBlock);
    container.appendChild(linksBlock);
    console.log('Блоки last-lesson и полезных ссылок добавлены внутрь контейнера!');
  }

  // Попробуем вставить, если контейнер уже есть
  function tryInsert() {
    const container = document.querySelector(desktopSelector) || document.querySelector(mobileSelector);
    if (container) {
      fetchLessonData((title, url) => insertBlocks(container, title, url));
      return true;
    }
    return false;
  }

  // Если контейнер ещё не появился — наблюдаем за DOM
  if (!tryInsert()) {
    const observer = new MutationObserver(() => {
      if (tryInsert()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
