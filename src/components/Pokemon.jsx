/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

export default function Pokemon({location}) {
    
    const [pokemon, setPokemons] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch(`https://pokeapi.co/api/v2/location-area/${location.id}/`);
                const json = await data.json();

                const pokemonList = await Promise.all(
                    json.pokemon_encounters.map(async encounter => {
                        const pokemonData = await fetch(encounter.pokemon.url);
                        const pokemonJson = await pokemonData.json();
                        return pokemonJson;
                    })
                );

                setPokemons(pokemonList);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [location.id]);

    if (pokemon.length === 0) {
        return <div>Loading...</div>;
    }
    else {
        const randomPokemon = pokemon[randomIntFromInterval(0, pokemon.length-1)];
        return (
            <>
                <h1>{randomPokemon.name}</h1>
                <img src={randomPokemon.sprites.other['official-artwork'].front_shiny} alt={randomPokemon.name} />
                <h3>❤️ {randomPokemon.stats[0].base_stat} 🗡️ {randomPokemon.stats[1].base_stat} 🛡️ {randomPokemon.stats[3].base_stat}</h3>
            </>
        );
    }

}

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}