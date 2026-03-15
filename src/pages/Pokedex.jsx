import React, { useState, useEffect } from "react";
import PokemonCard from '../components/PokemonCard'
import SearchForm from '../components/SearchForm'
import { Link } from "react-router-dom";
import './Pokedex.css'

/*
import { Link } from "react-router-dom";
import { getPokemonData, searchPokemon } from "../services/getPokemonData";
import { useForm, Controller } from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers"
import { Row, Col, Button, Form, Card, FormControl } from 'react-bootstrap';
*/

function Pokedex() {
{/** 
  const {
    control,
    handleSubmit,
    register,
    formState: {errors}
  } = useForm()

  //function to handle search when click
  //input error??? change input word
  const onSearchSubmit = async (input) => {}
    let searchData = await searchPokemon(input)
    console.log(searchData)
}
*/}
  const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
    const fetchPokemon = async () => {
      try { //Call the PokeAPI & get and respond with the first 8 
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=8");
        const data = await response.json();

        const details = await Promise.all(
          data.results.map(pokemon => fetch(pokemon.url).then(response => response.json()))
          //map through each Pokemon result, fetch its data, then covert the response to json and return all results
        );

        setPokemon(details);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemon();
  }, []); // [] = run only once, when first renders/page loads

  function handleLoadBtn(){
    return console.log("Load more button clicked")
  }

  return (
    <div className='pokedexPage'>
      <h1 className="display-6">Pokédex</h1>
      <p>Search Pokémon by Name</p>
      <SearchForm />

   {/*
    <Form inline id="search-form"
    noValidate="noValidate" onSubmit={handleSubmit(onSearchSubmit)}
    >
          <Form.Control
            {...register("search")}
            type="text"
            placeholder="Search Pokemon by name"
            className=" mr-sm-2"
            aria-label="search"
            aria-describedby="search-pokemon"
            aria-invalid={errors.search ? "true" : "false"}
          >
          </FormControl>
    </Form>
    */}

      <section className="gridContainer">
        {/*map pokemon data into each card*/}
            {/*Link: when click pokemon card, go to each pokemon's pokemon details page*/}
        {pokemon.map((pokemon)=>(
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id}> 
            <PokemonCard 
              sprites={pokemon.sprites}
              id={pokemon.id}
              name={pokemon.name}
            />
          </Link>
          
        ))}
      </section>

      <section className="loadBtn-section">
        <button type="button" class="btn btn-primary" onClick={handleLoadBtn}>Load more Pokémon</button>
      </section>
    </div>
  )
}

export default Pokedex
