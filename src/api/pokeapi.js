import axios from 'axios';

export const fetchPokemonData = async () => {
  const allPokemonData = [];
  let nextUrl = 'https://pokeapi.co/api/v2/pokemon?limit=100';

  while (nextUrl) {
    try {
      const response = await axios.get(nextUrl);
      const pokemonList = response.data.results;
      nextUrl = response.data.next;

      const detailedPokemonData = await Promise.all(
        pokemonList.map(async (pokemon) => {
          const pokemonDetails = await axios.get(pokemon.url);
          return {
            id: pokemonDetails.data.id,
            name: pokemonDetails.data.name,
            types: pokemonDetails.data.types.map(typeInfo => typeInfo.type.name),
            image: pokemonDetails.data.sprites.front_default,
          };
        })
      );

      allPokemonData.push(...detailedPokemonData);
    } catch (error) {
      console.error(error);
      break;
    }
  }

  return allPokemonData;
};