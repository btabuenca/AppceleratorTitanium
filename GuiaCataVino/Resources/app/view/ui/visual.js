app.view.ui.visual = {};

// Self invoking function
(function() {

	app.view.ui.getVisualWindow = function () {
		
		var option = app.model.session.wine.id;
		
		Ti.API.debug("btabuenca. Selected option: "+option);


		var winVisual = Titanium.UI.createWindow({
			className:'winVisual',
			title:'Fase visual',
			//backgroundImage:'./images/fase_visual.png',
			backgroundColor:'#ffffff',
			barColor:'#13386c'
		});
		
		var b = Titanium.UI.createButton({title:'Evaluate'});
		winVisual.rightNavButton = b;
		
		b.addEventListener('click', function()
		{

			myController.visualForward();

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
		
		
		var fv1Image = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/docalatayud_128_128.png');
		var fv1ImageView = Titanium.UI.createImageView({
				image:fv1Image,
				left:5,
				width:100,
				height:100,
				top:250
		});	
		winVisual.add(fv1ImageView);					
		
		var fv2Image = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,'./images/fase_visual_200x200.png');
		var fv2ImageView = Titanium.UI.createImageView({
				image:fv2Image,
				left:110,
				width:100,
				height:100,
				top:250
		});	
		winVisual.add(fv2ImageView);					

		// 
		Ti.API.debug("btabuenca. afoto: "+collection[option][4]);
		var fv3Image = Ti.Filesystem.getFile(Titanium.Filesystem.resourcesDirectory,collection[option][2]);
		var fv3ImageView = Titanium.UI.createImageView({
				image:fv3Image,
				right:5,
				width:100,
				height:100,
				top:250
		});	
		winVisual.add(fv3ImageView);					
		
		
		 		

		return winVisual;
	}
})();