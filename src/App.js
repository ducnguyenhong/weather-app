import React from 'react';
import Weather63 from './components/Weather63';
import WeatherWorld from './components/WeatherWorld';
import Footer from './components/Footer';
import Markquee from './components/Markquee';
import WeatherNowHome from './components/WeatherNowHome';
import WeatherSearch from './components/WeatherSearch';
import WeatherTV from './components/WeatherTV';

function App(props) {
  return (
    <>
      <Markquee />
      <WeatherNowHome />
      <Weather63 />
      <WeatherWorld />
      <WeatherTV />
      <WeatherSearch />
      <Footer />
    </>
  );
}

export default App;