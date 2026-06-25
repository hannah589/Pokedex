import axios from "axios";
//axios to get data

// Fetch all 151 Pokemon data and store in Local Storage
export async function getPokemonData() {
  if (localStorage.getItem("allPokemon")) {
	return JSON.parse(localStorage.getItem("allPokemon"));
  }	
// return guard API is called once per browser session

  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151`);
		//check postman to view API, to access data array
    const pokemonList = response.data.results; // get pokemon data results from the array either by name or url
    localStorage.setItem("allPokemon", JSON.stringify(pokemonList));
		//covert the array into a string to be stored to local storage
    console.log("151 Pokémon saved to Local Storage");
	return pokemonList;
  } catch (error) {
    console.error("Error fetching all Pokémon:", error);
    throw error;
  }
}


//Fetch paginated Pokémon
export async function getPokemonPage(limit, offset) {
  try {
    const response = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    );

    const results = response.data.results;

    const details = await Promise.all(
      results.map((pokemon) => axios.get(pokemon.url).then(res => res.data))
    );

    return details;
  } catch (error) {
    console.error("Error fetching Pokémon page:", error);
    throw error;
  }
}


/*
Search Pokemon by name
export async function searchPokemon(name) {
	try {console.log("search pokemon");
	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
	return res.data.name;
	} catch (error) {
		console.error("Error searching Pokemon", error);
		return error;
	}
} 
*/

//Get Pokemon description, for details Page.
export async function getPokemonDesc(name) {
	try {
		const res = await axios.get(
			`https://pokeapi.co/api/v2/pokemon-species/${name}`
		);//${name-or-id}
		return res.data.name;
	} catch (error) {
		console.error("Error getting Pokemon description", error);
		return error;
	}
} 
