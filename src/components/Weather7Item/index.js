import React from 'react';
import './index.css';

function Weather7Item(props) {
  const { icon, title, temp, unit } = props;
  return (
    <div className="weather7item text-center">
      <p className="type-7">{title} {unit}</p>
      <img src={`/images/icon-${icon}.png`} alt="icon" className="icon-7" />
      <p className="temp-7">{temp}°C</p>
    </div>
  );
}

export default Weather7Item;