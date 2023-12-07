/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./pokemon.css";

export default function PokemonChooser({
  pokemon,
  onBattleEnd,
  getTypeClassNameOrImg,
  usersPokemonsURL,
  setUsersPokemonsURL
}) {
  const [fighterPokemon, setFighterPokemon] = useState(null);
  const [usersPokemons, setUsersPokemons] = useState([]);

  useEffect(() => {
    let raceConditionHandler = true;

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
    
  }, [usersPokemonsURL]);

  function chooseFighterPokemon(pokemon) {
    setFighterPokemon(pokemon);
  }

  const usersPokemonsDisplay = usersPokemons.map((ourPokemon) => {
    return (
      <div className="miniPokemon" key={ourPokemon.name}>
        <h3>{ourPokemon.name}</h3>
        <img
          src={ourPokemon.sprites.other["official-artwork"].front_shiny}
          alt={ourPokemon.name}
          width={"100px"}
        />
        
        <button onClick={() => chooseFighterPokemon(ourPokemon)}>
          {" "}
          Fight with {ourPokemon.name}{" "}
        </button>
      </div>
    );
  });

  function fightBattle(fighterPokemon, pokemon) {
    const updatedURLs = [...usersPokemonsURL];
    console.log("Battle Begins");
    const fighters = [fighterPokemon, pokemon];
    const firstAttacker = fighters[Math.floor(Math.random() * 2)];
    const secondAttacker = fighters.find(
      (fighter) => fighter !== firstAttacker
    );

    console.log(`First Attacker: ${firstAttacker.name}`);
    console.log(`Second Attacker: ${secondAttacker.name}`);

    do {
      secondAttacker.stats[0].base_stat -=
        ((((2 / 5 + 2) * firstAttacker.stats[1].base_stat * 60) /
          secondAttacker.stats[2].base_stat /
          50 +
          2) *
          Math.floor(Math.random() * (255 - 217 + 1) + 217)) /
        255;

      if (secondAttacker.stats[0].base_stat <= 0) {
       
        console.log(`${secondAttacker.name} dead`);
        if (secondAttacker === pokemon) {
          updatedURLs.push(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          console.log(`${pokemon.name} added to pokemons`);
        }
        onBattleEnd(null);
        setUsersPokemonsURL(updatedURLs);
      }
      firstAttacker.stats[0].base_stat -=
        ((((2 / 5 + 2) * secondAttacker.stats[1].base_stat * 60) /
          firstAttacker.stats[2].base_stat /
          50 +
          2) *
          Math.floor(Math.random() * (255 - 217 + 1) + 217)) /
        255;

      if (firstAttacker.stats[0].base_stat <= 0) {
        console.log(`${firstAttacker.name} dead`);
        if (firstAttacker === pokemon) {
          updatedURLs.push(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
          console.log(`${pokemon.name} added to pokemons`);
        }
        onBattleEnd(null);
        setUsersPokemonsURL(updatedURLs);
      }
    } while (
      firstAttacker.stats[0].base_stat > 0 &&
      secondAttacker.stats[0].base_stat > 0
    );
    
  }

  return (
    <>
      <div className="ourSide">
        {!fighterPokemon ? (
          <>
            <h1>Choose your fighter Pokemon!</h1>
            <div className="pokemonChooser">{usersPokemonsDisplay}</div>
          </>
        ) : (
          (fightBattle(fighterPokemon, pokemon),
          (
            <div className="fighterPokemon">
              <div
                className={getTypeClassNameOrImg(
                  true,
                  fighterPokemon.types[0].type.name
                )}
              >
                <table className="nameheaders">
                  <tr>
                    <td className="basic" colSpan={3}>
                      Basic Pokemon
                    </td>
                  </tr>
                  <tr>
                    <td className="pokemon-name">{fighterPokemon.name}</td>
                    <td className="pokemon-hp">
                      HP{fighterPokemon.stats[0].base_stat}
                    </td>
                    <td className="pokemon-type-icon">
                      <img
                        src={getTypeClassNameOrImg(
                          false,
                          fighterPokemon.types[0].type.name
                        )}
                        alt=""
                        width={30}
                        height={30}
                      />
                    </td>
                  </tr>
                </table>
                <img
                  className="headshot"
                  src={
                    fighterPokemon.sprites.other["official-artwork"].front_shiny
                  }
                  alt={fighterPokemon.name}
                />
                <p className="description">
                  asd. Length: {fighterPokemon.height * 10}CM Weight:{" "}
                  {fighterPokemon.weight / 10}KG
                </p>
                <div className="infoonly">
                  <table className="stats">
                    <tr>
                      <td>
                        <span className="label">Attack</span>{" "}
                        <span className="labeltext"> </span>
                      </td>
                      <td className="damage">
                        {fighterPokemon.stats[1].base_stat}
                      </td>
                    </tr>
                  </table>
                  <hr />
                  <table className="stats">
                    <tr>
                      <td>
                        <span className="label">Defense</span>{" "}
                        <span className="labeltext"> </span>
                      </td>
                      <td className="damage">
                        {fighterPokemon.stats[3].base_stat}
                      </td>
                    </tr>
                  </table>
                </div>
                <p className="italicize">asd</p>
                <p className="bottomtext">
                  <strong>Illus. Mitsuhiro Arita</strong> C 1995, 96, 98
                  Nintendo Creatures, GAMEFREAK C 1999 Wizards.{" "}
                  <strong>58/102 o</strong>
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
