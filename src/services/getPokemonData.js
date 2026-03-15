import axios from "axios";

export async function getPokemonData() { {/*axios to get data*/}
	try {console.log("pokemon data");
	let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=151`);
	console.log(response.data);
	response = response.data.data;
	return response;
	} catch (error) {
		console.error("Error fetching Pokemon data:", error);
		return error;
	}
} 

export async function searchPokemon(name) {
	try {console.log("search pokemon");
	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
	{/*${name-or-id}*/}
	return res.data.name;
	} catch (error) {
		console.error("Error searching Pokemon", error);
		return error;
	}
} 


//Data for Pokemon Details Page 
export async function getPokemonDesc(name) {
	try {console.log("Get pokemon description");
		const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`);//${name-or-id}
		return res.data.name;
	} catch (error) {
		console.error("Error getting Pokemon description", error);
		return error;
	}
} 
