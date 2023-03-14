var easterfactor = 0;
var boom = '../pages/easter.html';
var kapay = "https://qr.kakaopay.com/281006011123554622002048";

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

$('.nav-donate').click(()=>{
    window.alert("저희 뚜라미에 도움 주셔서 감사합니다. 확인 버튼을 누르시면 카카오페이 송금으로 이동합니다.");
    location.href = kapay;
})