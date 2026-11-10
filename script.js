// 1. МОДАЛЬНОЕ ОКНО ОБРАТНОГО ЗВОНКА
const callbackModal = document.getElementById('callbackModal');
const openBtn = document.getElementById('openModal');
const closeBtn = document.getElementById('closeModal');

openBtn.addEventListener('click', () => {
    callbackModal.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    callbackModal.classList.remove('active');
});


// 2. ПОП-АП ОКНО ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ ("Узнать подробнее")
const infoModal = document.getElementById('infoModal');
const closeInfoBtn = document.getElementById('closeInfoModal');
const infoTitle = document.getElementById('infoModalTitle');
const infoSpecs = document.getElementById('infoModalSpecs');
const infoListTitle = document.getElementById('infoModalListTitle');
const infoList = document.getElementById('infoModalList');
const infoToCallback = document.getElementById('infoToCallback');

// База данных программ в правильном формате для генерации списков
const infoData = {
    classic: {
        title: "Классические маршруты по Беларуси",
        specs: [
            "<strong>Длительность:</strong> от 1 до 2 дней",
            "<strong>Питание:</strong> обед в ресторане национальной кухни",
            "<strong>Трансфер:</strong> комфортабельный выезд из Минска"
        ],
        listTitle: "В стоимость включено:",
        list: [
            "Экскурсия с гидом высшей категории по Буйничскому полю",
            "Обзорная экскурсионная программа в Могилёве",
            "Посещение Мирского и Несвижского замков (входные билеты)"
        ]
    },
    corporate: {
        title: "Школьные и корпоративные программы",
        specs: [
            "<strong>Трансфер:</strong> новые автобусы класса туристический люкс",
            "<strong>Документы:</strong> полное оформление выезда групп"
        ],
        listTitle: "В программу входит:",
        list: [
            "Интерактивные экскурсии на «Линии Сталина»",
            "Посещение ремесленных мастерских в этнокомплексах",
            "Анимационные программы и командные квесты"
        ]
    },
    recovery: {
        title: "Программы восстановления организма",
        specs: [
            "<strong>Направление:</strong> климатотерапия и общая профилактика",
            "<strong>Консультации:</strong> профильные специалисты комплексов",
            "<strong>Длительность:</strong> курсы от 7 до 14 дней"
        ],
        listTitle: "В стоимость включено:",
        list: [
            "Индивидуальный подбор оздоровительного курса",
            "Ежедневное посещение соляных комнат и ингалятория",
            "Прием минеральных вод и фитококтейлей"
        ]
    },
    aquazone: {
        title: "Аквазона и термальные комплексы",
        specs: [
            "<strong>Инфраструктура:</strong> бассейны с подогревом",
            "<strong>Тип бани:</strong> классическая финская сауна",
            "<strong>Доступ:</strong> безлимитное посещение для гостей"
        ],
        listTitle: "Особенности зоны:",
        list: [
            "Крытые глубокие бассейны с современной системой фильтрации",
            "Зоны отдыха с шезлонгами у воды",
            "Омолаживающие и расслабляющие гидропроцедуры"
        ]
    },
    nature: {
        title: "Отдых в природной среде",
        specs: [
            "<strong>Локация:</strong> сосновый бор, водохранилище Вяча",
            "<strong>Проживание:</strong> благоустроенные корпуса и домики",
            "<strong>Воздух:</strong> высокая концентрация фитонцидов"
        ],
        listTitle: "Инфраструктура базы:",
        list: [
            "Оборудованные пешеходные и велосипедные тропы в лесу",
            "Чистая береговая линия и пирсы для прогулок",
            "Аренда лодок, катамаранов и спортивного инвентаря"
        ]
    },
    nutrition: {
        title: "Сбалансированное здоровое питание",
        specs: [
            "<strong>Формат:</strong> 4-5 разовое комплексное меню",
            "<strong>Продукты:</strong> экологически чистые, фермерские",
            "<strong>Контроль:</strong> диетическое и детское меню по запросу"
        ],
        listTitle: "Преимущества нашего стола:",
        list: [
            "Блюда готовятся только из свежих локальных продуктов",
            "Разнообразный рацион, богатый витаминами и минералами",
            "Исключение вредных жиров и консервантов"
        ]
    }
};


// Открытие поп-апа с генерацией структурированного контента
document.querySelectorAll('.more-btn').forEach(button => {
    button.addEventListener('click', () => {
        const type = button.getAttribute('data-info');
        const data = infoData[type];
        
        if (data) {
            infoTitle.textContent = data.title;
            infoListTitle.textContent = data.listTitle;
            
            // Собираем строки характеристик
            infoSpecs.innerHTML = data.specs.map(spec => `<div class="spec-line">${spec}</div>`).join('');
            
            // Собираем пункты списка с черточками
            infoList.innerHTML = data.list.map(item => `<li>${item}</li>`).join('');
            
            infoModal.classList.add('active');
        }
    });
});

// Закрытие окна информации
if (closeInfoBtn) {
    closeInfoBtn.addEventListener('click', () => {
        infoModal.classList.remove('active');
    });
}

// Кнопка внутри поп-апа закрывает информацию и открывает форму звонка
if (infoToCallback) {
    infoToCallback.addEventListener('click', () => {
        infoModal.classList.remove('active');
        callbackModal.classList.add('active');
    });
}


// 3. ЗАКРЫТИЕ ОКН ПО КЛИКУ НА ФОН (Вне контентной области)
window.addEventListener('click', (e) => {
    if (e.target === callbackModal) {
        callbackModal.classList.remove('active');
    }
    if (e.target === infoModal) {
        infoModal.classList.remove('active');
    }
});


// 4. ЛОГИКА ОНЛАЙН-ПОМОЩНИКА
const toggleAssistant = document.getElementById('toggleAssistant');
const closeAssistant = document.getElementById('closeAssistant');
const assistantChat = document.getElementById('assistantChat');
const chatBody = document.getElementById('chatBody');
const optionButtons = document.querySelectorAll('.option-btn');

const botReplies = {
    "Интересуют экскурсии по Беларуси": "Мы организуем комфортные туры для корпоративных и сборных групп по историческим вехам Беларуси. Включен новый транспорт, сертифицированный гид и входные билеты. Оставьте заявку в форме «Заказать звонок» для точного расчета под вашу группу.",
    "Как устроено оздоровление?": "Оздоровительные программы проходят на уединенных базах в экологически чистых районах. В стоимость включено диетическое фермерское питание, посещение крытой аквазоны и комплекс процедур. Оставьте контакты, чтобы забронировать даты."
};

if (toggleAssistant) {
    toggleAssistant.addEventListener('click', () => {
        assistantChat.classList.add('active');
    });
}

if (closeAssistant) {
    closeAssistant.addEventListener('click', (e) => {
        e.stopPropagation();
        assistantChat.classList.remove('active');
    });
}

optionButtons.forEach(button => {
    button.addEventListener('click', () => {
        const userText = button.getAttribute('data-reply');
        
        const userMsg = document.createElement('div');
        userMsg.className = 'msg user-msg';
        userMsg.textContent = userText;
        chatBody.appendChild(userMsg);
        
        document.getElementById('chatOptions').style.display = 'none';
        
        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'msg bot-msg';
            botMsg.textContent = botReplies[userText] || "Спасибо! Наш менеджер уже проверяет информацию.";
            chatBody.appendChild(botMsg);
            
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 600);
    });
});

