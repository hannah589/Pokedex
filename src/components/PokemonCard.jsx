//import pre-styled card from bootstrap
import Card from 'react-bootstrap/Card';
//import ccs style sheet
import './PokemonCard.css'

//receive props sprites, id, name
function PokemonCard({ sprites, id, name }) {

  return (
    <div>
      {/* Use bootstrap card */}
      <Card className='pokemonCard'>
        <div className="img-container">
          <Card.Img
            variant="top"
            src={sprites.front_default}  //use front_default image from the sprite prop
            alt={name} //use name from the prop
        />
        </div>
       
        <Card.Body className='body'>
          <Card.Text className='text'>#{id}</Card.Text> {/*display id from the prop */}

          {/* Capitalize first letter of a word:
           style={{ textTransform: "capitalize" }}> */}
          <Card.Title style={{ textTransform: "capitalize" }}>{name}</Card.Title>
          {/*display name from the prop */}
        </Card.Body>
      </Card>
    </div>
  )
}

export default PokemonCard

