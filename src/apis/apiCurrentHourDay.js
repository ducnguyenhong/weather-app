import axios from 'axios';

export default function apiCurrentHourDay( long, lat) {
  return axios({
    method: 'get',
    url: `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=vi&exclude={part}&appid=c83b7a666d75267e6a092ad97937d197`,
    data: null
  }).catch(err => {
    console.log(err);
  });
}