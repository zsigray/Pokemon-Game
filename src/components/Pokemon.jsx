/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function Pokemon({ location, setLocation, onBackButtonClick }) {
  const [pokemon, setPokemon] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (location.areas.length === 0) {
          setLoaded(true)
          return
        }
        const areaIndex = randomIntFromInterval(0, location.areas.length - 1);
        const areaUrl = location.areas[areaIndex].url;
        const areaData = await fetch(areaUrl);
        const areaJson = await areaData.json();

        const pokemonIndex = randomIntFromInterval(0, areaJson.pokemon_encounters.length - 1);
        const randomPokemon = areaJson.pokemon_encounters[pokemonIndex];

        const pokemonData = await fetch(randomPokemon.pokemon.url);
        const pokemonJson = await pokemonData.json();

        setPokemon(pokemonJson);
        setLoaded(true);
      } catch (error) {
        console.error(error)
      }
    };

    fetchData();
  }, [location.areas]);

  if (loaded && !pokemon) {
    return (
    <div>
      <h1>This location doesn't seem to have any pokemon</h1>
      <button onClick={onBackButtonClick}>Back</button>
    </div>);
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.sprites.other['official-artwork'].front_shiny} alt={pokemon.name} />
        <h3>
          ❤️ {pokemon.stats[0].base_stat} 🗡️ {pokemon.stats[1].base_stat} 🛡️ {pokemon.stats[3].base_stat}
        </h3>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
