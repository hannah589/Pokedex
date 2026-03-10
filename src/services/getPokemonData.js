import axios from "axios";

export async function getPokemonData(limit) { {/*axios to get data*/}
	try {console.log("pokemon data");
	let response = await axios.get(`https://pokeapi.co/api/v2/pokemon/limit=${limit}`);
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
	const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=151/${name}`);
	{/*${name-or-id}*/}
	return res.data.name;
	} catch (error) {
		console.error("Error searching Pokemon", error);
		return error;
	}
} 