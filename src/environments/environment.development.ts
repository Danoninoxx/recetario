export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyDoZYduaE1o-udfEolX_1Gr9UfP8wbgKtM",
        authDomain: "recetario-4196c.firebaseapp.com",
        projectId: "recetario-4196c",
        storageBucket: "recetario-4196c.firebasestorage.app",
        messagingSenderId: "724339951584",
        appId: "1:724339951584:web:303b5ec2fce4da1376cd85",
        measurementId: "G-DNMEEJ9Q02"
      },
    api:{
        nationalities:'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
        categories:'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
        listByCategory: 'https://www.themealdb.com/api/json/v1/1/filter.php?c=',
        listByNationality: 'https://www.themealdb.com/api/json/v1/1/filter.php?a=',
        viewRecipe:'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
    }

};