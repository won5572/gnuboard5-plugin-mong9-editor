var m9_editor = {
	
	'defaults' : {
		'type' : 'master',
		'lang' : 'en' ,
		'content_type' : 1,
		'use_convert' : 1,
		'use_builder' : 1,
		'use_grid' : 1,
		'use_obj' : 1,
			'upload_url' : '',
			'img_max_width' : 1000,
		'use_element' : 1,
		'example_html' : './block/example.html',
		'mode' : { 'm' : 768 , 'e' : 576 }
	},
	
	'setting' : {},
	'checking_unload' : true, // 페이지벗어나기 이벤트
	'cpu' : 0, // ie 속도 fadeIn/fadeOut 설정
	
	'int' : function(_id,_hash) {
		
		if (jQuery('#' + _id).length == 0) { return false; }

		var set = m9_get_vars(_hash,this.defaults);
		this.setting = set;

		m9_mode_obj._type = this.setting.type;
		m9_mode_obj.change_info(this.setting['mode']);

		if (Mong9_Font_Family) {
			fontfamily_obj._fonts = Mong9_Font_Family;
		}
		
		var textarea_obj = jQuery('#' + _id);		
		var edit_id = _id + "_editor";

		var _max_width = m9_get_object_size2(textarea_obj[0],'width');

		jQuery('<div class="_editor-header"></div>').insertBefore(textarea_obj);

		var _html = '<div class="_editor_var_div">' +
		'<input type="hidden" id="'+_id+'_editor_mode" name="'+_id+'_editor_mode" value="1" />' +
		'</div>';
		jQuery(_html).appendTo('._editor-header');

		if (this.setting.type == 'master') {

			var _html = '<div class="editor-mode-box">' +
			'<button onclick="m9_mode_obj.change(\'\');return false" data-alt-no="4" title="'+msg_msg('mode')+'" class="btn-mode-pc _mode-btn active">PC</button>' +
			'<button onclick="m9_mode_obj.change(\'m\');return false" data-alt-no="4" title="'+msg_msg('mode')+'( m )" class="btn-mode-m _mode-btn">Mobile Portrait</button>' +
			'<button onclick="m9_mode_obj.change(\'e\');return false" data-alt-no="4" title="'+msg_msg('mode')+'( e )" class="btn-mode-e _mode-btn">Mobile Landscape</button>' +
			'</div>';

			_html += '<div class="editor-etc-box">' +
			'<button data-content-mode="html" onclick="editor.html.view(\'' + _id + '\',this);return false;" class="editor-btn _type editor-btn-no">html</button>' +
			'<button onclick="send_parent_editor(\''+ _id + '\');return false;" class="editor-btn _save editor-btn-yes">'+msg_msg('save')+'</button>' +
			'</div>';		
			jQuery(_html).appendTo('._editor-header');

		} else {

			jQuery('.m9editor-layout').wrap('<div class="_base_box"></div>');

			var _html = '<div class="editor-etc-box2">' +
			'<button onclick="send_parent_editor(\''+ _id + '\');return false;" class="editor-btn _save editor-btn-yes">'+msg_msg('save')+'</button>' +
			'</div>';
			jQuery('.m9editor-layout').after(_html);

		}
		
		m9_mode_obj.edit_wrap(textarea_obj);

		textarea_obj.after('<div id="' + edit_id + '" class="m9_editor_box m9not _m9_editor_canvas m9-content"></div>');
		textarea_obj.wrap('<div id="' + _id + '_wrap" style="display:none"></div>');

		var obj = jQuery('#' + edit_id);
		obj.css({'min-height':textarea_obj.css('height'),'height':'auto'});

		jQuery.data(obj[0],'min-height',m9_get_num(textarea_obj.css('height')));

		obj[0].innerHTML = m9_editor.convert.set(_id);

		if (m9_get_num(jQuery('body').css('width')) >=1000) { obj.css('max-width',_max_width); } // 깨짐방지
		
		if (set['use_element'] == 1) { element_obj.int(this.setting.type); }
		if (set['use_grid'] == 1) { grid_obj.int(edit_id); }
		if (set['use_builder'] == 1) { builder.int(edit_id,{ 'example_html' : set['example_html'] , type : this.setting.type }); }
		if (set['use_obj'] == 1) { img_obj.int(obj[0],{'upload_url':set['upload_url'],'img_max_width':set['img_max_width']}); }

		editor.int(_id,this.setting.type);

		if (set['content_type'] == 1) {
			textarea_obj.css('display','none');
		} else {
			obj.css('display','none');
			jQuery('#example').css('display','none');
		}

		if (M9_SET["navigator"] == "ie") {
			if (m9_ie_var < 10) {
				m9_editor.cpu = 1;		
			}
			//document.getElementById(edit_id).onresizestart = function(){ return false; } // ie 박스조절무시하기
		} else if (M9_SET["navigator"] == "safari") {
			m9_editor.cpu = 1;					
		}

		jQuery(document).on('mousedown',function(e) {
			m9evt = m9_get_evt_obj();
		});
		
		jQuery(window).on('beforeunload', function(){
			if (m9_editor.checking_unload) {
				return msg_msg('msg_37'); // "이 페이지를 벗어나면 작성된 내용은 저장되지 않습니다!"
			}
		}); 

		if (this.setting.type == 'master') {
			jQuery('#edit_menu,#editWindow-setting').css('display','block');
			jQuery('._drag-btn-2').addClass('disabled').prop('disabled','disabled');
		}

		var mouseover_func = function(e) { events_function('mouseover',e); };
		var mousedown_func = function(e) { events_function('mousedown',e); };

		editor_event.set(obj[0],[
			{ '_type' : 'mouseover' , '_func' : mouseover_func },
			{ '_type' : 'mousedown' , '_func' : mousedown_func }
		]);

		undo_obj.int(obj[0]);

	},
	
	'ready_submit' : function(edit_id,return_form) {
		m9_editor.checking_unload = false;
	},
	
	'check_value' : function(_id) {
			
		var mode_id = _id + '_editor_mode';		
		var mode_type = jQuery('#' + mode_id).val();
	
		var textarea_obj = jQuery('#' + _id);	
		var edit_id = _id + "_editor";
		var obj = jQuery('#' + edit_id);

		var _html = "";
		if (mode_type == 1) {
			_html = builder.html.get(edit_id);
			
			jQuery("body").append('<div id="_edit_covert_box" style="display:none"></div>');		
			jQuery("#_edit_covert_box")[0].innerHTML = _html;
			var _txt = jQuery("#_edit_covert_box").text();
			jQuery("#_edit_covert_box").remove();			
			_txt = _txt.replace(/^\s+|\s+$/g,""); // 공백치환					
			if (_txt == msg_msg('msg_36')) {  // "내용입력해주세요"
				textarea_obj.html("");
				obj.html("");
				return 0;								
			}	
		} else {
			_html = textarea_obj.val();			
		}

		return ((_html == "") ? 0 : 1);
	},

	'get_value' : function(_id) {

		m9_mode_obj.change(''); // To pc mode
	
		var mode_id = _id + '_editor_mode';		
		var mode_type = jQuery('#' + mode_id).val();
	
		var textarea_obj = jQuery('#' + _id);	
		var edit_id = _id + "_editor";
	
		if (mode_type == 1) {
			var _html = builder.html.get(edit_id);
			textarea_obj.val(_html);
		}

		m9_editor.convert.get(_id);

		m9_editor.ready_submit(edit_id); // 편집기 저장 준비
		
		var _html = textarea_obj.val();
		//_html = m9_remove_xss_style.remove_xss(_html);
		textarea_obj.val(_html);

		return textarea_obj.val();
					
	},

	'convert' : {

		'set' : function(_id) {

			var textarea_obj = jQuery('#' + _id);
			var edit_id = _id + "_editor";

			var _s_id = edit_id + '_settings';
			textarea_obj.after('<div id="' + _s_id + '" class="m9not _mong9_setting_box" style="display:none"></div>');
			var str = textarea_obj.val();

			var rgExp = /[-\d\.]+/;
			var rgExp = /\<\!\-\-\s*\/\/\s*m9\_font\_family\(\s*(.*)\s*\)\s*\/\/\s*\-\-\>/i; // <!--//m9_font_family(XXX,XXX,XXX)//-->
			var matches = str.match(rgExp);

			if (matches && matches[1]) {
				var font_familys = matches[1].split(',');
				for (var i=0;i<font_familys.length;i++) {
					jQuery('<link type="text/css" rel="stylesheet" href="' + font_familys[i] + '" />').appendTo('#'+_s_id);
				}
			}


			str = str.replace(/\<\!\-\-\s*\/\/\s*Mong9\s*Editor\s*\/\/\s*\-\-\>/i, '');
			str = str.replace(/\<\!\-\-\s*\/\/\s*m9\_font\_family\(\s*(.*)\s*\)\s*\/\/\s*\-\-\>/i, '');

			// classic editor 에서 주석을 <p>..</p> 태그로 감싸는 현상
			jQuery("body").append('<div id="_edit_covert_box2" style="display:none"></div>');	
			jQuery('#_edit_covert_box2').html(str);
			var J_edit_convert_box = jQuery('#_edit_covert_box2');
			J_edit_convert_box.find('p').each(function() {
				if (!jQuery(this).attr('class') && !jQuery(this).attr('style')) {
					if (!jQuery(this).html()) {
						jQuery(this).remove();
					}
				}
			});


			str = jQuery('#_edit_covert_box2').html();
			jQuery('#_edit_covert_box2').remove();

			return str;

		},

		'get' : function(_id) {

			var textarea_obj = jQuery('#' + _id);

			jQuery("body").append('<div id="_edit_covert_box" style="display:none"></div>');	
			var J_edit_convert_box = jQuery('#_edit_covert_box');
			J_edit_convert_box.html(textarea_obj.val());

			J_edit_convert_box.find('p,br,span').each(function() {
				if (!jQuery(this).attr('class') && !jQuery(this).attr('style')) {
					jQuery(this).addClass('_mong9');
				}
			});

			tab_obj.remove_setting(J_edit_convert_box[0]);

			var _html = J_edit_convert_box.html();
			J_edit_convert_box.remove();
			textarea_obj.val(_html);

			var edit_id = _id + "_editor";

			var font_lists = [];
			jQuery('#'+edit_id).find('[style]').each(function() {
				var _font_family = get_inline_style(this,'font-family',1);
				if (_font_family != '') {
					_font_family = _font_family.replace(/\'/g,'').replace(/\"/g,'');
					font_lists.push(_font_family);
				}
			});

			var _html = '<!--//Mong9 Editor//-->';

			if (font_lists.length > 0) {

				var family_lists = jQuery.union(font_lists,[]);

				var family_css = [];

				for (var z=0;z<family_lists.length;z++) {
					for (var i=0;i<fontfamily_obj._fonts.length;i++) {
						var d = fontfamily_obj._fonts[i];
						if (d[0] == family_lists[z]) {
							family_css.push(d[2]);
							break;
						}
					}
				}

				_html += '<!--//m9_font_family(' + family_css.join(',') + ')//-->';
			}

			var re_str = _html + textarea_obj.val();
			textarea_obj.val(re_str);

		}

	}
	
}; // m9_editor