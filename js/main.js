var easterfactor = 0;
var boom = '../pages/easter.html';

$('.songcell').click((e)=>{
	var currentId = $(e.currentTarget).attr('id');
	console.log(currentId);
	$(`#${currentId}-detail`).css('opacity', '1').css("visibility", "visible");
	
})

$('.song-detail').click(function(e){
	var showedId = $(e.currentTarget).attr('id');
	console.log(showedId);
	$(`#${showedId}`).css('opacity', '0').css("visibility", "hidden");
})

$('.poster').click((e)=>{
	$('.infobox').fadeIn(300);
})

$('.infobox').click((e)=>{
	$('.infobox').fadeOut(300);
})

$('.footer').click(()=>{
	easterfactor = easterfactor + 1;
	if(easterfactor > 2) {
		window.alert("%#$!KO!$$!#?#??GA??*!@L!!");
		location.href = boom;
		
	}
})

$('.navlist-item').click(()=> {
    $('.nav-extend').slideToggle('0.4');
})