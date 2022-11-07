// Get the modal
var modal = document.getElementById('myModal');

// Get the <span> element that closes the modal
var voltarBtn = document.getElementById('voltarBtn');

var pokemons = document.getElementsByClassName('pokemon');

const convertPokemonToHtml = (pokemon) => {
    return `
    <div class="modal-content ${pokemon.type}">
        <div>
            <span id="voltarBtn" class="close" onclick="closeModal()">&leftarrow;</span>
        </div>
        <div class="headerPokemon">
        <div class="title">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
        </div>
        <ol class="types">
            ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
        </ol>
        </div>
        <img class="imgPokemon" src="${pokemon.photo}" alt="${pokemon.name}">
        <div class="tabsInfo">
        <!-- Tab links -->
            <div class="tab">
                <button class="tablinks" onclick="openTab(event, 'About')" id="defaultTab">About</button>
                <button class="tablinks" onclick="openTab(event, 'Stats')">Base Stats</button>
                <button class="tablinks" onclick="openTab(event, 'Moves')">Moves</button>
            </div>
        <!-- Tab content -->
            <div id="About" class="tabcontent">
                <ol class="table">
                    <li class="tableHeader">
                        Species
                    </li>
                    <li>
                        ${pokemon.species}
                    </li>
                    <li class="tableHeader">
                        Height
                    </li>
                    <li>
                        ${pokemon.height}cm
                    </li>
                    <li class="tableHeader">
                        Weight
                    </li>
                    <li>
                        ${pokemon.weight}Kg
                    </li>
                    <li class="tableHeader">
                        Abilities
                    </li>
                    <li>
                        ${pokemon.abilities.join(', ')}
                    </li>
                </ol>
                    <h4>Breeding</h4>
                    <ol class="table">
                        <li class="tableHeader">
                            Egg Groups
                        </li>
                        <li>
                            ${pokemon.eggGroups.join(', ')}
                        </li>
                        <li class="tableHeader">
                            Growth Rate
                        </li>
                        <li>
                            ${pokemon.growthRate}
                        </li>
                        <li class="tableHeader">
                            Habitat
                        </li>
                        <li>
                            ${pokemon.habitat}
                        </li>
                    </ol>
                </div>
            <div id="Stats" class="tabcontent">
                <ol class="table tableStats">
                    <li class="tableHeader">
                        HP
                    </li>
                    <li class="tableValue">
                        ${pokemon.stats['hp']} <progress class="stats" value="${
        pokemon.stats['hp']
    }" max="100"></progress>
                    </li>
                    <li class="tableHeader">
                        Attack
                    </li>
                    <li class="tableValue">
                        ${pokemon.stats['attack']} <progress class="stats" value="${
        pokemon.stats['attack']
    }" max="100"></progress>
                    </li>
                    <li class="tableHeader">
                        Defense
                    </li>
                    <li class="tableValue">
                        ${pokemon.stats['defense']} <progress class="stats" value="${
        pokemon.stats['defense']
    }" max="100"></progress>
                    </li>
                    <li class="tableHeader">
                        Sp. Attack
                    </li>
                    <li class="tableValue" class="tableValue">
                ${pokemon.stats['special-attack']} <progress class="stats" value="${
        pokemon.stats['special-attack']
    }" max="100"></progress>
                    </li>
                    <li class="tableHeader">
                        Sp. Defense
                    </li>
                    <li class="tableValue">
                ${pokemon.stats['special-defense']} <progress class="stats" value="${
        pokemon.stats['special-defense']
    }" max="100"></progress>
                    </li>
                    <li class="tableHeader">
                        Speed
                    </li>
                    <li class="tableValue">
                ${pokemon.stats['speed']} <progress class="stats" value="${
        pokemon.stats['speed']
    }" max="100"></progress>
                    </li>
                    <li class="tableHeader">
                        Total
                    </li>
                    <li class="tableValue">
                ${pokemon.totalStats} <progress class="stats" value="${pokemon.totalStats}" max="600"></progress>
                    </li>
                </ol>
            </div>
            <div id="Moves" class="tabcontent">
            <ol class="tableMoves">
                ${pokemon.moves.map((move) => `<li class="type">${move}</li>`).join('')}
            </ol>
            </div>
        </div>
    </div>
  `;
};

function openModal(id) {
    modal.style.display = 'block';
    pokeApi.getPokemonCompleto(id).then((pokemon) => {
        const newHtml = convertPokemonToHtml(pokemon);
        modal.innerHTML = newHtml;
        const defaultTab = document.getElementById('defaultTab');
        defaultTab.click();
    });
}

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

//
//      TABS
//

function openTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName('tabcontent');
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = 'none';
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName('tablinks');
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' active', '');
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' active';
}
