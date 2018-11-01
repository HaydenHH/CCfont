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


	$('.poem').hide()
	$('.poemContent').hide()
	$('.poemTrans').hide()
		
	$('#open').click(function(){
		$('.poem').toggle(200)	
	});
	
	$('.poemShow').click(function(){
		$(this).parent().find('.poemContent').toggle(200)
		$(this).parent().find('.poemTrans').toggle(200)	
	});

	

}