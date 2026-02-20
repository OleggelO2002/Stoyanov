(async function () {
  // определяем мобильную версию
  if (!window.matchMedia('(max-width: 768px)').matches) return;

  const form = document.querySelector('form#form');
  if (!form) {
    console.error('form#form не найден');
    return;
  }

  // защита от повторного запуска
  if (form.nextElementSibling?.classList.contains('profile-extra-buttons')) return;

  // ==================================================
  // 1️⃣ КНОПКИ (ссылки с linksp-lk)
  // ==================================================
  const buttonsWrap = document.createElement('div');
  buttonsWrap.className = 'profile-extra-buttons';

  const buttons = [
    { text: 'Рабочая тетрадь МК', href: '#' },
    { text: 'Маркетинговый план', href: '#' },
    { text: 'Дорожная карта', href: '#' }
  ];

  try {
    const response = await fetch(
      'https://academy.business-stoyanov.com/linksp-lk',
      { credentials: 'include' }
    );
    const html = await response.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const rawLinks = temp.querySelector('.linksp-lk [data-raw-editable="true"]');
    if (rawLinks) {
      const hrefs = rawLinks.innerText
        .split(';')
        .map(v => v.trim())
        .filter(Boolean);

      buttons.forEach((btn, i) => {
        if (hrefs[i]) btn.href = hrefs[i];
      });
    }
  } catch (e) {
    console.warn('⚠️ Не удалось загрузить ссылки', e);
  }

  buttons.forEach(btn => {
    const a = document.createElement('a');
    a.className = 'profile-btn';
    a.textContent = btn.text;
    a.href = btn.href;
    a.target = '_blank';
    buttonsWrap.appendChild(a);
  });

  // 👉 вставляем КНОПКИ после формы
  form.after(buttonsWrap);

  // ==================================================
  // 2️⃣ БЛОК С НОВЫМИ ДАННЫМИ (info-lk)
  // ==================================================
  const labels = [
    'Бренд или название студии, клиники, салона',
    'Ссылки на сайт и соц. сети бизнеса',
    'Точка А',
    'Точка Б',
    'Выручка',
    'Запрос на Менторский круг'
  ];

  let values = [];
  try {
    const response = await fetch(
      'https://academy.business-stoyanov.com/info-lk',
      { credentials: 'include' }
    );
    const html = await response.text();
    const temp = document.createElement('div');
    temp.innerHTML = html;

    const rawBlock = temp.querySelector('.info-lk [data-raw-editable="true"]');
    if (rawBlock) {
      values = rawBlock.innerText
        .split(';')
        .map(v => v.trim());
    }
  } catch (e) {
    console.warn('⚠️ Не удалось загрузить данные', e);
  }

  const dataBlock = document.createElement('div');
  dataBlock.className = 'mentor-grid mentor-grid--mobile';

  labels.forEach((label, i) => {
    const value = values[i] || '';
    const row = document.createElement('div');
    row.className = 'InputRow';
    row.innerHTML = `
      <div class="InputRow__title">
        <div class="Flex Caption Caption" data-size="xl" style="gap:4px;">
          ${label}
        </div>
      </div>
      <div class="mentor-value">${value}</div>
    `;
    dataBlock.appendChild(row);
  });

  // 👉 вставляем БЛОК ДАННЫХ после кнопок
  buttonsWrap.after(dataBlock);

  console.log('✅ Мобильные кнопки и данные успешно добавлены');
})();
