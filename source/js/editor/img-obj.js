var img_obj = {

	_now : false,
	_status : 0,
	
	'defaults' : {
		'upload_url' : '',
		'img_max_width' : 1000
	},

	_unit : 100,
		
	settings : {},
	_img_before_style : '',

	int : function(obj,_hash) {

		this.settings = m9_get_vars(_hash,this.defaults);
		
		img_obj.handle.int();
		img_obj.handle2.int();

		var mouseover_func = function(e,obj) {

			if (img_obj._status == 1) { return false; }

			if (editor.handle.sorting_obj) { return false; }
						
			var _target = obj;
			var et = e.target;
			var J_et = jQuery(et);

			if (_target && editor.event_doing.get() == 0) {

				if (J_et.is(editor._ignore)) { return false; }

				if (J_et.parents('.ui-sortable-handle').length > 0) { return false;	} // 순서이동중일땐 무시
								
				if (J_et.parents('.m9-img-box').length > 0) {
					et = J_et.parents('.m9-img-box')[0];
					jQuery('#_img_set_resize2').css('display','inline-block');
				} else {
					jQuery('#_img_set_resize2').css('display','none');					
				}

				img_obj._now = et;

				var m = _get_box_info(et,1);
				jQuery("#_img_setting_box>div").css("display",'none');
				jQuery("#_img_setting_box").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h']});
				if (M9_SET["navigator"] == 'ie') {
					jQuery("#_img_setting_box_iframe").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h']});
				}
				
				img_obj.handle.change_img_setting_box(0);				
				
			} else {

				if (img_obj._status == 1) { return false; }
				if (!J_et.is('#_img_setting_box') && J_et.parents('#_img_setting_box').length == 0) {					
					jQuery("#_img_setting_box").css({display:"none"});				
					if (M9_SET["navigator"] == 'ie') {
						jQuery("#_img_setting_box_iframe").css({display:"none"});			
					}					
				}
								
			}
				
		};

		editor_selector.set(obj,[
			{ '_type' : 'mouseover' , '_kind' : 'is' , '_selector' : 'img' , '_func' : mouseover_func, '_ignore' : 0 }
		]);

		drop_upload_obj.int(obj);

	},

	handle2 : {

		int : function() {

			if (jQuery("#_img_resize_box").length == 0) {
				
				var _html = '<div id="_img_resize_box" style="display:none">' +
					'<div style="position:absolute;z-index:10;padding:10px">' +
						'<a href="#" onclick="img_obj.handle2.fixed();return false;" title="'+ msg_msg('apply') +'" data-alt-no="1" class="edit-btn icon-ok hd-html"></a>' + // 적용
						'<a href="#" onclick="img_obj.handle2.fix_optimum();return false;" title="'+ msg_msg('optimal') +'" data-alt-no="1" class="edit-btn icon-optimal hd-html"></a>' + // 최적
						'<a href="#" onclick="img_obj.handle2.fix_size(1);return false;" title="'+ msg_msg('size_up') +'" data-alt-no="1" class="edit-btn icon-plus-2 hd-fix"></a>' + // 크기증가
						'<a href="#" onclick="img_obj.handle2.fix_size(-1);return false;" title="'+ msg_msg('size_down') +'" data-alt-no="1" class="edit-btn icon-minus-2 hd-fix"></a>' + // 크기감소
					'</div>' +
					'<div id="_img_wrapper" style="position:absolute;padding:0;margin:0">' +
						'<img id="_img_resize_img" src="' + M9_SET["mong9_url"] + 'source/img/empty.png" alt=""  />' +					
					'</div>' +
				'</div>';
				
				jQuery("body").append(_html);

				jQuery("#_img_set_resize2").click(function() { // 위치변경

					var _img = jQuery(img_obj._now).find('img'); // 이미지

					img_obj._img_before_style = _img.attr('style');

					var _w = m9_get_num(_img.css("width"));
					var _h = m9_get_num(_img.css("height"));						
					var _l = m9_get_num(_img.css("left"));	
					var _t = m9_get_num(_img.css("top"));	
					
					var _outbox = jQuery(img_obj._now); // 가림박스
					var _w2 = m9_get_num(_outbox.css("width"));
					var _h2 = m9_get_num(_outbox.css("height"));					
					var _l2 = m9_getRealOffsetLeft(_outbox[0]);
					var _t2 = m9_getRealOffsetTop(_outbox[0]);
		
					jQuery("#_img_resize_img").attr({'src':_img.attr('src')});
		
					var unit = img_obj._unit;
		
					var w_s = _w - _w2;
					var box_w = _w + w_s;
					
					var h_s = _h - _h2;
					var box_h = _h + h_s;
		
					var x2 = _l + w_s;
					var y2 = _t + h_s;
								
					jQuery("#_img_wrapper").css({width:box_w+'px',left:-w_s+'px',height:box_h+'px',top:-h_s+'px'});		
					jQuery("#_img_resize_img").css({width:_w,height:'','max-width':'','max-height':'','min-width':'','min-height':'',top:y2+"px",left:x2+"px"});		
					jQuery("#_img_resize_img").draggable({containment:"#_img_wrapper",scroll:false});
											
					curtain.show("_img_resize_box",{top:_t2,left:_l2,width:_w2,height:_h2});
					
				});
									
			}
		},

		fixed : function() {
			
			var _img = jQuery("#_img_resize_img"); // 이미지
			var _w = m9_get_object_size2(_img[0],'width');
			var _h = m9_get_object_size2(_img[0],'height');			
			
			var _l = m9_get_num(_img.css("left"));	
			var _t = m9_get_num(_img.css("top"));	
	
			var _outbox = jQuery('#_img_resize_box'); // 박스		
			var _w2 = m9_get_object_size2(_outbox[0],'width');
			var _h2 = m9_get_object_size2(_outbox[0],'height');					
			var _l2 = m9_getRealOffsetLeft(_outbox[0]);
			var _t2 = m9_getRealOffsetTop(_outbox[0]);
			
			
			var _wrapbox = jQuery("#_img_wrapper");
			var _w3 = m9_get_object_size2(_wrapbox[0],'width');
			var _h3 = m9_get_object_size2(_wrapbox[0],'height');	
			var _l3 = m9_get_num(_wrapbox.css("left"));		
			var _t3 = m9_get_num(_wrapbox.css("top"));	
	
			var _tt = _t3 + _t;
			var _ll = _l3 + _l;		
					
			jQuery(img_obj._now).find('img').css({width:_w+'px',height:_h+'px','min-width':_w+'px','min-height':_h+'px'}).css({top:_tt+'px',left:_ll+'px'});		

			img_obj.handle.convert(1); // 배경형 정보변환
				
			curtain.hide();
	
		},
		
		fix_optimum : function() {

			var _img = jQuery("#_img_resize_img"); // 이미지
	
			var _outbox = jQuery('#_img_resize_box'); // 박스			
			var box_w = m9_get_num(_outbox.css("width"));
			var box_h = m9_get_num(_outbox.css("height"));

			var img_w = m9_get_num(_img.css('width'));
			var img_h = m9_get_num(_img.css('height'));	
			
			var ratio_w = box_w / img_w;
			var ratio_h = box_h / img_h;

			var re_h = img_h * ratio_w;
	
			if (re_h < box_h) {
				img_w = img_w * ratio_h;
				img_h = box_h;
			} else {
				img_w = box_w;
				img_h = re_h;
			}
	
			var wrap_w = (img_w - box_w) + img_w;
			var wrap_h = (img_h - box_h) + img_h;
			
			var _top = ((wrap_h - box_h) / -2) + 'px';
			var _left = ((wrap_w - box_w) / -2) + 'px';
	
			var img_top = ((wrap_h - img_h) / 2) + 'px';
			var img_left = ((wrap_w - img_w) / 2) + 'px';
	
			jQuery('#_img_wrapper').css({width:wrap_w,height:wrap_h,top:_top,left:_left});
			_img.css({'width':img_w,height:'',top:img_top,left:img_left});

			jQuery('#_optimum_img').remove();
			
		},
	
		fix_size : function(Dvar) {
		
			var _img = jQuery("#_img_resize_img"); // 이미지
			var _w = m9_get_num(_img.css("width"));
			var _h = m9_get_num(_img.css("height"));	
			var _l = m9_get_num(_img.css("left"));	
			var _t = m9_get_num(_img.css("top"));	
	
			var _outbox = jQuery('#_img_resize_box'); // 박스			
			var _w2 = m9_get_num(_outbox.css("width"));
			var _h2 = m9_get_num(_outbox.css("height"));
			var _l2 = m9_getRealOffsetLeft(_outbox[0]);
			var _t2 = m9_getRealOffsetTop(_outbox[0]);
	
			var _scale = _h / _w;
	
			var unit = img_obj._unit * Dvar;
			
			_w = _w + unit;
			_h = _h + (unit * _scale);
							
			var w_s = _w - _w2;
			var box_w = _w + w_s;
				
			var h_s = _h - _h2;
			var box_h = _h + h_s;
	
			if (box_w < _w2) {
				error_msg(msg_msg('msg_58'));
				return false;	
			}
			
			if (box_h < _h2) {
				error_msg(msg_msg('msg_57'));
				return false;	
			}
			
			var _ww = (unit/2) + _l;
			var _hh = ( (unit * _scale)/2) + _t;
			
			if (_ww < 0) { _ww = 0; } else if ((_ww + _w) > box_w) { _ww = box_w - _w; }
			if (_hh < 0) { _hh = 0; } else if ((_hh + _h) > box_h) { _hh = box_h - _h; }
			
			jQuery("#_img_wrapper").css({width:box_w+'px',left:-w_s+'px',height:box_h+'px',top:-h_s+'px'});				
			_img.css({width:_w+"px",height:_h+"px",top:_hh+'px',left:_ww+'px'});	

			//img_obj.handle.convert(); // 배경형 정보변환
					
		}
			
	},
	
	handle : {
				
		int : function() {

			var _f = img_obj.settings['upload_url'].split("?");

			var vals = [];
			if (_f[1]) {
				vals = _f[1].split("&");
			}
							
			if (jQuery("#_img_setting_box").length == 0) {
				
var _html = '' +
'<div id="_img_setting_box" class="_setting_area_box" style="display:none;">' +
	'<div>' +
		'<div id="_box_0" style="vertical-align:middle;display:none">' +
			((M9_SET["navigator"] == 'ie' || M9_SET["navigator"] == 'safari') ? '<a href="#" onclick="img_obj.handle.view_upload_form();return false;" title="'+ msg_msg('upload') +'" data-alt-no="1" class="edit-btn _drag-btn-3 icon-upload hd-html"><i class="bi bi-cloud-upload"></i></a>' : '<a href="#" onclick="img_obj.handle.search_file();return false;" title="'+ msg_msg('upload') +'" data-alt-no="1" class="edit-btn _drag-btn-31111 icon-upload hd-html"></a>') + // 업로드			
			'<a href="#" onclick="img_obj.handle.change_size();return false;" title="'+ msg_msg('fix_size') +'" data-alt-no="1" class="edit-btn icon-arrows-alt hd-fix no m9-only-master"></a>' + // 크기변경
			'<a href="#" onclick="img_obj.handle.view_property();return false;" title="'+ msg_msg('set_link') +'" data-alt-no="1" class="edit-btn-2 _drag-btn-3 icon-createLink-2 hd-fix no"><i class="edit-btn-popup-2"></i></a>' + // 링크변경
			'<a onclick="img_obj.handle.view_setting();return false;" title="'+ msg_msg('setting') +'" data-alt-no="1" class="edit-btn-2 _drag-btn-3 icon-setting hd-fix no"><i class="edit-btn-popup-2"></i></a>' + // 설정
			'<a onclick="img_obj.handle.type_change();return false;" title="'+ msg_msg('set_type') +'" data-alt-no="1" class="edit-btn _drag-btn-3 icon-refresh-2 hd-fix no"></a>' + // 타입변경
			'<a id="_img_set_resize2" title="'+ msg_msg('set_location') +'" data-alt-no="1" class="edit-btn icon-position hd-etc2"></a>' + // 위치변경
			'<a onclick="img_obj.handle.del();return false;" title="'+ msg_msg('delete') +'" data-alt-no="1" class="edit-btn _drag-btn-3 icon-del hd-remove"></a>' + // 삭제
		'</div>' +			
		'<div id="_box_1" style="display:none">' +
			'<form id="edit_img_upload_form" action="' + _f[0] + '" enctype="multipart/form-data" method="post" onsubmit="return  img_obj.submit(arguments[0])">' +
				'<input type="hidden" name="img_max_width" value="' + img_obj.settings['img_max_width'] + '">';

				for (var i=0;i<vals.length;i++) {
					var _val = vals[i].split("=");
				 	_html += '<input type="hidden" name="' + _val[0] + '" value="' + _val[1] + '" />';
				}
 
_html += '' +
				'<div class="img_obj_upload_box"><input type="file" id="img_upload_file" name="img_upload_file" class="input-1" title="'+ msg_msg('upload') +'"  /><input type="submit" value="'+ msg_msg('upload') +'" class="hd-copy input-1" /><a onclick="img_obj.handle.upload_cancel();return false;" class="hd-remove input-1"><i class="bi bi-close"></i>취소</a></div>' +
			'</form>' +
		'</div>' +			
	'</div>'+						
'</div>';

				jQuery("body").append(_html);

				jQuery('#_img_setting_box').on('click',function() {

					jQuery(this).children().css('display','');
					element_obj.edit.convert_obj(img_obj._now); // 객체선택(전송)

				}).on('mouseleave',function() {
					jQuery(this).css('display','none');
				});
				
				if (M9_SET["navigator"] == 'ie') {
					var _html = '<iframe id="_img_setting_box_iframe" style="z-index:10;position:absolute;top:0;left:0;filter:alpha(opacity=0);opacity:0.0;-moz-opacity:0.0;overflow:hidden;border:none;display:none"></iframe>';				
					jQuery("body").append(_html);			
				}
	
				if (M9_SET["navigator"] != 'ie' && M9_SET["navigator"] != 'safari') {
					jQuery("#img_upload_file").change(function() {
						jQuery("#edit_img_upload_form").submit();
					});
				}
			
			}
					
		},
		
		del : function() {
			jQuery(img_obj._now).fadeOut(300,function() {
				var _re = img_obj._now;
				jQuery(img_obj._now).remove();
				img_obj._now = false;
				jQuery("#_img_setting_box").css('display','none');				
				undo_obj._add(_re);
			});
		},

		type_change : function() {

			var J_img_now = jQuery(img_obj._now);

			var _mode_kinds = ['data-m9-style'];
			var orders = m9_mode_obj.order;
			for (var i=0;i<orders.length;i++) {
				_mode_kinds.push('data-m9-'+ orders[i] +'-style');
			}

			var msg = "";
			if (J_img_now.hasClass('m9-img-box')) { // 배경형 => 기본형
		
				var _class = J_img_now.attr('class');
				var _style = J_img_now.attr('style');		
				
				var _img = J_img_now.find('img')[0];			

				// data-m9-style,data-m9-m-style,data-m9-e-style 제거
				for (var i=0;i<_mode_kinds.length;i++) {
					jQuery(_img).removeAttr(_mode_kinds[i]);
				}

				var rand_id = m9_random_id(_img);
				
				jQuery(_img).attr({'class':_class,'style':_style}).removeClass('m9-img-box').css({'width':'','height':'','max-width':'','max-height':'','min-width':'','min-height':'','position':'','top':'','left':''});			
				J_img_now[0].outerHTML = jQuery(_img)[0].outerHTML;
				img_obj._now = jQuery('#'+rand_id)[0]; // 오브젝트 교체				
				jQuery('#'+rand_id).removeAttr('id');
								
				msg = msg_msg('basic_mode');
				jQuery('#_img_set_resize2').css('display','none');

			} else if (J_img_now.prop('tagName').toLowerCase() == 'img') { // 기본형 => 배경형	

				var _w = get_inline_style(J_img_now[0],'width');
				var _h = m9_get_object_size2(J_img_now[0],'height');				

				// data-m9-style,data-m9-m-style,data-m9-e-style 제거
				for (var i=0;i<_mode_kinds.length;i++) {
					J_img_now.removeAttr(_mode_kinds[i]);
				}

				var _class = J_img_now.attr('class');
				var _style = J_img_now.attr('style');				
				J_img_now.attr({'class':'','style':''}).removeClass('m9-fullimg').css({position:'absolute','top':0,'left':0,'width':'100%','height':_h,'min-width':'100%','min-height':_h});	
				J_img_now.wrap('<span class="m9-img-box"></span>');
				J_img_now.parent().attr({'class':_class,'style':_style}).css({'width':_w,'height':_h}).addClass('m9-img-box');	
				img_obj._now = J_img_now.parent()[0]; // 오브젝트 교체
				img_obj.handle.convert(); // 배경형 정보변환
													
				msg = msg_msg('background_mode');				
				jQuery('#_img_set_resize2').css('display','inline-block');

			} else {
				error_msg(msg_msg('msg_27')); // 현재 항목은 타입변경이 불가능합니다
				return false;				
			}
						
			var _str = msg_msg('msg_28').msg_format(msg); // "[" + msg + "]형으로 변경완료"	
			error_msg(_str);
			jQuery(img_obj._now).animate({opacity:0},400,function() {
				jQuery(this).animate({opacity:1},400,function() {
					jQuery(this).css('opacity','');
				});
			});
		},
		
		convert : function(Dtype) {
		
			var _obj = jQuery(img_obj._now);
			var is_img = _obj.children().eq(0);
			if (is_img.prop('tagName') == "IMG") {
				is_img.wrap('<span></span>');				
			}
			var _img = _obj.find('img');
			var _p_img = _img.parent();
			
			var _w = m9_get_num(_obj.css('width'));
			var _h = m9_get_num(_obj.css('height'));
			
			var i_w = m9_get_num(_img.css('width'));
			var i_h = m9_get_num(_img.css('height'));			
			var i_t = m9_get_num(_img.css('top'));
			var i_l = m9_get_num(_img.css('left'));
			
			var _h_per = (_h / _w) * 100;

			var _i_w_per = (i_w / _w) * 100;
			var _i_t_per = (i_t / _h) * 100;
			var _i_l_per = (i_l / _w) * 100;

			//_obj.css({'height':''});
			//_p_img.css({'width':'','padding-bottom':_h_per+'%'});									

			element_obj.change_css_hash_by_mode(_obj[0],{'height':''});
			element_obj.change_css_hash_by_mode(_p_img[0],{'width':'','padding-bottom':_h_per+'%'});


			// 이미지크기를 변경하면서, 초기 스타일값과 달라진다.
			// 완료했을때, 원래 style로 복원
			if (Dtype == '1') {
				_img.attr('style',img_obj._img_before_style);
			}
			element_obj.change_css_hash_by_mode(_img[0],{'width':_i_w_per+'%','min-width':_i_w_per+'%','height':'','min-height':'','top':_i_t_per+'%','left':_i_l_per+'%'});

		},
		
		change_size : function() {
			
			jQuery("#_img_setting_box").css('display','none');
			
			resize_obj.stop_callback = function() {
				if (jQuery(img_obj._now).hasClass('m9-img-box')) {
					img_obj.handle.convert(); // 배경형 정보변환					
				} else {
					var _display = get_inline_style(img_obj._now,'display');			
					if (_display == 'inline-block') {
						jQuery(img_obj._now).css('display','');
					}
				}
			};
											
			resize_obj.change(img_obj._now);
			
		},
		
		view_property : function() {
			var J_img_now = jQuery(img_obj._now);
			var _obj = (J_img_now.parent().prop("tagName").toLowerCase() == 'a') ? J_img_now.parent()[0] : img_obj._now;		
			createlink_obj.view(_obj);	
			jQuery("#_img_setting_box").css('display','none');
		},

		view_setting : function() {
			createlink_expend_img_obj.view(img_obj._now);
			jQuery("#_img_setting_box").css('display','none');
		},

		view_upload_form : function() {
			img_obj._status = 1;
			img_obj.handle.change_img_setting_box(1);		
		},
		
		search_file : function() {
			jQuery("#img_upload_file").click();
		},

		change_img_setting_box : function(Dvar) {
			for (var i=0;i<2;i++) {
				var _display = (i == Dvar) ? "block" : "none";
				jQuery("#_img_setting_box>div>#_box_" + i).css("display",_display);
			}
		},
		
		upload_cancel : function() { // ie,safari 에서
			img_obj._status = 0;
			img_obj.handle.change_img_setting_box(0);					
		}

	},		

	submit : function(e) {
		
		if (!img_obj.upload.startCallback()) {
			return false;
		}

		e.stopPropagation();
		e.preventDefault();	

		var data = new FormData();
		data.append('img_upload_file',jQuery('#img_upload_file')[0].files[0]);

		jQuery.ajax({
			url : img_obj.settings['upload_url'],
			method : 'post',
			enctype : 'multipart/form-data',
			data : data,
			processData : false,
			contentType : false,
			success : function(res) {
				img_obj.upload.completeCallback(res);
			},
			error : function(res) {
				var _str = 'Upload Error' + ((res.statusText && res.statusText != '') ? ' : ' + res.statusText : '');
				error_msg(_str,img_obj.upload.now,5000);
				img_obj.upload.finish(img_obj.upload.now);
			}
		});

	},

	upload : {

		now : false,
				
		startCallback : function() {

			img_obj.upload.now = img_obj._now;

			var file_ok = img_obj.upload.file_name_check(jQuery("#img_upload_file").val());
			if (!file_ok) {
				return false;
			}

			m9_layer_position("m9_ajax_loading",img_obj.upload.now);  
			jQuery("#m9_ajax_loading").fadeIn(300);
			return true;
			
		},
	
		completeCallback : function(response,obj) {

			if (!obj) {
				obj = img_obj.upload.now;
			}

			img_obj._status = 0;
			jQuery("#_img_setting_box,#m9_ajax_loading").css('display','none');
						
			response = jQuery.trim(response);
			var Dvars = response.split("|");
			var img_src = Dvars[3] + "/" + Dvars[1];

			if (Dvars[0] != "exist" && Dvars[0] != "") {
				img_obj.upload.error(response);
				return false;
			}

			var oimg = new Image();
		              
			oimg.onload = function () {
				img_obj.upload.complete_doing(img_src,obj);
			};
			
			oimg.src = img_src;
	
		},
		
		complete_doing : function(_src,obj) {

			var _target = obj;
			var _outbox = _target;
			var _img;
	
			jQuery("#_img_setting_box").css({display:"none"});

			if (jQuery(_target).hasClass('m9-img-box')) { // 배경형 이미지일 경우

				var _img = jQuery(_target).find('img')[0];				
				_outbox = _target; // 박스	

				undo_obj._add(_outbox);

				element_obj.change_attr_by_mode(_img,'src',_src);
	
				var box_w = m9_get_object_size2(_outbox,'width');
				var box_h = m9_get_object_size2(_outbox,'height');
					
				var img_w = m9_get_object_size2(_img,'width');
				var img_h = m9_get_object_size2(_img,'height');
						
				var ratio_w = box_w / img_w;
				var ratio_h = box_h / img_h;
		
				var re_h = img_h * ratio_w;
		
				if (re_h < box_h) {
					img_w = img_w * ratio_h;
					img_h = box_h;
				} else {
					img_w = box_w;
					img_h = re_h;
				}

				var img_top = ((box_h - img_h) / 2) + 'px';
				var img_left = ((box_w - img_w) / 2) + 'px';

				element_obj.change_css_hash_by_mode(_img,{'width':img_w,'height':'','min-width':img_w,'min-height':'','top':img_top,'left':img_left});

				img_obj._now = _outbox;
				
				jQuery(_outbox).removeClass('m9-fullimg').css({opacity:0}).addClass("m9-fullimg").animate({opacity:1},function() {
					jQuery(this).css('opacity','');
					img_obj.handle.convert(); // 배경형 정보변환
					img_obj.upload.finish(this);			
				});

			} else if (jQuery(_target).parents('.m9-img-box').length > 0) { // 배경형 이미지일 경우

				var _img = _target;	
				_outbox = jQuery(_img).parents('.m9-img-box')[0]; // 박스	

				undo_obj._add(_outbox);

				element_obj.change_attr_by_mode(_img,'src',_src);

				var box_w = m9_get_object_size2(_outbox,'width');
				var box_h = m9_get_object_size2(_outbox,'height');
					
				var img_w = m9_get_object_size2(_img,'width');
				var img_h = m9_get_object_size2(_img,'height');
						
				var ratio_w = box_w / img_w;
				var ratio_h = box_h / img_h;
		
				var re_h = img_h * ratio_w;
		
				if (re_h < box_h) {
					img_w = img_w * ratio_h;
					img_h = box_h;
				} else {
					img_w = box_w;
					img_h = re_h;
				}

				var img_top = ((box_h - img_h) / 2) + 'px';
				var img_left = ((box_w - img_w) / 2) + 'px';

				element_obj.change_css_hash_by_mode(_img,{'width':img_w,'height':'','min-width':img_w,'min-height':'','top':img_top,'left':img_left});

				img_obj._now = _outbox;

				jQuery(_outbox).removeClass('m9-fullimg').css({opacity:0}).addClass("m9-fullimg").animate({opacity:1},function() {
					jQuery(this).css('opacity','');
					img_obj.handle.convert(); // 배경형 정보변환
					img_obj.upload.finish(this);			
				});
				
			} else { // 일반 이미지

				undo_obj._add(_outbox);

				jQuery(_outbox).removeClass('m9-fullimg').css({opacity:0});
				element_obj.change_attr_by_mode(_outbox,'src',_src);
				jQuery(_outbox).addClass("m9-fullimg").animate({opacity:1},function() {
					jQuery(this).css('opacity','');
					img_obj.upload.finish(this);				
				});
				
			}
			
		},

		file_name_check : function(file_name) {

			var FileName = Get_FileName(file_name); // 파일명
			var Cfile = FileName.split(".");
			var file_ex = Cfile[1].toLowerCase();
	
			if (file_ex != "jpg" && file_ex != "jpeg" && file_ex != "gif" && file_ex != "png" && file_ex != "bmp") {
				alert(msg_msg('msg_29')); // "이미지 파일만 업로드 가능합니다!\n\n가능한 확장자는 [jpg,jpeg,gif,png,bmp]입니다"
				return false;
			}
			return true;
		},

		finish : function(outbox) {

			var m = _get_box_info(outbox,1);

			jQuery("#_img_setting_box").css({display:"block",top:m['t'],left:m['l'],width:m['w'],height:m['h']});
			img_obj.handle.change_img_setting_box(0);

			if (M9_SET["navigator"] == 'ie' || M9_SET["navigator"] == 'safari') {
				jQuery("#img_upload_file")[0].outerHTML = '<input type="file" id="img_upload_file" name="img_upload_file" class="" title="Image Upload"  />';
			} else {
				jQuery("#img_upload_file").val("");
			}
			
			jQuery("#m9_ajax_loading").css('display','none');

			img_obj.upload.now = false;	
			undo_obj._add(outbox);

		},

		error : function(response) {
		
			var UF_Obj = {
				total_num : "limit",
				total_size : "limit"	
			};
		
			var _error_msg = '';

			var FileInfos = response.split("|");
	
			//--------------------------------------//
			// 업로드 후 파일 에러체크
			//--------------------------------------//
			if (FileInfos[0] == "exist") { // 파일 존재유무 체크

				_error_msg = msg_msg('msg_30').msg_format(FileInfos[1]); // "[" + FileInfos[1] + "]는 이미 업로드된 이미지입니다!"

			} else if (FileInfos[0] == "number") { // 파일 총수 체크
			
				var Ctotal = UF_Obj["total_num"];			// 올릴 수 있는 파일총수
				_error_msg = msg_msg('msg_31').msg_format(Ctotal); // "업로드 할 수 있는 파일의 총수는 [" + Ctotal + "]개입니다!"

			} else if (FileInfos[0] == "size") { // 파일 총사이즈 체크
			
				var Ctotal = UF_Obj["total_size"];			// 올릴 수 있는 파일총용량
				var last_filename = FileInfos[1].split("/");
				var FileName = eval("last_filename["+(last_filename.length-1)+"]");
				var Fsize = Get_File_Size(FileInfos[2]);
				_error_msg = msg_msg('msg_32').msg_format(FileName,Get_File_Size(FileInfos[2]),Get_File_Size(Ctotal)); // "업로드된 파일(" + FileName + "[" + Get_File_Size(FileInfos[2]) + "])은 업로드 할 수 있는 파일의 총용량은 [" + Get_File_Size(Ctotal) + "]을 초과하여 업로드 할 수 없습니다!"

			} else if (FileInfos[0] == "type") { // 보안관련파일 체크
			
				var last_filename = FileInfos[1].split("/");
				var FileName = eval("last_filename["+(last_filename.length-1)+"]");
				var finfo = FileName.split(".");
				_error_msg = msg_msg('msg_33').msg_format(finfo[1]); // "업로드한 파일의 확장자가 [" + finfo[1] + "]이여서 보안상 업로드가 불가능합니다!"

			} else if (FileInfos[0] == "error") { // 다른 기타 에러
				_error_msg = FileInfos[1];
			}

			var _str = 'Upload Error' + ((_error_msg && _error_msg != '') ? ' : ' + _error_msg : '');
			error_msg(_str,img_obj.upload.now,5000);

			img_obj.upload.finish(img_obj.upload.now);

			return false;

		}
		
	} //upload
	
}; // img_obj