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
  var testStoreArray = [];

// ================================================================================================== //



// ================================================================================================== //

// AJAX CALL FUNCTIONS FOR APIs BELOW -- ON PRODUCT SEARCH

//Walmart featured products

function walmart(){

<<<<<<< HEAD
//console.log(queryURL);
=======
    var walmartQueryURL = "http://api.walmartlabs.com/v1/trends?format=json&apiKey=bs4qexhbfxu9xaee8f53bhyr"
console.log(walmartQueryURL);
>>>>>>> e9f8022a412cb63b9527281e5fec2129f688b35d

    $.ajax({
      url: walmartQueryURL,
      method: 'GET',
      crossDomain: true,
      dataType: 'json',
    })
    .done(function(response) {
      var results = response.items;

      for (var i = 0; i < 4; i++){

        var item = {
          name: results[i].items.name,
          price: results[i].items.salePrice,
          mdImage: results[i].items.mediumImage,
          lgImage: results[i].items.largeImage,
          rating: results[i].items.customerRating
        };
      
        walmartItems.push(item);

      }

    });
  
  };

  walmart();


console.log(queryURL);

  //Best Buy featured products

  function bestbuy() {
    var bestbuyQueryURL = "http://api.bestbuy.com/beta/products/trendingViewed(categoryId=abcat0400000)?apiKey=sdauhdkcw3m5f8rm3mdrqk9g";
    console.log(bestbuyQueryURL);

    $.ajax({
      url: bestbuyQueryURL,
      dataType: 'jsonp',
      jsonpCallback: 'callback',
      method: 'GET',
      crossDomain: true,    
    })
    .done(function(response) {
      var results = response.results;

      for (var i = 0; i < 4; i++){

        var item = {
          name: results[i].names.title,
          price: results[i].prices.current,
          mdImage: results[i].images.standard,
          rating: results[i].customerReviews.averageScore
        };
      
        bestBuyItems.push(item);

      console.log(bestBuyItems);

      };                
      console.log(walmartItems);
      });
    
    };    

      };

    });

  }
  

  bestbuy();



  console.log(bestBuyItems);
  console.log(walmartItems);



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

var indexCount = 0;

var testItem = {
  name: "Test Item",
  price: 300,
};

var testItem1 = {
  name: "Test Item One",
  price: 600,
};

var testItem2 = {
  name: "Test Item Two",
  price: 900,
};

testStoreArray.push(testItem);
testStoreArray.push(testItem1);
testStoreArray.push(testItem2);
console.log(testStoreArray);

for (var i = 0; i < testStoreArray.length; i++){
  var iname = testStoreArray[i].name;
  console.log(iname);
  var itemName = $("<p>" + iname + "</p>")

  var iprice = testStoreArray[i].price;
  console.log(iprice);
  var itemPrice = $("<p>" + iprice + "</p>")
  
  var button = $("<button>");
  button.html("Add to Wishlist");
  button.addClass("addItem btn btn-primary");
  button.attr("data-index", indexCount)

  var itemDiv = $("<div>");
  itemDiv.append(button);
  itemDiv.append(itemName);
  itemDiv.append(itemPrice);
  $("#wishListItems").append(itemDiv);

  indexCount++;
}

//Calls addItem function when Add Item button is clicked
  $(".addItem").on("click", function(){
    addItem(this);
      wishItemCount++
  });

  //Add Item to wishlist function
  function addItem(item){ 
    var index = $(item).data("index");
    console.log(index);
    var wishItem = "psh";
    wishArray.push(wishItem);
    localStorage.setItem("localWishlist", wishArray)
  };

//Delivers wishlist to DOM from Local Storage
  console.log(localStorage.getItem("localWishlist"));




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



});//End jQuery











