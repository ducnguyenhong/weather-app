import React, { useState, useEffect } from 'react';
import './index.css';
import Weather7Item from '../Weather7Item';
import apiCurrentHourDay from "../../apis/apiCurrentHourDay";
import data63 from '../../common/data63';
import moment from "moment";
import apiHistory from '../../apis/apiHistory';

function Weather63(props) {
  const nowMoment = moment();
  const hourMoment = moment();
  const dayMoment = moment();
  const historyDayMoment = moment();
  const historyMoment = ~~(moment().valueOf() / 1000);
  
  const [long, setLong] = useState(105.84);
  const [lat, setLat] = useState(21.02);
  const [city, setCity] = useState("Hà Nội");
  const [dataWeather, setDataWeather] = useState();
  const [dataHistory, setDataHistory] = useState();
  
  const getPosition = (i) => {
    const position = data63[i];
    setLat(position.lat);
    setLong(position.long);
    setCity(position.name);
  }

  const handleClick7day = () => {
    apiHistory(long, lat, historyMoment).then(res => {
      setDataHistory(res.data);
    });
  }
  
  useEffect(() => {
    apiCurrentHourDay(long, lat).then((res) => {
      setDataWeather(res.data);
    });

  }, [long, lat]);

  if (dataWeather) {
    return (
      <div className="weather63">
        <div className="d-flex align-items-center justify-content-center container-flex">
          <div className="container">
            <div className="row row-63-1">
              <div className="col-sm-2">
                <p className="btn-primary label-city col-sm-12 dropdown-toggle">
                  Tỉnh/Thành Phố
                  </p>
                <div className="dropdown-menus text-white">
                  {data63.map((item, index) => {
                    return (<span
                      key={index}
                      className="dropdown-item"
                      onClick={(i) => {getPosition(index)}}>
                      {item.name}
                    </span>);
                  })}
                </div>
              </div>
              <div className="col-sm-10">
                <div className="d-flex align-items-center justify-content-center flex-63 container-flex">
                  <div className="one-detail-63">
                    <p className="city-63">Tỉnh/Thành phố: <span className="cl-red">{city}</span></p>
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
                    <p className="city-63">Thời tiết theo giờ hôm nay <span className="cl-red">{nowMoment.format("DD/MM/YYYY")}</span></p>
                    <div className="d-flex all-24 align-items-center justify-content-center flex-wrap">
                      {dataWeather.hourly.map((item, index) => {
                        if (index !== 0 && index < 8)
                          return <Weather7Item
                            key={index}
                            icon={item.weather[0].icon}
                            title={hourMoment.add('1', 'hours').format("HH")}
                            unit={"giờ"}
                            temp={~~(item.feels_like-273)} />;
                        else return <div key={index}></div>;
                      }
                      )}
                    </div>
                  </div>
                  <button type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModalCenter" onClick={handleClick7day}>
                    Dự báo và lịch sử thời tiết
                  </button>
                </div>
  
                <div>
                  {/* Modal */}
                  <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <div className="one-detail-63">
                            <p className="city-63">Dự báo thời tiết <span className="cl-red">7 ngày tới</span></p>
                            <div className="d-flex all-24 align-items-center justify-content-center flex-wrap">
                            {dataWeather.daily.map((item, index) => {
                              if (index!==0 && index < 8)
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
  
                          {dataHistory && <div className="one-detail-63 history-63">
                            <p className="city-63">Lịch sử thời tiết <span className="cl-red">5 ngày trước</span></p>
                            <div className="d-flex all-24 align-items-center justify-content-center flex-wrap">
                              {dataHistory.hourly.map((item, index) => {
                                if (index < 5) {
                                  return <Weather7Item
                                    key={index}
                                    icon={item.weather[0].icon}
                                    temp={~~(item.feels_like - 273)}
                                    title={historyDayMoment.subtract("1", "days").format("DD/MM")}
                                    unit={""}
                                  />
                                }
                                else return <div key={index}></div>
                              })}
                            </div>
                          </div>}
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  else return <div></div>
}

export default Weather63;