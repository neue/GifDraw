$(document).ready(function() {
    
//     
//  Tools 
// 
    
    $('#framenumber').bind('change', function(event) {
        window.pjsin.gotoFrame($("#framenumber").val());
    });
    
    $('label[for="size"]').text("Size "+$('#size').val());
    $('#size').bind('change', function(event) {
        window.pjsin.setStrokeWeight($('#size').val());
        $('label[for="size"]').text("Size "+$('#size').val());
    });
	
    $('#onionSkin').bind('change', function(event) {
        window.pjsin.setOnionSkin($('#onionSkin').is(":checked"));
    });
    
    // Colour
    $('#colourR').bind('change', function(event) { console.log("sfds"); setColour() });
    $('#colourG').bind('change', function(event) { setColour() });
    $('#colourB').bind('change', function(event) { setColour() });
    
    function setColour(){
        if ($('#colourR').val() > 255) { $('#colourR').val("255"); };
        if ($('#colourG').val() > 255) { $('#colourG').val("255"); };
        if ($('#colourB').val() > 255) { $('#colourB').val("255"); };
        R = parseInt($('#colourR').val());  
        G = parseInt($('#colourG').val());  
        B = parseInt($('#colourB').val());  
        window.pjsin.setStrokeColour(R,G,B);
    };
    
//
//  Documents
//
    
    $('#newgif').bind('click', function(event) {
        var numberOfFrames = prompt("How many frames should this AWESOME gif have?",10);
        if (numberOfFrames) {
            window.pjsin.init(parseInt(numberOfFrames));
        };
    });
    
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
    
//
//  Encoder
//

    var encoder = new GIFEncoder();
    encoder.setRepeat(0);
    encoder.setDelay(100); 
    encoder.setQuality(10);
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
        $('#frameOutput').empty();
        for (var i=0; i < window.totalFramesForEncoder; i++) {
            encoder.start();
            window.pjsin.switchFrame(i);
            encoder.addFrame(context);
            console.log("Splitting Frame:"+i+" of "+window.totalFramesForEncoder);
            encoder.finish();
            $('#frameOutput').append('<tr><td>'+i+'</td><td><img id="output'+i+'"/></td></tr>');
            $('#output'+i).attr('src','data:image/gif;base64,' + encode64(encoder.stream().getData()));        
        }
    });
    
    
    
    
    
});
