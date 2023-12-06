/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export default function PokemonChooser({pokemon, onBattleEnd }){

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

const usersPokemonsDisplay = usersPokemons.map((ourPokemon) =>{
    return (
        <div className="miniPokemon" key={ourPokemon.name}>
        <h3>{ourPokemon.name}</h3>
        <img src={ourPokemon.sprites.other['official-artwork'].front_shiny} alt={ourPokemon.name} width={'100px'} />
        <button onClick={() => chooseFighterPokemon(ourPokemon)}> Fight with {ourPokemon.name} </button>      
        </div>
    )
});   

function fightBattle(fighterPokemon, pokemon){
  console.log('Battle Begins')
  const fighters = [fighterPokemon, pokemon];
  const firstAttacker = fighters[Math.floor(Math.random()*2)];
  const secondAttacker = fighters.find(fighter => fighter !== firstAttacker)
  setTimeout(() => console.log(`First Attacker: ${firstAttacker.name}`),3000)
  setTimeout(() => console.log(`Second Attacker: ${secondAttacker.name}`),5000)
  
  setTimeout(() => {
    do {
      secondAttacker.stats[0].base_stat -= ((((2/5+2)*firstAttacker.stats[1].base_stat*60/secondAttacker.stats[2].base_stat)/50)+2)*Math.floor(Math.random() * (255 - 217 + 1) + 217)/255;
      console.log(secondAttacker.name, secondAttacker.stats[0]); 
      if (secondAttacker.stats[0].base_stat <= 0) {
        console.log(`${secondAttacker.name} dead`)
        return;
      }
      firstAttacker.stats[0].base_stat -= ((((2/5+2)*secondAttacker.stats[1].base_stat*60/firstAttacker.stats[2].base_stat)/50)+2)*Math.floor(Math.random() * (255 - 217 + 1) + 217)/255;
      console.log(firstAttacker.name, firstAttacker.stats[0]); 
      if (firstAttacker.stats[0].base_stat <= 0) {
        console.log(`${firstAttacker.name} dead`)
        return;
      }
      
    } while (firstAttacker.stats[0].base_stat > 0 && secondAttacker.stats[0].base_stat > 0);
}, 6000);

setTimeout(()=> onBattleEnd(null), 10000)
  
}

    return (
        <>
        <div className="ourSide">
        
        {(!fighterPokemon) ?
        
        <>
        <h1>Choose your fighter Pokemon!</h1> 
        <div className="pokemonChooser">{usersPokemonsDisplay}</div>
        </> :
        (fightBattle(fighterPokemon, pokemon),
        <div className="fighterPokemon">
                <h1>{fighterPokemon.name}</h1>
                <img className='fighter' src={fighterPokemon.sprites.other['official-artwork'].front_shiny} alt={fighterPokemon.name} />
                <h3>❤️ {fighterPokemon.stats[0].base_stat} 🗡️ {fighterPokemon.stats[1].base_stat} 🛡️ {fighterPokemon.stats[3].base_stat}</h3>
        </div>)
        } 
        </div>
        </>
    )
}