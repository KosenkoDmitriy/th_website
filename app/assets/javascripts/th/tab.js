// JavaScript Document
$(document).on('ready page:load page:change', function () {
	$(".tab_content ul li a").click(function() {
		$('.tab_content ul li a').removeClass();
		$(this).addClass('select');
		var index = $('.tab_content ul li a').index($(this));
		$('.tab_details > div').removeClass('active');
		$('.tab_details > div').filter(':eq(' + index + ')').addClass('active');
  	});
});

$(document).on('ready page:load page:change', function () {
	$(".banner_tab ul li a").click(function() {
		$('.banner_tab ul li a').removeClass();
		$(this).addClass('select');
		var index = $('.banner_tab ul li a').index($(this));
		$('.banner_content > div').hide();
		$('.banner_content > div').filter(':eq(' + index + ')').show();
  	});
});

$(document).on('ready page:load page:change', function () {
	$(".tab_content02 ul li a").click(function() {
		$('.tab_content02 ul li a').removeClass();
		$(this).addClass('select');
		var index = $('.tab_content02 ul li a').index($(this));
		$('.tab_details02 > div').hide();
		$('.tab_details02 > div').filter(':eq(' + index + ')').show();
  	});
});

$(document).on('ready page:load page:change', function () {
	$(".tab_content1 ul li a").click(function() {
		$('.tab_content1 ul li a').removeClass();
		$(this).addClass('select');
		var index = $('.tab_content1 ul li a').index($(this));
		$('.tab_details1 > div').hide();
		$('.tab_details1 > div').filter(':eq(' + index + ')').show();
  	});
});
