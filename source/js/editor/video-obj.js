var video_obj = {

	_now : false,
	_real : false, // 사이즈 변경을 위한 설정
	_scales : ['auto','16x9','4x3'],
	_class_front : 'm9-video-canvas-',
	ajax_url : '//app.mong9.com/index.cgi?page_code=ajax&code=get_video_url',

	int : function(obj) {

		video_obj.handle.int();
		
		if (jQuery('#editWindow-video').length == 0) {

			var _html = 
			'<ul class="_edit-list-1">' +
				'<li><input type="radio" name="_video_sorce_type" id="_video_sorce_type0" value="0" checked onchange="video_obj.type_change();return false;" class="_drag-btn-3"><label for="_video_sorce_type0">'+ msg_msg('enter_url') +'</label> <input type="radio" name="_video_sorce_type" id="_video_sorce_type1" value="1" onchange="video_obj.type_change();return false;" class="_drag-btn-3"><label for="_video_sorce_type1">'+ msg_msg('enter_code') +'(Object, Embed)</label></li>' +
				'<li id="_video_sorce_type_box0"><input type="text" id="_video_iframe_url" class="_drag-btn-3"></li>' +
				'<li id="_video_sorce_type_box1" style="display:none"><textarea id="_video_code_source" class="_drag-btn-3"></textarea></li>' +
				'<li><input type="radio" name="_video_aspectRatio_type" id="_video_aspectRatio_type0" value="auto" onchange="video_obj.fix_ratio(this.value);return false;" class="_drag-btn-3"><label for="_video_aspectRatio_type0"><b>auto</b></label> <input type="radio" name="_video_aspectRatio_type" id="_video_aspectRatio_type1" value="16x9" onchange="video_obj.fix_ratio(this.value);return false;" class="_drag-btn-3"><label for="_video_aspectRatio_type1"><b>16x9</b></label> <input type="radio" name="_video_aspectRatio_type" id="_video_aspectRatio_type2" value="4x3" checked onchange="video_obj.fix_ratio(this.value);return false;" class="_drag-btn-3"><label for="_video_aspectRatio_type2"><b>4x3</b></label></li>' +		
			'</ul>' +
			'<button onclick="video_obj.change()" class="curtain-btn editor-btn-yes _drag-btn-3">OK</button>' +
			'<span id="_video_return" style="display:none"></span>';

			edit_window_obj.int("editWindow-video",_html,msg_msg('set_video'));

		}

		var mouseover_func = function(e,obj) {
				
			var _target = obj;
			var et = e.target;
			var J_et = jQuery(et);
			
			if (_target) {

				jQuery("#_video_setting_box>div").css('display','none');				
				video_obj._now = et;		
				var m = _get_box_info(et,1);
				jQuery("#_video_setting_box").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h']});
				if (M9_SET["navigator"] == 'ie') { jQuery("#_video_setting_box_iframe").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h']}); }

			} else {

				if (!jQuery(et).is('#_video_setting_box') && jQuery(et).parents('#_video_setting_box').length == 0) {					
					jQuery("#_video_setting_box").css({display:"none"});				
					if (M9_SET["navigator"] == 'ie') { jQuery("#_video_setting_box_iframe").css({display:"none"}); }					
				}

			}
				
		};
	
		editor_selector.set(obj,[
			{ '_type' : 'mouseover' , '_kind' : 'is_parents' , '_selector' : 'iframe,object' , '_func' : mouseover_func, '_ignore' : 1 }
		]);
		
	},

	check_viedo_and_set : function() {
		
		var J_video_now = jQuery(video_obj._now);
		
		if (!J_video_now.is('[class*=' + this._class_front + ']') && J_video_now.parents('[class*=' + this._class_front +']').length == 0) { // m9-video-canvas-16x9 형식의 class 명			
			var _class = this._class_front + 'auto';
			var _w = J_video_now.css('width');
			var _h = J_video_now.css('height');			
			J_video_now.wrap('<div class="'+_class+'"></div>');			
			J_video_now.wrap('<div></div>');
			J_video_now.css({'width':_w,'height':_h}).removeAttr('width').removeAttr('height'); // m9-video-canvas-auto 이므로 iframe에 width,height 값추가
		}
	},

	get_scale : function(obj) {
		if (!obj) { obj = video_obj._now; }
		var _target = jQuery(obj).parents('[class*='+this._class_front+']')[0];
		var _class = jQuery(_target).attr('class');
		var _scale = 'auto';
		if (_class) {
			for (var i=0;i<this._scales.length;i++) {
				var a = this._class_front + this._scales[i];
				if (_class.search(a) > -1) {				
					_scale = this._scales[i];
				}
			}
		}
		return _scale;
	},	
	
	check_scale : function(Dscale) {
		var index = 0;
		for (var i=0;i<this._scales.length;i++) {
			if (this._scales[i] == Dscale) {
				index = i;
			}
		}
		var _id = '_video_aspectRatio_type' + index;
		jQuery('#'+_id).attr('checked',true);
	},	
	
	view : function(obj) {

		this.check_viedo_and_set();
		
		if (obj) { video_obj._now = obj; }

		if (jQuery(video_obj._now).is('iframe')) {			
			jQuery('#_video_iframe_url').val(jQuery(video_obj._now).attr('src'));
			jQuery('#_video_code_source').val("");
			m9_set_radio_index('_video_sorce_type',0);
		} else {
			jQuery('#_video_iframe_url').val("");
			jQuery('#_video_code_source').val(jQuery(video_obj._now)[0].outerHTML);
			m9_set_radio_index('_video_sorce_type',1);	
		}
		
		this.type_change();			
		var _scale = this.get_scale();
		this.check_scale(_scale);

		jQuery("#_video_setting_box").css({display:"none"});
		m9_layer_position('editWindow-video',obj,'up',m9_getObject('body'));				
		edit_window_obj.view('editWindow-video');
		
	},

	fix_ratio : function(Dclass) {

		var _w = jQuery(video_obj._now).css('width');
		var _h = jQuery(video_obj._now).css('height');

		var _target = jQuery(video_obj._now).parents('[class*='+this._class_front+']')[0];
		
		for (var i=0;i<this._scales.length;i++) {
			jQuery(_target).removeClass(this._class_front + this._scales[i])
		}
		jQuery(_target).addClass(this._class_front + Dclass);

		if (Dclass == 'auto') {
			jQuery(video_obj._now).css({'width':_w,'height':_h});			
			video_obj._real = video_obj._now;
		} else {
			jQuery(_target).css({'width':_w,'height':_h});					
			video_obj._real = video_obj._now;
			video_obj._now = _target;
		}		

		video_obj.change_size_finished();

	},
			
	type_change : function() {
		var _index = m9_get_radio_index('_video_sorce_type');
		for (var i=0;i<2;i++) {
			var _display = (i == _index) ? "block" : "none";
			var _id = '_video_sorce_type_box' + i;
			jQuery('#' + _id).css('display',_display);
		}
	},

	change : function() {

		var obj = video_obj._now;

		var _index = m9_get_radio_index('_video_sorce_type');

		var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);
		
		if (_index == 0) {

			var _url = jQuery('#_video_iframe_url').val();	

			m9_ajax_load_contents(
				video_obj.ajax_url + "&video=" + encodeURIComponent(_url),
				"_video_return",
				{whenever:true},
				function() {

					var embed_url = jQuery('#_video_return').text();

					if (embed_url != '') {
						_url = embed_url;
					}

					if (!jQuery(video_obj._now).is("iframe")) {					
						var _obj = (jQuery(video_obj._now).is('object')) ? obj : jQuery(video_obj._now).parents('object')[0];
						jQuery(video_obj._now).replaceWith('<div id="'+random_class+'"><iframe src="' + _url + '" frameborder="0" allowfullscreen></iframe></div>');
						video_obj._now = jQuery('#'+random_class).children()[0];
						jQuery(video_obj._now).unwrap();					
					} else {						
						jQuery(video_obj._now).attr('src',_url);		
					}

					jQuery('#_video_iframe_url').val(_url);
					video_obj.after_change();
				}
			);

		} else {

			jQuery(video_obj._now).replaceWith('<div id="'+random_class+'">'+jQuery('#_video_code_source').val()+'</div>');
			video_obj._now = jQuery('#'+random_class).children()[0];
			jQuery(video_obj._now).unwrap();

			video_obj.after_change();

		}		

	},

	after_change : function() {

		jQuery('#_video_return').text('');
		video_obj._real = video_obj._now;
		if (video_obj.get_scale() != 'auto') {
			video_obj._now = jQuery(video_obj._now).parents('[class*=' + video_obj._class_front + ']')[0];	
		}
		video_obj.change_size_finished();

		undo_obj._add(video_obj._now);
		obj_fadeOut('#editWindow-video');

	},

	change_size_finished : function(obj) {

		var J_video_now = jQuery(video_obj._now);
		
		var _w = J_video_now.css('width');
		var _h = J_video_now.css('height');
		
		var _scale = video_obj.get_scale(video_obj._real);

		if (_scale != 'auto') {
			J_video_now.removeClass('_aspectRatio').css({'width':_w,'height':'','min-width':'','min-height':'','max-width':'','max-height':''}).removeAttr('width').removeAttr('height'); // 비율유지 위해	
			jQuery(video_obj._real).removeClass('_aspectRatio').css({'width':'','height':'','min-width':'','min-height':'','max-width':'','max-height':''}).removeAttr('width').removeAttr('height'); // 비율유지 위해						
		} else {
			var _parent = J_video_now.parents('[class*=' + video_obj._class_front + ']')[0];	
			jQuery(_parent).removeClass('_aspectRatio').css({'width':'','height':'','min-width':'','min-height':'','max-width':'','max-height':''}).removeAttr('width').removeAttr('height'); // 비율유지 위해						
			J_video_now.removeClass('_aspectRatio').css({'width':_w,'height':_h,'min-width':'','min-height':'','max-width':'','max-height':''}).removeAttr('width').removeAttr('height'); // 비율유지 위해	
		}
		video_obj._now = video_obj._real;
				
	},
		
	handle : {
		
		int : function() {
			
			if (jQuery("#_video_setting_box").length == 0) {
				
				var _html = 
				'<div id="_video_setting_box" class="_setting_area_box" style="display:none;">' +
					'<div>' +
						'<a onclick="video_obj.handle.change_size();return false;" title="'+ msg_msg('fix_size') +'" class="edit-btn _drag-btn-3 icon-arrows-alt hd-fix no"></a>' +						
						'<a onclick="video_obj.view();return false;" title="'+ msg_msg('set_video') +'" class="edit-btn-2 _drag-btn-3 icon-video hd-copy no"><i class="edit-btn-popup-2"></i></a>' +
						'<a onclick="video_obj.handle.del();return false;" title="'+ msg_msg('delete') +'" class="edit-btn _drag-btn-3 icon-del hd-remove"></a>' +		
					'</div>' +					
				'</div>';
				jQuery("body").append(_html);

				jQuery('#_video_setting_box').on('click',function() {
					jQuery(this).children().css('display','');

					var _target = (jQuery(video_obj._now).parents('[class*=' + video_obj._class_front +']').length > 0) ? jQuery(video_obj._now).parents('[class*=' + video_obj._class_front +']')[0] : video_obj._now;

					element_obj.edit.convert_obj(_target); // 객체전송
				}).on('mouseleave',function() {
					jQuery(this).css('display','none');
				});
				
				if (M9_SET["navigator"] == 'ie') {
					var _html = '<iframe id="_video_setting_box_iframe" style="z-index:10;position:absolute;top:0;left:0;filter:alpha(opacity=0);opacity:0.0;-moz-opacity:0.0;overflow:hidden;border:none;display:none"></iframe>';				
					jQuery("body").append(_html);			
				}
					
			}
					
		},
		
		del : function() {	
			
			var J_video_now = jQuery(video_obj._now);

			if (J_video_now.parents('[class*=' + video_obj._class_front + ']').length > 0) {
				J_video_now = J_video_now.parents('[class*=' + video_obj._class_front + ']');
			}
			J_video_now.fadeOut(300,function() {
				var _re = this;
				jQuery(this).remove();
				video_obj._now = false;
				jQuery("#_video_setting_box").css('display','none');				
				undo_obj._add(_re);				
			});
		},
		
		change_size : function() {

			jQuery("#_video_setting_box").css('display','none');
						
			video_obj.check_viedo_and_set();			

			video_obj._real = video_obj._now;
			var _scale = video_obj.get_scale();

			if (_scale != 'auto') {
				video_obj._now = jQuery(video_obj._now).parents('[class*=' + video_obj._class_front + ']')[0];				
				jQuery(video_obj._now).addClass('_aspectRatio'); // 비율유지 위해
			}
	
			resize_obj.stop_callback = function() {
				video_obj.change_size_finished();
				video_obj._real = undefined;
			}	
						
			resize_obj.change(video_obj._now);

		}
		
	}
	
}; //video_obj