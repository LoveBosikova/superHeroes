const cards = document.querySelector('.cards__container');
const dataObj = JSON.parse(JSON.stringify(data));
console.log(dataObj);

// Создаём карточку героя
function createHeroCard (superhero) {
    const heroDiv = document.createElement('div');
    heroDiv.setAttribute('class', 'card__wrap');
    const heroCard =`<article class="card">
                <h2 class="card__name">Имя: ${superhero.name}</h2>
                <p class="card__universe">Вселенная: ${superhero.universe}</p>
                <p class="card__alterEgo">Альтер эго: ${superhero.alterego}</p>
                <p class="card__whoIs">Специальность: ${superhero.occupation}</p>
                <p class="card__friends">Друзья: ${superhero.friends}</p>
                <p class="card__abilities">Способности: ${superhero.superpowers}</p>
                <div class="card__img-wrap">
                    <img src="${superhero.url}" alt="${superhero.name}">
                </div>
            </article>`;
    heroDiv.innerHTML = heroCard;
    return heroDiv;
}

// Создаём звёзды под конкретного героя
function createStars (superhero) {
    const starsId = `stars--${superhero.name}`;
    const starPicWrap = document.createElement('div');
    starPicWrap.setAttribute('class', 'card__starWrap');
    starPicWrap.setAttribute('id', starsId.replace(/\s/g, ""));
    for (let i = 0; i < 5; i += 1) {
        const imgElement = document.createElement('img');
        imgElement.setAttribute('src', 'star.svg');
        imgElement.setAttribute('id', (i + 1));
        imgElement.setAttribute('alt', 'star');
        starPicWrap.append(imgElement)
    }
    return starPicWrap;
}

// Собираем всё вместе на странице
for (const superhero of dataObj) {
    const heroDiv = createHeroCard(superhero);
    cards.append(heroDiv);
    const starPicWrap = createStars(superhero);
    const starsId = `stars--${superhero.name}`;
    const stars = document.getElementById(starsId);
    
    heroDiv.append(starPicWrap);
}

// Задаём поведение звёздам
const stars = Array.from(document.querySelectorAll('.card__starWrap'));

for (const star of stars) {
    star.addEventListener('click', setStarsColor)
}

function setStarsColor(elem){
    let heroRating = elem.target.id;
    const hero = elem.target.parentNode;
    const heroAllStars = Array.from(hero.children);
    for (const star of heroAllStars) {
        if (star.id <= heroRating) {
            star.src = 'activeStar.svg';
            star.style.width = '100%';
        } else {
            star.src = 'star.svg';
        }
    }
}
// Работаем с Local Storage
function saveRating(elem){
    let heroRating = elem.target.id;
    const [, hero] = elem.target.parentNode.id.split('--');
    window.localStorage.setItem(hero, heroRating);
    console.log(localStorage);
}

for (const star of stars) {
    star.addEventListener('click', saveRating)
}

// Устанавливаем старые значения рейтинга при перегрузке страницы
function normalizeName (name) {
    return name.replace(/\s/g, "");
}

for (const hero of dataObj) {
    const normalizedHero = normalizeName(hero.name);
    if (window.localStorage.getItem(normalizedHero)) {
        const heroId = `stars--${normalizedHero}`
        const heroAllStars =Array.from(document.getElementById(heroId).children);
        const heroRating = window.localStorage.getItem(normalizedHero);
        for (const star of heroAllStars) {
            if (star.id <= heroRating) {
                star.src = 'activeStar.svg';
                star.style.width = '100%';
            } else {
                star.src = 'star.svg';
            }
        }
    }
}