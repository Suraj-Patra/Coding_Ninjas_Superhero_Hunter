import fetchHeroes from "../api/fetchHeroes.js";
let heroes = await fetchHeroes();


const all_heroes_section = document.querySelector('#all_heroes');
const one_heroes_section = document.querySelector('#one_hero');
const parent_container_first = document.querySelector('#parent_container_first');
const parent_container_last = document.querySelector('#parent_container_last');


// Making favorite :
function makeFavourite() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            if(e.target.classList.contains('favorite_btn')) {
                e.target.classList.toggle('favorite')
                let name = e.target.parentElement.parentElement.querySelector('h2').textContent;  
                const index = heroes.findIndex(hero => hero.name.includes(name));
                if(!heroes[index].isFavorite) heroes[index].isFavorite = false;
                heroes[index].isFavorite = !heroes[index].isFavorite;
            } else if(e.target.classList.contains('information')) {
                showInformation(e);
            }
        })
    })

}

// Display Heroes :
function showHeroes(heroes) {
    const cards = heroes.map(hero => {
        const hero_name = hero.name;
        const thumbnail_path = hero.thumbnail.path;
        const thumbnail_extension = hero.thumbnail.extension;
    
        let span = '';
        if(hero.isFavorite) span = `<span class='favorite_btn favorite' title='Add to favorite'>&#9829;</span>`
        else span = `<span class='favorite_btn' title='Add to favorite'>&#9829;</span>`

        const card = `
            <div class='card'>
                <div class='card_img'>
                    <img src="${thumbnail_path}.${thumbnail_extension}">
                </div>
                <div class='card_info'>
                    <h2>${hero_name}</h2>
                    <div class='card_info_btns'>
                        ${span}
                        <span class='information' title='Show More Information'>&#10140;</span>
                    </div>
                </div>
            </div>
        `

        return card;
    }).join("");
    
    one_heroes_section.style.display = 'none';
    all_heroes_section.style.display = 'block';
    parent_container_first.innerHTML = cards;

    makeFavourite();
}
showHeroes(heroes);

// Search Hero :
function searchHeroes() {
    const search_input = document.getElementById('search');
    search_input.addEventListener('keyup', (e) => {
        let name = e.target.value.toLowerCase();
        const searched_heroes = heroes.filter(hero => hero.name.toLowerCase().includes(name))
        showHeroes(searched_heroes)
    })
}
searchHeroes();

// Show favorite heroes :
function showFavorites() {
    const favorite_heroes = heroes.filter(hero => hero.isFavorite);
    if(!favorite_heroes.length) {
       parent_container_first.innerHTML = `<h1>You do not have any favorite hero!</h1>`
        return;
    }

    showHeroes(favorite_heroes);
}
const favorite_btn = document.getElementById('show_favorite');
favorite_btn.addEventListener('click', showFavorites);

// Show all heroes :
function showAll() {
    const all_heroes = heroes;
    showHeroes(all_heroes);
}
const home_btn = document.getElementById('show_all');
home_btn.addEventListener('click', showAll);


// Show information :
function showInformation(e) {
    one_heroes_section.style.display = 'block';
    all_heroes_section.style.display = 'none';

    let name = e.target.parentElement.parentElement.querySelector('h2').textContent;  
    const index = heroes.findIndex(hero => hero.name.includes(name));
    const hero = heroes[index];


    const hero_name = hero.name;
    const thumbnail_path = hero.thumbnail.path;
    const thumbnail_extension = hero.thumbnail.extension;
    const total_comics = hero.comics.items;
    const total_series = hero.series.items;

    const main_section = `
        <div class='info'>
            <div class='info_img_container'>
                <img src="${thumbnail_path}.${thumbnail_extension}">
            </div>
            <h2 class='info_name'>${hero_name}</h2>
            <h3 class='total_comics'>Total Comics : ${total_comics.length}</h3>
            <h3 class='total_comics'>Total Seires : ${total_series.length}</h3>
        </div>
    `
    const comics_section = `
        <div class='comic_section'>
            <h2>Comics</h2>
            <ul>
                ${
                    total_comics.map(comic => `<li>${comic.name}</li>`).join("")
                }        
            </ul>
        </div>
    `
    const series_section = `
        <div class='series_section'>
            <h2>Series</h2>
            <ul>
                ${
                    total_series.map(series => `<li>${series.name}</li>`).join("")
                }        
            </ul>
        </div>
    `

    parent_container_last.innerHTML = main_section+comics_section+series_section;
}
