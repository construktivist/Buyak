$(document).ready(function(){

// FIREBASE INITIALIZATION
// ================================================================================================== //
//  Initialize Firebase
  var config = {
    apiKey: "AIzaSyAzBMRn1owNGPyB24mOo6UUP0v8KfUqMaQ",
    authDomain: "buyakdb.firebaseapp.com",
    databaseURL: "https://buyakdb.firebaseio.com",
    storageBucket: "buyakdb.appspot.com",
    messagingSenderId: "781575941750"
  };
  
  firebase.initializeApp(config);

  database = firebase.database();
// ================================================================================================== //





// GLOBAL VARIABLES
// ================================================================================================== //
  var walmartItems = [];
  var bestBuyItems = [];
  var ebayItems = [];
  var searsItems = [];
  var wishItemCount = 0;
  var wishArray= [];
  var testProduct = "This is a test product";

// ================================================================================================== //

//featuredProducts("tv", "phone", "ipod", "hdmi cable")


// AJAX CALL FUNCTIONS FOR APIs BELOW
// ================================================================================================== //
  function walmart(product){

    var queryURL = "https://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + product;

console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
      crossDomain: true,
      dataType: 'jsonp'
    })
    .done(function(response) {
      var results = response.items;

      for (var i = 0; i < 2; i++){

        var item = {
          name: results[i].name,
          price: results[i].salePrice,
          mdImage: results[i].mediumImage,
          lgImage: results[i].largeImage,
          rating: results[i].customerRating
        };
      
        walmartItems.push(item);

      };

    });
  
  };
   
  function bestBuy(product){

    var queryURL = "https://api.bestbuy.com/v1/products((search=" + product + ")&customerReviewAverage=4.8&(categoryPath.id=abcat0101000))?apiKey=sdauhdkcw3m5f8rm3mdrqk9g&facet=onSale&pageSize=2&format=json";

console.log(queryURL);

    $.ajax({
      url: queryURL,
      method: 'GET',
      cache: true,
      crossDomain: true,
      dataType: 'jsonp'
    })
    .done(function(response) {
        var results = response.products;

              for (var i = 0; i < 2; i++){

        var item = {
          name: results[i].name,
          price: results[i].salePrice,
          mdImage: results[i].mediumImage,
          lgImage: results[i].largeImage,
          rating: results[i].customerRating
        };
      
        bestBuyItems.push(item);
        console.log(bestBuyItems);

      };                
      console.log(walmartItems);
      });
    
    };    

walmart("laptop");
bestBuy("tv");

// ================================================================================================== //

$('.carousel').carousel({
      interval: 6000
});


//ARRAY OF THE PRODUCTS THAT HAVE BEEN SEARCHED. THIS WILL BE USED FOR THE WISHLIST CONTENT.

//WHEN SUBMIT IS CLICKED, ADD INPUT TO THE PRODUCT ARRAY
//WHEN SUBMIT IS CLICKED, PRODUCT MODALS WILL APPEAR
$('#searchProduct').on('click', function(){
  $('#contentSection').removeClass('hidden');
  $('#contentSectionFeatured').addClass('hidden');
  $('#search').val("");

  //NOTE: Remove hidden class from logos when no store results are available
});





//BELOW SECTION FOR LOCAL STORAGE OF WISHLIST
// ================================================================================================== //
//View wishlist
$('#wishlist').on('click', function(){
  $('#wishListGrid').removeClass('hidden');
});


//Calls addItem function when Add Item button is clicked
  // $("#addItem").on("click", function(this){
  //      addItem(this);
  //      wishItemCount++
  // });

  // //Add Item to wishlist function
  //  function addItem(item){  
  //    var wishItem = item;
  //    wishArray.push(wishItem);
  //    localStorage.setItem("localWishlist", wishArray)
  //   };
//Delivers wishlist to DOM from Local Storage
  // console.log(localStorage.getItem("localWishlist"));
// ================================================================================================== //

//BELOW SECTION FOR REMOTE STORAGE OF WISHLIST
// ================================================================================================== //
// $("#saveList").on("click", function(){
//   database.ref().set({
//     wishlist: wishArray;
  
//   });

// });

// ================================================================================================== //

featuredProducts(category1, category2, category3 category4){
  var categories = [category1, category2, category3 category4];
    for (var i = 0; i <= categories.length; i++ ){
      walmartFeaturedSearch(i);
      bestbuyFeaturedSearch(i);
      searsFeaturedSearch(i);
      ebayFeaturedSearch(i);

    };
};


});//End jQuery











