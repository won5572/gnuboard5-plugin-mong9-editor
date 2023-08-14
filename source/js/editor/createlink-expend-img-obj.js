var createlink_expend_img_obj = {

	_now : false,

	'zooms' : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
	'hovers' : ['m9-fade','m9-slide-top','m9-slide-bottom','m9-slide-left','m9-slide-right'],
	'hovers2' : ['m9-img-hover-0','m9-img-hover-1','m9-img-hover-2','m9-img-hover-3','m9-img-hover-4','m9-img-hover-5'],

	int : function() {
		
		if (jQuery('#editWindow-imgAction').length == 0) {

var _html = '' +
'<ul class="_edit-list-1">' +
	'<li>' +
		'<dl class="_edit-dl-1">' +
			'<dt>'+ msg_msg('zoom_in') +'<span class="check-switch"><input type="checkbox" id="_editor_img_zoom" onclick="createlink_expend_img_obj.zoom.use(this.checked)" /><label for="_editor_img_zoom" class="hidden">use</label></span></dt>' +
			'<dd>'+

				'<div class="_middle_box">' +

					'<input type="text" id="_editor_img_zoom_url" />' +

					'<ul class="m9a-float-3 m9-spacing-0 m9-list-border-style-0">' +
						'<li>'+ msg_msg('group') +'<span class="check-switch"><input type="checkbox" id="_editor_img_zoom_group" onclick="createlink_expend_img_obj.zoom.group(this.checked)"><label for="_editor_img_zoom_group" class="hidden">use</label></span></li>' +
						'<li>'+ msg_msg('no') +

							'<select id="_editor_img_zoom_group_type" onchange="createlink_expend_img_obj.zoom.adjust()">' +
								'<option value=""></option>';

								for (var i=0;i<createlink_expend_img_obj.zooms.length;i++) {
									var _value = createlink_expend_img_obj.zooms[i];
									_html += '<option value="'+ _value + '">' + _value + '</option>';
								}

								_html += '' +

							'</select>' +
	
						'</li>' +
					'</ul>' +

				'</div>' +

			'</dd>' +
		'</dl>' +
	'</li>' +
	'<li>' +
		'<dl class="_edit-dl-1">' +
			'<dt>'+ msg_msg('mouseover') +'<span class="check-switch"><input type="checkbox" id="_editor_img_hover" onclick="createlink_expend_img_obj.hover.use(this.checked)"><label for="_editor_img_hover" class="hidden">use</label></span></dt>' +
			'<dd>'+

				'<div class="_middle_box">' +

					'<textarea id="_editor_img_hover_msg" onchange="createlink_expend_img_obj.hover.adjust()" placeholder="'+ msg_msg('msg_74') +'" sty1le="margin:10px 0;font-size:14px;font-family:dotum"></textarea>' +

					'<ul class="m9a-float-3 m9-spacing-0 m9-list-border-style-0">' +
						'<li>'+ msg_msg('effect') + '1' +

							'<select id="_editor_img_hover_kind" onchange="createlink_expend_img_obj.hover.adjust()">';

							for (var i=0;i<createlink_expend_img_obj.hovers.length;i++) {
								var _value = createlink_expend_img_obj.hovers[i];
								_html += '<option value="'+ _value + '">' + _value + '</option>';
							}

							_html += '' +
							'</select>' +
	
						'</li>' +
						'<li>'+ msg_msg('effect') + '2' +

							'<select id="_editor_img_hover_kind2" onchange="createlink_expend_img_obj.hover.adjust()">';

							for (var i=0;i<createlink_expend_img_obj.hovers2.length;i++) {
								var _value = createlink_expend_img_obj.hovers2[i];
								_html += '<option value="'+ _value + '">' + _value + '</option>';
							}

							_html += '' +
							'</select>' +
	
						'</li>' +
					'</ul>' +

					'<ul class="m9a-float-1 m9-spacing-0 m9-list-border-style-0">' +
						'<li class="_preview_line"><span class="_s_title">'+ msg_msg('preview') +'</span><button onclick="createlink_expend_img_obj.hover.preview(1)" class="class-btn _img_hover_btn">'+ msg_msg('view') +'</button> <button onclick="createlink_expend_img_obj.hover.preview(0)" class="class-btn _img_hover_btn">'+ msg_msg('hide') +'</button></li>' +
					'</ul>' +

				'</div>' +

			'</dd>' +
		'</dl>' +
	'</li>' +
'</ul>' +
'<button onclick="edit_window_obj.close(\'editWindow-imgAction\');return false;" class="curtain-btn editor-btn-yes _drag-btn-3">OK</button>';

			edit_window_obj.int("editWindow-imgAction",_html,msg_msg('setting'),{
				'reset' : function() {
					//
				},
				'close' : function() {
					createlink_expend_img_obj.win_close();
				}					
			});

		}

	},

	'win_close' : function() {

		var obj = createlink_expend_img_obj._now;

		var link_obj = false;

		if (jQuery(obj).parents('a').length > 0) {

			link_obj = jQuery(obj).parents('a')[0];

			if (jQuery(link_obj).find('._m9_overlay').length > 0) {
				jQuery(link_obj).find('._m9_overlay').removeClass('active').removeClass('__m9_overlay_preview');
			}

			jQuery(link_obj).find('img').removeClass('active').removeClass('__m9_overlay_img_preview');
		}
	},

	'view' : function(obj) {

		createlink_expend_img_obj._now = obj;

		createlink_expend_img_obj.int();

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(createlink_expend_img_obj._now).addClass('selected_tag');
		
		createlink_expend_img_obj.get();

		m9_layer_position('editWindow-imgAction',createlink_expend_img_obj._now,'up',m9_getObject('body'));							
		edit_window_obj.view('editWindow-imgAction');

	},

	'unlink' : function() {


	},

	'get' : function(obj) {

		if (!obj) {
			obj = createlink_expend_img_obj._now;
		}

		var prop = false;
		var link_obj = false;
		var zoom_ok = 0;
		var hover_ok = 0;
		var overlay_obj = false;

		if (jQuery(obj).parents('a').length > 0) {

			link_obj = jQuery(obj).parents('a')[0];

			if (jQuery(link_obj).hasClass('m9-img-zoom')) {
				zoom_ok++;
			}

			if (jQuery(link_obj).hasClass('m9-img-hover')) {
				if (jQuery(link_obj).find('._m9_overlay').length > 0) {
					hover_ok++;
					overlay_obj = jQuery(link_obj).find('._m9_overlay')[0];
				}
			}

			prop = get_ani_type_info(link_obj,'lightbox');
		}

		// zoom 설정
		if (zoom_ok > 0) {

			jQuery('#_editor_img_zoom_url').val(jQuery(link_obj).data('m9-href'));

			jQuery('#_editor_img_zoom').attr('checked',true);

			input_box_disabled('#_editor_img_zoom_url',false);
			input_box_disabled('#_editor_img_zoom_group',false);

			if (prop && prop['group']) {

				jQuery('#_editor_img_zoom_group').attr('checked',true);

				jQuery('#_editor_img_zoom_group_type').val(prop['group']);
				input_box_disabled('#_editor_img_zoom_group_type',false);

			} else {

				jQuery('#_editor_img_zoom_group').attr('checked',false);

				jQuery('#_editor_img_zoom_group_type').val('');
				input_box_disabled('#_editor_img_zoom_group_type',true);

			}

		} else {

			jQuery('#_editor_img_zoom_url').val('');
			input_box_disabled('#_editor_img_zoom_url',true);

			jQuery('#_editor_img_zoom').attr('checked',false);

			jQuery('#_editor_img_zoom_group').attr('checked',false);
			input_box_disabled('#_editor_img_zoom_group',true);

			jQuery('#_editor_img_zoom_group_type').val('');
			input_box_disabled('#_editor_img_zoom_group_type',true);

		}

		// hover 설정
		if ((hover_ok > 0) && overlay_obj) {

			var img_obj = false;
			if (jQuery(obj).prop('tagName').toLowerCase() == 'img') {
				img_obj = obj;
			} else {
				img_obj = jQuery(obj).find('img')[0];
			}

			jQuery('#_editor_img_hover').attr('checked',true);

			input_box_disabled('#_editor_img_hover_kind',false);

			for (var i=0;i<createlink_expend_img_obj.hovers.length;i++) {
				if (jQuery(overlay_obj).hasClass(createlink_expend_img_obj.hovers[i])) {
					jQuery('#_editor_img_hover_kind').val(createlink_expend_img_obj.hovers[i]);
					break;
				}
			}

			input_box_disabled('#_editor_img_hover_kind2',false);

			for (var i=0;i<createlink_expend_img_obj.hovers2.length;i++) {
				if (jQuery(img_obj).hasClass(createlink_expend_img_obj.hovers2[i])) {
					jQuery('#_editor_img_hover_kind2').val(createlink_expend_img_obj.hovers2[i]);
					break;
				}
			}

			var _html = jQuery(overlay_obj).find('._in>span').html();
			jQuery('#_editor_img_hover_msg').val(_html);

			jQuery('._img_hover_btn').removeClass('disabled').prop('disabled','');

		} else {

			jQuery('#_editor_img_hover').attr('checked',false);

			jQuery('#_editor_img_hover_kind').val(createlink_expend_img_obj.hovers[0]); // base
			input_box_disabled('#_editor_img_hover_kind',true);

			jQuery('#_editor_img_hover_kind2').val(createlink_expend_img_obj.hovers2[0]); // base
			input_box_disabled('#_editor_img_hover_kind2',true);

			jQuery('#_editor_img_hover_msg').val('');
			input_box_disabled('#_editor_img_hover_msg',true);

			jQuery('._img_hover_btn').addClass('disabled').prop('disabled','disabled');

		}

	}, // get

	'zoom' : {

		'use' : function(_checked) {

			var _img = createlink_expend_img_obj._now;

			if (_checked) {
				input_box_disabled('#_editor_img_zoom_url',false);
				input_box_disabled('#_editor_img_zoom_group',false);
				input_box_disabled('#_editor_img_zoom_group_type',true);
			} else {
				input_box_disabled('#_editor_img_zoom_url',true);
				jQuery('#_editor_img_zoom_group').attr('checked',false);
				input_box_disabled('#_editor_img_zoom_group',true);
				input_box_disabled('#_editor_img_zoom_group_type',true);
			}

			createlink_expend_img_obj.zoom.adjust();

		},

		'group' : function(_checked) {

			if (_checked) {
				input_box_disabled('#_editor_img_zoom_group_type',false);
			} else {
				input_box_disabled('#_editor_img_zoom_group_type',true);
			}

			createlink_expend_img_obj.zoom.adjust();

		},

		'adjust' : function() {

			var _img = createlink_expend_img_obj._now;
			var _checked = jQuery('#_editor_img_zoom').prop('checked');

			if (_checked) { // if(1)

				var link_obj = createlink_expend_img_obj.link.add();
				jQuery(link_obj).addClass('m9-img-zoom');

				var _href = '';
				if (jQuery('#_editor_img_zoom_url').val() == '') {
					_href = (jQuery(_img).is('.m9-img-box')) ? jQuery(_img).find('img').attr('src') : jQuery(_img).attr('src');
					jQuery('#_editor_img_zoom_url').val(_href);
				} else {
					_href = jQuery('#_editor_img_zoom_url').val();
				}

				m9_set_data_var(link_obj,'m9-href',_href);

				var _checked2 = jQuery('#_editor_img_zoom_group').prop('checked');

				if (_checked2) { // if(2)

					var _value = jQuery('#_editor_img_zoom_group_type').val();
					if (_value != '') {
						set_data_ani_type(link_obj,'lightbox',{ 'group' : _value });
					} else {
					}

				} else if (_href != '') { // if(2)

					set_data_ani_type(link_obj,'lightbox',{});

				} else { // if(2)

					remove_ani_type_info(link_obj,'lightbox');

				} // if(2)

			} else { // if(1)

				jQuery('#_editor_img_zoom_url').val('');

				if (jQuery(_img).parents('a').length > 0) {

					var link_obj = jQuery(_img).parents('a')[0];

					remove_ani_type_info(link_obj,'lightbox');

					createlink_expend_img_obj.link.remove('m9-img-zoom');

				}

			} // if(1)

		}

	}, // zoom

	'hover' : {

		'use' : function(_checked) {

			createlink_expend_img_obj.hover.adjust();

			if (_checked) {
				input_box_disabled('#_editor_img_hover_msg',false);
				input_box_disabled('#_editor_img_hover_kind',false);
				input_box_disabled('#_editor_img_hover_kind2',false);

				jQuery('._img_hover_btn').removeClass('disabled').prop('disabled','');

			} else {
				input_box_disabled('#_editor_img_hover_msg',true);
				input_box_disabled('#_editor_img_hover_kind',true);
				input_box_disabled('#_editor_img_hover_kind2',true);

				jQuery('._img_hover_btn').addClass('disabled').prop('disabled','disabled');

			}

		}, // use

		'adjust' : function() {

			var _img = createlink_expend_img_obj._now;

			var _checked = jQuery('#_editor_img_hover').prop('checked');

			if (_checked) { // if(1)

				var _html = jQuery('#_editor_img_hover_msg').val();
				var _kind = jQuery('#_editor_img_hover_kind').val();

				var link_obj = createlink_expend_img_obj.link.add();
				jQuery(link_obj).addClass('m9-img-hover');

				if (jQuery(link_obj).find('._m9_overlay').length == 0) {
					jQuery(link_obj).append('<span class="_m9_overlay"></span>');
				}

				var overlay_obj = jQuery(link_obj).find('._m9_overlay')[0];

				for (var i=0;i<createlink_expend_img_obj.hovers.length;i++) {
					jQuery(overlay_obj).removeClass(createlink_expend_img_obj.hovers[i]);
				}
				jQuery(overlay_obj).addClass(_kind);

				jQuery(overlay_obj).html('<span class="_in"><span class="__m9">'+_html+'</span></span>');

				var _kind2 = jQuery('#_editor_img_hover_kind2').val();

				var img_obj = jQuery(link_obj).find('img')[0];

				for (var i=0;i<createlink_expend_img_obj.hovers2.length;i++) {
					jQuery(img_obj).removeClass(createlink_expend_img_obj.hovers2[i]);
				}
				jQuery(img_obj).addClass(_kind2);

			} else { // if(1)

				if (jQuery(_img).parents('a').length > 0) {

					var link_obj = jQuery(_img).parents('a')[0];

					if (jQuery(link_obj).find('._m9_overlay').length > 0) {
						jQuery(link_obj).find('._m9_overlay').remove();
					}

					var img_obj = jQuery(link_obj).find('img')[0];

					for (var i=0;i<createlink_expend_img_obj.hovers2.length;i++) {
						jQuery(img_obj).removeClass(createlink_expend_img_obj.hovers2[i]);
					}

					createlink_expend_img_obj.link.remove('m9-img-hover');

				}

			} // if(1)

		}, // adjust

		'preview' : function(_over) {

			var _img = createlink_expend_img_obj._now;

			if (jQuery(_img).parents('a').length > 0) {

				var link_obj = jQuery(_img).parents('a')[0];

				if (jQuery(link_obj).find('._m9_overlay').length > 0) {
					var overlayObj = jQuery(link_obj).find('._m9_overlay');
					var imgObj = jQuery(link_obj).find('img');
					if (_over) {
						overlayObj.addClass('active').addClass('__m9_overlay_preview');
						imgObj.addClass('active').addClass('__m9_overlay_img_preview');
					} else {
						overlayObj.removeClass('active');
						imgObj.removeClass('active');
					}
				}

			}
		} // preview

	}, // hover

	'link' : {

		'add' : function() {

			var _img = createlink_expend_img_obj._now;

			if (jQuery(_img).parents('a').length == 0) {
				jQuery(_img).wrap('<a></a>');
			}

			return jQuery(_img).parents('a')[0];

		}, // add

		'remove' : function(remove_class) {

			var _img = createlink_expend_img_obj._now;

			if (jQuery(_img).parents('a').length > 0) {

				var link_obj = jQuery(_img).parents('a')[0];

				jQuery(link_obj).removeClass(remove_class);

				var _match = 0;
				if (jQuery(link_obj).hasClass('m9-img-hover')) {
					_match++;
				}

				if (jQuery(link_obj).hasClass('m9-img-zoom')) {
					_match++;
				}

				if (_match == 0) {
					var box = jQuery(link_obj).children().eq(0)[0];
					jQuery(box).unwrap();
				}

			}

		} // remove

	} // link

}; // createlink_expend_img_obj