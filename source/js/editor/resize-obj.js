/*
태그(img)이거나, class="_aspectRatio" 이면 비율 유지
m9-img-box : 배경형
*/
var resize_obj = {

	_now : false,
	stop_callback : false,
				
	int : function() {

		if (jQuery("#_resize_area").length == 0) {
			
			var _html = '<div id="_resize_area" style="display:none" title="'+ msg_msg('msg_8') +'">' +
			'<span id="_resize_area_msg">_</span>' +
			'<div style="position:absolute;top:0;left:0;">' +
			'<a href="#" onclick="resize_obj.optimization();return false;" title="'+ msg_msg('msg_7') +'" data-alt-no="1" class="edit-btn icon-arrows-alt hd-fix no"></a>' +
			'</div>' + 
			'</div>';
			
			jQuery("body").append(_html);

			if (M9_SET["navigator"] == 'ie') {
				var _html = '<iframe id="_resize_ie_iframe" style="z-index:10;position:absolute;top:0;left:0;filter:alpha(opacity=0);opacity:0.0;-moz-opacity:0.0;overflow:hidden;border:none;display:none"></iframe>';				
				jQuery("body").append(_html);			
			}
				
			// [크기 변경] 더블클릭시
			jQuery("#_resize_area").on("dblclick",function() {
				jQuery(resize_obj._now).css({top:'',left:''}); // top,left 값 삭제	
				jQuery("#_resize_area").css("display","none");
				if (M9_SET["navigator"] == 'ie') {
					jQuery("#_resize_ie_iframe").css("display","none");
				}
		
				jQuery('#_resize_area').resizable('destroy');
				undo_obj._add(resize_obj._now);
								
				resize_obj._now = false;
				resize_obj.stop_callback = false;
			});		
		}

	}, //int

	optimization : function(){

		var J_resize_now = jQuery(resize_obj._now);

		if (J_resize_now.hasClass('m9-img-box')) { // 배경형 이미지일 경우

			var _img = J_resize_now.find('img')[0];
			var _h = m9_get_num(jQuery(_img).css('height'));
			var p_h = m9_get_num(J_resize_now.css('height'));
			var _gap = (p_h - _h);

			if (_gap > 10 || _gap < -10) {

				var _span = J_resize_now.children('span')[0];

				var _w = m9_get_num(jQuery(_img).css('width'));
				var _h_per = (_h / _w) * 100;

				element_obj.change_css_hash_by_mode(_span,{'width':'','padding-bottom':_h_per+'%'});
				element_obj.change_css_hash_by_mode(_img,{'top':'0','left':'0'});

			}

			element_obj.change_css_hash_by_mode(J_resize_now[0],{'width':'','height':''});

		} else {
			element_obj.change_css_hash_by_mode(J_resize_now[0],{'width':'','height':'','max-width':'','max-height':'','min-width':'','min-height':''});
		}

		// 모드 처리
		var _mode = m9_mode_obj.get();		
		if (_mode != '') {
			element_obj.change_css_by_mode('width','100%');
		}
			
		jQuery("#_resize_area").dblclick();
		
	},
		
	change : function(_target,_func) {

		if (jQuery("#_resize_area").length == 0) { resize_obj.int(); }
		resize_obj._now = _target;
		
		var m = _get_box_info(_target,1);
		var J_target = jQuery(_target);
		
		var _m_l = J_target.css('margin-left');
		var _m_t = J_target.css('margin-top');

		var _w = parseInt(m9_get_num(m['w']));
		var _h = parseInt(m9_get_num(m['h']));
				
		jQuery('#_resize_area_msg').text(_w + ' X ' + _h);
						
		jQuery("#_resize_area").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h'],'margin-left':_m_l,'margin-top':_m_t});
		if (M9_SET["navigator"] == 'ie') {					
			jQuery("#_resize_ie_iframe").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h'],'margin-left':_m_l,'margin-top':_m_t});				        
		}

		var _tag_name = J_target.prop("tagName").toLowerCase();
		var aspectRatio = (_tag_name == "img" || J_target.hasClass('_aspectRatio') || J_target.hasClass('circle')) ? true : false;		

		var _mx = get_inline_style(_target,'max-width');	
		var _img_p_w = 0; // image's possible width
		if (_mx != '') {
			_img_p_w = m9_get_num(_mx);
			_img_p_w = jQuery(_target).css('max-width');
		} else {				
			_img_p_w = m9_get_num(J_target.parents(editor.editable).css("width"));				
		}
	
		var _min = 10;
		var del_width = 0;
		if (aspectRatio == false && !J_target.hasClass('_aspectAll') && !J_target.hasClass('m9-img-box')) {
			del_width = 1;			
		}
				
		undo_obj._add(_target);

		element_obj._now = _target;

		jQuery('#_resize_area').resizable({
		 	handles: 'all',
		 	aspectRatio: aspectRatio,	
		 	maxWidth : _img_p_w,
		 	minWidth : _min,
		    resize : function(event,ui) {
		    	var _w = parseInt(ui.size.width);
		    	var _h = parseInt(ui.size.height);
		    	var _w2 = _w + "px";
		    	var _h2 = _h + "px";
		    	var _t2 = ui.position.top + "px";
		    	var _l2 = ui.position.left + "px"; 	
		    	if (jQuery(_target).css('display') == 'inline') { jQuery(_target).css('display','inline-block'); } // inline 은 크기변경 안됨 inline-block 으로 변경

				element_obj.change_css_by_mode('width',_w2);
				element_obj.change_css_by_mode('height',_h2);
				//element_obj.change_css_by_mode('max-width','100%');

				var _l = m9_getRealOffsetLeft(_target) + "px";
				var _t = m9_getRealOffsetTop(_target) + "px";
				jQuery(this).css({top:_t,left:_l});
				jQuery('#_resize_area_msg').text(_w + ' X ' + _h);
				if (M9_SET["navigator"] == 'ie') {					
					jQuery("#_resize_ie_iframe").css({width:_w2,height:_h2,left:_l,top:_t});				        
				}
			},
			stop : function(event,ui) {

				var J_target = jQuery(_target);
			
				if (del_width == 1) { // div등

		    		var _w = parseInt(ui.size.width);
		    		var _h = parseInt(ui.size.height);
					J_target.css({'width':_w,'max-width':'100%','height':'','min-height':_h});	
					var _h2 = J_target.css('height');
				
					if (m9_get_num(_h2) > _h) {
						J_target.css('min-height','');
						jQuery('#_resize_area').css('height',_h2);						
					}
									
				} else {
					if (J_target.is('img')) {												
						J_target.css('height','');						
					}
				}

				// 모드 처리
				var _mode = m9_mode_obj.get();
				
				if (_mode != '') {
									
					var _key = 'data-' + m9_mode_obj.get_m9_mode_name('');

					if (!J_target.attr(_key)) {
						J_target.attr(_key,'');
					}

					var _key = 'data-' + m9_mode_obj.get_m9_mode_name(_mode);

					var _style = J_target.attr(_key);

					var _styles = {};
					if (_style) {
									
						var f = _style.split(';');
						for (var i=0;i<f.length;i++) {
							var g = f[i].split(':');				
							var _k = jQuery.trim(g[0]);
							if (_k != 'width' && _k != 'max-width' && _k != 'min-width' && _k != 'height' && _k != 'max-height' && _k != 'min-height') {
								_styles[_k] = jQuery.trim(g[1]);
							}
						}
					}

					var Dvar = '';
					for (var i in _styles) {
						if (Dvar != '') { Dvar += ';'; }
						if (i != '' && _styles[i] != undefined) {
							Dvar += i +':'+_styles[i];
						}
					}

					var _css = m9_mode_obj.get_style_by_str_array([Dvar,J_target.attr('style')]); // 스타일 합치기
					J_target.attr(_key,_css);

				}

				if (resize_obj.stop_callback) {							
					resize_obj.stop_callback(resize_obj._now);
				}
				
			}
		});
			
	} //change
													
}; //resize_obj