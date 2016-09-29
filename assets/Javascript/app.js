// GLOBAL VARIABLES
// ================================================================================================== //
  var walmartItems = [];
  var bestBuyItems = [];
  var walmartProducts = [];
  var bestbuyProducts = [];
  var ebayItems = [];
  var searsItems = [];
  var wishItemCount = 0;
  var wishArray= [];
  var testProduct = "This is a test product";
  var testStoreArray = [];

// ================================================================================================== //

// AJAX CALL FUNCTIONS FOR APIs BELOW -- ON PRODUCT SEARCH

//possibilities for featured products

var searchResults = [];
var featuredCategories = ['computer', 'ipod', 'macbook', 'headphones'];

//loop through possible search categories to populate the features page
for (var i =0; i < featuredCategories.length; i++){

    var sortQueryURLWalmart = "http://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + [i] +"&sort=bestseller&responseGroup=full"

        $.ajax({
                url: sortQueryURLWalmart,
                method: 'GET',
                crossDomain: true,
                dataType: 'jsonp'
            })
            .done(function(response) {

                 var results = response.items;
                 console.log("Inside Walmart API CALL");

                  for (var i = 0; i < results.length; i++){

                        var item = {
                          name: results[i].name,
                          price: results[i].salePrice,
                          mdImage: results[i].mediumImage,
                          lgImage: results[i].largeImage,
                          rating: results[i].customerRating,
                          numReviews: results[i].numReviews,
                          storeName: "walmart"
                        };
                  
                        searchResults.push(item);
                        walmartProducts.push(item);
                    }
                            if($('#walmartSort').length )  
                            {
                                 console.log("Walmart Button Exist!!!");
                                 
                            }else{
                                // Then dynamicaly generates button store
                                var storeBtn = $("<button>") 
                                storeBtn.addClass("btn btn-default animated bounceInRight store"); // Added a class 
                                storeBtn.attr('id', "walmartSort");
                                storeBtn.attr('data-store', "walmart"); // Added a data-attribute
                                storeBtn.text("Walmart"); // Provided the initial button text
                                $('#storeSortBtnList').append(storeBtn); // Added the button to the HTML
                            }
    
                    // Call BESTBUY API INSIDE DONE OF WALMART...Simlarly call future api class one by one inside the done methods of call
                    var queryURLBB = "https://api.bestbuy.com/v1/products((search=" + [i] + ")&customerReviewAverage>=3.6&(categoryPath.id=abcat*))?apiKey=sdauhdkcw3m5f8rm3mdrqk9g&facet=onSale&pageSize=10&format=json";

                    $.ajax({
                          url: queryURLBB,
                          method: 'GET',
                          cache: true,
                          crossDomain: true,
                          dataType: 'jsonp'
                        })
                        .done(function(responseBB) {
                            var resultsBB = responseBB.products;
                            console.log("Inside BB API CALL");
                              

                            for (var i = 0; i < resultsBB.length; i++){

                            var item = {
                              name: resultsBB[i].name,
                              price: resultsBB[i].salePrice,
                              mdImage: resultsBB[i].mediumImage,
                              lgImage: resultsBB[i].largeImage,
                              rating: resultsBB[i].customerReviewAverage,
                              numReviews: resultsBB[i].customerReviewCount,
                              storeName: "bestbuy"
                            };
                          
                            searchResults.push(item);
                            bestbuyProducts.push(item);
                            
                          }  
                            //Check if button already exist and if doesnot exist then only create a new button
                           if($('#bestbuySort').length )  
                            {
                                 console.log("Best Buy Button Exist!!!");
                                 
                            }else{
                                // Then dynamicaly generates button store
                                var storeBtn = $("<button>") 
                                storeBtn.addClass("btn btn-default animated bounceInRight store"); // Added a class
                                storeBtn.attr("id", "bestbuySort");
                                storeBtn.attr('data-store', "bestbuy"); // Added a data-attribute
                                storeBtn.text("Best Buy"); // Provided the initial button text
                                $('#storeSortBtnList').append(storeBtn); // Added the button to the HTML
                            }                        

                           displayResults(searchResults);   
                           carousalDisplay();        
                        });

                         
            });
                    //return false;


}//End for loop

// ================================================================================================== //

//APPEND AJAX CALL TO THE PANELS


function displayResults(resultsArray){

                for (var i = 0; i < resultsArray.length; i++) {

                    //Get Item Values
                        //Get Item Name
                        var nameItem = resultsArray[i].name;
                        //make shorttext of the name
                        var shortnameItem = jQuery.trim(nameItem).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";
                        //Get Number of reviews
                        var reviewNum = resultsArray[i].numReviews;                         
                        if (typeof reviewNum === "undefined") {
                                reviewNum = "None" ;
                            }

                        //Get Image source url
                        var imageSrc = resultsArray[i].mdImage;
                        if(typeof imageSrc === "undefined"){
                            imageSrc = "http://placehold.it/180x180";
                        }

                        //Get Customer Rating
                        var ratingVal = resultsArray[i].rating;
                         if(typeof ratingVal === "undefined"){
                            ratingVal = ""
                         }                      

                    
                    //Make outer div 
                    var containerDiv = $("<div class='col-xs-12 col-sm-6 col-md-4 animated zoomIn product'>");
                    containerDiv.addClass(resultsArray[i].storeName);
                    
                    //make  inner div
                    var divItem = $("<div class='col-xs-12 well item'>");
                    

                    //add row for title
                    var rowTitleDiv = $("<div class='row'>");
                    

                    var divTitle = $('<div class="col-xs-12 titleProduct">').html("<p>" + shortnameItem + "</p>");
                    // append div to rowTitleDiv and append rowTitleDiv to divItem
                    rowTitleDiv.append(divTitle);
                    divItem.append(rowTitleDiv);


                    //Add row to hold image and productinfo
                    var rowProductDiv = $("<div class='row'>");
                    var colproductDiv = $("<div class='col-xs-12'>");
                    
                    //Add column to hold image
                    var divImage = $("<div class='col-xs-6'>");    

                    var itemImage = $('<img>');
                    itemImage.attr('src', imageSrc);
                    itemImage.addClass("img-responsive img-rounded");  
                    itemImage.addClass("itemImage");
                    divImage.append(itemImage);
                    colproductDiv.append(divImage);    
                    

                    //Add info section to product

                    var divInfo = $("<div class='col-xs-6'>");                

                    divInfo.append("<p class='salePrice'> $" + resultsArray[i].price + "</p>");                    
                    divInfo.append("<p class='reviews'> Reviews : " + reviewNum + "<br><span class='badge'>" + ratingVal + "</span></p>");  
                     

                    var buttonWishList = $("<button id='addItem'>");
                    buttonWishList.attr("type", "submit");
                    buttonWishList.attr("data-toggle", "tooltip");
                    buttonWishList.attr("title", "Add To Wishlist");
                    buttonWishList.addClass("addToWishlist");
                    var spanBtn = $("<i class='fa fa-plus-circle'>");
                    spanBtn.text("");
                    buttonWishList.addClass("btn btn-default");
                    buttonWishList.append(spanBtn);

                    var buttonRemove = $("<button>");
                    buttonRemove.attr("type", "submit");
                    buttonRemove.attr("data-toggle", "tooltip");
                    buttonRemove.attr("title", "Remove Item From Search displayResults");
                    buttonRemove.addClass("removeItem");
                    var spanRBtn = $("<i class='fa fa-minus-circle'>");
                    spanRBtn.text("");
                    buttonRemove.addClass("btn btn-default");
                    buttonRemove.append(spanRBtn);

                    divInfo.append(buttonWishList);
                    divInfo.append(buttonRemove);
                    colproductDiv.append(divInfo);

                    rowProductDiv.append(colproductDiv); 
                    divItem.append(rowProductDiv);                      
                    
                    containerDiv.prepend(divItem);
                    $('#productList').prepend(containerDiv);
                }

}

// ================================================================================================== //

function carousalDisplay(){
    console.log(walmartProducts);
    console.log(bestbuyProducts);

    var numSlides = walmartProducts.length;
    console.log(numSlides);

    //Create carousal div
    var divCarousal = $("<div id='myCarousel' class='carousel slide' data-ride='carousel'>");
    // Indicators ol list
    var olDiv = $("<ol class='carousel-indicators'>");

    for (var i = 0; i < numSlides; i++) {        
        var liSlide = $("<li data-target='#myCarousel' data-slide-to='" + i + "' class='active'></li>");
        olDiv.append(liSlide);
    }

    divCarousal.append(olDiv);

    var divCarousalInner = $("<div class='carousel-inner'>");

    for (var slideCount = 0; slideCount < numSlides; slideCount++) {      
    
        var divItem = $("<div class='item'>");
        //=========Create active item for the first slide
         if(slideCount==0){
            divItem.addClass("active");
         }
         //=====================This block of code repeats for number of stores================
        for (var i = 0; i < 2; i++) {          

            var colItem =$("<div class='col-xs-12 col-sm-6'>");

            var panelItem = $("<div class='panel panel-default'>");

            var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>Panel Heading Title Here</h4>");

            

            if(i==0){
                
                var shortItemName = jQuery.trim(walmartProducts[slideCount].name).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";
                var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>" + shortItemName + "</h4>");
            }else if(i==1){
                
                 var shortItemName = jQuery.trim(bestbuyProducts[slideCount].name).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";
                var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>" + shortItemName + "</h4>");

            }

            panelItem.append(panelHeadingItem);

            var panelBodyItem = $("<div class='panel-body'>");

            var bodyRow = $("<div class='row'>");
            var bodyCol = $("<div class='col-sm-12'>");

            if(i==0){
                console.log("FOR WALMART PRODUCT Image");
                var panelBodyImageCol = $("<div class='col-xs-6 product-image'>").html("<img src='" + walmartProducts[slideCount].mdImage + "' class='img-responsive'>");
                bodyCol.append(panelBodyImageCol);
            }else if(i==1){
                console.log("FOR BESTBUY PRODUCT Image");
                var panelBodyImageCol = $("<div class='col-xs-6 product-image'>").html("<img src='" + bestbuyProducts[slideCount].lgImage + "' class='img-responsive'>");
                bodyCol.append(panelBodyImageCol);
            }

            //Product Information column here
            if(i==0){
                console.log("FOR WALMART PRODUCT Info");
                var panelBodyInfoCol = $("<div class='col-xs-6 product-info'>");
                panelBodyInfoCol.append("<p class='salePrice'> $" + walmartProducts[slideCount].price + "</p>");
                panelBodyInfoCol.append("<p class='reviews'> Reviews : " + "Num Of Reviews" + "<br><span class='badge'>" + walmartProducts[slideCount].rating + "</span></p>");
               
                var buttonWishList = $("<button>");
                    buttonWishList.attr("type", "submit");
                    buttonWishList.attr("data-toggle", "tooltip");
                    buttonWishList.attr("title", "Add To Wishlist");
                    buttonWishList.addClass("btn btn-default");
                    buttonWishList.addClass("addToWishlist");
                    var spanBtn = $("<i class='fa fa-plus-circle'>");
                    spanBtn.text("Add to Wishlist");
                    buttonWishList.append(spanBtn);

                    panelBodyInfoCol.append(buttonWishList);
                bodyCol.append(panelBodyInfoCol);

                    

            }else if(i==1){
                console.log("FOR BESTBUY PRODUCT Info");
                 var panelBodyInfoCol = $("<div class='col-xs-6 product-info'>");
                panelBodyInfoCol.append("<p class='salePrice'> $" + bestbuyProducts[slideCount].price + "</p>");
                panelBodyInfoCol.append("<p class='reviews'> Reviews : " + "Num Of Reviews" + "<br><span class='badge'>" + bestbuyProducts[slideCount].rating + "</span></p>");
                 
                 var buttonWishList = $("<button>");
                    buttonWishList.attr("type", "submit");
                    buttonWishList.attr("data-toggle", "tooltip");
                    buttonWishList.attr("title", "Add To Wishlist");
                    buttonWishList.addClass("btn btn-default");
                    buttonWishList.addClass("addToWishlist");
                    var spanBtn = $("<i class='fa fa-plus-circle'>");
                    spanBtn.text("Add to Wishlist");
                    buttonWishList.append(spanBtn);

                    panelBodyInfoCol.append(buttonWishList);
                bodyCol.append(panelBodyInfoCol);
            }



            bodyRow.append(bodyCol);
            panelBodyItem.append(bodyRow);

            panelItem.append(panelBodyItem);

            var panelFooterItem = $("<div class='panel-footer'>");

            var footerRow = $("<div class='row'>");
            var footerCol = $("<div class='col-xs-3 col-xs-offset-9'>");

            if(i==0){
                footerCol.append("<img src='assets/images/Walmart_icon.png' class='img-responsive img-logo-panel-heading icon'>");
                footerRow.append(footerCol);
            }else if(i==1){
                footerCol.append("<img src='assets/images/BB_Icon.png' class='img-responsive img-logo-panel-heading icon'>");
                footerRow.append(footerCol);
            }

            panelFooterItem.append(footerRow);

            panelItem.append(panelFooterItem);

            colItem.append(panelItem);
            
            divItem.append(colItem);
        }
    //=================This block repeats for number of stores==========================================

        divCarousalInner.append(divItem);
    }
    

    divCarousal.append(divCarousalInner);

    var carousalNavPrev = $("<a class='left carousel-control' href='#myCarousel' role='button' data-slide='prev'>");
    carousalNavPrev.append("<span class='glyphicon glyphicon-chevron-left' aria-hidden='true'>");
    carousalNavPrev.append("<span class='sr-only'>Previous</span>");

    divCarousal.append(carousalNavPrev);

    var carousalNavNext = $("<a class='right carousel-control' href='#myCarousel' role='button' data-slide='next'>");
    carousalNavNext.append("<span class='glyphicon glyphicon-chevron-right' aria-hidden='true'></span>");
    carousalNavNext.append("<span class='sr-only'>Next</span>");

    divCarousal.append(carousalNavNext);

    $("#contentSectionFeatured").append(divCarousal);

}

// ================================================================================================== //

//Calls addItem function when Add Item button is clicked
  $(".addItem").on("click", function(){
    addItem(this);
      wishItemCount++
  });

  //Add Item to wishlist function
  function addItem(item){ 
    var index = $(item).data("index");
    var store = $(item).data("storename");

    //This one is for Search array
    if (store === "walmart"){
       var storeArray = testStoreArray;
    }

    //This one is for Carousel array
    else if (store === "walmart"){
      var storeArray = walmartItems;
    }

    //This one is for Search array
    else if (store === "bestbuy"){
      var storeArray = bestBuyProduct;
    }

    //This one is for Carousel array
    else if (store === "bestbuy"){
      var storeArray = bestBuyItems;
    }

    //Items added to wishlist go to wishArray and are stored in localStorage.
    var wishItem = storeArray[index];
    wishArray.push(wishItem);
    localStorage.setItem("localWishlist", wishArray)

  };

//Delivers wishlist to DOM from Local Storage
  console.log(localStorage.getItem("localWishlist"));

// ================================================================================================== //

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

// ================================================================================================== //

//BELOW SECTION FOR REMOTE STORAGE OF WISHLIST
// ================================================================================================== //
$("#saveList").on("click", function(){

  var wishArray = localStorage.getItem("localWishlist");
  
  database.ref().push({
  wishlist: wishArray
  });

});

// ================================================================================================== //



});//End jQuery











