var easterfactor = 0;
var boom = './easter.html';
var kapay = "https://qr.kakaopay.com/Ej9DW5wgl";

var p1Ext = false;
var	p2Ext = false;

$('.songcell').click((e)=>{
	var currentId = $(e.currentTarget).attr('id');
    // $('.main-container').css('opacity', '0.8');
	console.log(currentId);
    console.log("opened")
	$(`#${currentId}-detail`).css('opacity', '1').css("visibility", "visible");
    
	
})

$('#part1-extend').click((e)=>{
	$('.cont-part1').toggleClass('cell-extend');
	$('.cont-part1 div').toggleClass('cell-extend-div');
	// $('.cont-part1 div').css({
	// 		'background-image'	: 'url("")',
	// 		'background-color'	: '#d9d9d9',
	// 		'height'			: '50px',
	// 		'width'				: '50vh',
	// 		'border-radius' 	: '0px',
	// 		'margin-left'		: '20px'
	// });
	$('.cont-part1 a').toggleClass('cell-extend-a');
	// $('.cont-part1 a').css({
	// 	'padding'			: '12px',
	// 	'height'			: '70%'
	// });
	$('.cont-part2').fadeToggle(20);
	$('.set-list-cont-head2').fadeToggle(20);
    
})

$('#part2-extend').click((e)=>{
	$('.cont-part2').toggleClass('cell-extend2');
	$('.set-list-cont-head2').toggleClass('cell-extend-head2');
	$('.cont-part2 div').toggleClass('cell-extend-div');
	// $('.cont-part1 div').css({
	// 		'background-image'	: 'url("")',
	// 		'background-color'	: '#d9d9d9',
	// 		'height'			: '50px',
	// 		'width'				: '50vh',
	// 		'border-radius' 	: '0px',
	// 		'margin-left'		: '20px'
	// });
	$('.cont-part2 a').toggleClass('cell-extend-a');
	// $('.cont-part1 a').css({
	// 	'padding'			: '12px',
	// 	'height'			: '70%'
	// });
	$('.cont-part1').fadeToggle(20);
	$('.set-list-cont-head1').fadeToggle(20);
    
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

// $('.sumin-easter').click(()=>{
//     console.log("easter detected");
//     window.alert("%#$!KO!$$!#?#??GA??*!@L!!");
//     location.href = boom;
		
// 	}
// )

$('.navlist-item').click(()=> {
    $('.nav-extend').slideToggle('0.4');
})

$('.nav-donate').click(()=>{
    window.alert("뚜라미에 도움 주셔서 매우 감사드립니다 :) 확인을 누르시면 카카오페이 송금으로 이동합니다.");
    location.href = kapay;
})