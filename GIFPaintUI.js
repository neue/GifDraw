$(document).ready(function() {
    
// Text Select cursor fix
    var canvas = document.getElementById('drawcanvas');
    canvas.onselectstart = function () { return false; } // ie
    canvas.onmousedown = function () { return false; } // mozilla
        
	$('#drawcanvas').mouseover(function() {	canvas.focus();	});
	$('#drawcanvas').mouseout(function()  {	canvas.blur();	});

//     
//  Tools 
// 
    
    $('#framenumber').bind('change', function(event) {
        window.pjsin.gotoFrame($("#framenumber").val());
    });
    
    $('label[for="size"]').text("Size "+$('#size').val());
    $('#size').bind('mouseup', function(event) { window.pjsin.setStrokeWeight($('#size').val()); });
    $('#size').bind('change', function(event) {
        // window.pjsin.setStrokeWeight($('#size').val());
        $('label[for="size"]').text("Size "+$('#size').val());
    });
	
    $('#onionSkin').bind('change', function(event) {
        window.pjsin.setOnionSkin($('#onionSkin').is(":checked"));
    });
    $('#tracing').bind('change', function(event) {
        window.pjsin.setTracing($('#tracing').is(":checked"));
        if ($('#tracing').is(":checked") == true) {
            $("#tracingOpacity").removeAttr('disabled');        
        } else {
            $("#tracingOpacity").attr('disabled', 'disabled');
        };
    });

    $('#tracingOpacity').bind('change', function(event) {
        window.pjsin.setTracingOpacity($("#tracingOpacity").val());
    });
    
    // Colour
    
    $('#leftColour').miniColors({
        change: function(hex, rgb) {
            window.leftColour[0] = rgb.r;
            window.leftColour[1] = rgb.g;
            window.leftColour[2] = rgb.b;
            // window.pjsin.setStrokeColour(rgb.r,rgb.g,rgb.b);
            window.pjsin.setStrokeWeight($('#size').val());
        }
    });
    
    $('#rightColour').miniColors({
        change: function(hex, rgb) {
            window.rightColour[0] = rgb.r;
            window.rightColour[1] = rgb.g;
            window.rightColour[2] = rgb.b;
            window.pjsin.setStrokeWeight($('#size').val());
        }
    });

	// Tool Selection
	
	$('#tool_paint').click(function() { 
		window.pjsin.setTool(0); 
		$('#drawcanvas').attr('class','paint');
	});
	$('#tool_fill').click(function()  { 
		window.pjsin.setTool(1); 
		$('#drawcanvas').attr('class','fill');
	});
	$('#tool_ink').click(function()   { 
		window.pjsin.setTool(2); 
		$('#drawcanvas').attr('class','inkdropper');
	});
    
    
//
//  Documents
//
    
	

    // $('#newgif').bind('click', function(event) {
    //     var numberOfFrames = prompt("How many frames should this AWESOME gif have?",window.totalFramesForEncoder);
    //     if (numberOfFrames) {
    //         window.pjsin.init(parseInt(numberOfFrames));
    //     };
    // });
    
    $('#addFrame').bind('click', function(event) {
       window.pjsin.addFrame();        
    });

    $('#delFrame').bind('click', function(event) {
       window.pjsin.removeFrame();
    });

    $('#copy').bind('click', function(event) {
       window.pjsin.clipboardCopy();
    });

    $('#paste').bind('click', function(event) {
       window.pjsin.clipboardPaste();       
    });

    $('#undo').bind('click', function(event) {
       window.pjsin.retrieveUndoState();
    });

//
//	New GIF Modal
//

    $('#showModal').bind('click', function(event) {
       	$('#newGifModal').addClass('in ');
		// console.log(window.pjsin.externals.sketch.options.globalKeyEvents);
		// window.pjsin.externals.sketch.options.globalKeyEvents = true;
		// console.log(window.pjsin.externals.sketch.options.globalKeyEvents);
    });

	$('#closeModal').click(function() {
		$('#newGifModal').removeClass('in');
	});
	
	$('#initNewGif').click(function() {
		window.pjsin.init(
			parseInt($('#newGifWidth').val()),
			parseInt($('#newGifHeight').val()),
			parseInt($('#newGifFrames').val())
		);
		$('#newGifModal').removeClass('in');
		
	});
	
//
//  Play Controls
//
	
	if ( !window.requestAnimationFrame ) {
    	window.requestAnimationFrame = ( function() {
    		return window.webkitRequestAnimationFrame ||
    		window.mozRequestAnimationFrame ||
    		window.oRequestAnimationFrame ||
    		window.msRequestAnimationFrame ||
    		function(callback, element ) {
    			window.setTimeout( callback, 1000 / 60 );
    		};

    	} )();

    }
    
    var playing = false;
    var fps = 15;
    var playingTimer;
    $('#playpause').click(function() {
        if (playing) {
            console.log("Stopping");
            clearTimeout(playingTimer);
            playing = false;
        } else {
            console.log("Playing");
            setTimeout(function() {
                requestAnimationFrame(playGif);
                // Drawing code goes here
            }, 1000 / fps);
            playing = true;
        };
    });
    function playGif(){
        window.pjsin.nextFrame();
    }
	

//
//	Importer
//
	
	var opts = {
	    dragClass: "drag",
	    accept: false,
        readAsDefault: 'Text',
        readAsMap: {
            'image/gi*': 'BinaryString',
            'text/*' : 'Text'
        },
	    on: {
	        load: function(e, file) {
	            if (file.type.match(/gif/)) {
	                console.log("GIF!");
                    console.log(file.name);
                    console.log(file.type);
    				importGIF(e.target.result);
    			} else {
    				console.log("NOT A GIF!");
                    console.log(file.name);
                    console.log(file.type);
        			window.pjsin.importImg(e.target.result);
    			};
	    	},
	        error: function(e, file) {
	    	},
	        loadend: function(e, file) {
	    	},
	        abort: function(e, file) {
	    	},
	        skip: function(e, file) {
	    	},
	        groupstart: function(group) {
	    	},
	        groupend: function(group) {
	    	}
	    }
	};
	$("#drawcanvas").fileReaderJS(opts);
	$("body").fileClipboard(opts);
	
	function importGIF(gifBytes){
    	console.log("Attempting Import");
    	var gifImporter = new SuperGif();
    	gifImporter.load(null,gifBytes);
    };
    

    
//
//  Encoder
//


    // var encoder = new GIFEncoder();
    // encoder.setRepeat(0);
    // encoder.setDelay(100); 
    // encoder.setQuality(10);
    // var context = canvas.getContext('2d');
   
	 // m    m m    m m     mmmmmmm mmmmm    mmm   mmmm  mmmmm  mmmmmm
	 // ##  ## #    # #        #      #    m"   " m"  "m #   "# #     
	 // # ## # #    # #        #      #    #      #    # #mmmm" #mmmmm
	 // # "" # #    # #        #      #    #      #    # #   "m #     
	 // #    # "mmmm" #mmmmm   #    mm#mm   "mmm"  #mm#  #    " #mmmmm
	 // GIF RENDERING

    $('#encode').bind('click', function(event) {
        console.log("ENCODING MOTHERFUCKER");

		frameDataArray = new Array();
		for (var i=0; i < window.totalFramesForEncoder; i++) {
			window.pjsin.switchFrame(i);
			frameDataArray.push(canvas.toDataURL());
			console.log("Adding Frame:"+i+" of "+window.totalFramesForEncoder);
		}

       // encoder.start();
       //  for (var i=0; i < window.totalFramesForEncoder; i++) {
       //     window.pjsin.switchFrame(i);
       //     encoder.addFrame(context);
       //     console.log("Adding Frame:"+i+" of "+window.totalFramesForEncoder);
       //  }
       // encoder.finish();
		encodeGIF();

       // document.getElementById('output').src = 'data:image/gif;base64,'+encode64(encoder.stream().getData());        
    });
    


    // $('#frames').bind('click', function(event) {
    //     console.log("SPLITTING FRAMES");
    //     $('#frameOutput').empty();
    //     for (var i=0; i < window.totalFramesForEncoder; i++) {
    //         encoder.start();
    //         window.pjsin.switchFrame(i);
    //         encoder.addFrame(context);
    //         console.log("Splitting Frame:"+i+" of "+window.totalFramesForEncoder);
    //         encoder.finish();
    //         $('#frameOutput').append('<tr><td>'+i+'</td><td><img id="output'+i+'"/></td></tr>');
    //         $('#output'+i).attr('src','data:image/gif;base64,' + encode64(encoder.stream().getData()));        
    //     }
    // });
    
    
    
    
});


var frameDataArray = new Array();
var encodeNumber = 0;
var delay = 100;

this.encodeGIF = function() {

	//$('#frameCount').html("<progress id='gifProgress' max='"+frameDataArray.length+"'></progress>");
	
	var progressbar = $("<progress/>", {
	  "id": "gifProgress"+encodeNumber,
	  "max": frameDataArray.length
	}).appendTo("#frameCount");
	
	var gifWidth = document.getElementById('drawcanvas').width;
	var gifHeight = document.getElementById('drawcanvas').height;

	var animation_parts = new Array(frameDataArray.length);

	var worker = new Worker('/libs/GIFWorker.js');
	//worker.onmessage = function(e)
	//{
	//	console.log(e.data);
	//}

	//call web worker. 
	worker.onmessage = function(e)
	{
		//handle stuff, like get the frame_index
		var frame_index = e.data["frame_index"];
		var frame_data = e.data["frame_data"];
		animation_parts[frame_index] = frame_data;
		

        progressbar.val(frame_index);
        console.log("Encoding "+frame_index);


		for(var j = 0; j < frameDataArray.length; j++)
		{
			if(animation_parts[j] == null)
			{
				return;
			}
		}
		console.log("append");
		//check when everything else is done and then do animation_parts.join('') and have fun
		var binary_gif = animation_parts.join('');
		var data_url = 'data:image/gif;base64,'+window.btoa(binary_gif);

		var gifItem = new Image();
		gifItem.src = data_url;
		var thumbs = document.getElementById("gifContainer");
		progressbar.remove();
		
		document.getElementById("gifContainer").appendChild(gifItem);	

	}

	var imageItems = new Array(); //hacky way to ensure that an arbitrary number of onload events occur.
	//frameDataArray is an array of canvas data generated by a canvas toDataURL calls elsewhere in the parent scope. Replicate this how you wish.
	for(var i = 0; i < frameDataArray.length; i++)
	{
		imageItems[i] = new Image();
		imageItems[i].src = frameDataArray[i];
		imageItems[i].isloaded = false;
		imageItems[i].index = i;
		imageItems[i].onload = function()
		{
			var scratchCanvas = document.createElement("canvas"); 
			scratchCanvas.width = gifWidth;
			scratchCanvas.height = gifHeight;
			var scratchCanvasContext = scratchCanvas.getContext("2d");
			scratchCanvasContext.fillStyle = "#FFFFFF";
			scratchCanvasContext.fillRect(0,0,scratchCanvas.width, scratchCanvas.height);
			scratchCanvasContext.drawImage(this,0,0,scratchCanvas.width,scratchCanvas.height);
			var imdata = scratchCanvasContext.getImageData(0,0, scratchCanvas.width, scratchCanvas.height).data;
			console.log("imageItems "+this.index);
			worker.postMessage({"frame_index": this.index, "delay": delay, "frame_length":frameDataArray.length-1, "height":scratchCanvas.height, "width":scratchCanvas.width, "imageData":imdata}); //imarray.join(',')

		}
	}
}
