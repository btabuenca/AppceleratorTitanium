app.view.ui.visual = {};

// Self invoking function
(function() {

	app.view.ui.getVisualWindow = function () {


		var winVisual = Titanium.UI.createWindow({
			className:'winVisual',
			title:'Fase visual',
			//backgroundImage:'./images/fase_visual.png',
			backgroundColor:'#ffffff',
			barColor:'#13386c'
		});
		
		var b = Titanium.UI.createButton({title:'Cómo hacerlo'});
		winVisual.rightNavButton = b;
		
b.addEventListener('click', function()
{
	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);

	var w = Titanium.UI.createWindow({
		backgroundColor:'#FF9999',
		borderWidth:8,
		borderColor:'#660066',
		height:400,
		width:300,
		borderRadius:10,
		opacity:0.92,
		transform:t
	});
	
		var helpLabel = Titanium.UI.createLabel({
			text:'a\nb/nc',
			left:35,
			right:35,
			color:'#660066',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			top:10,
			width:'auto',
			height:'auto'
		});
		
		var helpText = 'En la fase visual se valoran la limpidez, los matices de color,'; 
		helpText+= 'la presencia de gas carbónico y la fluidez del vino.\n Para realizar';
		helpText+= 'este examen visual cogemos la copa por la base, e inclinándola ligeramente,'; 
		helpText+= 'se sitúa a la altura de la cintura; observamos la superficie, el disco del ';
		helpText+= 'vino y el fondo. Debe mostrarse brillante, limpio, sin turbidez.\n En los ';
		helpText+= 'vinos blancos y rosados, se aprecia su limpidez, transparencia y brillo. ';
		helpText+= 'En tintos, un color intenso puede hacer que la transparencia se pierda. \n Después,'; 
		helpText+= 'llevando la copa a la altura de los ojos, valoraremos la intensidad y los';
		helpText+= ' matices del color del vino. La intensidad nos indica el cuerpo del vino, ';
		helpText+= 'los matices de color y su grado de evolución. ';
		
		helpLabel.text = helpText;
		
		w.add(helpLabel);	
			
	
	

	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	// when this animation completes, scale to normal size
	a.addEventListener('complete', function()
	{
		Titanium.API.info('here in complete');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		w.animate({transform:t2, duration:200});

	});

	// create a button to close window
	var b = Titanium.UI.createButton({
		title:'Listo',
		bottom:20,
		height:30,
		width:150
	});
	w.add(b);
	b.addEventListener('click', function()
	{
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
	});

	w.open(a);


});
		
		
		
		
		
		
		
		
		
				
		


		// Color
		var colorItems = new Array(1);
		colorItems[0]=new Array(9);
		//colorItems[1]=new Array(9);
		//colorItems[2]=new Array(9);
		
		// Vino Blanco		
		colorItems[0][0] = 'Incoloro';
		colorItems[0][1] = 'Amarillo verdoso';
		colorItems[0][2] = 'Amarillo limón';
		colorItems[0][3] = 'Amarillo paja';
		colorItems[0][4] = 'Amarillo dorado';
		colorItems[0][5] = 'Oro pálido';
		colorItems[0][6] = 'Dorado';
		colorItems[0][7] = 'Ámbar';
		colorItems[0][8] = 'Pardusco';

		// Aspecto
		var aspectoItems = new Array(2);
		aspectoItems[0]=new Array(7);
		aspectoItems[1]=new Array(7);
		
		// Vino Blanco		
		aspectoItems[0][0] = 'Cristalino';
		aspectoItems[1][0] = 'Perfecto en cuanto al aspecto. Brilla como el cristal.';
		aspectoItems[0][1] = 'Brillante';
		aspectoItems[1][1] = 'No contiene nada supendido ni precipitado. Al ser atravesado por la luz aparecen brillos.';
		aspectoItems[0][2] = 'Limpio';
		aspectoItems[1][2] = 'No contiene nada suspendido ni precipitado aunque no brilla.';
		aspectoItems[0][3] = 'Claro';
		aspectoItems[1][3] = 'Contiene un ligerísimo residuo en suspensión en un vino brillante, suele proceder del deterioro del corcho o restos de agentes filtrantes.';
		aspectoItems[0][4] = 'Opalescente';
		aspectoItems[1][4] = 'Velado, con reflejos irisados.';
		aspectoItems[0][5] = 'Ligeramente turbio';
		aspectoItems[1][5] = 'Contiene un precipitado que se aprecia con facilidad.';
		aspectoItems[0][6] = 'Turbio';
		aspectoItems[1][6] = 'Contiene un precipitado que se aprecia con facilidad.';




		
		// Color
		var colorLabel = Titanium.UI.createLabel({
			color:'#576996',
			font: {
				fontSize:16,
				fontWeight:'bold',
				fontFamily:'Arial'
			},
			text:'Color',
			top:10,
			left:30,
			width:'auto',
			height:'auto'
		});
		winVisual.add(colorLabel);
		
		var significadoLabelMin = Titanium.UI.createLabel({
			text:'Juventud',
			left:5,
			textAlign:'left',
			color:'#990099',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:12
			},
			top:35,
			width:'auto',
			height:'auto'
		});
		winVisual.add(significadoLabelMin);	

		var significadoLabelMax = Titanium.UI.createLabel({
			text:'Vejez',
			right:5,
			textAlign:'right',
			color:'#990099',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:12
			},
			top:35,
			width:'auto',
			height:'auto'
		});
		winVisual.add(significadoLabelMax);	

		var colorGradeLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			width:300,
			top:35,
			height:'auto'
		});
		
		var colorGradeSlider = Titanium.UI.createSlider({
			min:0,
			max:8,
			value:0,
			width:250,
			top:55,
			height:'auto'
		});
		colorGradeSlider.addEventListener('change',function(e)
		{
			var colorLevel = Math.round(e.value);
			colorGradeLabel.text = colorItems[0][colorLevel];
			
			if(colorLevel < 3){
				intensidadLabel.text = 'Intensidad: '+'Baja';				
			}else if (colorLevel > 6){
				intensidadLabel.text = 'Intensidad: '+'Alta';				
			}else{
				intensidadLabel.text = 'Intensidad: '+'Media';				
			}
			//myModel.setSlidercolorGrade(Math.round(e.value));
		});
		//myModel.setSlidercolorGrade(0);		
		
		winVisual.add(colorGradeLabel);
		winVisual.add(colorGradeSlider);
		
		var intensidadLabel = Titanium.UI.createLabel({
			text:'Intensidad:',
			left:35,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			top:80,
			width:300,
			height:'auto'
		});
		winVisual.add(intensidadLabel);	
		





		// Aspecto
		var aspectoLabel = Titanium.UI.createLabel({
			color:'#576996',
			font: {
				fontSize:16,
				fontWeight:'bold',
				fontFamily:'Arial'
			},
			text:'Aspecto',
			top:120,
			left:30,
			width:'auto',
			height:'auto'
		});
		winVisual.add(aspectoLabel);
		
		var aspectoGradeLabelMin = Titanium.UI.createLabel({
			text:'Limpio' ,
			left:5,
			color:'#990099',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:12
			},
			textAlign:'left',
			width:'auto',
			top:145,
			height:'auto'
		});
		winVisual.add(aspectoGradeLabelMin);
		
		var aspectoGradeLabelMax = Titanium.UI.createLabel({
			text:'Sucio' ,
			right:5,
			color:'#990099',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:12
			},
			textAlign:'right',
			width:'auto',
			top:145,
			height:'auto'
		});
		winVisual.add(aspectoGradeLabelMax);		
		
		
		var aspectoGradeLabel = Titanium.UI.createLabel({
			text:' ' ,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			textAlign:'center',
			width:300,
			top:145,
			height:'auto'
		});
		
		var aspectoGradeSlider = Titanium.UI.createSlider({
			min:0,
			max:6,
			value:0,
			width:250,
			top:165,
			height:'auto'
		});
		aspectoGradeSlider.addEventListener('change',function(e)
		{
			var aspectoLevel = Math.round(e.value);
			aspectoGradeLabel.text = aspectoItems[0][aspectoLevel];
			descLabel.text = 'Descripción: ' + aspectoItems[1][aspectoLevel];
			

		});


		
		var descLabel = Titanium.UI.createLabel({
			text:'Descripción:',
			left:35,
			right:35,
			color:'#000000',
			font:{
				fontFamily:'Helvetica Neue',
				fontSize:15
			},
			top:195,
			width:'auto',
			height:'auto'
		});
		winVisual.add(descLabel);	
		
		
		winVisual.add(aspectoGradeLabel);
		winVisual.add(aspectoGradeSlider);
		 
				
		// Button
		var sendButton = Titanium.UI.createButton({
			title:'Evaluar',
			top:320,
			height:30,
			width:150
		});
		sendButton.addEventListener('click', function(e) {
			
			//winVisual.close();
			myController.visualForward();


/*
			if (myController.isCorrectPassword(tf.value)){
				winVisual.close();
				myController.VisualForward();
			}else{
				var alertDialog = Titanium.UI.createAlertDialog({
					    title: 'CELSTEC clicker',
					    message: 'Incorrect password',
					    buttonNames: ['Try again','Dismiss']
				});
				alertDialog.show();				
				alertDialog.addEventListener('click', function(e) {					
					if(e.index == 1){
						// Dismissed
						winVisual.close();
						myController.startWindow();						
					}										
				});												
			}
*/			
		});
		winVisual.add(sendButton);


		
		

		return winVisual;
	}
})();