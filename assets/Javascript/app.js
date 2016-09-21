$(document).ready(function(){

//ARRAY OF THE PRODUCTS THAT HAVE BEEN SEARCHED. THIS WILL BE USED FOR THE WISHLIST CONTENT.
var products = [];

	//WHEN SUBMIT IS CLICKED, ADD INPUT TO THE PRODUCT ARRAY
	//WHEN SUBMIT IS CLICKED, PRODUCT MODALS WILL APPEAR
	$('#submit').on('click', function(){
		$('.logo').addClass('hidden');
		$('.modal-content').removeClass('hidden');
		var searchedItems = $('#search').val().trim();
		products.push(searchedItems);
		$('#search').val("");

		console.log(products);
	});





















});//End jQuery











