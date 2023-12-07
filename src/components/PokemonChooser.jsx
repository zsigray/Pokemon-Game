/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

import '../pokemon.css';

export default function PokemonChooser({
  pokemon,
  onBattleEnd,
  getTypeClassNameOrImg,
  usersPokemonsURL,
  setUsersPokemonsURL
}) {

  // ----- Initialize variables -----
  const [fighterPokemon, setFighterPokemon] = useState(null);
  const [usersPokemons, setUsersPokemons] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);


  // ----- Get Pokemon List -----
   
   useEffect(() => {
    let raceConditionHandler = true;

    const fetchPokemons = async () => {
      const userPokemonList = [];
      const userPokemonData = [];
      for (const url of usersPokemonsURL) {
        const response = await fetch(url);
        const pokemon = await response.json();
        userPokemonList.push(pokemon);

        const pokemonMoreData = await fetch(pokemon.species.url);
        const pokemonMoreDataJson = await pokemonMoreData.json();
        userPokemonData.push(pokemonMoreDataJson);
      }
      if (raceConditionHandler) {
        setUsersPokemons(userPokemonList);
        setPokemonData(userPokemonData);
      }
    };
    fetchPokemons();
    return () => {
      raceConditionHandler = false;
    };
  }, [usersPokemonsURL]);


  // ----- Display pokemons to choose -----
  const usersPokemonsDisplay = usersPokemons.map((ourPokemon) => {
    return (
      <div className="miniPokemon" key={ourPokemon.name}>
        <h3>{ourPokemon.name}</h3>
        <img
          src={ourPokemon.sprites.other["official-artwork"].front_shiny}
          alt={ourPokemon.name}
          width={"100px"}
        />
        
        <button onClick={() => setFighterPokemon(ourPokemon)}>
          {" "}
          Fight with {ourPokemon.name}{" "}
        </button>
      </div>
    );
  });

  async function fightBattle(ourPokemon, enemyPokemon) {
    const updatedURLs = [...usersPokemonsURL];
    console.log("Battle Begins");
  
    const getRandomAttacker = () => [ourPokemon, enemyPokemon][Math.floor(Math.random() * 2)];
  
    const attack = async (attacker, target) => {
      target.stats[0].base_stat -=
        ((((2 / 5 + 2) * attacker.stats[1].base_stat * 60) /
          target.stats[2].base_stat /
          50 +
          2) *
          Math.floor(Math.random() * (255 - 217 + 1) + 217)) /
        255;
      console.log(target.name, Math.ceil(target.stats[0].base_stat))
  
      if (target.stats[0].base_stat <= 0) {
        console.log(`${target.name} dead`);
        if (target === enemyPokemon) {
          updatedURLs.push(`https://pokeapi.co/api/v2/pokemon/${enemyPokemon.name}`);
          console.log(`${enemyPokemon.name} added to pokemons`);
        }
        await new Promise((resolve) => setTimeout(resolve, 3000));
        onBattleEnd(null);
        setUsersPokemonsURL(updatedURLs);
      }
    };
  
    let firstAttacker = getRandomAttacker();
    let secondAttacker = [ourPokemon, enemyPokemon].find((fighter) => fighter !== firstAttacker);
  
    console.log(`First Attacker: ${firstAttacker.name}`);
    console.log(`Second Attacker: ${secondAttacker.name}`);
  
    do {
        await new Promise((resolve) => setTimeout(resolve, 500));
        attack(firstAttacker, secondAttacker);
      if (secondAttacker.stats[0].base_stat > 0) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        attack(secondAttacker, firstAttacker); 
      }
    } while (firstAttacker.stats[0].base_stat > 0 && secondAttacker.stats[0].base_stat > 0);
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
          <div className={getTypeClassNameOrImg(true, fighterPokemon.types[0].type.name)}>
            <table className='nameheaders'>
              <tr>
                <td className='basic' colSpan={3}>Basic Pokemon</td>
              </tr>
              <tr>
                <td className='pokemon-name'>{fighterPokemon.name}</td>
                <td className='pokemon-hp'>HP {fighterPokemon.stats[0].base_stat}</td>
                <td className='pokemon-type-icon'><img src={getTypeClassNameOrImg(false, fighterPokemon.types[0].type.name)} alt="" width={30} height={30} /></td>
              </tr>
            </table>
            <img className='headshot' src={fighterPokemon.sprites.other['official-artwork'].front_shiny} alt={fighterPokemon.name} />
            <p className='description'>{pokemonData[pokemonData.findIndex((pok) => pok.name === fighterPokemon.name)].genera[7].genus}.
             Length: {fighterPokemon.height * 10}CM Weight: {fighterPokemon.weight / 10}KG</p>
            <div className='infoonly'>
              <table className='stats'>
                <tr>
                  <td><span className='label'>Attack</span> <span className='labeltext'> </span></td>
                  <td className='damage'>{fighterPokemon.stats[1].base_stat}</td>
                </tr>
              </table>
              <hr />
              <table className='stats'>
                <tr>
                  <td><span className='label'>Defense</span> <span className='labeltext'> </span></td>
                  <td className='damage'>{fighterPokemon.stats[3].base_stat}</td>
                </tr>
              </table>
            </div>
            <p className='italicize'>{pokemonData[pokemonData.findIndex((pok) => pok.name === fighterPokemon.name)].flavor_text_entries[0].flavor_text}</p>
            <p className='bottomtext'><strong>Illus. Mitsuhiro Arita</strong>  C 1995, 96, 98 Nintendo Creatures, GAMEFREAK C 1999 Wizards.  <strong>58/102 o</strong></p>
          </div>
        </div>)
        } 
        </div>
        </>
    )
}

