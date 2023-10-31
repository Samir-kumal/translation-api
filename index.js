const express = require("express");
const axios = require("axios");

const app = express();

app.listen(5000, () => {
  console.log("Server Started");
});

const url = "http://prayatan.jwalamukhimun.gov.np/v1/places/en";
let placesData;
let nepaliData;
let count = 0

const fetchData = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        "api-key": "3fba649578447eb76c59",
      },
    });
    if (response) {
      const data = response.data.places;
      placesData = data;
      console.log(placesData);

      // Call the translation function after data is fetched
      translate();
    }
  } catch (error) {
    console.error(error);
  }
};

// const translate = async () => {
//   try {
//     // Extract the descriptions from placesData
//     // const descriptions = placesData.map((place) => place.description);
//     const translations = placesData.map((place) => {
//         const translationInput = [
//           place.title,
//           place.description,
//           place.location,
//           place.wardno,
//         ].join(" "); // Combine the fields with a space separator
//         return translationInput;
//       });

//     const options = {
//       method: "POST",
//       url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
//       headers: {
//         "content-type": "application/json",
//         "X-RapidAPI-Key": "bc09f3388emsh9ec4ea7dee97cedp1fd462jsn3e7fe9c75a63",
//         "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
//       },
//       data: {
//         from: "en",
//         to: "ne",
//         q: translations, // Send the descriptions array for translation
//       },
//     };

//     const response = await axios.request(options);
//     const translatedPlacesData = placesData.map((place, index) => {
//         return {
//           title: translations[index], // Assuming the first element is the title
//           location: place.location,
//           wardno: place.wardno,
//           description: translations[index], // Assuming the second element is the description
//         };
//       });
      
//       console.log(translatedPlacesData);
//     // console.log(response.data);
//   } catch (error) {
//     console.error(error);
//   }
// };

const translate = async () => {
    try {
      const translations = placesData.map((place) => {
        const translationInput = [
          place.title,
          place.description,
          place.location,
    
        ].join(" ");
        return translationInput;
      });
  
      const options = {
        method: "POST",
        url: "https://rapid-translate-multi-traduction.p.rapidapi.com/t",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key": "bc09f3388emsh9ec4ea7dee97cedp1fd462jsn3e7fe9c75a63",
          "X-RapidAPI-Host": "rapid-translate-multi-traduction.p.rapidapi.com",
        },
        data: {
          from: "en",
          to: "ne",
          q: translations,
        },
      };
  
      const response = await axios.request(options);
  
      const translatedPlacesData = placesData.map((place, index) => {
        return {
          ...place, // Copy the original attributes
          title: response.data.translations[index].title,
          description: response.data.translations[index].description,
          location: place.location,
          wardno: place.wardno,
        };
      });

    response.data.map((item)=>{
        console.log(item, "count",count);
        count ++

    })
  
    } catch (error) {
      console.error(error);
    }
  };
  


fetchData();

app.get("/data", (req, res)=>{

})