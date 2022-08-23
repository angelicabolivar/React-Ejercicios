import React from 'react';
import Card1 from './Cards/Card1.jsx';
import Card2 from './Cards/Card2.jsx';
import Slideshow from './SlideShow';
import './Transiciones.css';

const Transiciones = () => {
  const cards =[
    <Card1/>,
    <Card2/>,]
  return (
    <div className='Transition'>
      <Slideshow cards={cards}/>
    </div>
  )
}

export default Transiciones