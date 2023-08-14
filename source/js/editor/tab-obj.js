var tab_obj = {
	
	'_now' : false,
	'_over' : false,
	'_clicked' : false,
	'_li_now' : false,	

	style_info : {
		'tab' : {
			'keys' : ['m9-tab-1','m9-tab-2','m9-tab-3','m9-tab-4','m9-tab-5'],		
			'values' : ['T1','T2','T3','T4','T5']
		},
		'tab_style' : {
			'keys' : ['m9-tab-style-1','m9-tab-style-2','m9-tab-style-3','m9-tab-style-4'],		
			'values' : ['S1','S2','S3','S4']
		}
	},
		
	'int' : function(obj) {

/*
		style_info['tab'] = {
			'keys' : ['m9-tab-1','m9-tab-2','m9-tab-3','m9-tab-4','m9-tab-5'],		
			'values' : ['T1','T2','T3','T4','T5']
		};
		style_info['tab_style'] = {
			'keys' : ['m9-tab-style-1','m9-tab-style-2','m9-tab-style-3','m9-tab-style-4'],		
			'values' : ['S1','S2','S3','S4']
		};

		tab_get['tab'] = ['tab','tab_style'];
*/

		obj = m9_get_object(obj);

		if (jQuery('#editWindow-tab').length == 0) {

			tab_get['tab'] = [];

			for (var i in tab_obj.style_info) {
				style_info[i] = m9_get_vars({},tab_obj.style_info[i]);
				tab_get['tab'].push(i);
			}
			
			var _html =	'' +
			'<ul class="_edit-list-1">' +

				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('fix') +'</dt>' +					
						'<dd>' +
							'<ul class="_edit-ul-1">' +								
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-plus" onclick="tab_obj.plus();return false" title="'+ msg_msg('copy') +'" data-alt-no="1"></button></li>' +
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-minus" onclick="tab_obj.minus();return false" title="'+ msg_msg('delete') +'" data-alt-no="1"></button></li>' +								
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-arrow-height" onclick="tab_obj.sortable();return false" title="'+ msg_msg('set_order') +'" data-alt-no="1"></button></li>' +									
							'</ul>' +
						'</dd>' +
					'</dl>' +
				'</li>' +		

				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('kind') +'</dt>' +
						'<dd>' + get_userbox_class_btn('tab',{'onclick_function' : 'tab_obj.change_class','btn_addClass' : '_drag-btn-3'}) + '</dd>' +
					'</dl>' +
				'</li>' +
				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('style') +'</dt>' +
						'<dd>' + get_userbox_class_btn('tab_style',{'onclick_function' : 'tab_obj.change_class','btn_addClass' : '_drag-btn-3'}) + '</dd>' +
					'</dl>' +
				'</li>' +

				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('slide') +'</dt>' +
						'<dd><span class="check-switch"><input type="checkbox" id="_editor_tab_slide" onclick="tab_obj.change_slide(this.checked)" class="_drag-btn-3"><label for="_editor_tab_slide" class="hidden">use</label></span></dd>' +
					'</dl>' +
				'</li>' +

			'</ul>' +
			'<div class="_edit_remove_box"><a href="#" onclick="tab_obj.remove();return false;" title="'+ msg_msg('property_remove') +'" data-alt-no="1" class="edit-btn-8 icon2-eraser"></a> <a href="#" onclick="tab_obj.del();return false;" title="'+ msg_msg('delete') +'" data-alt-no="1" class="edit-btn-8 icon2-delete"></a></div>';
			
			edit_window_obj.int("editWindow-tab",_html,msg_msg('set_tab')); // '목록 설정'

			if (jQuery('#editor-tab-fix').length == 0) {			
				var _html = '<div id="editor-tab-fix" class="handle_width _m9editor no" style="display:none"><a href="#" onclick="tab_obj.view();return false;" class="setting-btn-1">'+msg_msg('set_tab')+'</a></div>'; // 목록 설정
				jQuery("body").append(_html);
			}
							
		}

		var mousedown_func = function(e,obj) {
			
			var _target = obj;
			var et = e.target;
			var J_et = jQuery(et);

			if (_target) {

				tab_obj._li_now = false;
				if (J_et.is('li')) {			
					tab_obj._li_now = et;
				} else if (J_et.parents('li')) {
					tab_obj._li_now = J_et.parents('li')[0];							
				}
							
				tab_obj._clicked = et;
				tab_obj._now = _target;

				tab_obj.get();				

			}
				
		};

		var mouseover_func = function(e,obj) {
			
			var _target = obj;

			if (_target) {
				if (jQuery('#editWindow-tab').css('display') != 'none') { return false; }
				tab_obj._li_now = false;
				tab_obj._over = _target;
				var _w = jQuery(_target).css('width');
				jQuery('#editor-tab-fix').css('width',_w);		
				m9_layer_position("editor-tab-fix",_target,"up");		
				jQuery('#editor-tab-fix').css('display','');	
			} else {
				jQuery('#editor-tab-fix').css('display','none');
			}
				
		};

		editor_selector.set(obj,[
			{ '_type' : 'mousedown' , '_kind' : 'is_parents' , '_selector' : '.m9-tab-1,.m9-tab-2,.m9-tab-3,.m9-tab-4,.m9-tab-5' , '_func' : mousedown_func, '_ignore' : 1 },
			{ '_type' : 'mouseover' , '_kind' : 'is_parents' , '_selector' : '.m9-tab-1,.m9-tab-2,.m9-tab-3,.m9-tab-4,.m9-tab-5' , '_func' : mouseover_func, '_ignore' : 1 }
		]);

	},

	'view' : function(obj) {
		
		if (obj) { tab_obj._over = obj; }
		tab_obj._now = tab_obj._over;

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(tab_obj._now).addClass('selected_tag');

		tab_obj.get();
		var dd = m9_layer_position('editWindow-tab',tab_obj._now,'up');//,m9_getObject('body'));							
		m9_layer_position('editWindow-tab',tab_obj._now,'up',m9_getObject('body'));

		edit_window_obj.view('editWindow-tab');
		jQuery("#editor-tab-fix").css("display","none");
		
	},

	'plus' : function() {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		if (!tab_obj._li_now) { // 선택안되어 있으면 마지막것을 선택
			if (tab_obj._now) {
				var _ul_obj = jQuery(tab_obj._now).find('ul,ol')[0];
				tab_obj._li_now = jQuery(_ul_obj).children('li').last()[0];
				storedSelections = tab_obj._li_now;
			}
			if (!tab_obj._li_now) {
				error_msg(msg_msg('msg_34')); // "복사할 칸을 선택해주세요!"		
				return false;	
			}
		}

		var btn_obj = jQuery(tab_obj._li_now).children('.m9-tab-btn-on,.m9-tab-btn-off')[0]; // 버튼
		var parent_obj = m9_obj_get_data(btn_obj,'tab_parent'); // 탭박스 객체

		// 복사할 li를 원래대로 되돌린다
		M9TAB._reset_a_li(tab_obj._li_now); // 탭리셋

		var _before = editor._now;
		editor._now = tab_obj._li_now;
		editor.handle._same(1); // 복사

		M9TAB._set_a_li(tab_obj._li_now,parent_obj); // 원본 속성부여

		var _clone = jQuery(editor._now).next()[0]; // 복사본
		M9TAB._set_a_li(_clone,parent_obj); // 복사본 속성부여

		var _clone_btn_obj = jQuery(_clone).find('.m9-tab-btn-on,.m9-tab-btn-off')[0]; // 복사본 클릭 처리
		M9TAB.btn_onclick(_clone_btn_obj);

		editor._now = _before;

		tab_obj._li_now = _clone;

		undo_obj._add(tab_obj._now);

	},
		
	'minus' : function() {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		if (!tab_obj._li_now) { // 선택안되어 있으면 마지막것을 선택
			if (tab_obj._now) {
				var _ul_obj = jQuery(tab_obj._now).find('ul,ol')[0];
				tab_obj._li_now = jQuery(_ul_obj).children('li').last()[0];
				storedSelections = tab_obj._li_now;
			}
			if (!tab_obj._li_now) {
				error_msg(msg_msg('msg_35')); // "삭제할 칸을 선택해주세요!"		
				return false;	
			}
		}

		var ul_obj = jQuery(tab_obj._now).find('ul,ol')[0];

		var _index = 0; // 삭제될 li의 순서
		jQuery(ul_obj).children('li').each(function(i) {
			if (jQuery(this)[0] == tab_obj._li_now) {
				_index = i;
			}
		});
		_index = (_index == 0) ? 1 : 0;

		var _before = editor._now;
		//editor._now = tab_obj._clicked;
		editor._now = tab_obj._li_now;
		editor.handle._del(1);
		tab_obj._clicked = false;

		var li_first_obj = jQuery(ul_obj).children().eq(_index)[0];
		var btn = jQuery(li_first_obj).find('.m9-tab-btn-on,.m9-tab-btn-off')[0];
		tab_obj._li_now = li_first_obj;

		M9TAB.btn_onclick(btn);

		undo_obj._add(tab_obj._now);

	},	

	'change_class' : function(Dname,Dvar) {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		class_obj.change(tab_obj._now,Dname,Dvar);

		var _class = jQuery(tab_obj._now).attr('class');
		m9_attrs_history.change(tab_obj._now,'class',_class); // 변경된 class 정보 적용

		// tab-1,tab-2,tab-3,tab-4 바뀔때, tab-content의 높이가 짤리는 현상 때문에 처리
		if (Dname == 'tab') {

			var ul_obj = jQuery(tab_obj._now).children('ul,ol')[0];
			var on_btn = jQuery(ul_obj).find('.m9-tab-btn-on')[0];

			var _parent = on_btn['_data']['tab_parent'];
			_parent._tab_now = '';

			M9TAB.btn_onclick(on_btn);

		}
		
	},
	
	'get' : function() {

		var _checked = (this._now && this._now._tab_property && this._now._tab_property['slide'] && this._now._tab_property['slide'] != undefined) ? true : false;
		jQuery('#_editor_tab_slide').prop('checked',_checked); // 탭박스 설정창-슬라이드 표시

		for (var i=0;i<tab_get['tab'].length;i++) {
			class_obj.get(this._now,tab_get['tab'][i]);	
		}

	},
	
	'remove' : function() {

		for (var i=0;i<tab_get['tab'].length;i++) {
			class_obj.remove(this._now,tab_get['tab'][i]);	
		}

		jQuery(this._now).addClass('m9-tab-1'); // 기본 탭박스

		tab_obj.change_slide(false); // 슬라이드 삭제
		jQuery('#_editor_tab_slide').attr('checked',false);

		undo_obj._add(this._now);

	},

	'del' : function() {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		undo_obj._add(tab_obj._now);

		var J_list_now = jQuery(tab_obj._now);

		J_list_now.fadeOut(300,function() {
			var _undo_obj = undo_obj.get_obj_for_delete(tab_obj._now);
			jQuery(this).remove();
			tab_obj._now = false;			
			obj_fadeOut('#editWindow-tab');
			undo_obj._add(_undo_obj);				
		});

	},

	'change_slide' : function(_checked) {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		var propertys = get_ani_type_info(this._now,'tab');
		propertys['slide'] = (_checked) ? 'down' : undefined;

		set_data_ani_type(this._now,'tab',propertys);

		tab_obj.remove_setting_one(this._now);

		tab_obj.reset_tab(this._now); // 탭박스 재정의

	},

	'reset_tab' : function(obj) { // 탭박스 재정의

		var _clone = jQuery(obj).clone();
		var propertys = get_ani_type_info(obj,'tab');
		m9_attrs_history.reset(obj);

		var ul_obj = jQuery(obj).children('ul,ol')[0];
		var li_objs = jQuery(ul_obj).children('li');

		for (var i=0;i<li_objs.length;i++) {
			M9TAB._reset_a_li(li_objs[i]); // 탭리셋

		}

		jQuery(obj).after(_clone);

		jQuery(obj).remove();

		M9TAB.int(_clone[0],['tab',propertys]);
		tab_obj._now = _clone[0];

	},

	'sortable' : function() {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		var _son_ul = jQuery(tab_obj._now).children('ul,ol')[0];
		var _target = jQuery(_son_ul).children().eq(0);
		editor._now = _target;
		editor.sortable._sorting(1);
	},

	'remove_setting' : function(obj) {

		jQuery(obj).find('.m9-tab-1,.m9-tab-2,.m9-tab-3,.m9-tab-4,.m9-tab-5').each(function() {
			tab_obj.remove_setting_one(this);
		});	

	},

	'remove_setting_one' : function(obj) {

		if (!obj) { return false; }

		jQuery(obj).removeAttr('id');
		jQuery(obj).removeAttr('style');

		var propertys = get_ani_type_info(obj,'tab');
		if (!propertys['on_class']) { propertys['on_class'] = 'm9-tab-btn-on'; }
		if (!propertys['off_class']) { propertys['off_class'] = 'm9-tab-btn-off'; }

		var open_ok = 0;
		var view_li = false;

		var ul_obj = jQuery(obj).children('ul,ol')[0];

		jQuery(ul_obj).children('li').each(function(i) {

			var _btn = jQuery(this).find('.'+propertys['on_class']+',.'+propertys['off_class'])[0];

			if (open_ok == 0 && jQuery(_btn).hasClass(propertys['on_class'])) {
				view_li = this;
				open_ok++;
			}

			jQuery(this).find('.m9-tab-content').removeAttr('style');

		});

		jQuery(view_li).each(function() {
			jQuery(jQuery(this).find('.m9-tab-content')[0]).css({'display':'block','visibility':'visible'});

		});

		jQuery(obj).find('.slide_empty').each(function() {
			var _html = jQuery(this).html();
			jQuery(this).parent().html(_html);
		});

		jQuery(obj).find('._tab_slide').each(function() {
			var _html = jQuery(this).html();
			jQuery(this).parent().html(_html);
		});

	}
	
}; // tab_obj
