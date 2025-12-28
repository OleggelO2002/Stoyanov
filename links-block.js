document.addEventListener('DOMContentLoaded', function () {
  // ====== Проверка, чтобы блок полезных ссылок вставлялся только один раз ======
  if (window.usefulLinksInserted) return;
  window.usefulLinksInserted = true;

  // Находим блок "Последний урок"
  const lastLessonBlock = document.querySelector('.lastLessonBlock');
  if (!lastLessonBlock) return;

  // ====== Создаём контейнер для блока ссылок ======
  const linksBlock = document.createElement('div');
  linksBlock.className = 'useful-links-block';

  // Заголовок
  const header = document.createElement('div');
  header.className = 'useful-links-header';
  header.textContent = 'Полезные ссылки:';
  linksBlock.appendChild(header);

  // ====== Массив ссылок ======
  const links = [
    { img: 'https://example.com/telegram.png', text: 'Telegram канал', href: 'https://t.me/example' },
    { img: 'https://example.com/instagram.png', text: 'Instagram', href: 'https://instagram.com/example' },
    // Добавляйте сюда новые ссылки
  ];

  // ====== Создаём подблоки для каждой ссылки ======
  links.forEach(link => {
    const linkItem = document.createElement('a');
    linkItem.href = link.href;
    linkItem.target = '_blank';
    linkItem.className = 'useful-link-item';

    const img = document.createElement('img');
    img.src = link.img;
    img.alt = link.text;
    img.className = 'useful-link-img';

    const text = document.createElement('span');
    text.textContent = link.text;
    text.className = 'useful-link-text';

    linkItem.appendChild(img);
    linkItem.appendChild(text);
    linksBlock.appendChild(linkItem);

    // Разделительная линия
    const divider = document.createElement('div');
    divider.className = 'useful-link-divider';
    linksBlock.appendChild(divider);
  });

  // ====== Вставляем блок под последним уроком ======
  lastLessonBlock.parentNode.insertBefore(linksBlock, lastLessonBlock.nextSibling);
});
