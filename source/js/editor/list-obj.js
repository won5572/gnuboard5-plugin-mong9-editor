// ************** 함수 몇개됨

// 첫숫자 처리 : style="counter-reset:step-counter 5"

var list_obj = {
	
	'_now' : false,
	'_over' : false,
	'_clicked' : false,
	'_li_now' : false,	

	style_info : {
		'list_style' : {
			'keys' : ['m9-list-style-0','m9-list-style-1','m9-list-style-2','m9-list-style-3','m9-list-style-4','m9-list-style-5'],		
			'values' : ['S0','S1','S2','S3','S4','S5']
		},
		'float' : {
			'keys' : ['m9-float-1','m9-float-2','m9-float-3','m9-float-4','m9-float-5','m9-float-6'],
			'values' : ['x1','x2','x3','x4','x5','x6']
		},
		'spacing' : {
			'keys' : ['m9-spacing-1','m9-spacing-2','m9-spacing-3'],
			'values' : ['S1','S2','S3']
		},
		'list_border_style' : {
			'keys' : ['m9-list-border-style-1','m9-list-border-style-2','m9-list-border-style-3'],
			'values' : ['L1','L2','L3']
		}
	},
		
	'int' : function(obj) {

		obj = m9_get_object(obj);

		if (jQuery('#editWindow-list').length == 0) {

			tab_get['list'] = [];

			for (var i in list_obj.style_info) {
				style_info[i] = m9_get_vars({},list_obj.style_info[i]);
				tab_get['list'].push(i);
			}
			
			var _html =	'' +
			'<ul class="_edit-list-1">' +
				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('kind') +'</dt>' +
						'<dd>' +
							'<ul class="_edit-ul-1">' +						
								'<li><button href=#" onclick="list_obj.change_tag(\'ul\');return false" title="'+ msg_msg('unorder_list') +'" data-alt-no="1" class="edit-btn-8 _drag-btn-3 icon2-InsertUnorderedList _tag_ul"></button></li>' +
								'<li><button href=#" onclick="list_obj.change_tag(\'ol\');return false" title="'+ msg_msg('order_list') +'" data-alt-no="1" class="edit-btn-8 _drag-btn-3 icon2-InsertOrderedList _tag_ol"></button></li>' +								
							'</ul>' +
						'</dd>' +
					'</dl>' +
				'</li>' +
				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('fix') +'</dt>' +					
						'<dd>' +
							'<ul class="_edit-ul-1">' +								
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-plus" onclick="list_obj.plus();return false" title="'+ msg_msg('copy') +'" data-alt-no="1"></button></li>' +
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-minus" onclick="list_obj.minus();return false" title="'+ msg_msg('delete') +'" data-alt-no="1"></button></li>' +								
								'<li><button class="edit-btn-8 _drag-btn-3 icon2-arrow-height" onclick="list_obj.sortable();return false" title="'+ msg_msg('set_order') +'" data-alt-no="1"></button></li>' +									
							'</ul>' +
						'</dd>' +
					'</dl>' +
				'</li>' +				
				'<li>' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('style') +'</dt>' +
						'<dd>' + get_userbox_class_btn('list_style',{'onclick_function' : 'list_obj.change_class','btn_addClass' : '_drag-btn-3'}) + '</dd>' +
					'</dl>' +
				'</li>' +
				'<li>' +
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('divide') +'</dt>' +
						'<dd>' + get_userbox_class_btn('float',{'onclick_function' : 'list_obj.change_class'}) + '</dd>' +
					'</dl>' +			
				'</li>' +
				'<li>' +
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('spacing') +'</dt>' +
						'<dd>' + get_userbox_class_btn('spacing',{'onclick_function' : 'list_obj.change_class'}) + '</dd>' +
					'</dl>' +					
				'</li>' +																			
				'<li>' +
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('underline') +'</dt>' +
						'<dd>' + get_userbox_class_btn('list_border_style',{'onclick_function' : 'list_obj.change_class'}) + '</dd>' +
					'</dl>' +					
				'</li>' +	
			'</ul>' +
			'<div class="_edit_remove_box"><a href="#" onclick="list_obj.remove();return false;" title="'+ msg_msg('property_remove') +'" data-alt-no="1" class="edit-btn-8 icon2-eraser"></a> <a href="#" onclick="list_obj.del();return false;" title="'+ msg_msg('delete') +'" data-alt-no="1" class="edit-btn-8 icon2-delete"></a></div>';
			
			edit_window_obj.int("editWindow-list",_html,msg_msg('set_list')); // '목록 설정'

			if (jQuery('#editor-list-fix').length == 0) {			
				var _html = '<div id="editor-list-fix" class="handle_width _m9editor no" style="display:none"><a href="#" onclick="list_obj.view();return false;" class="setting-btn-1">'+msg_msg('set_list')+'</a></div>'; // 목록 설정
				jQuery("body").append(_html);
			}
							
		}

		var mousedown_func = function(e,obj) {
			
			var _target = obj;
			var et = e.target;
			var J_et = jQuery(et);

			if (_target) {

				list_obj._li_now = false;
				if (J_et.is('li')) {			
					list_obj._li_now = et;
				} else if (J_et.parents('li')) {
					list_obj._li_now = J_et.parents('li')[0];							
				}
							
				list_obj._clicked = et;
				list_obj._now = _target;

				list_obj.get();				

			}
				
		};

		var mouseover_func = function(e,obj) {
			
			var _target = obj;

			if (_target) {

				if (jQuery('#editWindow-list').css('display') != 'none') { return false; }

				var _kind = m9_obj_get_data(_target,'_kind');
				if (_kind) { return false; }

				//if (jQuery(_target).parents('.m9-tab-1,.m9-tab-2,.m9-tab-3,.m9-tab-4,.m9-tab-5').length > 0) {
				//	return false;
				//}

				list_obj._li_now = false;
				list_obj._over = _target;
				var _w = jQuery(_target).css('width');
				jQuery('#editor-list-fix').css('width',_w);		
				m9_layer_position("editor-list-fix",_target,"up");		
				jQuery('#editor-list-fix').css('display','');	
			} else {
				jQuery('#editor-list-fix').css('display','none');
			}
				
		};

		editor_selector.set(obj,[
			{ '_type' : 'mousedown' , '_kind' : 'is_parents' , '_selector' : 'ul,ol' , '_func' : mousedown_func, '_ignore' : 1 },
			{ '_type' : 'mouseover' , '_kind' : 'is_parents' , '_selector' : 'ul,ol' , '_func' : mouseover_func, '_ignore' : 1 }
		]);

	},

	'catch_obj' : function(obj) {

		var _target = false;
		var et = obj;
		var J_et = jQuery(et);
					
		// 리스트이고, 메뉴버튼관련이 아니면
		if (J_et.is('ul,ol') && !J_et.is(editor._ignore) && J_et.parents(editor._ignore).length == 0) {			
			_target = et;
		} else if (J_et.parents('ul,ol') && J_et.parents(editor._ignore).length == 0) {
			_target = J_et.parents('ul,ol')[0];			
		}

		return _target;
		
	},	
	
	'view' : function(obj) {
		
		if (obj) { list_obj._over = obj; }
		list_obj._now = list_obj._over;

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(list_obj._now).addClass('selected_tag');

		list_obj.get();
		var dd = m9_layer_position('editWindow-list',list_obj._now,'up');//,m9_getObject('body'));							
		m9_layer_position('editWindow-list',list_obj._now,'up',m9_getObject('body'));

		edit_window_obj.view('editWindow-list');
		jQuery("#editor-list-fix").css("display","none");
		
	},

	'change_tag' : function(Dvar) {

		var list_kind = m9_obj_get_data(jQuery(list_obj._li_now).parents('ul,ol')[0],'_kind');
		if (list_kind) { return false; }
		
		var _tag = jQuery(list_obj._now).prop('tagName').toLowerCase();
		if (Dvar.toLowerCase() == _tag) { return false; } // 타입이 같으면 무시

		jQuery('._tag_' + Dvar).addClass('active');
		var _reverse = (Dvar == 'ol') ? 'ul' : 'ol';
		jQuery('._tag_' + _reverse).removeClass('active');		
		list_obj._now = changeTag(list_obj._now,Dvar);
		editor._now = list_obj._now;
		undo_obj._add(list_obj._now,'tag');
		
	},
	
	'plus' : function() {

		if (!list_obj._li_now) {
			error_msg(msg_msg('msg_34')); // "복사할 칸을 선택해주세요!"		
			return false;	
		}

		if (!list_obj._li_now) { // 선택안되어 있으면 마지막것을 선택
			if (list_obj._now) {
				list_obj._li_now = jQuery(list_obj._now).children().last()[0];
				storedSelections = list_obj._li_now;
			}
		}

		var list_kind = m9_obj_get_data(jQuery(list_obj._li_now).parents('ul,ol')[0],'_kind');
		if (list_kind) { return false; }

		var _before = editor._now;
		editor._now = list_obj._li_now;
		editor.handle._same(1);
		editor._now = _before;

	},
				
	'minus' : function() {
		
		if (!list_obj._clicked) {
			error_msg(msg_msg('msg_35')); // "삭제할 칸을 선택해주세요!"
			return false;	
		}

		var list_kind = m9_obj_get_data(jQuery(list_obj._li_now).parents('ul,ol')[0],'_kind');
		if (list_kind) { return false; }
		
		var _before = editor._now;
		editor._now = list_obj._clicked;
		editor.handle._del(1);
		list_obj._clicked = false;

	},	

	'change_class' : function(Dname,Dvar) {

		var list_kind = m9_obj_get_data(jQuery(list_obj._li_now).parents('ul,ol')[0],'_kind');
		if (list_kind) { return false; }
		
		if (Dname == 'spacing' || Dname == 'list_border_style') {

			var J_list_now = jQuery(list_obj._now);
			
			var Sarray = (style_info['float']) ? style_info['float']['keys'] : [];
		
			var mode_orders = m9_mode_obj.get_orders_mode(); // 'e','m',''

			var _mode = m9_mode_obj.get();
			var _mode_match = 0;

			var matching_name = '';
			for (var z=0;z<mode_orders.length;z++) {

				if (mode_orders[z] == _mode) {
					_mode_match = 1;
				}

				for (var i=0;i<Sarray.length;i++) {

					if (_mode_match != 1) { continue; }

					var class_name = (mode_orders[z] != '') ? mode_orders[z] +"-"+ Sarray[i] : Sarray[i];			
					if (J_list_now.hasClass(class_name)) {
						matching_name = Sarray[i];
						break;
					}

				}				
				if (matching_name != '') { break; }				
			}

			if (matching_name == '') {
				matching_name = Sarray[0];
			}

			J_list_now.addClass(editor.mode.get_class(matching_name));
								
		}
		
		class_obj.change(list_obj._now,Dname,Dvar);
		
	},
	
	'get' : function() {
		var _tag = jQuery(this._now).prop('tagName').toLowerCase();
		jQuery('._tag_' + _tag).addClass('active');
		var _reverse = (_tag == 'ol') ? 'ul' : 'ol';
		jQuery('._tag_' + _reverse).removeClass('active');			
		for (var i=0;i<tab_get['list'].length;i++) {
			class_obj.get(this._now,tab_get['list'][i]);	
		}
	},
	
	'remove' : function() {

		var list_kind = m9_obj_get_data(jQuery(list_obj._li_now).parents('ul,ol')[0],'_kind');
		if (list_kind) { return false; }

		for (var i=0;i<tab_get['list'].length;i++) {
			class_obj.remove(this._now,tab_get['list'][i]);	
		}
		undo_obj._add(this._now);	
	},

	'del' : function() {

		var list_kind = m9_obj_get_data(jQuery(list_obj._li_now).parents('ul,ol')[0],'_kind');
		if (list_kind) { return false; }

		undo_obj._add(list_obj._now);

		var J_list_now = jQuery(list_obj._now);

		J_list_now.fadeOut(300,function() {
			var _undo_obj = undo_obj.get_obj_for_delete(list_obj._now);
			jQuery(this).remove();
			list_obj._now = false;			
			obj_fadeOut('#editWindow-list');
			undo_obj._add(_undo_obj);				
		});

	},
			
	'sortable' : function() {

		var list_kind = m9_obj_get_data(jQuery(list_obj._li_now).parents('ul,ol')[0],'_kind');
		if (list_kind) { return false; }

		var _target = jQuery(list_obj._now).children().eq(0);
		editor._now = _target;
		editor.sortable._sorting(1);
	}
	
}; // list_obj

var unlist_obj = {

	convert : function(obj) {

		var lists = jQuery(obj).find('li');
			
		for (var i=0; i<lists.length;i++) {

			jQuery(lists[i]).removeAttr('style').removeAttr('class');
			var str = jQuery(lists[i]).html() + '\n';
			jQuery(lists[i]).html(str);

		}

		return jQuery(obj)[0];
															
	}
			
}; // unlist_obj

var ollist_obj = {

	convert : function(obj) {

		var lists = jQuery(obj).find('li');
			
		for (var i=0; i<lists.length;i++) {

			jQuery(lists[i]).removeAttr('style').removeAttr('class');
			var str = jQuery(lists[i]).html() + '\n';
			jQuery(lists[i]).html(str);

		}

		return jQuery(obj)[0];
															
	},
							
	calculate : {
		
		'string' : function(_clone,_add) {
	
			var adding = (_add == 1) ? 1 : -1;
			
			var _html = jQuery('<div />').append(_clone);
			var dd = (jQuery(_html).find('._calculate').text() * 1) + adding;
			jQuery(_html).find('._calculate').text(dd);
			_clone = jQuery(_html).html();
			return _clone;
			
		},
					
		'next' : function(li_obj,_add) {
	
			var adding = (_add == 1) ? 2 : 0;
			var start_num = jQuery(li_obj).find('._calculate').text() * 1;

			jQuery(li_obj).nextAll().each(function(i) {
				var _num = start_num + i + adding;
				jQuery(this).find('._calculate').text(_num);
			});
	
		},
	
		'reset' : function(obj) {
			jQuery(obj).parent().children().each(function(i) {
				var _num = i + 1;
				jQuery(this).find('._calculate').text(_num);
			});
			
		}
	},
	
	checking_calculate : function(li_obj) {

		var start_num = jQuery(li_obj).find('._calculate').text() * 1;

		jQuery(li_obj).find('li').each(function(i) {
			var _num = start_num + i;
			jQuery(this).find('._calculate').text(_num);
		});

	}
			
}; // ollist_obj