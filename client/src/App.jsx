import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from "./Components/Headers";
import Hero from './Components/Hero';
import Nosotros from './Components/HeroFood';

function App() {

  return (
    <>
    <BrowserRouter>
      <Header/>
      <Hero/>
      <Nosotros/>
    </BrowserRouter>
      
    </>
  )
}

export default App
