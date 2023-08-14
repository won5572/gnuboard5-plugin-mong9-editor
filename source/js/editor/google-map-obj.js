var google_map_obj = {

	_selected : false,
	_now : false,
	ajax_url : '//app.mong9.com/index.cgi?page_code=ajax&code=editor_get_google_map_address',

	int : function(obj) {

		// ani_type 설정
		ani_type_obj.possible_type['google_map'] = 1;
		google_map_obj.handle.int();
		
		if (jQuery('#editWindow-googleMap').length == 0) {

var _html = 
'<ul class="m9a-float-2">' +
	'<li>' +
		'<ul class="_edit-list-1">' +
			'<li>' +
				'<dl class="_edit-dl-1">' +
					'<dt><label for="_google_address_search">'+ msg_msg('find_coor') +'</dt>' +
					'<dd>' +
						'<div class="counter-control-box">' +
							'<span class="counter-control">' +
								'<span class="box-input style-2"><input type="text" id="_google_address_search" placeholder="'+msg_msg('msg_79')+'" value="" onkeydown="google_map_obj.handle.check_enter(event)" class="_drag-btn-3" /></span>' +
								'<span class="box-btn"><button onclick="google_map_obj.get_ajax_address();return false;" class="input-button _drag-btn-3"></button></span>' +
							'</span>' +
						'</div>' +
					'</dd>' +
				'</dl>' +	
			'</li>' +
			'<li>' +
				'<dl class="_edit-dl-1">' +
					'<dt><label for="_google_title">'+msg_msg('print_place')+'</dt>' + // 출력 장소명
					'<dd><input type="text" id="_google_title" value="" onchange="google_map_obj.preview.change_company();" class="_drag-btn-3" /></dd>' +
				'</dl>' +	
			'</li>' +
			'<li>' +
				'<dl class="_edit-dl-1">' +
					'<dt><label for="_google_address">'+msg_msg('print_address')+'</dt>' + // 출력 주소명
					'<dd><input type="text" id="_google_address" value="" onchange="google_map_obj.preview.change_address();" class="_drag-btn-3" /></dd>' +
				'</dl>' +	
			'</li>' +
			'<li>' +
				'<dl class="_edit-dl-2">' +
					'<dt><label for="_google_x_pos">'+ msg_msg('x_coor') +'</dt>' +
					'<dd><input type="text" readonly id="_google_x_pos" value="0" class="readonly" /></dd>' +
				'</dl>' +	
			'</li>' +	
			'<li>' +
				'<dl class="_edit-dl-2">' +
					'<dt><label for="_google_y_pos">'+ msg_msg('y_coor') +'</dt>' +
					'<dd><input type="text" readonly id="_google_y_pos" value="0" class="readonly" /></dd>' +
				'</dl>' +	
			'</li>' +	
			'<li>' +
				'<dl class="_edit-dl-2">' +
					'<dt><label for="_google_zoom">'+ msg_msg('zoom') +'</dt>' +
					'<dd>' +
						'<div class="counter-control-box">' +
							'<span class="counter-control">' +
								'<span class="box-btn"><button onmousedown="input_box.plus(\'_google_zoom\',{\'max\':21,min:0},function(){google_map_obj.preview.set_zoom(\'_google_zoom\');})" onmouseup="input_box.stop(\'_google_zoom\');" class="left-button _drag-btn-3 icon2-plus"></button></span>' +
								'<span class="box-input"><input type="text" id="_google_zoom" value="0" onchange="google_map_obj.preview.set_zoom();" class="_drag-btn-3" /></span>' +
								'<span class="box-btn"><button onmousedown="input_box.minus(\'_google_zoom\',{\'max\':21,min:0},function(){google_map_obj.preview.set_zoom(\'_google_zoom\');})" onmouseup="input_box.stop(\'_google_zoom\');" class="right-button _drag-btn-3 icon2-minus"></button></span>' +
							'</span>' +
						'</div>' +
					'</dd>' +
				'</dl>' +	
			'</li>' +													
		'</ul>' +
			
		'<button onclick="google_map_obj.change()" class="curtain-btn editor-btn-yes _drag-btn-3">OK</button>' +
	'</li>' +
	'<li>' +
		'<div id="_google_map_preview" class="m9-map-canvas"></div>' +					
		'<div class="_google_map_preview_msg">'+ msg_msg('msg_63') +'</div>' +
	'</li>' +
'</ul>' +	
'<span id="_google_address_return" style="display:none"></span>';
		
			edit_window_obj.int("editWindow-googleMap",_html,msg_msg('map_setting'));

			jQuery(obj).on('mouseover',function(e) {
	
				var et = e.target;
				var J_et = jQuery(et);
				
				var _target = false;
				if (J_et.parents('.m9-google_map').length > 0) {					
					_target = J_et.parents('.m9-google_map')[0];					
				} else if (J_et.is('.m9-google_map')) {
					_target = et;
				}	

				if (_target) {
					google_map_obj._now = _target;	
					var m = _get_box_info(_target,1);
					jQuery("#_google_map_setting_box>div").css('display','none');						
					jQuery("#_google_map_setting_box").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h']});
					if (M9_SET["navigator"] == 'ie') { jQuery("#_google_map_setting_box_iframe").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h']}); }
				} else {
					if (!J_et.is('#_google_map_setting_box') && J_et.parents('#_google_map_setting_box').length == 0) {					
						jQuery("#_google_map_setting_box").css({display:"none"});				
						if (M9_SET["navigator"] == 'ie') { jQuery("#_google_map_setting_box_iframe").css({display:"none"}); }					
					}		
				}

			}); //mouseover

		}

	},

	get_ajax_address : function() {
		
		var _address = jQuery('#_google_address_search').val();

		var map_url = (M9_SET["map_ajax_url"]) ? M9_SET["map_ajax_url"] : google_map_obj.ajax_url;

		m9_ajax_load_contents(
			map_url + '&address=' + _address,
			"_google_address_return",
			{whenever:true},
			function() {
				var _str = jQuery("#_google_address_return").text();
				LatLng = _str.split(",");
				jQuery("#_google_address_return").text("");
				
				jQuery('#_google_address_search').val('');
				if (jQuery('#_google_title').val() == '') {
					jQuery('#_google_title').val(msg_msg('print_place')); // "출력 장소명"
				}
				jQuery('#_google_address').val(_address);
				jQuery('#_google_x_pos').val(LatLng[1]);
				jQuery('#_google_y_pos').val(LatLng[0]);
				jQuery('#_google_zoom').val(16);
	
				var b= jQuery('#_google_title').val();
				var c = jQuery('#_google_address').val();
				var d = jQuery('#_google_x_pos').val() * 1;
				var e = jQuery('#_google_y_pos').val() * 1;
				var f = jQuery('#_google_zoom').val() * 1;
	
				var Gobj = jQuery('#_google_map_preview').data('google_map');
	
				var newLatLng = new google.maps.LatLng(e,d);
			    Gobj['marker'].setPosition(newLatLng);
			    Gobj['map'].setZoom(f);
		
				var latLng = Gobj['marker'].getPosition(); // returns LatLng object
				Gobj['map'].setCenter(latLng); // setCenter takes a LatLng object
		
				jQuery('#_google_map_preview').find('.m9-map-head').text(b);
				jQuery('#_google_map_preview').find('.m9-map-content').text(c);
			}
		);

	},
	
	fix_google_map : function(obj) {

		if (!obj) { obj = google_map_obj._now; }

		google_map_obj._selected = obj;

		var _info = {};
		var ani = jQuery(obj).attr("data-m9-execute");

		if (ani){
			var _anis = ani.split(";");
			for (var m=0;m<_anis.length;m++) {
				var _ani = _anis[m];
				var prop = m9_get_property(_ani);

				if (prop[0] == "google_map") {
					var prop = m9_get_property(_ani);		
					_info = prop[1];						
				}
			}
		}

		jQuery('#_google_address_search').val('');
		jQuery('#_google_title').val(_info['title']);
		jQuery('#_google_address').val(_info['address']);
		jQuery('#_google_x_pos').val(_info['x']);
		jQuery('#_google_y_pos').val(_info['y']);
		jQuery('#_google_zoom').val(_info['zoom']);

		M9GOOGLE_MAP.int(jQuery('#_google_map_preview')[0],prop,1);

		m9_layer_position('editWindow-googleMap',obj,'up');	
		edit_window_obj.view('editWindow-googleMap');					

	},

	'change' : function() {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		var obj = google_map_obj._selected;

		var Gobj = jQuery(obj).data('google_map');

		var b= jQuery('#_google_title').val();
		var c = jQuery('#_google_address').val();
		var d = jQuery('#_google_x_pos').val() * 1;
		var e = jQuery('#_google_y_pos').val() * 1;
		var f = jQuery('#_google_zoom').val() * 1;

		var newLatLng = new google.maps.LatLng(e,d);
	    Gobj['marker'].setPosition(newLatLng);
	    Gobj['map'].setZoom(f);

		var latLng = Gobj['marker'].getPosition(); // returns LatLng object
		Gobj['map'].setCenter(latLng); // setCenter takes a LatLng object

		jQuery(obj).find('.m9-map-head').text(b);
		jQuery(obj).find('.m9-map-content').text(c);

		var _param = "google_map({" +
		"'x':" + d + "," +
		"'y':" + e + "," +
		"'zoom':" + f + "," +
		"'address':'" + c + "'," +
		"'title':'" + b + "'" +
		"})";

		jQuery(obj).attr('data-m9-execute',_param);

		undo_obj._add(obj);
						
		obj_fadeOut('#editWindow-googleMap');	
		
	},
	
	'preview' : {
		
		set_zoom : function() {
			var Gobj = jQuery('#_google_map_preview').data('google_map');
			var _zoom = jQuery('#_google_zoom').val() * 1;	
			Gobj['map'].setZoom(_zoom);	
		},
		
		change_company : function() {
			var _str = jQuery('#_google_title').val();
			jQuery('#_google_map_preview .m9-map-head').html(_str);		
		},
		
		change_address : function() {
			var _str = jQuery('#_google_address').val();
			jQuery('#_google_map_preview .m9-map-content').html(_str);		
		}
		
	},

	handle : {
		
		int : function() {
			
			if (jQuery("#_google_map_setting_box").length == 0) {
				
				var _html = 
				'<div id="_google_map_setting_box" class="_setting_area_box" style="display:none;">' +
					'<div>' +
						'<a onclick="google_map_obj.handle.change_size();return false;" title="'+ msg_msg('fix_size') +'" data-alt-no="1" class="edit-btn _drag-btn-3 icon-arrows-alt hd-fix no"></a>' +						
						'<a onclick="google_map_obj.handle.change_map();return false;" title="'+ msg_msg('map_setting') +'" data-alt-no="1" class="edit-btn-2 _drag-btn-3 icon-map hd-copy no"><i class="edit-btn-popup-2"></i></a>' +
						'<a href="#" onclick="google_map_obj.handle.del();return false;" title="'+ msg_msg('delete') +'" data-alt-no="1" class="edit-btn _drag-btn-3 icon-del hd-remove"></a>' +					
					'</div>' +					
				'</div>';
				jQuery("body").append(_html);

				jQuery('#_google_map_setting_box').on('click',function() {
					jQuery(this).children().css('display','');
					element_obj.edit.convert_obj(google_map_obj._now); // 객체전송
				}).on('mouseleave',function() {
					jQuery(this).css('display','none');
				});
				
				if (M9_SET["navigator"] == 'ie') {
					var _html = '<iframe id="_google_map_setting_box_iframe" style="z-index:10;position:absolute;top:0;left:0;filter:alpha(opacity=0);opacity:0.0;-moz-opacity:0.0;overflow:hidden;border:none;display:none"></iframe>';				
					jQuery("body").append(_html);			
				}
					
			}
					
		},
		
		del : function() {		
			jQuery(google_map_obj._now).fadeOut(300,function() {
				var _re = this;
				jQuery(this).remove();
				google_map_obj._now = false;
				jQuery("#_google_map_setting_box").css('display','none');				
				undo_obj._add(_re);				
			});
		},

		change_size : function() {
			google_map_obj._selected = google_map_obj._now;
			jQuery("#_google_map_setting_box").css('display','none');
			resize_obj.stop_callback = function() {
				var obj = google_map_obj._selected;
				var Gobj = jQuery(obj).data('google_map');
				var center = Gobj['map'].getCenter();
				google.maps.event.trigger(Gobj['map'],"resize");
				Gobj['map'].setCenter(center); 
			}
			resize_obj.change(google_map_obj._now);
		},
		
		change_map : function() {
			google_map_obj.fix_google_map();
		},

		'check_enter' : function(event) {

			var keycode = event.keyCode || event.which;
			if (keycode === 13) {
				google_map_obj.get_ajax_address();
				return false;
			}

		}

	},

	remove_setting : function(obj) {

		jQuery(obj).find('.m9-google_map').each(function() {
			jQuery(this).html("");
			jQuery(this).css({'transform':'','background-color':'','position':'','overflow':''});
		});	
		
	}

}; //google_map_obj

