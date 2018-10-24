$(function(){
	var dicBank = document.createElement('script');
	dicBank.setAttribute('type','text/javascript');
	dicBank.setAttribute('src','js/word.js');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(dicBank);
	

	
	var toneBank = 
		[
			{
				"tone":['ā','ē','ō','ī','ū']	
			},
			{
				"tone":['á','é','ó','í','ú']
			},
			{
				"tone":['ǎ','ě','ǒ','ǐ','ǔ']
			},
			{
				"tone":['à','è','ò','ì','ù']
			},
			{
				"tone":['e','a']
			}

		]
	
	

	for(var poemIndex = 0, poemL = poemBank.length; poemIndex < poemL; poemIndex++){

		var pShow = $('<a class="poemShow" href="#">'+ poemBank[poemIndex].titles +'</a>'),
			pCont = $('<p class="poemContent">'+ poemBank[poemIndex].contents +'</p>'),
			pTran = $('<p class="poemTrans">'+ poemBank[poemIndex].translate +'</p>');

		var pLi = $('<li></li>').addClass('poem').append(pShow,pCont,pTran)
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




	$('button').click(function(){
		//$('body p').remove('p')
		$('body embed').remove()
		searchEveryWord()	
	})

	function renderTone(type,i){

		$('#tone').append($('<embed src="img/' + type + i + '.svg"></embed>').addClass(type).addClass(type + i))
	}

	function renderSymbol(type,i){

		$('#tone').append($('<embed src="img/' + type + '-' + i + '.svg"></embed>').addClass(type).addClass(type + i))
	}



	function searchEveryWord(){
		var giveWord =  $('textarea').val();
		var allType = new Array()
		for(var i=0, l = giveWord.length; i < l; i++){
		       		allType.push(giveWord.charAt(i))
		       }
		  

		for(var count = 0, allword = allType.length; count < allword; count++){
			console.log(allType[count] + '1')
			for (var bankIndex = 0, bank = wordBank.length; bankIndex < bank; bankIndex++){
			    if (wordBank[bankIndex].word == allType[count]) {

			       
			       var pinyinStr = new Array()
			       var pinyin = wordBank[bankIndex].pinyin;
			       var symbolIndex = wordBank[bankIndex].strokes;
			       console.log(symbolIndex + '2')
			       //console.log(pinyin)
			       if(wordBank[bankIndex].radicals == 'symbol'){
			       		renderSymbol('symbol', symbolIndex)
			       }
			       for(var i = 0, l = pinyin.length; i < l; i++){
			       		pinyinStr.push(pinyin.charAt(i))
			       		
			       }
			       console.log(pinyinStr)

			       

			       for(var toneG = 0, toneGl = toneBank.length; toneG < toneGl; toneG++){
			       		for(var toneIndex = 0, tonel = toneBank[toneG].tone.length; toneIndex < tonel; toneIndex++){
			       			for(var pin = 0, pinl = pinyinStr.length; pin < pinl; pin++){
			       				if(toneG < 4 && toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){
			       					// $('body').append($('<p>' + allType[count] + ':第' + [toneG + 1] + '声</p>'))
			       					renderTone('tone',[toneG + 1])
			       				}else if(toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){
			       					//$('body').append($('<p>' + allType[count] + ':轻声</p>'))
			       					renderTone('toneLite',1)
			       				}
			       			}
			       		}
			       }
			    }
			}
		} 
	}



})