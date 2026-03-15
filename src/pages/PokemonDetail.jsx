import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Image, Button } from "react-bootstrap";
import "./PokemonDetail.css";

//Import api data from getPokemonData.js, in the service folder
//import { getPokemonDesc } from "../services/getPokemonData";

function PokemonDetail() {
  const { name } = useParams(); // for URL param . use id or name or add both later {name, id}
  
  //state to store poke stats
  const [pokemon, setPokemon] = useState();
  //state to store poke description
  const [pokemonDesc, setPokemonDesc] = useState();

  //fetch json data from API `https://pokeapi.co/api/v2/pokemon/${name}`
	useEffect(() => {
		const getPokemonByName = async () => {
			try {
				const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

				console.log(res.data);
				setPokemon(res.data);

				// reset();
			} catch (error) {
				console.log(error);
			}
		};
		getPokemonByName();
	}, [name]);


  //getPokemonDesc() .change over when importing from services page 
  
  //fetch Pokemon description from https://pokeapi.co/api/v2/pokemon-species/25
  useEffect(() => {
		const getPokemonDesc = async () => {
			try {
				const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

				console.log(res.data);
				setPokemonDesc(res.data);

				// reset();
			} catch (error) {
				console.log(error);
			}
		};
		getPokemonDesc();
	}, [name]);


  return (
    <>
    <div className="page-container">
      <h1 className="display-6" style={{ textTransform: "capitalize" }}>{pokemon?.name} #{pokemon?.id}</h1>
        <div className="details-container">
          <div className="image-container">
            <img
              src={pokemon?.sprites.front_default}
              alt={`${pokemon?.name}`}
              className="pokemon-sprite"
            />
          </div>
          <div className="right-container">
            {/*access description data via pokemon description API: object, array, object*/}
            <p>{pokemonDesc?.flavor_text_entries?.[0]?.flavor_text}</p>
            <div className="stats">
              <h4>Height</h4>
              <p>{pokemon?.height}</p>

              <h4>Weight</h4>
              <p>{pokemon?.weight}</p>

              <h4>Gender</h4>
              <p>Stat 3</p>

              <h4>Category</h4>
              <p>Stat 3</p>

              <h4>Abilities</h4>
              <p>stats</p>
            </div>
          </div>
        </div>
      
      {/*Button to link back to the pokedex page*/}
      <div className="btn-contain">
        <Link to="/pokedex" className="btn btn-primary">
          Explore More Pokémon
        </Link>
      </div>
    </div>
    </>
   
  )
}

export default PokemonDetail
