jQuery(function() {
	btn_obj.int();
	confirm_msg.int();
	tag_obj.int();
	html_obj.int();

	m9_delay('',500,function() {
		mong9_obj.get();
	});

});


window.addEventListener('error', function(event) {
  // Handle the error here
  console.error('JavaScript error occurred:', event.error);
  alert('에러=='+event.error);
});
