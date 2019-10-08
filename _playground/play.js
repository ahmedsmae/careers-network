const fs = require('fs');
const citiesList = require('../mobile/redux/constants/cities.data');

let result = citiesList.map(city =>
  JSON.stringify({
    id: city.geonameid,
    city: city.name,
    country: city.country
  })
);

// fs.writeFile('result.js', result.toString(), err => {
//   if (err) console.log(err);
//   console.log('Successfully Written to File.');
// });
