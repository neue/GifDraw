$(document).ready(function() {
    $('#framenumber').bind('change', function(event) {
        window.pjsin.gotoFrame($("#framenumber").val());
    });
	
    $('#onionSkin').bind('change', function(event) {
        window.pjsin.setOnionSkin($('#onionSkin').is(":checked"));
         console.log("frams "+$('#framenumber').attr('max'));
    });

    var encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(100); 
    encoder.setQuality(10);
    
    var canvas = document.getElementById('drawcanvas');
    var context = canvas.getContext('2d');
    context.mozImageSmoothingEnabled=false;
   
    $('#encode').bind('click', function(event) {
        console.log("ENCODING MOTHERFUCKER");
        encoder.start();
        for (var i=0; i < window.totalFramesForEncoder; i++) {
           window.pjsin.switchFrame(i);
           encoder.addFrame(context);
           console.log("Adding Frame:"+i+" of "+window.totalFramesForEncoder);
        }
       encoder.finish();
       document.getElementById('output').src = 'data:image/gif;base64,'+encode64(encoder.stream().getData());
                
        // var binary_gif = encoder.stream().getData() 
        // var data_url = 'data:image/gif;base64,'+encode64(binary_gif);
        
    });
    
    $('#start').bind('click', function(event) {
        console.log("staring");
        encoder.start();
    });
    $('#addframe').bind('click', function(event) {
        console.log("adding frame");
        encoder.addFrame(context);
    });
    $('#finish').bind('click', function(event) {
        console.log("Finsihing gif");
        encoder.finish();
        document.getElementById('output').src = 'data:image/gif;base64,'+encode64(encoder.stream().getData());
    });
    
});
