import React, { useState, useEffect } from "react";
import "./index.css";
import apiNameCity from "../../apis/apiNameCity";
import apiCurrentHourDay from "../../apis/apiCurrentHourDay";
import moment from "moment";

function WeatherNowHome(props) {
  const nowMoment = moment();
  const dayMoment = moment();
  const [long, setLong] = useState(106.66);
  const [lat, setLat] = useState(10.75);
  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState();
  const handleGetPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Trình duyệt của bạn không hỗ trợ");
    }
  };
  const showPosition = (position) => {
    setLong(position.coords.longitude);
    setLat(position.coords.latitude);
  };

  useEffect(() => {
    apiNameCity(long, lat).then((res) => {
      setCity(res.data.name);
    });

    apiCurrentHourDay(long, lat).then((res) => {
      setDataWeather(res.data);
    });
  }, [lat, long]);

  if (dataWeather) {
    return (
      <div className="weather-now-home">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center container-flex">
            <div className="row row-flex">
              <div className="col-sm-4 text-center text-white">
                <p className="now-city">{city}</p>
                <div className="row">
                  <div className="col-sm-6">
                    <img
                      src={`/images/icon-${dataWeather.current.weather[0].icon}.png`}
                      className="now-icon"
                      alt="icon"
                    />
                    <p className="now-temp fs-18">
                      {~~(dataWeather.current.feels_like - 273)}°C
                    </p>
                  </div>
                  <div className="col-sm-6">
                    <p className="now-humid fs-18">
                      Độ ẩm: {dataWeather.current.humidity}%
                    </p>
                    <p className="now-uv fs-18">
                      Tia UV:{" "}
                      {dataWeather.current.uvi >= 11 ? "cao" : "trung bình"}
                    </p>
                    <p className="now-pres fs-18">
                      Áp suất: {dataWeather.current.pressure} hPa
                    </p>
                  </div>
                </div>
                <p className="now-day fs-18">
                  {nowMoment.format("DD/MM/YYYY")}
                </p>
                <button
                  className="btn btn-danger btn-location"
                  onClick={handleGetPosition}
                  style={{ cursor: "pointer" }}
                >
                  Lấy vị trí của bạn
                </button>
              </div>
              <div className="col-sm-8">
                <div className="row row-item text-center text-white">
                  {dataWeather.daily.map((item, index) => {
                    if (index!==0 && index < 7)
                      return (
                        <div className="one-day-now col-sm-2" key={index}>
                          <p className="week-date fs-22">
                            {dayMoment.add("1", "days").format("DD/MM")}
                          </p>
                          <img
                            src={`/images/icon-${item.weather[0].icon}.png`}
                            className="week-icon"
                            alt="icon"
                          />
                          <p className="week-temp fs-22">
                            {~~(item.feels_like.day - 273)}°C
                          </p>
                        </div>
                      );
                    else return <div key={index}></div>;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else return <div></div>;
}

export default WeatherNowHome;
