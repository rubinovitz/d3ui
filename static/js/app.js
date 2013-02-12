$('.nav-tabs').button();

$('#cols-submit').click(function(){
	$.ajax({
		// send columnNames, x-axis, y-axis
	  url:'/api/columns/?'+$('.submit-graph').serialize(),
	  method:'POST',
	  success: function(data){
      console.log(data);
			$('#file-submission').hide();//hide form
			$('#column-submission').hide();
	    djen.barGraph(data);
	  }
	});
});
