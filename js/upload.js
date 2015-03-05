$(document).ready(function(){
	var pBox=$('#progressBox');
	var pBar=$('#progressBar');
	var sTxt=$('#statusText');
	var completed = '0%';

	var options= {
		target: '#output',
		beforeSubmit: beforeSubmit,
		uploadProgress: onProgress,
		success: afterSuccess,
		resetForm: true
	};

	$('#uploadForm').submit(function(){
		$(this).ajaxSubmit(options);
		return false;
	});
	function onProgress(event, position, total, percentComplete){
		pBar.width(percentComplete +'%');
		sTxt.html(percentComplete + '%');
		if(percentComplete >50){
			sTxt.css('color','#fff');
		}
	}
	function afterSuccess(){
		$('#uploadBtn').show();
		$('#progessImg').hide();
	}

	function beforeSubmit(){
		if(window.File && window.FileReader && window.FileList && window.Blob){
			if(!$('#videoInput').val()){
				$('#output').html("First choose a file!");
					return false;
			}

			var fsize=$('#videoInput')[0].files[0].size;
			var ftype=$('#videoInput')[0].files[0].type;

			switch(ftype){
				case 'video/mp4':
					break;
				default:
					$('#output').html("<b>"+ftype+"</b> Unsupported file type!");
					return false;
			}

			if(fsize>104857600){
				$('#output').html("<b>"+bytesToSize(fsize)+"</b> Too big file! <br/>");
				return false;
			}

			pBox.show();
			pBar.width(completed);
			sTxt.html(completed);
			sTxt.css('color','#000');

			$('#uploadBtn').hide();
			$('#uploadImg').show();
			$('#output').html("");
		}
		else{
			$('#output').html('Please upgrade browser');
			return false;
		}
	}

	function bytesToSize(bytes){
		var sizes= ['Bytes','KB','MB','GB','TB'];
		if( bytes==0) return '0 Bytes';
		var i = parseInt(Math.floor(Math.log(bytes)/Math.log(1024)));
		return Math.round(bytes / Math.pow(1024,i),2) + ' '+sizes[i];
	}
	

});

