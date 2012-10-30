$(document).ready(function() {
var opts = {
    dragClass: "drag",
    accept: false,
    readAsMap: {
        'image/*': 'BinaryString',
        'text/*' : 'Text'
    },
    readAsDefault: 'BinaryString',
    on: {
        load: function(e, file) {
	        if (file.type.match(/gif/)) {
				console.log(file.name);
				console.log(file.type);
				importGIF(e.target.result);
			} else {
				// Not an image
				console.log("NOT A GIF!");
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


function importGIF(gif64){
	console.log("Attempting Import");
	var rub = new SuperGif({ gif: document.getElementById('dummy') } );
	rub.load(null,gif64);
	
};




});
