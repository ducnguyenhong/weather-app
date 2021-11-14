import React, {useState} from 'react';
import './index.css';
import Weather7Item from '../Weather7Item';
import apiNameCity from '../../apis/apiNameCity';
import apiCurrentHourDay from '../../apis/apiCurrentHourDay'; 
import moment from "moment";

function WeatherSearch(props) {
  const nowMoment = moment();
  const hourMoment = moment();
  const [long, setLong] = useState();
  const [lat, setLat] = useState();
  const [city, setCity] = useState("");
  const [dataWeather, setDataWeather] = useState();
  const [nonPosition, setNonPosition] = useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    if (long >= -180 && long <= 180 && lat >= -90 && lat <= 90) {
      apiNameCity(long, lat).then((res) => {
        setCity(res.data.name);
      });

      apiCurrentHourDay(long, lat).then((res) => {
        setDataWeather(res.data);
      });
      setNonPosition(false);
    }
    else {
      setDataWeather("");
      setNonPosition(true);
    }
  }

  return (
    <div className="weather-search">
      <div className="container">
        <p className="text-white text-center title-search">Tra cứu thời tiết theo tọa độ</p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-sm-5">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Kinh độ" onChange={e => setLong(e.target.value)} />
                <small className="text-white">(-180 ≤ Kinh độ ≤ 180)</small>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Vĩ độ" onChange={e => setLat(e.target.value)} />
                <small className="text-white">(-180 ≤ Vĩ độ ≤ 180)</small>
              </div>
            </div>
            <div className="col-sm-2">
              <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter2">TRA CỨU</button>
            </div>
          </div>

        </form>
      </div>

      <div>
        <div className="modal fade" id="exampleModalCenter2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-body">
              {dataWeather && <div className="d-flex align-items-center justify-content-center flex-63 container-flex">
                    <div className="one-detail-63">
                      <p className="city-63">Tỉnh/Thành phố: <span className="cl-red">{city ? city : "Chưa xác định"}</span></p>
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
                </div>}
                
                {nonPosition && <div className="text-center">
                  <p className="non-position-title">Tọa độ địa lý không đúng</p>
                  <p className="non-position-content">(-180 ≤ Kinh độ ≤ 180 và -90 ≤ Vĩ độ ≤ 90 )</p>
                </div>}
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" data-dismiss="modal">Đóng</button>
              </div>
            </div>
          </div>
          </div>
          </div>
      </div>
    </div>
  );
}

export default WeatherSearch;