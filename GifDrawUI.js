$(document).ready(function() {
    
// Text Select cursor fix
    var canvas = document.getElementById('drawcanvas');
    canvas.onselectstart = function () { return false; } // ie
    canvas.onmousedown = function () { return false; } // mozilla
        
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
    
    // Colour
    
    $('#leftColour').miniColors({
        change: function(hex, rgb) {
            window.leftColour[0] = rgb.r;
            window.leftColour[1] = rgb.g;
            window.leftColour[2] = rgb.b;
            window.pjsin.setStrokeColour(rgb.r,rgb.g,rgb.b);
        }
    });
    
    $('#rightColour').miniColors({
        change: function(hex, rgb) {
            window.rightColour[0] = rgb.r;
            window.rightColour[1] = rgb.g;
            window.rightColour[2] = rgb.b;
        }
    });
    
    
//
//  Documents
//
    
    $('#newgif').bind('click', function(event) {
        var numberOfFrames = prompt("How many frames should this AWESOME gif have?",window.totalFramesForEncoder);
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

    $('#undo').bind('click', function(event) {
       window.pjsin.retrieveUndoState();
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
