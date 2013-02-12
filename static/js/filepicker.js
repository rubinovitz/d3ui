filepicker.setKey('Axr2zPTSXRta2-ICs4DIyz');

$('#file-submit').click(function(){
	filepicker.getFile('/*', function(url, data){
		console.log(url);
		var uArray = url.split('/');
		console.log(uArray);
		var urlId = uArray[url.split('/').length-1];
		console.log(urlId);
	    $.ajax({
			url:'/data/?dataKey='+urlId,
			method:'POST', 
			success:function(data){
				$('#file-submission').hide();
				var colArray = data['columns'].split(',');
			   	for (i=0;i<colArray.length;i=i+1){
			    	$('#x-col-buttons').append('<label class="radio"><input type="radio" name="x-col" id="optionsRadios'+i+'" value='+i+'>'+colArray[i]+'</label>');
						$('#y-col-buttons').append('<label class="radio"><input type="radio" name="y-col" id="optionsRadios"'+i+'" value='+i+'>'+colArray[i]+'</label>');
						
			      }
				$('#column-submission').show();
				$('#form-filename').val(urlId);
			    }
	  		});
    	});
  });
