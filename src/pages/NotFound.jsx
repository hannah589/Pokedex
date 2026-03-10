import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <div className='notfound'>
       <img src="https://i.pinimg.com/736x/68/4c/ca/684cca4106fead2c713b30967fec477a.jpg" alt="Poké Ball" className='pokeball'></img>
      <div className="content">
           <h1>404</h1>
      <p>Oh, no! The Pokémon broke free!</p>
      <Link to="/">
        <button class="btn btn-primary">Return Home</button>
      </Link>
      </div>
    </div>
  )
}

export default NotFound
