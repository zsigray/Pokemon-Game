import { useEffect, useState } from "react";

export default function PokemonChooser(){

   const [fighterPokemon, setFighterPokemon] = useState(null);
   const [usersPokemons, setUsersPokemons] = useState([]);
   
   useEffect(() => {
    let raceConditionHandler = true;
    const usersPokemonsURL = [
        "https://pokeapi.co/api/v2/pokemon/bulbasaur",
        "https://pokeapi.co/api/v2/pokemon/charizard",
        "https://pokeapi.co/api/v2/pokemon/poliwhirl"
    ];
    const fetchPokemons = async () => {
      const userPokemonList = [];
      for (const url of usersPokemonsURL) {
        const response = await fetch(url);
        const pokemon = await response.json();
        userPokemonList.push(pokemon);
      }
      if (raceConditionHandler) {
        setUsersPokemons(userPokemonList);
      }
    };
    fetchPokemons();

    return () => {
      raceConditionHandler = false;
    };
  }, []);

function chooseFighterPokemon(pokemon) {
    setFighterPokemon(pokemon);
} 

const usersPokemonsDisplay = usersPokemons.map((pokemon) =>{
    return (
        <div className="miniPokemon" key={pokemon.name}>
        <h3>{pokemon.name}</h3>
        <img src={pokemon.sprites.other['official-artwork'].front_shiny} alt={pokemon.name} width={'100px'} />
        <button onClick={() => chooseFighterPokemon(pokemon)}> Fight with {pokemon.name} </button>      
        </div>
    )
});   

    return (
        <>
        <div className="ourSide">
        <div className="pokemonChooser">{usersPokemonsDisplay}</div>
        {(!fighterPokemon) ?
        <h1>Choose your fighter Pokemon!</h1> :
        <div className="fighterPokemon">
                <h1>{fighterPokemon.name}</h1>
                <img src={fighterPokemon.sprites.other['official-artwork'].front_shiny} alt={fighterPokemon.name} />
                <h3>❤️ {fighterPokemon.stats[0].base_stat} 🗡️ {fighterPokemon.stats[1].base_stat} 🛡️ {fighterPokemon.stats[3].base_stat}</h3>
        </div>} 
        </div>
        </>
    )
}