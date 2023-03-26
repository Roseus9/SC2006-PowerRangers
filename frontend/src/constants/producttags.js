const producttags_arr = [
  "Hall",
  "Washing Products",
  "Cleaning Products",
  "Toiletries",
  "Facial Products",
  "Clothes",
  "Food",
  "Drinks",
  "Alcohol",
  "Cutlery",
  "Serveware",
  "Bags",
  "Furniture",
  "Fan",
  "Portable Air Con",
  "Monitor",
  "Shoes",
  "Slippers",
  "Books",
  "Academic Materials",
  "Stationery",
  "Wires",
];

var producttags = [];
for (var i = 0; i < producttags_arr.length; i++) {
  producttags.push({
    value: producttags_arr[i],
    label: producttags_arr[i],
  });
}
export default producttags;
