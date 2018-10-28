var allType = new Array(),
		allStroke = new Array(),
		allTone = new Array(),
		allRadicals = new Array(),
		pointWord = new Array,
		allPoints = new Array()

var myObj = new Array()
	

var toneBank = 
		[
			{
				"tone":['e','a']
			},
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
			}
			

		]

function givePoint(count,strokes){
			//console.log(count,strokes)
			coor = new Array
			coor.length = 0
			for(var i = 0, l = strokes; i < l;i++){

				var x = count * 1,
					y = i * 1  ;
				
				coor.push([x,y])
				
			}//一个字符的点
			pointWord.push([coor])
		}


function searchEveryWord(){
	allType.length = 0
	pointWord.length = 0
	allPoints.length = 0
	allRadicals.length = 0
	allStroke.length = 0
	myObj.length = 0
	var s = Snap("#svg1");
		s.attr({
			width: '100%',
			height: '1000px'
		})

	var giveWord =  $('textarea').val().replace(/\s+/g,"，");
	
	for(var i=0, l = giveWord.length; i < l; i++){
	       		allType.push(giveWord.charAt(i))
	       }
	  

	for(var count = 0, allword = allType.length; count < allword; count++){
		//console.log(allType[count] + '1')
		for (var bankIndex = 0, bank = wordBank.length; bankIndex < bank; bankIndex++){
		    if (wordBank[bankIndex].word == allType[count]) {

		       
		       var pinyinStr = new Array()
		       pinyinStr.length = 0
		       var pinyin = wordBank[bankIndex].pinyin;
		       var symbolIndex = wordBank[bankIndex].strokes;

		         allStroke.push(wordBank[bankIndex].strokes);
		         allRadicals.push(wordBank[bankIndex].radicals)

		       //console.log(symbolIndex + '2')
		       //console.log(pinyin)
		       if(wordBank[bankIndex].radicals == 'symbol'){
		       		//renderSymbol('symbol', symbolIndex)
		       }
		       for(var i = 0, l = pinyin.length; i < l; i++){
		       		pinyinStr.push(pinyin.charAt(i))
		       		
		       }
		       
		       if(isNaN(pinyinStr)){
		       		for(var toneG = 0, toneGl = toneBank.length; toneG < toneGl; toneG++){
		       				for(var toneIndex = 0, tonel = toneBank[toneG].tone.length; toneIndex < tonel; toneIndex++){
		       					for(var pin = 0, pinl = pinyinStr.length; pin < pinl; pin++){
		       						if(toneG > 0 && toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){
		       							// $('body').append($('<p>' + allType[count] + ':第' + [toneG + 1] + '声</p>'))
		       							//renderTone('tone',[toneG + 1])
		       							allTone.push([toneG])
		       						}else if(toneBank[toneG].tone[toneIndex] == pinyinStr[pin]){
		       							//$('body').append($('<p>' + allType[count] + ':轻声</p>'))
		       							//renderTone('toneLite',1)
		       							allTone.push([toneG])
		       						}
		       					}
		       				}
		       				
		       		}//分析音调
		       }else{
		       		allTone.push('symbol')
		       }
		       

		 	

				console.log("字：" + allType[count] +"/笔画和音调:" + allStroke[count]+ "and" + allTone[count] + "/部首" + allRadicals[count])
				var thisStrokes = allStroke[count];
				var thisTone = allTone[count];
				var thisCount = [count + 1] 
				console.log("声调："+ thisTone)
				givePoint(thisCount,thisStrokes)//标点给赋予了值

				
				var userType = new Object()
				userType.getTone = thisTone;
				userType.getStro = thisStrokes;
				
				console.log("JSON:" + userType.getTone +  userType.getStro)
				
				myObj.push(userType)


				if(thisStrokes == 'com'){
				 	ymbol = s.rect(thisCount*30,50,10,10)
				}else{	
				 	var thisWord = pointWord[count] 
				 	//console.log(thisWord) 这个字的点列阵
				 	for(var ii = 0, ll = thisWord.length;ii<ll;ii++){
				 		var dot = thisWord[ii];
				 		for(var dotI = 0, dotL = dot.length; dotI < dotL;dotI++){
				 		var thisDot = dot[dotI],
				 				r = 5 ,
				 				x = thisDot[0] * 30,
				 				y = thisDot[1] * 40 + 2*r

				 				//console.log("X:" + thisDot[0] + ";Y:" + thisDot[1])
				 		dots = s.paper.circle(x,y,r)
				 			dots.attr({
				 				fill:'#333',
				 				class:'cir'
				 			})
				 		}//绘制每个点
				 	}//绘制每个字
				 			
				}		

				 
				 //这个字生成了点的坐标，根据笔画的数量 
				 console.log("输入的总数" + pointWord.length)   

			}
		}//每一个字

		
	}//检索数据库

console.log("JSON：" + myObj.length)
}//点击后的执行


window.onload = function(){

	

	var dicBank = document.createElement('script');
	dicBank.setAttribute('type','text/javascript');
	dicBank.setAttribute('src','js/word.js');
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(dicBank);
	

	
	
	
	

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
		$('svg').find('.cir').remove()
		
		searchEveryWord()
			
	})

	

	// function renderTone(type,i){

	// 	$('#tone').append($('<embed src="img/' + type + i + '.svg"></embed>').addClass(type).addClass(type + i))
	// }

	// function renderSymbol(type,i){

	// 	$('#tone').append($('<embed src="img/' + type + '-' + i + '.svg"></embed>').addClass(type).addClass(type + i))
	// }



	





}