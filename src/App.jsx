import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import PokemonDetail from './pages/PokemonDetail'
import NotFound from './pages/NotFound'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {

  return (
    <>
        <Header/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokedex" element={<Pokedex />} />
            <Route path="/pokemon/:name" element={<PokemonDetail />} /> 
            <Route path="*" element={<NotFound />}></Route>{/* 404 Page */}
          </Routes>
        <Footer />
    </>
  )
}

export default App
