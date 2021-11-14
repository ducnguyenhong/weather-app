import React from 'react';
import './index.css';

const arrWeatherTV = [
  {
    name: 'VTV',
    bgSrc: 'vtv.jpg',
    href: 'https://vtv.vn/du-bao-thoi-tiet.htm'
  },
  {
    name: 'VTC14',
    bgSrc: 'vtc14.jpg',
    href: 'https://www.youtube.com/user/KenhTruyenHinhVTC14/playlists'
  },
  {
    name: 'VOV',
    bgSrc: 'vov.jpg',
    href: 'https://vov.vn/search/ZOG7sSBiw6FvIHRo4budaSB0aeG6v3Q=/du-bao-thoi-tiet.vov'
  },
  {
    name: 'Dự Báo KTTV QG',
    bgSrc: 'ttkttv.jpg',
    href: 'http://www.nchmf.gov.vn/kttvsite/'
  },
];

function WeatherTV(props) {
  return (
    <div className="weather-tv">
      <div className="container">
        <p className="title-tv text-center">Liên kết các kênh dự báo thời tiết</p>
        <div className="d-flex align-items-center justify-content-center flex-63">
          {arrWeatherTV.map((item, index) => {
            return <a
              key={index}
              href={item.href}
              className="one-weather-tv"
              target="_blank"
              rel="noopener noreferrer">
              <div className="bg-one-tv">
                <p className="name-tv">{item.name}</p>
              </div>
              <img src={`images/${item.bgSrc}`} alt="link weather" className="img-tv"/>
              
          </a>
          })}
        </div>
      </div>
    </div>
  );
}

export default WeatherTV;