// JS: создаём стеклянные карточки поверх существующих <tr>
function createGlassCards() {
  const rows = document.querySelectorAll('tr.training-row');

  rows.forEach(row => {
    const td = row.querySelector('td');
    if (!td) return;

    const link = td.querySelector('a');
    if (!link) return;

    // Создаём новый блок стекла
    const glassBlock = document.createElement('div');
    glassBlock.className = 'glass-card';

    // Получаем текст
    const title = link.querySelector('.stream-title')?.textContent || '';
    const subtitle = link.querySelector('div')?.innerHTML || '';

    // Вставляем контент в стекло
    glassBlock.innerHTML = `
      <a href="${link.href}">
        <span class="stream-title">${title}</span>
        <div class="subtitle">${subtitle}</div>
      </a>
    `;

    // Добавляем поверх <td>
    td.style.position = 'relative';
    td.appendChild(glassBlock);
  });
}

// Запускаем после загрузки страницы
window.addEventListener('load', createGlassCards);
