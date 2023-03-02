$('.songcell').click((e)=>{
	var currentId = $(e.currentTarget).attr('id');
	console.log(currentId);
	$(`#${currentId}-detail`).css("opacity", "1").css("visibility", "visible");
	
})

$('.song-detail').click(function(e){
	var showedId = $(e.currentTarget).attr('id');
	console.log(showedId);
	$(`#${showedId}`).css("opacity", "0").css("visibility", "hidden");
})