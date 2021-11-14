import React, { useEffect,useState } from 'react';
import './index.css';
import apiNameCity from '../../apis/apiNameCity';

function Markquee(props) {

  const [HN, setHN] = useState();
  const [HP, setHP] = useState();
  const [DN, setDN] = useState();
  const [HCM, setHCM] = useState();
  const [CT, setCT] = useState();

  useEffect(() => {
    apiNameCity(105.84, 21.02).then((res) => {
      setHN(res.data.main.feels_like);
    });
    apiNameCity(106.69, 20.85).then((res) => {
      setHP(res.data.main.feels_like);
    });
    apiNameCity(108, 16).then((res) => {
      setDN(res.data.main.feels_like);
    });
    apiNameCity(106.66, 10.75).then((res) => {
      setHCM(res.data.main.feels_like);
    });
    apiNameCity(105.78, 10.03).then((res) => {
      setCT(res.data.main.feels_like);
    });
  }, [])

  return (
    <div className="markquee">
      <div className="container container-mq">
        <div className="mq-full row text-white">
          <div className="col-sm-3">
            <p className="mq-title">Thời tiết hiện tại: </p>
          </div>
          <div className="col-sm-9">
            <marquee>
              <span> Hà Nội:  {~~(HN-273)}°C </span>
              <span> Hải Phòng:  {~~(HP-273)}°C </span>
              <span> Đà Nẵng:  {~~(DN-273)}°C </span>
              <span> Hồ Chí Minh:  {~~(HCM-273)}°C </span>
              <span> Cần Thơ:  {~~(CT-273)}°C </span>
            </marquee>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Markquee;