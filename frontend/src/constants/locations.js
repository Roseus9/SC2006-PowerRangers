const locations_arr = [
  "Hall 1",
  "Hall 2",
  "Hall 3",
  "Hall 4",
  "Hall 5",
  "Hall 6",
  "Hall 7",
  "Hall 8",
  "Hall 9",
  "Hall 10",
  "Hall 11",
  "Hall 12",
  "Hall 13",
  "Hall 14",
  "Hall 15",
  "Hall 16",
  "Crescent Hall",
  "Pioneer Hall",
  "Binjai Hall",
  "Tanjong Hall",
  "Banyan Hall",
  "Saraca Hall",
  "Tamarind Hall",
  "Graduate Hall 1",
  "Graduate Hall 2",
  "The Arc",
  "NIE",
  "North Spine",
  "South Spine",
  "NBS",
  "CCEB",
  "EEE",
  "CEE",
  "MSE",
  "SCSE",
  "MAE",
  "SOH",
  "ADM",
  "WKW",
  "SSS",
  "CoHaSS",
  "SPMS",
  "SBS",
  "ASE",
  "LKC Medicine",
  "Graduate College",
  "The Hive",
  "RSIS",
];

var locations = [];
for (var i = 0; i < locations_arr.length; i++) {
  locations.push({
    value: locations_arr[i],
    label: locations_arr[i],
  });
}
export default locations;
