import React,{useState,useEffect} from 'react';
import './index.css';
import dataWorld from '../../common/dataWorld';
import apiCurrentHourDay from "../../apis/apiCurrentHourDay";
import Weather7Item from '../Weather7Item';
import moment from "moment";

function WeatherWorld(props) {

  const [long, setLong] = useState(0);
  const dayMoment = moment();
  const [lat, setLat] = useState(0);
  const [city, setCity] = useState("Hà Nội");
  const [dataWeather, setDataWeather] = useState();

  const getPosition = (i) => {
    const position = dataWorld[i];
    setLat(position.lat);
    setLong(position.long);
    setCity(position.name);
  };

  useEffect(() => {
    apiCurrentHourDay(long, lat).then((res) => {
      setDataWeather(res.data);
    });

  }, [long, lat]);

  if (dataWeather) {
    return (
      <div className="weather-world">
        <div className="container container-flex">
          <div className="container-flex all-world-now">
            <p className="col-sm-12 title-world text-center">Thời tiết các thành phố lớn trên thế giới</p>
            {dataWorld.map((item, index) => {
              return <div key={index}
                      className="one-world-now">
                <img
                  onClick={(i) => { getPosition(index) }}
                  src={`/images/${item.bg}`}
                  data-toggle="modal"
                  className="img-world"
                  data-target="#exampleModalCenter3"
                  alt="world"
                />
                <div className="modal fade" id="exampleModalCenter3" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="d-flex align-items-center justify-content-center flex-63 container-flex">
                          <div className="one-detail-63">
                            <p className="city-63">Thành phố: <span className="cl-red">{city ? city : "Chưa xác định"}</span></p>
                            <div className="row row-63-2">
                              <div className="col-sm-4">
                                <p className="long-63">Kinh độ: <span className="cl-red">{dataWeather.lon}</span></p>
                                <p className="lat-63">Vĩ độ: <span className="cl-red">{dataWeather.lat}</span></p>
                                <p className="humid-63">Độ ẩm: <span className="cl-red">{dataWeather.current.humidity}%</span></p>
                              </div>
                              <div className="col-sm-4 text-center">
                                <img
                                  src={`/images/icon-${dataWeather.current.weather[0].icon}.png`}
                                  className="now-icon"
                                  alt="icon"
                                />
                                <p className="temp-63"><span className="cl-red">{~~(dataWeather.current.feels_like - 273)}°C</span></p>
                              </div>
                              <div className="col-sm-4 text-right">
                                <p className="uv-63">Tia UV: <span className="cl-red">{dataWeather.current.uvi >= 11 ? "cao" : "trung bình"}</span></p>
                                <p className="pres-63">Áp suất: <span className="cl-red">{dataWeather.current.pressure} hPa</span></p>
                                <p className="wind-63">Tốc độ gió: <span className="cl-red">{dataWeather.current.wind_speed} m/s</span></p>
                              </div>
                            </div>
                          </div>
                          <div className="one-detail-63">
                            <p className="city-63">Dự báo thời tiết <span className="cl-red">7 ngày tới</span></p>
                            <div className="d-flex all-24 align-items-center justify-content-center flex-wrap">
                              {dataWeather.daily.map((item, index) => {
                                if (index !== 0 && index < 8)
                                  return (
                                    <Weather7Item
                                      key={index}
                                      icon={item.weather[0].icon}
                                      title={dayMoment.add("1", "days").format("DD/MM")}
                                      temp={~~(item.feels_like.day - 273)}
                                      unit={""} />
                                  );
                                else return <div key={index}></div>;
                              })}
                            </div>
                          </div>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            })}
          
          </div>
        </div>
      </div>
    );
  }
  else return <div></div>
}


export default WeatherWorld;