import axios from 'axios';

export default function apiHistory(long, lat, time) {
  return axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${lat}&lon=${long}&dt=${time}&lang=vi&appid=c83b7a666d75267e6a092ad97937d197`,
    data: null
  }).catch(err => {
    console.log(err);
  })
}