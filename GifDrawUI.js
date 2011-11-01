$(document).ready(function() {
    $('#framenumber').bind('change', function(event) {
        window.pjsin.gotoFrame($("#framenumber").val());
    });
	
    $('#onionSkin').bind('change', function(event) {
        window.pjsin.setOnionSkin($('#onionSkin').is(":checked"));
    });

    var encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(100); 
    encoder.setQuality($('#quality').val());
    
    var canvas = document.getElementById('drawcanvas');
    var context = canvas.getContext('2d');
   
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
    });
    
    $('#frames').bind('click', function(event) {
        console.log("SPLITTING FRAMES");
        for (var i=0; i < window.totalFramesForEncoder; i++) {
            encoder.start();
            window.pjsin.switchFrame(i);
            encoder.addFrame(context);
            console.log("Splitting Frame:"+i+" of "+window.totalFramesForEncoder);
            encoder.finish();
            document.getElementById('output'+i).src = 'data:image/gif;base64,'+encode64(encoder.stream().getData());        
        }
    });
    
    $('#newgif').bind('click', function(event) {
        var numberOfFrames = prompt("How many frames should this AWESOME gif have?",10);
        if (numberOfFrames) {
            window.pjsin.init(parseInt(numberOfFrames));
        };
    });
    
    $('label[for="size"]').text("Size "+$('#size').val());
    $('#size').bind('change', function(event) {
        window.pjsin.setStrokeWeight($('#size').val());
        $('label[for="size"]').text("Size "+$('#size').val());
    });
    
    
});
