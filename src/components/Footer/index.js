import React from 'react';
import './index.css';

function Footer(props) {
  return (
    <div className="footer text-center text-white">
      <div className="row">
        <div className="col-sm-4">
          <img src="/images/logo.png" alt="logo" className="ft-logo" />
          <p style={{marginBottom: 0, marginTop:15}}>Dự báo thời tiết online</p>
        </div>
        <div className="col-sm-1 "></div>
        <div className="col-sm-2 ">
          <p className="ft-title">Mạng xã hội</p>
          <div className="ft-icon row">
            <a href="https://www.facebook.com/ducnh99" className="col-sm-3"><i className="fab fa-facebook-square"></i></a>
            <a href="https://www.youtube.com/channel/UCLO94_1jrZLbzLJdsxsjrGA" className="col-sm-3"><i className="fab fa-youtube-square"></i></a>
            <a href="https://www.instagram.com/autoclickvn/" className="col-sm-3"><i className="fab fa-instagram"></i></a>
            <a href="https://github.com/autoclickvn" className="col-sm-3"><i className="fab fa-github-square"></i></a>
          </div>
        </div>
        <div className="col-sm-1 "></div>
        <div className="col-sm-4">
          <p className="ft-title">Liên hệ với tôi</p>
          <p>Facebook: <a href="https://www.facebook.com/ducnh99" style={{ color: 'white',fontWeight: '600', marginBottom:5 }}>Nguyễn Đức</a></p>
          <p>Điện thoại: <span style={{ fontWeight: '600', marginBottom:5 }}>0376876191</span></p>
          <p>Email: <a href="mailto:autoclickvn@gmail.com" style={{ color: 'white',fontWeight: '600', marginBottom:5 }}>autoclickvn@gmail.com</a></p>
        </div>
      </div>
      <p className="copyright text-center">© Copyright 2020 - Bản quyền thuộc về ThoiTiet.Online</p>
    </div>
  );
}

export default Footer;