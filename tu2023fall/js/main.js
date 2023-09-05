var easterfactor = 0;
var boom = '../pages/easter.html';
var kapay = "https://qr.kakaopay.com/281006011123554622002048";

$('.songcell').click((e)=>{
	var currentId = $(e.currentTarget).attr('id');
    // $('.main-container').css('opacity', '0.8');
	console.log(currentId);
    console.log("opened")
	$(`#${currentId}-detail`).css('opacity', '1').css("visibility", "visible");
    
	
})

$('.song-detail').click(function(e){
	var showedId = $(e.currentTarget).attr('id');
    // $('.main-container').css('opacity', '1');
	console.log(showedId);
    console.log("closed")
	$(`#${showedId}`).css('opacity', '0').css("visibility", "hidden");
})

$('.poster').click((e)=>{
	$('.infobox').fadeIn(300);
})

$('.infobox').click((e)=>{
	$('.infobox').fadeOut(300);
})

$('.navbar-cont').click(()=>{
	easterfactor = easterfactor + 1;
	if(easterfactor > 5) {
		window.alert("%#$!KO!$$!#?#??GA??*!@L!!");
		location.href = boom;
		
	}
})

$('.navlist-item').click(()=> {
    $('.nav-extend').slideToggle('0.4');
})

$('.nav-donate').click(()=>{
    window.alert("뚜라미에 도움 주셔서 매우 감사드립니다 :) 확인을 누르시면 카카오페이 송금으로 이동합니다.");
    location.href = kapay;
})