var walmartProducts = [];
var bestbuyProducts = [];

$(document).ready(function(){

    $('[data-toggle="tooltip"]').tooltip;   


var searchResults = [];

$("#storeSortBtnList").empty();

$("body").on("click", "#searchProduct", function() {

        $("#landingCarousal").addClass("hidden");
        $("#searchResults").removeClass("hidden");

        var searchFor = $("#productSearch").val().trim();
        console.log("Value of P : " + searchFor);
        $("#productSearch").val("");

        // CALL WALMART API FOR BEST SELLER PRODUCTS
        var sortQueryURLWalmart = "http://api.walmartlabs.com/v1/search?apiKey=bs4qexhbfxu9xaee8f53bhyr&query=" + searchFor +"&sort=bestseller&responseGroup=full"

        $.ajax({
                url: sortQueryURLWalmart,
                method: 'GET',
                crossDomain: true,
                dataType: 'jsonp'
            })
            .done(function(response) {

                 var results = response.items;

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
                    var queryURLBB = "https://api.bestbuy.com/v1/products((search=" + searchFor + ")&customerReviewAverage=4.8&(categoryPath.id=abcat0101000))?apiKey=sdauhdkcw3m5f8rm3mdrqk9g&facet=onSale&pageSize=10&format=json";

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
                    return false;
    });

$(document).on('click', '.store', function(){

            console.log("Inside store click sort" + $(this).attr('data-store'));

            var store = $(this).attr('data-store');
            console.log(store);

            if (store == 'walmart'){

                $(".product").fadeOut(); 
                $(".product.walmart").fadeIn();

            }else if (store == 'bestbuy'){
                $(".product").fadeOut();
                $(".product.bestbuy").fadeIn();               
            }
            
        });

});
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

                    divInfo.append("<p class='salePrice'> $" + resultsArray[i].price + "</p>")                    
                    divInfo.append("<p> Reviews : " + reviewNum + "<br><span class='badge'>" + ratingVal + "</span></p>");  
                     

                    var buttonWishList = $("<button id='addItem'>");
                    buttonWishList.attr("type", "submit");
                    buttonWishList.attr("data-toggle", "tooltip");
                    buttonWishList.attr("title", "Add To Wishlist")
                    buttonWishList.addClass("addToWishlist");
                    var spanBtn = $("<i class='fa fa-plus-circle'>");
                    spanBtn.text("");
                    buttonWishList.addClass("btn btn-default");
                    buttonWishList.append(spanBtn);

                    var buttonRemove = $("<button>");
                    buttonRemove.attr("type", "submit");
                    buttonRemove.attr("data-toggle", "tooltip");
                    buttonRemove.attr("title", "Remove Item From Search displayResults")
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
                console.log("FOR WALMART PRODUCT TITLE" + walmartProducts[slideCount].name);
                var shortItemName = jQuery.trim(walmartProducts[slideCount].name).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";

                var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>" + shortItemName + "</h4>");
            }else if(i==1){
                console.log("FOR BESTBUY PRODUCT TITLE" + bestbuyProducts[slideCount].name);
                 var shortItemName = jQuery.trim(bestbuyProducts[slideCount].name).substring(0, 40).split(" ").slice(0, -1).join(" ") + "...";
                var panelHeadingItem = $("<div class='panel-heading'>").html("<h4>" + shortItemName + "</h4>");

            }

            panelItem.append(panelHeadingItem);

            var panelBodyItem = $("<div class='panel-body'>");

            panelItem.append(panelBodyItem);

            var panelFooterItem = $("<div class='panel-footer'>").html("<h4>Panel Footer Goes Here</h4)");

            panelItem.append(panelFooterItem);

            colItem.append(panelItem);
            
            divItem.append(colItem);
        }
    //=================This block repeats for number of stores==========================================

        divCarousalInner.append(divItem);
    }
    

    divCarousal.append(divCarousalInner);









    // for (var i = 0; i<3; i++) {
    //     Things[i]
    // }







    $("#testCarousal").append(divCarousal);

}



// Pseudo Code
// Onpageload:
// Create API functions for calling each api (with Fixed Query Decided by us)
// Data response is used to populate the carousal at landing 
// get response for api and save the results in format 
// StoreArray[
//     items{
//         name:
//         price:
//         customerRating:
//         storeLogo:
//         numberReviews:
//         imageURLSmall:
//         imageURLLarge:
//         shortdescription:
//         storeURL:
//     }]
//  once we have all the arrays ready with product information next step is to populate 
//  each div block with first item from array for respective store
// For $ block Carousal 
// identify properties container by #ID 
// Populate first slide of carousal with item one from array 














