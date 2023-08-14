var mong9_obj = {

	data : {},
	ajax_url : '//app.mong9.com/index.cgi?page_code=ajax&code=get_editor_info',
	status : function() {
		if (mong9_obj.data['status']) {
			return (mong9_obj.data['status'] > 0) ? mong9_obj.data['status'] : false;
		} else {
			return false;	
		}
	},

	get : function() {

		var _url = mong9_obj.ajax_url + '&domain=' + encodeURIComponent(window.location.hostname);
		jQuery.ajax({
			url : _url,
			method : 'get',
			success : function(res) {
				mong9_obj.data = m9_parse_json(res);

				if (mong9_obj.data['connect_auth'] != '') { M9_SET['connect_auth'] = mong9_obj.data['connect_auth']; }
				mong9_obj.set();
			},
			error : function(res) {
				mong9_obj.set();
			}
		});

	},

	set : function() {

		if (mong9_obj.status()) {
			builder.insert.int();
		} else {
			var _url = (mong9_obj.data['connect_auth'] != '') ? '?connect_auth=' + mong9_obj.data['connect_auth'] : '';
			jQuery('._editor-header').append('<div class="_m9connect_box"><a href="//mong9editor.com/links/upgrade_paid_version' + _url + '" target="_blank" class="m9-btn _m9connect">'+msg_msg('msg_81')+'</a></div>');
			jQuery('#editWindow-googleMap,#editWindow-tab,#tagWindow-setting').children('._handle').addClass('_not_paid');
		}

	}

}; // mong9_obj