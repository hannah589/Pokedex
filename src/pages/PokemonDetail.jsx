//import useParams to read URL parameters
import { useParams } from "react-router-dom";
//import to use useEffect & useState
import { useEffect, useState } from "react";
//import link to navigate to another page
import { Link } from "react-router-dom";
//import axios fro making HTTP request
import axios from "axios";
//import bootstrap button
import { Button } from "react-bootstrap";
import "./PokemonDetail.css";
//Import api data from getPokemonData.js, in the service folder
//import { getPokemonDesc } from "../services/getPokemonData";

//create main component Pokemon Detail page
function PokemonDetail() {
  const { name } = useParams(); // for URL params . use id or name or add both later {name, id}
  
  //state to store pokemon data
  const [pokemon, setPokemon] = useState();
  //state to store pokemon description data
  const [pokemonDesc, setPokemonDesc] = useState();

  //fetch Pokemon data from API `https://pokeapi.co/api/v2/pokemon/${name}` when component loads or when name changes
	useEffect(() => {
    //fetch pokemon data
		const getPokemonByName = async () => {
			try {
        //call PokeAPI using axios
				const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);

        //log data to console for debugging and view data
				console.log(res.data);

        //save data into state
				setPokemon(res.data);

				// reset();
			} catch (error) {
        //log errors
				console.log(error);
			}
		};
    //call function: get pokemon by name
		getPokemonByName();
	}, [name]); //run function when name changes

//function to download text file
function triggerTextDownload(text, filename = "pokemonData.txt") {
    //create a blob/raw text file
    const blob = new Blob([text], { type: "text/plain" });
    //create a temporary URL for the file
    const url = URL.createObjectURL(blob);
    //create a temporary link
    const link = document.createElement("a");
    //set download link properties
    link.href = url;
    link.download = filename;
    //add link to DOM
    document.body.appendChild(link);
    //when click trigger download
    link.click();
    //after remove link from DOM
    document.body.removeChild(link);
    //remove URL after 5 seconds
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  //function to handle click to trigger download
  function handleClick(){
    //create a variable to hold pokemon string data

    const pokemonName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);

    let data = 
    `     
    ${pokemonName} Data:
    Id: ${pokemon.id}
    Name: ${pokemonName}
    Height: ${pokemon.height}
    `
    //call download function
    triggerTextDownload(data)
  }



  //getPokemonDesc() .change over when importing from services page 
  
  //fetch Pokemon description data from https://pokeapi.co/api/v2/pokemon-species/ditto
  useEffect(() => {
		const getPokemonDesc = async () => {
			try {
				const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);

				console.log(res.data);
        //save description data 
				setPokemonDesc(res.data);

				// reset();
			} catch (error) {
				console.log(error);
			}
		};
    //call function
		getPokemonDesc();
	}, [name]);


  return (
    <>
    <div className="page-container">
      {/*Capitalise Pokemon name */}
      <h1 className="display-6 fw-semibold" style={{ textTransform: "capitalize" }}>{pokemon?.name} #{pokemon?.id}</h1>
        <div className="details-container">
          <div className="image-container">
            {/* Prop get sprite and name from pokemon data*/}
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
              <div>
                <h5>Height</h5>
                {/* Prop get height from pokemon data*/}
                <p>{pokemon?.height}</p>

                <h5>Weight</h5>
                <p>{pokemon?.weight}</p>

                <h5>Base Experience</h5>
                <p>{pokemon?.base_experience}</p>
              </div>
              <div>
                <h5>Type</h5>
                 {/* Map through each item in the array, access type, name key and join into string */}
                <p>{pokemon?.types.map(i => i.type.name).join(", ")}</p>

                <h5>Abilities</h5>
                 {/* Map through each abilities item in the array, access the ability, name and join into string */}
                <p>{pokemon?.abilities.map(i => i.ability.name).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      
      
      <div className="btn-contain">
        {/*Button to handle click and trigger download text*/}
        <Button onClick={()=>{handleClick()}}>
          Download Pokemon Data
        </Button>

        {/*Link Button to navigate back to the pokedex page*/}
        <Link to="/pokedex" className="btn btn-primary">
          Explore More Pokémon
        </Link>
      </div>
    </div>
    </>
   
  )
}

//export component
export default PokemonDetail