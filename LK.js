(function () {
  const root = document.querySelector('article.col__left');
  if (!root) {
    console.error('article.col__left не найден');
    return;
  }

  // ===== 1. Базовые элементы =====
  const oldLeftColumn = root.querySelector('.Flex__column.gap-16-24');
  const form = root.querySelector('form#form');
  const multi = form.querySelector('.Flex.multi-column');

  if (!oldLeftColumn || !form || !multi) {
    console.error('Ключевые блоки не найдены');
    return;
  }

  // ===== 2. Создаём новый layout =====
  const layout = document.createElement('div');
  layout.className = 'profile-layout-js';

  const left = document.createElement('div');
  left.className = 'profile-left-js';

  const right = document.createElement('div');
  right.className = 'profile-right-js';

  layout.append(left, right);
  root.prepend(layout);

  // ===== 3. ЛЕВАЯ КОЛОНКА =====

  // Фото + удалить
  const photoRow = oldLeftColumn.querySelector('._photo_t3imu_3')?.closest('.InputRow');
  const deleteBtn = oldLeftColumn.querySelector('.Link');

  if (photoRow) left.append(photoRow);
  if (deleteBtn) left.append(deleteBtn);

  // Email
  const emailBlock = oldLeftColumn.querySelector('.Flex[style*="align-items: center"]');
  if (emailBlock) left.append(emailBlock);

  // О себе
  const about = multi.querySelector('textarea[name="aboutMe"]')?.closest('.InputRow');
  if (about) left.append(about);

  // ===== 4. ПРАВАЯ КОЛОНКА =====

  const row1 = document.createElement('div');
  row1.className = 'profile-row row-1';

  const row2 = document.createElement('div');
  row2.className = 'profile-row row-2';

  const row3 = document.createElement('div');
  row3.className = 'profile-row row-3';

  right.append(row1, row2, row3);

  // ----- Row 1 -----
  row1.append(
    takeInput('firstName'),
    takeInput('lastName'),
    takeGender()
  );

  // ----- Row 2 -----
  row2.append(
    takeEmailAsInput(),
    takeBirthday()
  );

  // ----- Row 3 -----
  row3.append(
    takeInput('phone'),
    createTelegram()
  );

  // ===== 5. Прячем старую сетку =====
  multi.style.display = 'none';

  console.log('Профиль перестроен');

  // ===== helpers =====

  function takeInput(name) {
    const input = form.querySelector(`[name="${name}"]`);
    return input?.closest('.InputRow');
  }

  function takeGender() {
    return form.querySelector('input[name="gender"]')?.closest('.InputRow');
  }

  function takeBirthday() {
    return form.querySelector('input[name="birthday"]')?.closest('.InputRow');
  }

  function takeEmailAsInput() {
    const emailText = emailBlock?.textContent?.trim() || '';
    const wrap = document.createElement('div');
    wrap.className = 'InputRow wide';

    wrap.innerHTML = `
      <div class="InputRow__title">Email</div>
      <input type="text" value="${emailText}" disabled>
    `;
    return wrap;
  }

  function createTelegram() {
    const value = document.querySelector('.telegram-value')?.textContent || '';

    const wrap = document.createElement('div');
    wrap.className = 'InputRow';

    wrap.innerHTML = `
      <div class="InputRow__title">Telegram</div>
      <input type="text" value="${value}">
    `;
    return wrap;
  }
})();
