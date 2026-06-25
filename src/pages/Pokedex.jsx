//import to use useState and useEffect
import React, { useState, useEffect } from "react";
//import link to navigate to another page 
import { Link } from "react-router-dom";
//import pokemon card component
import PokemonCard from '../components/PokemonCard'
//import ui components from bootstrap
import { Container, Row, Col, Button, Form } from "react-bootstrap";
// import search icon from react icons
import { FaSearch } from "react-icons/fa";
// import getAllPokemon, searchPokemon API calls/data from the services folder
import { getPokemonData, getPokemonPage } from "../services/getPokemonData";
//import joi to validate the search input before attempting to search
import Joi from "joi";
//import Pokedex css stylesheet
import "./Pokedex.css";


/*
import axios from "axios";
import { searchPokemon } from "../services/getPokemonData";
import { useForm} from "react-hook-form";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers"
*/
function Pokedex() {
  //State to hold 151 Pokemon API data
  const [pokemon, setPokemon] = useState([]);

  //Load more button with the help of ChatGPT
  //state to hold current offset of 0 
  const [offset, setOffset]  = useState(0);
  const limit = 8; //Show 8 per page 

  //Track state the user has written in search input
  const [searchInput, setSearchInput] = useState("");
  //hold joi validation error 
  const [searchError, setSearchError] = useState("");
  //filter list of matching search results
  const [searchResults, setSearchResults] = useState([]);
  //track whether the user has submitted a search
  const [hasSearched, setHasSearched] = useState(false);


  // Joi defines clear search input rules for the search form
  //return descriptive error messages
  const searchSchema = Joi.object({
  //joi validates string input is 1-20 characters
	search: Joi.string().min(1).max(20).required().messages({
		"string.empty": "Please enter a Pokémon name to search.",
		"string.min": "Search must be at least 1 character.",
		"string.max": "Search must be 20 characters or fewer.",
		"any.required": "Search input is required.",
	}),
});

{/*
  //Search functionality
  const [isSubmitting, setIsSubmitting] = useState(false);

  //1.search validation scheme: checks valid search input
  const searchSchema = Joi.object({
    // search input: min 1-12 words
  search: Joi.string().min(1).max(12),
	});

  //2. useForm hook to handle search form
  const {
    handleSubmit,
    register,
    formState: {errors},
  } = useForm({
    resolver: joiResolver(searchSchema),
  })

  //function to handle search when click
  //input error??? change input word
  const onSearchSubmit = async (input) => {
    setIsSubmitting(true);
		console.log(input.search);

    try {
			const res = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${input.search}`
			);

      console.log(res.data.name);
      searchPokemon(res.data.name);
	  } catch (error) {
		  console.error("Error searching Pokemon", error);
		  return error;
	  } finally {
	    setIsSubmitting(false);
    }
  };

	const onError = (errors) => {
		console.error("Form validation errors:", errors);
		//? Could implement user notification system here
	};

//end search functionality 
*/}
    //help of ChatGPT
    useEffect(() => {
    const fetchPokemon = async () => {
      try {
        //fetch pokemon data using the current limit and offset 
        const details = await getPokemonPage(limit, offset);

        //update state using the previous pokemon list
        setPokemon((prev) => {
          //combine the previous pokemon list with the new data just fetched
          const combined = [...prev, ...details];

          //remove duplicate pokemon id 
          const unique = combined.filter(
            (pokemon, index, self) =>
              index === self.findIndex((p) => p.id === pokemon.id)
          );
          //clean list of no duplicated pokemon
          return unique;
        });
      } catch (error) {
        //handle any error from the API call
        console.error("Error fetching Pokemon data:", error);
      }
    };

    fetchPokemon(); // call async function 
  }, [offset]); //run every time the offset state changes/load more button triggers


  function handleLoadBtn(){
    //increase previous offset by adding limit
    setOffset((prev) => prev + limit);
    return console.log("Load more button clicked");
  }

  //function to download txt document, and write 151 Pokemon inside the txt
  //function downloadTextFile(){}

//useEffect to call the `getPokemonData()` when the page first loads.
  useEffect(() => {
    async function loadData() {
      try {
        await getPokemonData(); //saves the data to Local Storage if not already there
      } catch (error) {
        console.error("Failed to load Pokémon data:", error);
      }
    }
    loadData();
  }, []); // empty array = runs once on first render


  //Handle the search form functionality 
  const handleSearch = (e) => {
	e.preventDefault(); // stop the page from refreshing on form submit

	// 1. Validate input with Joi
	const { error } = searchSchema.validate({ search: searchInput });
	if (error) {
		setSearchError(error.details[0].message);
		setSearchResults([]);
		setHasSearched(false);
		return; // stop here if validation fails
	}

  // 2. Clear any previous error
	setSearchError("");

	// 3. Read the stored Pokémon list from Local Storage
	const stored = JSON.parse(localStorage.getItem("allPokemon")) || [];

	// 4. Filter by name — case-insensitive, partial match
	const results = stored.filter((pokemon) =>
		pokemon.name.toLowerCase().includes(searchInput.toLowerCase().trim()),
	);

	// 5. Update state
	setSearchResults(results);
	setHasSearched(true);
};

  return (
    
    <Container className='pokedexPage'>
      <h1 className="display-6 fw-semibold">Pokédex</h1>
      {/* Search form heading label*/}
      {/* *htmlFor references the aria-label search */}
      <Form.Label htmlFor="search">Search Pokémon by Name</Form.Label>
      
         <div>
            <Form onSubmit={handleSearch} id="search-form">
	            <Row className="align-items-start">
		            <Col xs="auto">
			            <Form.Control
				            type="text"
				            placeholder="e.g. pikachu"
				            value={searchInput}
				            onChange={(e) => setSearchInput(e.target.value)}
				            isInvalid={!!searchError}
				            aria-label="Search Pokémon by name"
			            />
			            <Form.Control.Feedback type="invalid"> {/*text turns red if there is an error*/}
				            {searchError}
			            </Form.Control.Feedback>
		            </Col>
		            <Col xs="auto">
                  <Button type="submit">
                    <FaSearch style={{ paddingBottom: "4px" }} />
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>

          {/* list pokemon search result */}   
          {
            hasSearched && (
              <section>
                {searchResults.length === 0 ? (
                  <p>No Pokémon found matching "{searchInput}".</p>
                ) : (
                  <ul>
                    {searchResults.map((pokemon) => (
                      <li key={pokemon.name}>
                        <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )
          }

      {/*
          <div>
            <Form inline id="search-form" noValidate="noValidate" onSubmit={handleSubmit(onSearchSubmit, onError)}> 
              <Row>
                <Col xs="auto">
                 
                  <Form.Control
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    aria-label="search"
                    aria-describedby="search-pokemon-name" //hyphen - for each different word
                    aria-invalid={errors.search ? "true" : "false"}
                    disabled={isSubmitting}
                    {...register("search")}
                  />

                </Col>
                <Col xs="auto">

                  <Button type="submit">
                    <FaSearch style={{ paddingBottom: '4px' }}/>
                  </Button>

                </Col>
              </Row>
            </Form>
            <span className="text-danger my-0">{errors.search?.message}</span>
          </div>
        */}

      <section className="gridContainer">
        {/*map pokemon data into each card*/}
            {/*Link: when click pokemon card, go to each pokemon's pokemon details page*/}
        {pokemon.map((pokemon)=>(
          <Link to={`/pokemon/${pokemon.name}`} key={pokemon.id} className="link"> 
          {/* props from pokemon card get pokemon sprite id number and name*/}
            <PokemonCard 
              sprites={pokemon.sprites}
              id={pokemon.id}
              name={pokemon.name}
            />
          </Link>
          
        ))}
      </section>

      <section className="loadBtn-section">
        <button type="button" className="btn btn-primary" onClick={handleLoadBtn}>Load more Pokémon</button>
      </section>
    </Container>
  
  )
}

export default Pokedex
