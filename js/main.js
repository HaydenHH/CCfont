window.onload = function(){


	for(var poemIndex = 0, poemL = poemBank.length; poemIndex < poemL; poemIndex++){
		var pShow = $('<a class="poemShow" href="#">'+ poemBank[poemIndex].titles +'</a>'),
			pText = $('<p class="poemText">'+ poemBank[poemIndex].contents +'</p>'),
			pTran = $('<p class="poemTrans">'+ poemBank[poemIndex].translate +'</p>');
			pCont = $('<p class="poemContent"></p>');

		var pCon = pCont.append(pText,pTran)
		var pLi = $('<li></li>').addClass('poem').append(pShow,pCon)
		$('#getChinese ul').append(pLi)
	}


	//$('.poem').hide()
	$('.poemContent').hide()
	
		
	$('#open').click(function(){
		$('.poem').toggle(200)	
	});
	
	$('.poemShow').click(function(){
		$(this).parent().siblings().find('.poemContent').hide(300)
		$(this).parent().find('.poemContent').toggle(300)
		$(this).animate({top:0}, 500)


	});

	

}