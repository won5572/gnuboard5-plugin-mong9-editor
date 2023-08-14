var btn_obj = {

	_now : false,
	_over : false,
	_selector : "a,button,input[type='button'],input[type='submit']",

	style_info : {
		'btn_color' : {
			'keys' : ['m9-btn-color-1','m9-btn-color-2','m9-btn-primary','m9-btn-success','m9-btn-info','m9-btn-warning','m9-btn-danger']
		},
		'btn_shape' : {
			'keys' : ['m9-btn-shape-1','m9-btn-shape-2','m9-btn-shape-3']
		},
		'btn_icon_animation' : {
			'keys' : ['m9-btn-icon-effect-top-1','m9-btn-icon-effect-right-1','m9-btn-icon-effect-bottom-1','m9-btn-icon-effect-left-1','m9-btn-icon-effect-rotate-1'],
		},
		'btn_icon_align' : {
			'keys' : ['m9-btn-icon-position-left','m9-btn-icon-position-right'],
			'values' : [msg_msg('left'),msg_msg('right')],
		}
	},

	int : function(obj) {
		
		if (jQuery('#editWindow-btn').length == 0) {

			tab_get['btn'] = [];

			for (var i in btn_obj.style_info) {
				style_info[i] = m9_get_vars({},btn_obj.style_info[i]);
				tab_get['btn'].push(i);
			}

			for (var i=0;i<style_info['box_color']['keys'].length;i++) {
				style_info['btn_color']['keys'].push(style_info['box_color']['keys'][i]);
			}

			var Sarray = style_info;

			var _html = '';
			_html += '<ul class="_edit-list-1">';

			var _id = 'a_btn';
			_html += '<li>' + msg_msg('button') + '<span class="check-switch"><input type="checkbox" id="_editor_'+ _id +'" onchange="btn_obj.convert(\'_editor_'+_id+'\');return false;" class="_drag-btn-3"><label for="_editor_'+ _id +'">'+ msg_msg('use') +'</label></span></li>';

			var _id = 'btn_color';
			_html += '<li><dl class="_edit-dl-2">' +
			'<dt><label for="_editor_'+ _id +'">'+msg_msg('color')+'</label></dt>' +
			'<dd>' + edit_control_box.selectbox2({'id':_id,'onclick_function':'element_obj.edit.class.change(\'_editor_'+_id+'\')','mode_not':1,'options' : style_info[_id],'class_btn' : '_btn_g_all','class_input' : '_btn_g_all'}) + '</dd>' +
			'</dl></li>';

			var _id = 'btn_shape';
			_html += '<li><dl class="_edit-dl-2">' +
			'<dt><label for="_editor_'+ _id +'">'+msg_msg('shape')+'</label></dt>' +
			'<dd>' + edit_control_box.selectbox2({'id':_id,'onclick_function':'element_obj.edit.class.change(\'_editor_'+_id+'\')','mode_not':1,'options' : style_info[_id],'class_btn' : '_btn_g_all','class_input' : '_btn_g_all'}) + '</dd>' +
			'</dl></li>';

			var _id = 'btn_add_icon';
			_html += '<li><dl class="_edit-dl-2">' +
			'<dt>' + msg_msg('icon') + '<span class="check-switch"><input type="checkbox" id="_editor_'+ _id +'" onchange="btn_obj.add_icon(\'_editor_'+_id+'\');return false;" class="_drag-btn-3"><label for="_editor_'+ _id +'">'+ msg_msg('use') +'</label></span></dt>' +
			'<dd></dd>' +
			'</dl></li>';
			
			var _id = 'btn_icon_align';
			_html += '<li><dl class="_edit-dl-2">' +
			'<dt><label for="_editor_'+ _id +'">'+msg_msg('alignment')+'</label></dt>' +
			'<dd>' + edit_control_box.selectbox2({'id':_id,'onclick_function':'btn_obj.change_icon_align(\'_editor_'+_id+'\')','mode_not':1,'options' : style_info[_id],'class_btn' : '_btn_g_all2','class_input' : '_btn_g_all2'}) + '</dd>' +
			'</dl></li>';

			var _id = 'btn_icon_animation';
			_html += '<li><dl class="_edit-dl-2">' +
			'<dt><label for="_editor_'+ _id +'">'+msg_msg('mouseover')+'</label></dt>' +
			'<dd>' + edit_control_box.selectbox2({'id':_id,'onclick_function':'element_obj.edit.class.change(\'_editor_'+_id+'\')','mode_not':1,'options' : style_info[_id],'class_btn' : '_btn_g_all2','class_input' : '_btn_g_all2'}) + '</dd>' +
			'</dl></li>';

			_html += '</ul>';

			_html += '<div class="_edit_remove_box"><a href="#" onclick="btn_obj.remove();return false;" title="'+ msg_msg('property_remove') +'" data-alt-no="1" class="edit-btn-8 icon2-eraser"></a> <a href="#" onclick="btn_obj.delete();return false;" title="'+ msg_msg('delete') +'" data-alt-no="1" class="edit-btn-8 icon2-delete"></a></div>';
			
			edit_window_obj.int("editWindow-btn",_html,msg_msg('button_setting'),{
				'reset' : function() {
					//btn_obj.reset();
				}	
			});

		}

		if (jQuery('#editor-btn-fix').length == 0) {

			var _html = '<div id="editor-btn-fix" class="btn_width _m9editor no" style="display:none"><a href="#" onclick="btn_obj.view();return false;" class="setting-btn-1">'+ msg_msg('button_setting') +'</a></div>';
			jQuery("body").append(_html);

			var mousedown_func = function(e,obj) {
	
				var _target = get_is_parents(e.target,btn_obj._selector,'.m9_editor_box');

				if (_target) {

					btn_obj._now = _target;
					editor._now = _target;

				} else {

					btn_obj._now = false;
				}

				btn_obj.get();

			};

			var mouseover_func = function(e,obj) {

				var _target = obj;

				if (_target) {

					if (jQuery('#editWindow-btn').css('display') != 'none') { return false; }

					if (jQuery(_target).is('.tab-btn-on,.tab-btn-off')) { /* 탭박스-버튼 */
						return false;
					}

					if (jQuery(_target).find('img,.m9-img-box').length > 0) {
						return false;
					}

					if (jQuery(_target).hasClass('_editor_btn')) { // grid 변경 버튼과 충돌
						return false;
					}

					btn_obj._over = _target;
					m9_layer_position("editor-btn-fix",_target,"up");		
					jQuery('#editor-btn-fix').css('display','');
					
				} else {
					jQuery('#editor-btn-fix').css('display','none');
				}

			};

			editor_selector.set(obj,[
				{ '_type' : 'mousedown' , '_func' : mousedown_func },
				{ '_type' : 'mouseover' , '_kind' : 'is_parents' , '_selector' : 'button,input[type=\'button\'],input[type=\'submit\']' , '_func' : mouseover_func, '_ignore' : 1 }
			]);		
					
		}

	},

	'view' : function(obj,point) {

		if (obj) { btn_obj._over = obj; }
		btn_obj._now = btn_obj._over;

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(btn_obj._now).addClass('selected_tag');
		
		this.get();

		var _point = (point) ? point : btn_obj._now;
		m9_layer_position('editWindow-btn',_point,'right',m9_getObject('body'));							
		edit_window_obj.view('editWindow-btn');
		jQuery("#editor-link-fix").css("display","none");

		m9_delay('',100,function() {
			edit_window_obj.lineup('editWindow-btn'); // 창이 최고 윗쪽 레이어로 출력하기 위해
		});

	},

	'get' : function() {

		var J_obj = jQuery(btn_obj._now);

		element_obj._now = btn_obj._now;

		for (var i=0;i<tab_get['btn'].length;i++) {
			element_obj.edit.class.get(tab_get['btn'][i]);
		}

		if (m9_mode_obj.get() != '') { return false; }

		// 버튼
		if (J_obj.hasClass('m9-btn')) {
			jQuery('#_editor_a_btn').prop('checked',true);
			jQuery('#_editor_btn_add_icon,._btn_g_all,._btn_g_all2').removeClass('disabled').prop('disabled','');
		} else {
			jQuery('#_editor_a_btn').prop('checked',false);
			jQuery('#_editor_btn_add_icon,._btn_g_all,._btn_g_all2').addClass('disabled').prop('disabled','disabled');
		}

		// 아이콘
		if (J_obj.find('._m9-btn-icon').length > 0) {
			jQuery('#_editor_btn_add_icon').prop('checked',true);
			jQuery('._btn_g_all2').removeClass('disabled').prop('disabled','');
		} else {
			jQuery('#_editor_btn_add_icon').prop('checked',false);
			jQuery('._btn_g_all2').addClass('disabled').prop('disabled','disabled');
		}

	},

	// 링크/버튼 형태변경
	convert : function(_id) {

		var _checked = jQuery('#'+_id).prop('checked');

		jQuery('.selected_tag').each(function() {

			if (!jQuery(this).is(btn_obj._selector)) { return true; } // continue

			if (_checked) {

				jQuery(this).addClass('m9-btn');
				jQuery('#_editor_btn_add_icon,._btn_g_all,._btn_g_all2').removeClass('disabled').prop('disabled','');

			} else {

				jQuery(this).removeClass('m9-btn');
				jQuery('#_editor_btn_add_icon,._btn_g_all,._btn_g_all2').addClass('disabled').prop('disabled','disabled');

			}

		});

	},

	// 아이콘 추가
	add_icon : function(_id) {

		var _checked = jQuery('#'+_id).prop('checked');

		// 아이콘
		if (_checked) {
			jQuery('._btn_g_all2').removeClass('disabled').prop('disabled','');
		} else {
			jQuery('._btn_g_all2').addClass('disabled').prop('disabled','disabled');
		}

		var remove_classes = '.' + style_info['btn_icon_align']['keys'].join(',.');

		jQuery('.selected_tag').each(function() {

			if (!jQuery(this).is(btn_obj._selector)) { return true; } // continue

			for (var z=0;z<style_info['btn_icon_align']['keys'].length;z++) {
				jQuery(this).removeClass(style_info['btn_icon_align']['keys'][z]);
			}

			if (_checked) {
				jQuery(this).addClass('m9-btn-icon-position-right').append('<i class="bi bi-caret-right-fill _m9-btn-icon"><i>&nbsp;</i></i>');
			} else {
				jQuery(this).find('._m9-btn-icon').remove();
			}

		});

	},

	// 아이콘 좌/우 위치변경
	change_icon_align : function(_id) {

		element_obj.edit.class.change(_id);

		var _value = jQuery('#'+_id).val();
		if (_value == '') {

			_value = 'm9-btn-icon-position-right';
			jQuery(element_obj._now).each(function() {
				jQuery(this).addClass(_value);
				undo_obj._add(this);
			});

		}

	},

	'remove' : function() {

		element_obj.get_selectedObj();
		element_obj.menu.remove('btn');

	},

	'delete' : function() {

		var btns = jQuery('.selected_tag');

		btns.each(function() {

			if (jQuery(this).attr('class').match(/m9\-btn\-/i) || jQuery(this).is(btn_obj._selector)) {
				btn_obj._now = this;
				btn_obj.delete_one();
			}

		});

		if (btns.length <= 1) {
			edit_window_obj.close("editWindow-btn");
		}

		RemoveSelection();
		
	},

	'delete_one' : function() {

		var _delete_parent = jQuery(btn_obj._now).parent();

		undo_obj._add(btn_obj._now,'btn_delete');

		jQuery(btn_obj._now).remove();
		btn_obj._now = false;

		undo_obj._add_one(_delete_parent,'btn_delete_after');

	}

}; // btn_obj