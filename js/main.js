// common script // 

function headerTransWhite() {
	$('#header a').css("color", "black");
	$('#title').css("background-image", "url('../files/title/titleBlack.png')");
	$('#header').css("background", "white").css("color", "black").css("opacity", "0.9")
	$('.list-item a').css("color", "black");
}

function headerTransBlack() {
	$('#header a').css("color", "white");
	$('#title').css("background-image", "url('../files/title/titleWhite.png')");
	$('#header').css("background", "transparent").css("color", "white").css("opacity", "1.0")
	$('.list-item a').css("color", "white");
}

$('#header').mouseenter(function(){
	headerTransWhite();
})

$('#header').mouseleave(function(){
	if (scrlActive == 1) {
		
	} else {
		headerTransBlack();
	}

})

var scrlActive = 0

window.addEventListener('scroll', function(){
	var scrlValue = window.scrollY;
	if (scrlValue > 500) {
		headerTransWhite();
		$('#header').css("border-bottom", "1px solid grey");
		scrlActive = 1;
	} else {
		headerTransBlack();
		$('#header').css("border-bottom", "0px solid transparent");
		scrlActive = 0;
	}
});


// members.html //


$('.members-cell').mouseenter((e)=>{
	// $(e.currentTarget).css("border-right", "10px solid grey").css("border-bottom", "10px solid grey");
	$(e.currentTarget).css("opacity", "1.0").css("filter", "contrast(120%)");
})

$('.members-cell').mouseleave((e)=>{
	//$(e.currentTarget).css("border-right", "10px solid white").css("border-bottom", "10px solid white");
	$(e.currentTarget).css("opacity", "0.9").css("filter", "contrast(100%)");
})

$('.members-cell').click((e)=>{
	var currentId = e.currentTarget.dataset.id;
	if (currentId == "blank") {
		
	} else {
		$('.right-container').css("opacity", "0").css("visibility", "hidden");
		$(`#${currentId}-detail`).css("opacity", "1").css("visibility", "visible");
	}
})


// gallery.html //

$('.year-select span').click(function(e){
	var currentGCELL = e.currentTarget.innerHTML;
	var currentGSPAN = e.currentTarget;
	$('.year-gallery').addClass('year-deslcted');
	$(`.year-${currentGCELL}`).removeClass('year-deslcted');
	$('.year-select span').removeClass('foc')
	$(currentGSPAN).addClass('foc')
})

var galleyshowActive = 0;

$('.year-each-cell').click(function(e){
	if (galleyshowActive == 1) {
		
	} else {
		console.log(e.currentTarget.dataset.showurl);
		galleyshowActive = 1;
		$('.gallery-cell-show img').attr("src", e.currentTarget.dataset.showurl);
		setTimeout(function(){
			$('.gallery-cell-show').removeClass('vhidden');
		}, 120)
	}
	
	
})

$('.gallery-cell-show img').click(function(){
	galleyshowActive = 0;
	$('.gallery-cell-show').addClass('vhidden');
})
