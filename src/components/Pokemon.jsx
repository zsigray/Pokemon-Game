
import { useState, useEffect } from 'react';
import './pokemon.css';
import PokemonChooser from './PokemonChooser';

export default function Pokemon({ location, onBackButtonClick }) {
  const [pokemon, setPokemon] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [pokemonData, setPokemonData] = useState(null);
  const [type, setType] = useState('');


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

        const pokemonMoreData = await fetch(pokemonJson.species.url);
        const pokemonMoreDataJson = await pokemonMoreData.json();

        setPokemon(pokemonJson);
        setPokemonData(pokemonMoreDataJson);
        setType(pokemonJson.types[0].type.name)
        console.log(pokemonJson.types[0].type.name)
        setLoaded(true);
      } catch (error) {
        console.error(error)
      }
    };
    fetchData()
  }, []);

  const getTypeClassNameOrImg = (css) => {
    switch (type) {
      case 'fire':
        return css ? 'nameimageinfo card-background-fire' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181951803831623720/fire_type_symbol_tcg_by_jormxdos_dfgdd9h-fullview.png';
      case 'water':
        return css ? 'nameimageinfo card-background-water' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181951307058266195/water_type_symbol_tcg_by_jormxdos_dfgdd9x-fullview.png';
      case 'grass':
        return css ?'nameimageinfo card-background-grass' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181951948153421905/grass_type_symbol_tcg_by_jormxdos_dfgdda7-fullview.png';
      case 'electric':
        return css ? 'nameimageinfo card-background-electric' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181952528246648832/lightning_type_symbol_tcg_by_jormxdos_dfgddau-pre.png';
      case 'fairy':
        return css ? 'nameimageinfo card-background-fairy' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181952805313986630/fairy_type_symbol_tcg_by_jormxdos_dfgdddf-fullview.png';
      case 'rock':
        return css ? 'nameimageinfo card-background-rock' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181954018227015730/1200px-PokC3A9mon_Rock_Type_Icon.png';
      case 'bug':
        return css ? 'nameimageinfo card-background-bug' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181954225551450143/image-removebg-preview.png';
      case 'ghost':
        return css ? 'nameimageinfo card-background-ghost' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181954579282268220/image-removebg-preview_1.png';
      case 'normal':
        return css ? 'nameimageinfo card-background-normal' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181954734622515322/colorless_type_symbol_tcg_by_jormxdos_dfgdd92-fullview.png';
      case 'fighting':
        return css ? 'nameimageinfo card-background-fighting' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181953284739706981/fighting_type_symbol_tcg_by_jormxdos_dfgddb7-fullview.png';
      case 'psychic':
        return css ? 'nameimageinfo card-background-psychic' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181953469687529482/psychic_type_symbol_tcg_by_jormxdos_dfgddbk-fullview.png';
      case 'steel':
        return css ? 'nameimageinfo card-background-steel' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181954878755573840/metal_type_symbol_tcg_by_jormxdos_dfgddcz-fullview.png';
      case 'dark':
        return css ? 'nameimageinfo card-background-dark' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181953801582821387/darkness_type_symbol_tcg_by_jormxdos_dfgddck-fullview.png';
      case 'dragon':
        return css ? 'nameimageinfo card-background-dragon' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181953620858650749/dragon_type_symbol_tcg_by_jormxdos_dfgddc1-fullview.png';
      case 'flying':
        return css ? 'nameimageinfo card-background-flying' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181955095978594314/weeFmVwtaMCQAAAABJRU5ErkJggg.png';
      case 'ground':
        return css ? 'nameimageinfo card-background-ground' : 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Pok%C3%A9mon_Ground_Type_Icon.svg';
      case 'poison':
        return css ? 'nameimageinfo card-background-poison' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181955660477382666/wpHxPSuxRZXAAAAABJRU5ErkJggg.png';
      case 'ice':
        return css ? 'nameimageinfo card-background-ice' : 'https://cdn.discordapp.com/attachments/835821286205947924/1181955938052223046/A3vtUPUgNEIZAAAAAElFTkSuQmCC.png';

      default:
        return 'nameimageinfo card-background-gray';
    }
  };

  if (loaded && !pokemon) {
    return (
    <div>
      <h1>This location doesn't seem to have any pokemon 😢</h1>
      <button onClick={onBackButtonClick}>Back</button>
    </div>);
  } else if (!loaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <PokemonChooser />
        <div className="enemySide">
          <div className={getTypeClassNameOrImg(true)}>
            <table className='nameheaders'>
              <tr>
                <td className='basic' colSpan={3}>Basic Pokemon</td>
              </tr>
              <tr>
                <td className='pokemon-name'>{pokemon.name}</td>
                <td className='pokemon-hp'>HP{pokemon.stats[0].base_stat}</td>
                <td className='pokemon-type-icon'><img src={getTypeClassNameOrImg(false)} alt="" width={30} height={30} /></td>
              </tr>
            </table>
            <img className='headshot' src={pokemon.sprites.other['official-artwork'].front_shiny} alt={pokemon.name} />
            <p className='description'>{pokemonData.genera[7].genus}. Length: {pokemon.height * 10}CM Weight: {pokemon.weight / 10}KG</p>
            <div className='infoonly'>
              <table className='stats'>
                <tr>
                  <td><span className='label'>Attack</span> <span className='labeltext'> </span></td>
                  <td className='damage'>{pokemon.stats[1].base_stat}</td>
                </tr>
              </table>
              <hr />
              <table className='stats'>
                <tr>
                  <td><span className='label'>Defense</span> <span className='labeltext'> </span></td>
                  <td className='damage'>{pokemon.stats[3].base_stat}</td>
                </tr>
              </table>
            </div>
            <p className='italicize'>{pokemonData.flavor_text_entries[0].flavor_text}</p>
            <p className='bottomtext'><strong>Illus. Mitsuhiro Arita</strong>  C 1995, 96, 98 Nintendo Creatures, GAMEFREAK C 1999 Wizards.  <strong>58/102 o</strong></p>
          </div>
        </div>
      </>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
