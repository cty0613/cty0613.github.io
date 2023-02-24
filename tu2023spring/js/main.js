// common script // 

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

if (window.innerWidth < 420) {
    galleyshowActive = 1;
}

$('.year-each-cell').click(function(e){
	if (galleyshowActive == 1) {
		
	} else {
		console.log(e.currentTarget.dataset.showurl);
		galleyshowActive = 1;
		$('.gallery-cell-show img').attr("src", e.currentTarget.dataset.showurl);
		setTimeout(function(){
			$('.gallery-cell-show').removeClass('vhidden');
	
		}, 50)
	}
	
	
})

$('.gallery-cell-show img').click(function(){
	galleyshowActive = 0;
	setTimeout(function(){
		$('.gallery-cell-show img').attr("src", "../files/loading.svg");
	}, 300)
	$('.gallery-cell-show').addClass('vhidden')
	
})

// video.html //

$('.vid-cell').click((e)=>{
	$('.youtube-embd-warp iframe').attr("src", e.currentTarget.dataset.showurl);
	$('.youtube-embd-warp p').html(e.currentTarget.dataset.date)
	$('.youtube-embd-warp h2').html(e.currentTarget.dataset.title)
})

$('.vid-cell').mouseenter((e)=>{
	$(e.currentTarget).children().css("background-color", "rgba(0,0,0,0.9)")
})

$('.vid-cell').mouseleave((e)=>{
	$(e.currentTarget).children().css("background-color", "rgba(0,0,0,0.5)")
})


