import Card from 'react-bootstrap/Card';
import './PokemonCard.css'

function PokemonCard({ sprites, id, name }) {

  return (
    <div>
      <Card>
        <Card.Img
          variant="top"
          src={sprites.front_default}
          alt={name}
          className='img-container'
        />
        <Card.Body className='body'>
          <Card.Text className='text'>{id}</Card.Text>

          {/* Capitalize first letter of a word:
           style={{ textTransform: "capitalize" }}> */}
          <Card.Title style={{ textTransform: "capitalize" }}>{name}</Card.Title>
        </Card.Body>
      </Card>
    </div>
  )
}

export default PokemonCard

