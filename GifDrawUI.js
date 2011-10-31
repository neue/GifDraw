$(document).ready(function() {




    console.log(window.pjsin);
    $("#framenumber").bind('change', function(event) {
        window.pjsin.gotoFrame($("#framenumber").val());
    });
	
    


    
    
});
