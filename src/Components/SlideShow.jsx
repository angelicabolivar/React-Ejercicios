import React from 'react';
import './SlideShow.css';

const delay = 2500;

function Slideshow({cards}) {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  React.useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === cards.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );

    return () => {
      resetTimeout();
    };
  }, [index]);

  return (
    <div className="slideshow">
      <div className="slideshowSlider"
      style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
      >
        {cards.map((component, index) => (
          <div 
          className="slide" 
          key={index}
          >
            {component}
          </div>
        ))}
      </div>

    <div className="slideshowDots">
       {cards.map((_, idx) => (
         <div key={idx} 
         className={`slideshowDot${index === idx ? " active" : ""}`}
         onClick={() => {
          setIndex(idx);
        }}
         ></div>
       ))}
    </div>
    </div> 
  );
}

export default Slideshow


