(function waitForLastLesson() {
  const checkInterval = 100; // проверять каждые 100ms
  const maxChecks = 50;      // максимум 5 секунд
  let attempts = 0;

  const intervalId = setInterval(() => {
    const lastLessonBlock = document.querySelector('.lastLessonBlock');
    attempts++;

    if (lastLessonBlock) {
      clearInterval(intervalId);

      // ====== Создаём блок полезных ссылок ======
      const linksBlock = document.createElement('div');
      linksBlock.className = 'useful-links-block';

      const header = document.createElement('div');
      header.className = 'useful-links-header';
      header.textContent = 'Полезные ссылки:';
      linksBlock.appendChild(header);

      const links = [
        { img: 'https://example.com/telegram.png', text: 'Telegram канал', href: 'https://t.me/example' },
        { img: 'https://example.com/instagram.png', text: 'Instagram', href: 'https://instagram.com/example' },
        // Добавляйте новые ссылки сюда
      ];

      links.forEach(link => {
        const linkItem = document.createElement('a');
        linkItem.href = link.href;
        linkItem.target = '_blank';
        linkItem.className = 'useful-link-item';

        const img = document.createElement('img');
        img.src = link.img;
        img.className = 'useful-link-img';

        const text = document.createElement('span');
        text.textContent = link.text;
        text.className = 'useful-link-text';

        linkItem.appendChild(img);
        linkItem.appendChild(text);
        linksBlock.appendChild(linkItem);

        const divider = document.createElement('div');
        divider.className = 'useful-link-divider';
        linksBlock.appendChild(divider);
      });

      lastLessonBlock.parentNode.insertBefore(linksBlock, lastLessonBlock.nextSibling);
    }

    if (attempts >= maxChecks) {
      clearInterval(intervalId);
      console.warn('Блок .lastLessonBlock не найден за 5 секунд');
    }
  }, checkInterval);
})();
