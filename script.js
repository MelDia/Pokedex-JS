const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAbilities = document.querySelector('[data-poke-abilities]');


const typeColors = {
    electric: '#fcbd19',
    normal: '#8d8c7b',
    fire: '#c81408',
    water: '#318feb',
    ice: '#90e0f8',
    rock: '#ae974f',
    flying: '#5a71cd',
    grass: '#2b9c04',
    psychic: '#e6437a',
    ghost: '#3c3c83',
    bug: '#A2FAA3',
    poison: '#8b428c',
    ground: '#c9a951',
    dragon: '#4c34a4',
    steel: '#abaab7',
    fighting: '#7a3521',
    default: '#bfe7e6',
    fairy: '#e08ee0',
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
    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    renderPokemonAbilities(abilities);
}


const setCardColor = types => {
    pokeImg.style.border = '1px solid black';
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