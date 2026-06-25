import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>  
      <div className="oak-container">
        <img src="https://static.wikia.nocookie.net/pokemon/images/2/26/Professor_Oak_anime_XY_and_XYZ.png/revision/latest/scale-to-width/360?cb=20131221014829" alt="Professor Oak" className='oak'></img>
      </div>
    

      <div className='text-box'>
        <p>
          Hello there! Welcome to the world of <b>POKÉMON</b>!
        </p>
        <p>
          My name is <b>PROFESSOR OAK</b>, and this world is inhabited by mysterious creatures called <b>POKÉMON</b>. For some people, Pokémon are pets. Others train them for battle. Myself… I study Pokémon as a <b>PROFESSION</b>.
        </p>
        <p>
          Now, I entrust you with the <b>POKÉDEX</b>, a high-tech encyclopedia designed to record data on all <b>151 POKÉMON</b> originally discovered in the <b>KANTO REGION</b>. Discover their types, evolutions, abilities, stats, and more. Your journey to complete the <b>POKÉDEX</b> begins <b>NOW!</b>
        </p>

        <div className="btn-container">
          <Link to="/pokedex" className="btn btn-dark">
            Explore Pokémon
          </Link>
        </div>
      </div>
    </>
  )
}

export default Home

