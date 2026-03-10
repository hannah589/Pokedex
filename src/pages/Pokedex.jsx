import React, { useState, useEffect } from "react";
import PokemonCard from '../components/PokemonCard'
import SearchForm from '../components/SearchForm'
import './Pokedex.css'


function Pokedex() {
  const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=8");
        const data = await res.json();

        const details = await Promise.all(
          data.results.map(p => fetch(p.url).then(r => r.json()))
        );

        setPokemon(details);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemon();
  }, []);

  function handleButtonClick(){
    return console.log("button clicked")
  }

  return (
    <div className='pokedexPage'>
      <h1 className="display-6
      ">Pokédex</h1>
      <p>Search Pokémon by Name</p>
      <SearchForm />
      <section className="gridContainer">
        {/*map pokemon data into each card*/}
        {pokemon.map((pokemon)=>(
           <PokemonCard 
              key={pokemon.id}
              sprites={pokemon.sprites}
              id={pokemon.id}
              name={pokemon.name}
          />
        ))}
      </section>
      <section className="btn-section">
        <button type="button" class="btn btn-primary btn-lg" onClick={handleButtonClick}>Load more Pokémon</button>
      </section>
      
    </div>
  )
}

export default Pokedex
