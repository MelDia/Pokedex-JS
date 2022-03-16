const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');
let datos = 0;


const typeColors = {
    electric: '#f3ad13',
    normal: '#8d867d',
    fire: '#de370c',
    water: '#2f8eeb',
    ice: '#90e0f8',
    rock: '#ae974e',
    flying: '#8fa1ed',
    grass: '#63b629',
    psychic: '#e6437a',
    ghost: '#5a5aa8',
    bug: '#9eac1c',
    poison: '#8b418c',
    ground: '#c9a950',
    dragon: '#715ad4',
    steel: '#63636e',
    fighting: '#7b331e',
    fairy: '#eea8ee',
    default: '#5bc4da',
};


const searchPokemon = event => {
    event.preventDefault();
    const { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {abilities, stats, types } = data;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `Nº ${data.id}`;
    datos = data.id;
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonAbilities(abilities);
}


const setCardColor = types => {
    
    pokeImg.style.background =  typeColors.default;
    pokeImg.style.backgroundSize = ' 5px 5px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style.color = typeColors[type.type.name];
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderPokemonAbilities = abilities => {
    pokeAbilities.innerHTML = '';
    abilities.forEach(ability => {
        const abilityElement = document.createElement("div");
        const abilityElementName = document.createElement("p");
        abilityElement.textContent = 'ability:';        
        abilityElementName.textContent = ability.ability.name;        
        abilityElement.appendChild(abilityElementName);        
        pokeAbilities.appendChild(abilityElement);
    })
}

const renderNotFound = () => {
    pokeName.textContent = 'not found';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background = '#bfe7e6';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeAbilities.innerHTML = '';
    pokeId.textContent = '';
}

function nextTo(){
    let pokemon = datos;
    pokemon = pokemon + 1;
    if(pokemon === 899){
        pokemon = 1;
    } 
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
.then(data => data.json())
.then(response => renderPokemonData(response))
.catch(err => renderNotFound())
};

function prevTo(){
    let pokemon = datos;
    pokemon = pokemon - 1;
    if(pokemon === 0){
        pokemon = 1;
    } 
fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
.then(data => data.json())
.then(response => renderPokemonData(response))
.catch(err => renderNotFound())
};
