import axios from 'axios';

axios.defaults.withCredentials = true;

function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
}

function filterNull(o) {
 for (let key in o) {
   if(o.hasOwnProperty(key)) {
     if (o[key] === null) {
       delete o[key];
     }
     if (toType(o[key] === 'string')) {
       o[key] = o[key].trim();
     } else if (toType(o[key]) === 'object') {
       o[key] = filterNull(o[key]);
     } else if (toType(o[key]) === 'array') {
       o[key] = filterNull(o[key]);
     }
   }
 }
 return o;
}
