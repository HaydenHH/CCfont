window.onload = function(){

			// function begin(){
		// 	for(var i=0,l=200;i<l;i++){
		// 		strokeWeight(0);
		// 		colorMode(HSB);
		// 		x = dots[i].strokes * 20
		// 		y = dots[i].strokes * 20 
		// 		fill(360/200*i, 100/200*mouseY*10, mouseX*i/200);
				
		// 		rowC = 100
		// 		row = Math.floor(i/rowC)
		// 		space = 10
		// 		rect(i*space-row*rowC*space,row*space,10,10)
		// 	}
		// }

		

}

		var allType = new Array(),
		allStroke = new Array(),
		allTone = new Array(),
		allRadicals = new Array(),
		pointWord = new Array,
		allPoints = new Array()
		var myObj = new Array()
		var lines,pointS,pointE,dots,xS,yS,xE,yE
		var pinyinStr 
		var giveWord
		var dots;
		var obj,tonebase;
		var inp,btn,btn2,btn3
		var row,space,rowC
		var ch,cw

		

		function preload(){

			var obj = wordBank

			dots = obj

		}

		
		function setup(){
			ch = 1000
			cw = 1000
		  createCanvas(windowWidth*0.8,ch );
		  btn = createButton('Pause');
		  btn3 = createButton('Type&Draw');
		  btn.mousePressed(noLoop)
		  btn3.mousePressed(looop)
		  btn2 = createButton('Render');
		  btn2.mousePressed(begin)
		  //btn2.mousePressed(begin)
		  btn.position(10,10).addClass('Noprint')
		  btn3.position(10,30).addClass('Noprint')
		  btn2.position(10,50).addClass('Noprint')
		  inp = createInput('');
		  inp.addClass('inp');
		  inp.position(100,10).addClass('Noprint')
		  inp.style('width', '20%')
		  //inp.input(begin);
		  //button.mouseClicked(redraw)


		}

		function windowResized() {
		  resizeCanvas(windowWidth*0.8,ch);
		}

		function looop(){
			loop()
		}


		function draw(){
			colorMode(HSB)
		  	background(10)
		  	begin()
		}

		
		function begin(){
			
				allType.splice(0)
				allStroke.splice(0)
				allTone.splice(0)
				allRadicals.splice(0)
				pointWord.splice(0)
				allPoints.splice(0)
			myObj.splice(0)

			var giveWord =  inp.value().replace(/\s+/g,"，");

			for(var i=0, l = giveWord.length; i < l; i++){
	       		allType.push(giveWord.charAt(i))
	    	}

	    	for(var count = 0, allword = allType.length; count < allword; count++){
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
	       			

	       				if(isNaN(pinyinStr) == true){
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
	       					}
	       				}else{
	       					allTone.push('symbol')
	       				}

	       			


	       			var thisStrokes = allStroke[count];
					var thisTone = allTone[count];
					var thisCount = [count + 1] 
					
					//console.log(thisTone)
					givePoint(thisCount,thisStrokes,thisTone)//标点给赋予了值

					function givePoint(count,strokes,tone){
								
						coor = new Array
						coor.length = 0

						
						space = 150 //每个字的间距
						dotSpace = 50 //每个点的间距
						wordHeight = 10 //字的高度系数
						lineHeight = 130 //行距
						
						rowWord = 8  //每行的字数
						row = Math.floor(allStroke.length/rowWord)
						centreY = row*lineHeight + 400

						if(tone == 0){
							centreX = count*space-row*rowWord*space 
							centreY = centreY
						}else if(tone == 1){
							centreX = count*space-row*rowWord*space 
							centreY = centreY
						}else if(tone == 2){
							centreX = count*space-row*rowWord*space 
							centreY = centreY + 200
						}else if(tone == 3){
							centreX = count*space-row*rowWord*space 
							centreY = centreY - 100
						}else if(tone == 4){
							centreX = count*space-row*rowWord*space 
							centreY = centreY - 200
						}else if(tone == 'symbol'){
							centreX = count*space-row*rowWord*space-space
							centreY = centreY 
						}
						

						for(var centreX,centreY,t = tone, i = 0, l = strokes; i < l;i++){
							if(t == 0){
								rowPoint = 1 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint) + 1
								
								
								var x = centreX + [i-layoutRow*rowPoint]*dotSpace,
									y = centreY + layoutRow*dotSpace  
									
								coor.push({"x":x,"y":y,"t":t})
							}else if(t == 1){
								rowPoint = 4 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)
								
								var x = centreX + [i-layoutRow*rowPoint]*dotSpace*1.5,
									y = centreY + layoutRow*dotSpace  
									
								coor.push({"x":x,"y":y,"t":t})
							}else if(t == 2){
								rowPoint = 2 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)
								
								var x = centreX + [i-layoutRow*rowPoint]*dotSpace,
									y = centreY - layoutRow*dotSpace  
									
								coor.push({"x":x,"y":y,"t":t})
								
							}else if(t == 3){
								rowPoint = 3 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)
								
								var x = centreX + [i-layoutRow*rowPoint]*dotSpace,
									y = centreY 
									
								coor.push({"x":x,"y":y,"t":t})
								
							}else if(t == 4){
								rowPoint = 2 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)
								
								var x = centreX - [i-layoutRow*rowPoint]*dotSpace,
									y = centreY + layoutRow*dotSpace  
									
								coor.push({"x":x,"y":y,"t":t})
								
							}else if(t == 'symbol'){
								rowPoint = 1 //每行点的个数
								layoutRow =  Math.floor(i/rowPoint)
								
								var x = centreX - [i-layoutRow*rowPoint]*dotSpace,
									y = centreY + layoutRow*dotSpace  
									
								coor.push({"x":x,"y":y,"t":t})
								
							}
							
									
						}//一个字符的点
						pointWord.push([coor])
					}//绘点函数
				
					var userType = new Object()
					userType.getTone = thisTone;
					userType.getStro = thisStrokes;
				
					//console.log("JSON:" + userType.getTone + "Strokes:" +  userType.getStro)
				
					myObj.push(userType)


					}		

	       	}//每个输入的字
	       	
	   	}
			

	 connect()
	}//开始检索

	function connect(){

 	 		function makeline(x,y,x2,y2){
 	 		 	 	//var lines = line(x,y,x2,y2)
 	 		 	 	x3 = [x+x2]/2
 	 		 	 	x4 = x3
 	 		 	 	y3 = y 
 	 		 	 	y4 = y2
 	 		 	 	noFill();
 	 		 	 	colorMode(HSB)
 	 		 	 	colorX = abs(sin(x))
 	 		 	 	stroke(x/20,100,120)
 	 		 	 	bezier(x, y, x3, y3, x4, y4, x2, y2)

 	 		}
 	 		for(var index = 1, allBox = pointWord.length; index<allBox; index++){
 	 			pointS = pointWord.slice(index-1,index)
 	 			pointS = pointS[0]
 	 			pointS = pointS[0]
 	 			pointE = pointWord.slice(index,index+1)
 	 			pointE = pointE[0]
 	 			pointE = pointE[0]
 	 			for(var i = 0, dots = pointS.length; i<dots; i++){
 	 				xS = pointS[i].x
 	 				yS = pointS[i].y
 	 				for(var ii = 0, Edots = pointE.length; ii<Edots; ii++){
 	 					xE = pointE[ii].x
 	 					yE = pointE[ii].y

 	 					makeline(xS,yS,xE,yE)

 	 				}
 	 			}
 	 			
 	 		}
 	 	}//绘线函数

		
