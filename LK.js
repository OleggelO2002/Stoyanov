(async function () {
  // ==============================
  // 1️⃣ Перестройка HTML профиля
  // ==============================
  const root = document.querySelector('article.col__left');
  if (!root) {
    console.error('article.col__left не найден');
    return;
  }

  const oldLeftColumn = root.querySelector('.Flex__column.gap-16-24');
  const form = root.querySelector('form#form');
  const multi = form.querySelector('.Flex.multi-column');

  if (!oldLeftColumn || !form || !multi) {
    console.error('Ключевые блоки не найдены');
    return;
  }

  // ===== создаём layout =====
  const layout = document.createElement('div');
  layout.className = 'profile-layout-js';

  const left = document.createElement('div');
  left.className = 'profile-left-js';

  const right = document.createElement('div');
  right.className = 'profile-right-js';

  layout.append(left, right);
  root.prepend(layout);

  // ===== левая колонка =====
  const photoRow = oldLeftColumn.querySelector('._photo_t3imu_3')?.closest('.InputRow');
  const deleteBtn = oldLeftColumn.querySelector('.Link');
  const emailBlock = oldLeftColumn.querySelector('.Flex[style*="align-items: center"]');
  const about = multi.querySelector('textarea[name="aboutMe"]')?.closest('.InputRow');

  if (photoRow) left.append(photoRow);
  if (deleteBtn) left.append(deleteBtn);
  if (emailBlock) left.append(emailBlock);
  if (about) left.append(about);

  // ===== правая колонка =====
  const row1 = document.createElement('div'); row1.className = 'profile-row row-1';
  const row2 = document.createElement('div'); row2.className = 'profile-row row-2';
  const row3 = document.createElement('div'); row3.className = 'profile-row row-3';
  right.append(row1, row2, row3);

  row1.append(takeInput('firstName'), takeInput('lastName'), takeGender());
  row2.append(takeEmailAsInput(emailBlock), takeBirthday());
  row3.append(takeInput('phone'), createTelegram());

  multi.style.display = 'none';
  console.log('✅ Профиль перестроен');

  // ===== helpers =====
  function takeInput(name) { return form.querySelector(`[name="${name}"]`)?.closest('.InputRow'); }
  function takeGender() { return form.querySelector('input[name="gender"]')?.closest('.InputRow'); }
  function takeBirthday() { return form.querySelector('input[name="birthday"]')?.closest('.InputRow'); }
  function takeEmailAsInput(emailBlock) {
    const emailText = emailBlock?.textContent?.trim() || '';
    const wrap = document.createElement('div'); wrap.className = 'InputRow wide';
    wrap.innerHTML = `<div class="InputRow__title">Email</div><input type="text" value="${emailText}" disabled>`;
    return wrap;
  }
  function createTelegram() {
    const value = document.querySelector('.telegram-value')?.textContent || '';
    const wrap = document.createElement('div'); wrap.className = 'InputRow';
    wrap.innerHTML = `<div class="InputRow__title">Telegram</div><input type="text" value="${value}">`;
    return wrap;
  }

  // ============================================
  // 2️⃣ Создание блока mentor-grid с данными
  // ============================================
  const leftBlock = document.querySelector('.Flex.Flex__column.gap-16-24');
  if (leftBlock && !leftBlock.closest('.profile-wide-row')) {
    const wrapper = document.createElement('div'); wrapper.className = 'profile-wide-row';
    const leftCol = document.createElement('div'); leftCol.className = 'profile-left-col';
    const rightCol = document.createElement('div'); rightCol.className = 'profile-right-col';

    leftBlock.parentNode.insertBefore(wrapper, leftBlock);
    leftCol.appendChild(leftBlock);
    wrapper.append(leftCol, rightCol);
    console.log('✅ Двухколоночная структура создана');

    // загрузка данных с info-lk
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
      const response = await fetch('https://academy.business-stoyanov.com/info-lk', { credentials: 'include' });
      const html = await response.text();
      const temp = document.createElement('div'); temp.innerHTML = html;
      const rawBlock = temp.querySelector('.info-lk [data-raw-editable="true"]');
      if (rawBlock) values = rawBlock.innerText.split(';').map(v => v.trim());
    } catch (e) { console.warn('⚠️ Не удалось загрузить данные', e); }

    // строим сетку 2×3
    const grid = document.createElement('div'); grid.className = 'mentor-grid';
    labels.forEach((label, i) => {
      const value = values[i] || '';
      const row = document.createElement('div'); row.className = 'InputRow';
      row.innerHTML = `
        <div class="InputRow__title">
          <div class="Flex Caption Caption" data-size="xl" style="gap:4px;">${label}</div>
        </div>
        <div class="mentor-value">${value}</div>
      `;
      grid.appendChild(row);
    });
    rightCol.appendChild(grid);
    console.log('✅ Данные успешно добавлены в правую колонку');
  }

  // ============================================
  // 3️⃣ Создание кнопок с ссылками (под profile-right-js)
  // ============================================
  const rightBlock = document.querySelector('.profile-right-js');
  if (rightBlock && !rightBlock.querySelector('.profile-extra-buttons')) {
    const buttonsWrap = document.createElement('div'); buttonsWrap.className = 'profile-extra-buttons';
    const buttons = [
      { text: 'Рабочая тетрадь МК', href: '#' },
      { text: 'Маркетинговый план', href: '#' },
      { text: 'Дорожная карта', href: '#' }
    ];

    try {
      const responseLinks = await fetch('https://academy.business-stoyanov.com/linksp-lk', { credentials: 'include' });
      const htmlLinks = await responseLinks.text();
      const tempLinks = document.createElement('div'); tempLinks.innerHTML = htmlLinks;
      const rawLinks = tempLinks.querySelector('.linksp-lk [data-raw-editable="true"]');
      if (rawLinks) {
        const hrefs = rawLinks.innerText.split(';').map(v => v.trim()).filter(Boolean);
        buttons.forEach((btn, i) => { if (hrefs[i]) btn.href = hrefs[i]; });
      }
    } catch (e) { console.warn('⚠️ Не удалось загрузить ссылки', e); }

    buttons.forEach(btn => {
      const a = document.createElement('a'); a.className = 'profile-btn';
      a.textContent = btn.text; a.href = btn.href; a.target = '_blank';
      buttonsWrap.appendChild(a);
    });

    rightBlock.appendChild(buttonsWrap);
    console.log('✅ Кнопки успешно добавлены под правый блок');
  }

})();

