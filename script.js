// Массив объектов с категориями (ваши идеи и пути к фото)
const ideasWithBackgrounds = [
    // 📚 Образование
    { idea: "📖 Почитать статью на Википедии про случайную тему", bg: "photos/library.jpg", category: "📚 Образование" },
    { idea: "🎧 Послушать подкаст на тему, в которой ты ничего не понимаешь", bg: "photos/microphone.jpg", category: "📚 Образование" },
    { idea: "📖 Прочитать одну главу из научно-популярной книги", bg: "photos/books.jpg", category: "📚 Образование" },
    { idea: "🔍 Найти значение слова, которое ты давно хотел узнать", bg: "photos/blue.jpg", category: "📚 Образование" },
    { idea: "🧠 Пройти тест на тип личности и почитать про свой тип", bg: "photos/laptop.jpg", category: "📚 Образование" },
    { idea: "🧮 Порешать несколько логических задач (например, судоку)", bg: "photos/telescope.jpg", category: "📚 Образование" },

    // 🎨 Творчество
    { idea: "🎨 Нарисовать что-то, даже если ты не умеешь. Просто линии и пятна", bg: "photos/paints.jpg", category: "🎨 Творчество" },
    { idea: "📝 Написать список из 10 вещей, за которые ты благодарен сегодня", bg: "photos/field.jpg", category: "🎨 Творчество" },
    { idea: "✍️ Написать письмо себе в будущее", bg: "photos/writing.jpg", category: "🎨 Творчество" },
    { idea: "🎭 Написать мини-рассказ из трёх предложений на случайную тему", bg: "photos/typemachine.jpg", category: "🎨 Творчество" },
    { idea: "🎥 Посмотреть урок по рисованию на YouTube и повторить", bg: "photos/beach.jpg", category: "🎨 Творчество" },
    { idea: "📸 Сфотографировать 10 интересных деталей вокруг себя", bg: "photos/colors.jpg", category: "🎨 Творчество" },

    // 🧘 Релакс
    { idea: "🧘 Посидеть 10 минут в тишине, ни на что не отвлекаясь", bg: "photos/purple.jpg", category: "🧘 Релакс" },
    { idea: "📚 Перечитать любимое стихотворение или отрывок из книги", bg: "photos/reading.jpg", category: "🧘 Релакс" },
    { idea: "☕ Выпить чай/кофе в новом месте", bg: "photos/town.jpg", category: "🧘 Релакс" },
    { idea: "🌱 Посадить какое-нибудь растение или ухаживать за существующим", bg: "photos/lake.jpg", category: "🧘 Релакс" },
    { idea: "📿 Попробовать медитацию с гайдом", bg: "photos/space.jpg", category: "🧘 Релакс" },
    { idea: "✉️ Отправить кому-нибудь доброе сообщение без повода", bg: "photos/sky.jpg", category: "🧘 Релакс" },

    // 🏃 Активность
    { idea: "🚶 Прогуляться по новому маршруту — сверни там, где никогда не ходил", bg: "photos/forest.jpg", category: "🏃 Активность" },
    { idea: "🌿 Сходить в ближайший парк и собрать букет из листьев/цветов", bg: "photos/sunny_forest.jpg", category: "🏃 Активность" },
    { idea: "🤸 Сделать зарядку под любое энергичное видео на YouTube", bg: "photos/yoga.jpg", category: "🏃 Активность" },
    { idea: "🧹 Разобрать один ящик в столе или шкафу (начни с малого)", bg: "photos/wall.jpg", category: "🏃 Активность" },
    { idea: "📞 Позвонить старому другу или родственнику просто так", bg: "photos/sofa.jpg", category: "🏃 Активность" },
    { idea: "🍳 Приготовить блюдо, которое никогда раньше не готовил", bg: "photos/city.jpg", category: "🏃 Активность" },

    // 🍿 Развлечения
    { idea: "🎬 Посмотреть короткометражный фильм (можно найти на YouTube)", bg: "photos/proector.jpg", category: "🍿 Развлечения" },
    { idea: "🎵 Послушать альбом известного музыканта, которого ты не слушал раньше", bg: "photos/vinil.jpg", category: "🍿 Развлечения" },
    { idea: "🧩 Собрать пазл онлайн", bg: "photos/puzzle.jpg", category: "🍿 Развлечения" },
    { idea: "🌌 Посмотреть документальный фильм про космос", bg: "photos/astronomy.jpg", category: "🍿 Развлечения" },
    { idea: "🎲 Сыграть в настольную игру (соло или с семьёй)", bg: "photos/neon.jpg", category: "🍿 Развлечения" },
    { idea: "📺 Посмотреть стендап комика, которого не знаешь", bg: "photos/stand_up.jpg", category: "🍿 Развлечения" }
];

// Предзагрузка изображений
ideasWithBackgrounds.forEach(item => {
    const img = new Image();
    img.src = item.bg;
});

// Элементы DOM
const bgOverlay = document.getElementById('bg-overlay');
const generateBtn = document.getElementById('generate-btn');
const ideaText = document.getElementById('idea-text');
const favoriteBtn = document.getElementById('favorite-btn');
const categoryBtns = document.querySelectorAll('.category-btn');
const favoritesFilterBtn = document.getElementById('favorites-filter-btn');
const favoritesList = document.getElementById('favorites-list');
const favoritesListItems = document.getElementById('favorites-list-items');
const closeFavoritesList = document.getElementById('close-favorites-list');
const themeToggle = document.getElementById('theme-toggle');

// Состояние
let currentCategory = 'all';
let lastIndex = -1;
let currentFilteredIdeas = [];
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
let currentTheme = localStorage.getItem('theme') || 'dark';
let typingTimer = null;      // для setTimeout (не используется, но оставим про запас)
let currentTypingInterval = null; // для управления интервалом печати

// ========== ФУНКЦИИ ДЛЯ ТЕМЫ ==========
function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.textContent = '🌙 Тёмная';
    } else {
        document.body.classList.remove('light-theme');
        themeToggle.textContent = '☀️ Светлая';
    }
    localStorage.setItem('theme', theme);
}
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(currentTheme);
});
applyTheme(currentTheme);

// ========== ЭФФЕКТ ПЕЧАТНОЙ МАШИНКИ ==========
function typeWriter(text, element, speed = 30) {
    if (!text) return;
    
    // Останавливаем предыдущую печать, если она идёт
    if (currentTypingInterval) {
        clearInterval(currentTypingInterval);
        currentTypingInterval = null;
    }
    if (typingTimer) {
        clearTimeout(typingTimer);
        typingTimer = null;
    }
    
    element.textContent = ''; // очищаем поле
    let i = 0;
    
    currentTypingInterval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(currentTypingInterval);
            currentTypingInterval = null;
        }
    }, speed);
}

// ========== ФУНКЦИИ ДЛЯ ИЗБРАННОГО ==========
function saveFavorites() {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
function isFavorite(index) {
    return favorites.includes(index);
}
function updateFavoriteButton(index) {
    if (isFavorite(index)) {
        favoriteBtn.textContent = '❤️ В избранном';
        favoriteBtn.classList.add('favorited');
    } else {
        favoriteBtn.textContent = '🤍 В избранное';
        favoriteBtn.classList.remove('favorited');
    }
}
function toggleFavorite(index) {
    const wasFavorite = isFavorite(index);
    
    if (wasFavorite) {
        // Удаляем из избранного
        favorites = favorites.filter(i => i !== index);
        
        // Добавляем анимацию удаления
        favoriteBtn.classList.add('removing');
        
        // Через время анимации убираем класс и обновляем внешний вид кнопки
        setTimeout(() => {
            favoriteBtn.classList.remove('removing');
            updateFavoriteButton(index);
        }, 300); // длительность анимации совпадает с CSS (0.3s)
    } else {
        // Добавляем в избранное
        favorites.push(index);
        // Анимация добавления уже есть (если она завязана на класс .favorited, то она сработает автоматически)
        updateFavoriteButton(index);
    }
    
    saveFavorites();

    // Если открыт список избранного, обновляем его
    if (!favoritesList.classList.contains('hidden')) {
        showFavoritesList();
    }
}

// ========== ФУНКЦИИ ДЛЯ ФИЛЬТРАЦИИ ==========
function updateFilteredIdeas() {
    if (currentCategory === 'all') {
        currentFilteredIdeas = ideasWithBackgrounds.map((item, index) => ({ index, item }));
    } else {
        currentFilteredIdeas = ideasWithBackgrounds
            .map((item, index) => ({ index, item }))
            .filter(entry => entry.item.category === currentCategory);
    }
}
function getRandomItemFromFiltered() {
    if (currentFilteredIdeas.length === 0) return null;
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * currentFilteredIdeas.length);
    } while (randomIndex === lastIndex && currentFilteredIdeas.length > 1);
    lastIndex = randomIndex;
    return currentFilteredIdeas[randomIndex];
}
function setActiveCategory(category) {
    categoryBtns.forEach(btn => {
        const btnCategory = btn.dataset.category;
        if (btnCategory === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// ========== ФУНКЦИЯ ГЕНЕРАЦИИ ИДЕИ ==========
function generateNewIdea() {
    // Скрываем список избранного, если открыт
    favoritesList.classList.add('hidden');
    
    // Начинаем анимацию исчезновения текста
    ideaText.classList.add('fade-out');

    setTimeout(() => {
        const selected = getRandomItemFromFiltered();
        if (selected) {
            const { index, item } = selected;
            
            // Запускаем печатную машинку для новой идеи
            typeWriter(item.idea, ideaText, 30);
            
            document.body.style.backgroundImage = `url('${item.bg}')`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
            document.body.style.backgroundAttachment = 'fixed';

            favoriteBtn.style.display = 'inline-block';
            updateFavoriteButton(index);
            favoriteBtn.dataset.currentIndex = index;
        } else {
            // Если идей нет – обычный текст без печати
            ideaText.textContent = 'Нет идей в этой категории';
            // Останавливаем возможную печать
            if (currentTypingInterval) {
                clearInterval(currentTypingInterval);
                currentTypingInterval = null;
            }
            document.body.style.backgroundImage = 'none';
            document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            favoriteBtn.style.display = 'none';
        }

        // Убираем класс исчезновения
        ideaText.classList.remove('fade-out');
        // Не добавляем fade-in, так как печать уже работает
    }, 300);
}

// ========== ПОКАЗ СПИСКА ИЗБРАННОГО ==========
function showFavoritesList() {
    if (favorites.length === 0) {
        alert('В избранном пока ничего нет. Добавьте идеи, нажимая на сердечко ❤️');
        return;
    }
    favoritesListItems.innerHTML = '';
    favorites.forEach((index, idx) => {
        const item = ideasWithBackgrounds[index];
        if (!item) return;
        const card = document.createElement('div');
        card.className = 'favorite-item';
        card.style.animationDelay = `${idx * 0.05}s`;
        card.innerHTML = `
            <div style="font-size: 1.1rem; margin-bottom: 5px;">${item.idea}</div>
            <div style="font-size: 0.9rem; color: #ffb8b8;">Категория: ${item.category}</div>
        `;
        card.dataset.index = index;
        card.addEventListener('click', () => {
    // Убираем выделение у всех карточек
    document.querySelectorAll('.favorite-item').forEach(c => c.classList.remove('selected'));
    // Выделяем текущую карточку
    card.classList.add('selected');

    // Обновляем основную идею
    typeWriter(item.idea, ideaText, 30);
    document.body.style.backgroundImage = `url('${item.bg}')`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';

    // Обновляем кнопку избранного
    updateFavoriteButton(index);
    favoriteBtn.dataset.currentIndex = index;
    favoriteBtn.style.display = 'inline-block';

});
        favoritesListItems.appendChild(card);
    });
    favoritesList.classList.remove('hidden');
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        currentCategory = category;
        setActiveCategory(category);
        updateFilteredIdeas();
        generateNewIdea();
    });
});
favoritesFilterBtn.addEventListener('click', showFavoritesList);
closeFavoritesList.addEventListener('click', () => {
    favoritesList.classList.add('hidden');
});
favoriteBtn.addEventListener('click', () => {
    const currentIndex = parseInt(favoriteBtn.dataset.currentIndex);
    if (currentIndex >= 0 && currentIndex < ideasWithBackgrounds.length) {
        toggleFavorite(currentIndex);
    }
});
generateBtn.addEventListener('click', generateNewIdea);

// ========== ИНИЦИАЛИЗАЦИЯ ==========
currentCategory = 'all';
setActiveCategory('all');
updateFilteredIdeas();
document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
document.body.style.backgroundSize = 'cover';
document.body.style.backgroundPosition = 'center';
document.body.style.backgroundAttachment = 'fixed';
favoriteBtn.style.display = 'none';

