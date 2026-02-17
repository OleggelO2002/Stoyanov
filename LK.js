function transformPageToImageLayout() {
    // Находим основные контейнеры
    const mainContainer = document.querySelector('[data-v-79a14e07][data-v-1d81054d].Flex.Flex__column.gap-16-24');
    if (!mainContainer) return;

    // Находим верхний блок с фото и email
    const topBlock = mainContainer.querySelector('.Flex.Flex__column:first-child');
    
    // Находим блок с формой (следующий после topBlock)
    const formBlock = mainContainer.querySelector('.Flex.Flex__column.gap-between-elements');
    if (!formBlock) return;

    // Находим форму внутри formBlock
    const form = formBlock.querySelector('#form');
    
    // Находим блок с аккаунтами для быстрого входа
    const accountsBlock = formBlock.querySelector('.Flex.Flex__column.gap-8-12');
    
    // Находим блок с рабочими тетрадями (если есть, если нет - создадим позже)
    let workbookBlock = formBlock.querySelector('.workbook-block');
    
    // 1. Переставляем верхний блок с фото (делаем его как на картинке - Игорь Стоянов)
    if (topBlock) {
        // Очищаем верхний блок от лишних элементов, оставляем только фото и email
        const photoElement = topBlock.querySelector('[data-v-7268afe9]');
        const emailElement = topBlock.querySelector('.Flex[style*="align-items: center"]');
        const passwordButton = topBlock.querySelector('.ButtonRow');
        
        topBlock.innerHTML = '';
        topBlock.style.flexDirection = 'row';
        topBlock.style.alignItems = 'center';
        topBlock.style.justifyContent = 'space-between';
        topBlock.style.padding = '16px';
        topBlock.style.backgroundColor = '#f5f5f5';
        topBlock.style.borderRadius = '8px';
        topBlock.style.marginBottom = '20px';
        
        // Создаем левую часть с фото и именем
        const leftSection = document.createElement('div');
        leftSection.className = 'Flex';
        leftSection.style.display = 'flex';
        leftSection.style.alignItems = 'center';
        leftSection.style.gap = '16px';
        
        if (photoElement) {
            photoElement.style.width = '80px';
            photoElement.style.height = '80px';
            leftSection.appendChild(photoElement);
        }
        
        // Добавляем имя и фамилию
        const nameDiv = document.createElement('div');
        nameDiv.className = 'Flex Flex__column';
        nameDiv.style.gap = '4px';
        
        const nameHeading = document.createElement('h2');
        nameHeading.textContent = 'Игорь Стоянов';
        nameHeading.style.margin = '0';
        nameHeading.style.fontSize = '24px';
        nameHeading.style.fontWeight = '600';
        
        const aboutText = document.createElement('p');
        aboutText.textContent = 'О себе';
        aboutText.style.margin = '0';
        aboutText.style.color = '#666';
        aboutText.style.fontSize = '14px';
        
        nameDiv.appendChild(nameHeading);
        nameDiv.appendChild(aboutText);
        leftSection.appendChild(nameDiv);
        
        // Правая часть с email
        const rightSection = document.createElement('div');
        rightSection.className = 'Flex';
        rightSection.style.display = 'flex';
        rightSection.style.alignItems = 'center';
        rightSection.style.gap = '16px';
        
        if (emailElement) {
            emailElement.style.fontSize = '14px';
            rightSection.appendChild(emailElement);
        }
        
        // Кнопка "Сохранить"
        const saveButton = document.createElement('button');
        saveButton.className = '_Button_1yri8_3 _ButtonPrimary_1yri8_141';
        saveButton.textContent = 'Сохранить';
        saveButton.style.padding = '8px 16px';
        rightSection.appendChild(saveButton);
        
        topBlock.appendChild(leftSection);
        topBlock.appendChild(rightSection);
    }

    // 2. Перестраиваем форму в 3 колонки как на картинке
    if (form) {
        const multiColumn = form.querySelector('.multi-column');
        if (multiColumn) {
            // Очищаем multi-column
            multiColumn.innerHTML = '';
            multiColumn.style.display = 'grid';
            multiColumn.style.gridTemplateColumns = 'repeat(3, 1fr)';
            multiColumn.style.gap = '24px';
            
            // Колонка 1: Имя, Фамилия, Пол, E-mail, Дата рождения
            const col1 = document.createElement('div');
            col1.className = 'Flex Flex__column';
            col1.style.gap = '12px';
            
            // Имя
            const nameRow = createInputRow('Имя', 'text', 'firstName', 'Игорь');
            // Фамилия
            const lastNameRow = createInputRow('Фамилия', 'text', 'lastName', 'Стоянов');
            // Пол
            const genderRow = createGenderRow();
            // E-mail
            const emailRow = createInputRow('E-mail', 'email', 'email', 'Vasha.pochta@gmail.com');
            // Дата рождения
            const birthdayRow = createInputRow('Дата рождения', 'text', 'birthday', 'ДД.ММ.ГГГГ');
            
            col1.appendChild(nameRow);
            col1.appendChild(lastNameRow);
            col1.appendChild(genderRow);
            col1.appendChild(emailRow);
            col1.appendChild(birthdayRow);
            
            // Колонка 2: Контактный номер, Telegram, Страна, Город
            const col2 = document.createElement('div');
            col2.className = 'Flex Flex__column';
            col2.style.gap = '12px';
            
            // Контактный номер
            const phoneRow = createInputRow('Контактный номер', 'tel', 'phone', '+7(903) 939-09-32');
            // Telegram
            const telegramRow = createInputRow('Telegram', 'text', 'telegram', '@UserName');
            // Страна
            const countryRow = createInputRow('Страна', 'text', 'country', '');
            // Город
            const cityRow = createInputRow('Город', 'text', 'city', '');
            
            col2.appendChild(phoneRow);
            col2.appendChild(telegramRow);
            col2.appendChild(countryRow);
            col2.appendChild(cityRow);
            
            // Колонка 3: О себе (будет добавлена позже)
            const col3 = document.createElement('div');
            col3.className = 'Flex Flex__column';
            col3.style.gap = '12px';
            
            // О себе - текст из задания
            const aboutRow = createTextareaRow('О себе', 'aboutMe', 
                'Уже 5 лет развиваю свой быстрый бизнес: от небольших парикмахерских до сети салонов с оборотом 10+ млн рублей. Прошел через всю базу — от поиска клиентов и автоматизации до масштабирования команды.');
            
            col3.appendChild(aboutRow);
            
            multiColumn.appendChild(col1);
            multiColumn.appendChild(col2);
            multiColumn.appendChild(col3);
        }
    }

    // 3. Добавляем блок "Рабочая тетрадь МК"
    const workbookSection = document.createElement('div');
    workbookSection.className = 'Flex Flex__column workbook-block';
    workbookSection.style.marginTop = '24px';
    workbookSection.style.marginBottom = '24px';
    workbookSection.style.gap = '12px';
    
    const workbookTitle = document.createElement('div');
    workbookTitle.className = 'HeadingV2';
    workbookTitle.setAttribute('data-level', '2');
    workbookTitle.textContent = 'Рабочая тетрадь МК';
    workbookTitle.style.fontSize = '18px';
    workbookTitle.style.fontWeight = '600';
    
    const workbookItems = document.createElement('div');
    workbookItems.className = 'Flex';
    workbookItems.style.display = 'flex';
    workbookItems.style.gap = '24px';
    
    const item1 = document.createElement('span');
    item1.textContent = 'Маркетинговый план';
    const item2 = document.createElement('span');
    item2.textContent = 'Дорожная карта';
    
    workbookItems.appendChild(item1);
    workbookItems.appendChild(item2);
    
    workbookSection.appendChild(workbookTitle);
    workbookSection.appendChild(workbookItems);
    
    // Вставляем после формы, перед аккаунтами
    if (accountsBlock) {
        formBlock.insertBefore(workbookSection, accountsBlock);
    }

    // 4. Добавляем блок "Контракт-намерение" (новый блок)
    const contractBlock = document.createElement('div');
    contractBlock.className = 'Flex Flex__column contract-block';
    contractBlock.style.marginTop = '24px';
    contractBlock.style.marginBottom = '24px';
    contractBlock.style.padding = '20px';
    contractBlock.style.backgroundColor = '#f9f9f9';
    contractBlock.style.borderRadius = '8px';
    contractBlock.style.gap = '20px';
    
    const contractTitle = document.createElement('div');
    contractTitle.className = 'HeadingV2';
    contractTitle.setAttribute('data-level', '2');
    contractTitle.textContent = 'Контракт-намерение';
    contractTitle.style.fontSize = '18px';
    contractTitle.style.fontWeight = '600';
    
    // Точки А, Б, В
    const pointsContainer = document.createElement('div');
    pointsContainer.className = 'Flex';
    pointsContainer.style.display = 'flex';
    pointsContainer.style.justifyContent = 'space-between';
    pointsContainer.style.gap = '20px';
    
    const pointA = createPoint('Точка А', '1\'000\'000₽');
    const pointB = createPoint('Точка Б', '2\'000\'000₽');
    const pointV = createPoint('Точка В', '3\'000\'000₽');
    
    pointsContainer.appendChild(pointA);
    pointsContainer.appendChild(pointB);
    pointsContainer.appendChild(pointV);
    
    // Инфо блоки 1-5
    const infoContainer = document.createElement('div');
    infoContainer.className = 'Flex';
    infoContainer.style.display = 'grid';
    infoContainer.style.gridTemplateColumns = 'repeat(5, 1fr)';
    infoContainer.style.gap = '16px';
    infoContainer.style.marginTop = '16px';
    
    for (let i = 1; i <= 5; i++) {
        const infoItem = document.createElement('div');
        infoItem.className = 'info-item';
        infoItem.style.padding = '12px';
        infoItem.style.backgroundColor = 'white';
        infoItem.style.borderRadius = '4px';
        infoItem.style.border = '1px solid #e0e0e0';
        
        const infoLabel = document.createElement('div');
        infoLabel.textContent = `Инф ${i}`;
        infoLabel.style.fontWeight = '600';
        infoLabel.style.marginBottom = '8px';
        
        const infoValue = document.createElement('div');
        infoValue.textContent = i === 5 ? 'Длинный текст' : 'Текст';
        infoValue.style.color = '#666';
        infoValue.style.fontSize = '14px';
        
        infoItem.appendChild(infoLabel);
        infoItem.appendChild(infoValue);
        infoContainer.appendChild(infoItem);
    }
    
    contractBlock.appendChild(contractTitle);
    contractBlock.appendChild(pointsContainer);
    contractBlock.appendChild(infoContainer);
    
    // Вставляем блок контракта после рабочей тетради
    if (workbookSection) {
        formBlock.insertBefore(contractBlock, workbookSection.nextSibling);
    } else {
        formBlock.appendChild(contractBlock);
    }

    // 5. Перемещаем блок аккаунтов в конец
    if (accountsBlock) {
        formBlock.appendChild(accountsBlock);
    }
}

// Вспомогательная функция для создания строки ввода
function createInputRow(label, type, name, value) {
    const row = document.createElement('div');
    row.className = 'InputRow';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'InputRow__title';
    
    const captionDiv = document.createElement('div');
    captionDiv.className = 'Flex Caption Caption';
    captionDiv.setAttribute('data-size', 'xl');
    captionDiv.style.gap = '4px';
    captionDiv.textContent = label;
    
    titleDiv.appendChild(captionDiv);
    
    const input = document.createElement('input');
    input.type = type;
    input.className = '_inputText_1xiwj_1';
    input.name = name;
    input.value = value;
    input.style.width = '100%';
    input.style.padding = '8px';
    input.style.border = '1px solid #ccc';
    input.style.borderRadius = '4px';
    
    row.appendChild(titleDiv);
    row.appendChild(input);
    
    return row;
}

// Вспомогательная функция для создания пола (радио кнопки)
function createGenderRow() {
    const row = document.createElement('div');
    row.className = 'InputRow';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'InputRow__title';
    
    const captionDiv = document.createElement('div');
    captionDiv.className = 'Flex Caption Caption';
    captionDiv.setAttribute('data-size', 'xl');
    captionDiv.style.gap = '4px';
    captionDiv.textContent = 'Пол';
    
    titleDiv.appendChild(captionDiv);
    
    const genderContainer = document.createElement('div');
    genderContainer.className = 'Flex';
    genderContainer.style.display = 'flex';
    genderContainer.style.gap = '24px';
    
    const femaleLabel = document.createElement('label');
    femaleLabel.className = 'RadioWrapper';
    const femaleInput = document.createElement('input');
    femaleInput.type = 'radio';
    femaleInput.name = 'gender';
    femaleInput.value = 'female';
    femaleInput.checked = true;
    femaleLabel.appendChild(femaleInput);
    femaleLabel.appendChild(document.createTextNode('Женский'));
    
    const maleLabel = document.createElement('label');
    maleLabel.className = 'RadioWrapper';
    const maleInput = document.createElement('input');
    maleInput.type = 'radio';
    maleInput.name = 'gender';
    maleInput.value = 'male';
    maleLabel.appendChild(maleInput);
    maleLabel.appendChild(document.createTextNode('Мужской'));
    
    genderContainer.appendChild(femaleLabel);
    genderContainer.appendChild(maleLabel);
    
    row.appendChild(titleDiv);
    row.appendChild(genderContainer);
    
    return row;
}

// Вспомогательная функция для создания текстового поля
function createTextareaRow(label, name, value) {
    const row = document.createElement('div');
    row.className = 'InputRow';
    
    const titleDiv = document.createElement('div');
    titleDiv.className = 'InputRow__title';
    
    const captionDiv = document.createElement('div');
    captionDiv.className = 'Flex Caption Caption';
    captionDiv.setAttribute('data-size', 'xl');
    captionDiv.style.gap = '4px';
    captionDiv.textContent = label;
    
    titleDiv.appendChild(captionDiv);
    
    const textarea = document.createElement('textarea');
    textarea.className = 'Textarea';
    textarea.name = name;
    textarea.value = value;
    textarea.style.width = '100%';
    textarea.style.minHeight = '100px';
    textarea.style.padding = '8px';
    textarea.style.border = '1px solid #ccc';
    textarea.style.borderRadius = '4px';
    textarea.style.resize = 'vertical';
    
    row.appendChild(titleDiv);
    row.appendChild(textarea);
    
    return row;
}

// Запускаем функцию после загрузки страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', transformPageToImageLayout);
} else {
    transformPageToImageLayout();
}
