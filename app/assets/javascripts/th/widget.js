$(function(){
			
	$("#list-two").hide();	
	$("#list-three").hide();	
	$("#list-four").hide();

	$("#list-one-button").click(function(){
		$(".cat-list").slideUp(600);
		$("#list-one").slideDown(600);
	});
	
	$("#list-two-button").click(function(){
		$(".cat-list").slideUp(600);
		$("#list-two").slideDown(600);
	});	
	
	$("#list-three-button").click(function(){
		$(".cat-list").slideUp(600);
		$("#list-three").slideDown(600);
	});	
	
	$("#list-four-button").click(function(){
		$(".cat-list").slideUp(600);
		$("#list-four").slideDown(600);
	});
	
	$("#catNav li a").click(function() {
		$("#catNav li").removeClass("activeCatButton");
		$(this).parent().addClass("activeCatButton");
	});
});