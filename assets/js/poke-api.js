const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};

function convertPokeApiDetailToPokemonCompleto(pokeDetail) {
    debugger;

    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name.replace('-', ' '));
    pokemon.moves = moves;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    pokemon.height = pokeDetail.height * 10;
    pokemon.weight = pokeDetail.weight / 10;

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name);
    //const [abilitiy] = abilities;

    pokemon.abilities = abilities;

    pokemon.speciesUrl = pokeDetail.species.url;

    pokemon.totalStats = 0;

    pokeDetail.stats.forEach((stats) => {
        const itemName = stats.stat.name;
        const itemValue = stats.base_stat;

        pokemon.stats[itemName] = itemValue;
        pokemon.totalStats += itemValue;
    });

    // console.log(`Heigth -> ${pokemon.height}cm | Weigth -> ${pokemon.weight}Kg`)
    //debugger
    return pokemon;
}

pokeApi.getPokemonSpecies = (pokemon) => {
    return fetch(pokemon.speciesUrl)
        .then((response) => response.json())
        .then((speciesResult) => pokeApi.setSpecies(speciesResult, pokemon));
};

pokeApi.setSpecies = (speciesResult, pokemon) => {
    pokemon.species = speciesResult.genera.filter((genera) => genera.language.name == 'en')[0].genus;

    pokemon.growthRate = speciesResult.growth_rate.name;
    pokemon.habitat = speciesResult.habitat.name;

    pokemon.eggGroups = speciesResult.egg_groups.map((eggGroup) => eggGroup.name);

    return pokemon;
};

pokeApi.getPokemonCompleto = (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    return fetch(url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemonCompleto)
        .then((pokemon) => pokeApi.getPokemonSpecies(pokemon));
};
