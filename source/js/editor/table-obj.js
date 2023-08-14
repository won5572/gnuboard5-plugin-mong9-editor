var table_obj = {

	_now : false,
	_sortabled : false,
	_over : false,
	
	objs : {},
	_colresize : {},	

	'color_set' : ['red','orange','green','blue'],
	_insert_char : "",

	style_info : {
		'table_style' : {
			'keys' : ['m9-table-1','m9-table-2','m9-table-3','m9-table-4','m9-table-5','m9-table-6'],		
			'values' : ['T1','T2','T3','T4','T5','T6']
		}
	},

	view : function(obj) {
		
		if (obj) { table_obj._over = obj; }
		table_obj._now = table_obj._over;

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(table_obj._now).addClass('selected_tag');
		
		this.get();

		m9_layer_position('editWindow-table',table_obj._now,'up',m9_getObject('body'));							
		edit_window_obj.view('editWindow-table');
		jQuery("#editor-table-fix").css("display","none");	
	},
	
	'get' : function() {
		
		class_obj.get(table_obj._now,tab_get['table'][0]); // table_style

		// 헤드색상 가져오기
		var _thead = jQuery(table_obj._now).find('thead');
		if (_thead.length > 0) {
			var _match = 0;
			var td_list = _thead.find('th,td');	
			var head_color = jQuery('#_editor_table_head_color').children();
			var match_color = '';
			for (var i=1; i<head_color.length;i++) {
				var _color = head_color.eq(i).attr('value');					
				if (td_list.eq(0).hasClass(_color)) {
					match_color = _color;			
					break;
				}
			}
			
			if (match_color) {
				var _not = 0;
				td_list.each(function() {
					if (!jQuery(this).hasClass(match_color)) { _not++; }
				});
			}
			
			if (_not == 0) {
				jQuery('#_editor_table_head_color').val(match_color);
			} else {
				jQuery('#_editor_table_head_color').val('');				
			}
		}

		// 입력값 가져오기		
		jQuery('#edit_table_summary').val(jQuery(table_obj._now).prop('summary'));
		jQuery('#edit_table_caption').val(jQuery(table_obj._now).find('caption').text());
		
	},
	
	remove_size : function(obj) {

		jQuery(obj).removeAttr('width').removeAttr('height').css({'width':'100%','height':''});	
		jQuery(obj).find('tr').each(function() {
			jQuery(this).removeAttr('width').removeAttr('height').css({'width':'','height':''});				
			jQuery(this).find('th,td').each(function() {
				jQuery(this).removeAttr('width').removeAttr('height').css({'width':'','height':''});	
			});
			
		});

	},

	change_class : function(Dname,Dvar) {	
		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(table_obj._now).addClass('selected_tag');
		element_obj._now = table_obj._now;		
		element_obj.edit.class2.change(Dname,Dvar);
	},
	
	change_head_class : function(_id) {

		var _before_selected = jQuery('.selected_tag');
		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(table_obj._now).find('thead').find('th,td').each(function() {
			jQuery(this).addClass('selected_tag');
			element_obj.edit['class'].change(_id);
		});
		jQuery('.selected_tag').removeClass('selected_tag');
		_before_selected.addClass('selected_tag');
	},
	
	property_change : function() {
		jQuery(table_obj._now).prop('summary',jQuery('#edit_table_summary').val());	
		if (jQuery(table_obj._now).find('caption').length == 0) {
			jQuery(table_obj._now).children(':first').before('\n<caption></caption>\n');
		}
		jQuery(table_obj._now).find('caption').text(jQuery('#edit_table_caption').val());		
		obj_fadeOut('#editWindow-table');
	},
		
	remove_setting : function(obj) {
		
		jQuery(obj).find('table').each(function() {
			
			table_obj._now = jQuery(this)[0];
			table_obj.table_silder.destroy();
				
			jQuery(table_obj._now).removeClass('ui-selectable').find('.ui-selectee').removeClass('ui-selectee');
			if (jQuery(table_obj._now).parents('._table-colresize').length > 0) {
				jQuery(table_obj._now).parents('._table-colresize')[0].outerHTML = jQuery(table_obj._now)[0].outerHTML;
			}
				
			table_obj.y_sortable.destroy();
			table_obj.x_sortable.destroy();			
			
		});	
		
	},
			
	int : function(obj) {

		obj = m9_get_object(obj);
		var obj_id = jQuery(obj).attr('id');
		
		table_obj._edit = obj;

		if (jQuery('#editWindow-table').length == 0) {

			tab_get['table'] = [];

			for (var i in table_obj.style_info) {
				style_info[i] = m9_get_vars({},table_obj.style_info[i]);
				tab_get['table'].push(i);
			}

			tab_get['table'].push('table_head');

var _html =	'' +
'<ul class="_edit-list-1">' +
	'<li>' +
		'<dl class="_edit-dl-2">' +
			'<dt>'+ msg_msg('design') +'(class)</dt>' +
			'<dd>' + get_userbox_class_btn('table_style',{'onclick_function' : 'table_obj.change_class','btn_addClass' : '_drag-btn-3'}) + '</dd>' +
		'</dl>' +
	'</li>' +			
	'<li>' +
		'<dl class="_edit-dl-2">' +
		'<dt><label for="_editor_table_head_color">'+ msg_msg('head_color') +'(class)</label></dt>' +
		'<dd>' + edit_control_box.selectbox2({'id':'table_head_color','onclick_function':'table_obj.change_head_class(\'_editor_table_head_color\')','mode_not':1}) + '</dd>' +
		'</dl>' +
	'</li>' +									
	'<li>' +
		'<dl class="_edit-dl-2">' +
			'<dt>'+ msg_msg('merge') +'/'+ msg_msg('divide') +'</dt>' +
			'<dd>' +
				'<ul class="_edit-ul-1">' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-join m9-only-master" onclick="table_obj.join();return false" title="'+ msg_msg('table_btn_1') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-divide_vertical" onclick="table_obj.divide.vertical();return false" title="'+ msg_msg('table_btn_2') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-divide_horizontal" onclick="table_obj.divide.horizontal();return false" title="'+ msg_msg('table_btn_3') +'" data-alt-no="1"></a></li>' +										
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-same_width m9-only-master" onclick="table_obj.same_width();return false" title="'+ msg_msg('table_btn_4') +'" data-alt-no="1"></a></li>' +					
				'</ul>' +
			'</dd>' +
		'</dl>' +
	'</li>' +	
	'<li class="m9-only-master">' +
		'<dl class="_edit-dl-2">' +
			'<dt>'+ msg_msg('set_order') +'</dt>' +
			'<dd>' +
				'<ul class="_edit-ul-1">' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-x_sortable" onclick="table_obj.x_sortable.int();return false" title="'+ msg_msg('table_btn_5') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-y_sortable" onclick="table_obj.y_sortable.int();return false" title="'+ msg_msg('table_btn_6') +'" data-alt-no="1"></a></li>' +			
				'</ul>' +
			'</dd>' +
		'</dl>' +
	'</li>' +	
	'<li>' +
		'<dl class="_edit-dl-2">' +
			'<dt>'+msg_msg('insert')+'</dt>' +
			'<dd>' +
				'<ul class="_edit-ul-1">' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-after_vertical" onclick="table_obj.insert.after_vertical();return false" title="'+ msg_msg('table_btn_7') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-before_vertical" onclick="table_obj.insert.before_vertical();return false" title="'+ msg_msg('table_btn_8') +'" data-alt-no="1"></a></li>' +								
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-after_horizontal" onclick="table_obj.insert.after_horizontal();return false" title="'+ msg_msg('table_btn_9') +'" data-alt-no="1"></a></li>' +					
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-before_horizontal" onclick="table_obj.insert.before_horizontal();return false" title="'+ msg_msg('table_btn_10') +'" data-alt-no="1"></a></li>' +							
				'</ul>' +
			'</dd>' +
		'</dl>' +
	'</li>' +	
	'<li>' +
		'<dl class="_edit-dl-2">' +
			'<dt>'+ msg_msg('delete') +'</dt>' +
			'<dd>' +
				'<ul class="_edit-ul-1">' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-remove_horizontal" onclick="table_obj.remove.horizontal();return false" title="'+ msg_msg('table_btn_11') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-remove_vertical" onclick="table_obj.remove.vertical();return false" title="'+ msg_msg('table_btn_12') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _drag-btn-3 icon2-table-remove_table" onclick="table_obj.remove.table();return false" title="'+ msg_msg('table_btn_13') +'" data-alt-no="1"></a></li>' +													
				'</ul>' +
			'</dd>' +
		'</dl>' +
	'</li>' +
	'<li>' +
		'<dl class="_edit-dl-2">' +
			'<dt>'+msg_msg('etc')+'</dt>' +
			'<dd>' +
				'<ul class="_edit-ul-1">' +

					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-convert_thead" onclick="table_obj.convert.thead();return false" title="&lt;thead&gt; '+ msg_msg('convert') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-convert_tfoot" onclick="table_obj.convert.tfoot();return false" title="&lt;tfoot&gt; '+ msg_msg('convert') +'" data-alt-no="1"></a></li>' +	
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-convert_tbody_th" onclick="table_obj.convert.tbody_th();return false" title="&lt;tbody&gt;-&lt;th&gt; '+ msg_msg('convert') +'" data-alt-no="1"></a></li>' +
					'<li><a href="#" class="edit-btn-8 _table-btn _drag-btn-3 icon2-table-convert_tbody_td" onclick="table_obj.convert.tbody_td();return false" title="&lt;tbody&gt;-&lt;td&gt; '+ msg_msg('convert') +'" data-alt-no="1"></a></li>' +										
				'</ul>' +
			'</dd>' +
		'</dl>' +
	'</li>' +	
	'<li>' +
		'<dl class="_edit-dl-1">' +
			'<dt><label for="edit_table_caption">*'+ msg_msg('caption') +'(caption)</label><span class="help-icon edit-btn-etc" title="'+ msg_msg('msg_23') +'">?</span></dt>' +
			'<dd><input type="text" id="edit_table_caption" value="" class="_drag-btn-3" /></dd>' +
		'</dl>' +																																				
	'</li>' +							
	'<li>' +
		'<dl class="_edit-dl-1">' +
			'<dt><label for="edit_table_summary">'+ msg_msg('summary') +'(summary)</label><span class="help-icon edit-btn-etc" title="'+ msg_msg('msg_24') +'">?</span></dt>' +
			'<dd><input type="text" id="edit_table_summary" value="" class="_drag-btn-3" /></dd>' +
		'</dl>' +
	'</li>' +	
'</ul>' +	
'<button onclick="table_obj.property_change()" class="curtain-btn editor-btn-yes _drag-btn-3">OK</button>';
	
			edit_window_obj.int("editWindow-table",_html,msg_msg('table_setting'));

			for (var i=0;i<style_info['box_color']['keys'].length;i++) {
				jQuery("#_editor_table_head_color").append('<option value="' + style_info['box_color']['keys'][i] + '">' + style_info['box_color']['keys'][i] + '</option>');
			}

			if (jQuery('#editor-table-fix').length == 0) {			
				var _html = '<div id="editor-table-fix" class="handle_width _m9editor no" style="display:none"><a href="#" onclick="table_obj.view();return false;" class="setting-btn-1">'+ msg_msg('table_setting') +'</a></div>';				
				jQuery("body").append(_html);
			}
			
		}

		var mousedown_func = function(e,obj) {

			var _target = obj;
			var et = e.target;			
			if (_target) {
				table_obj._now = _target;
				table_obj.get();
			}
	
		};

		var mouseover_func = function(e,obj) {

			var _target = obj;

			if (_target) {

				table_obj.table_silder.int(_target);
				table_obj.select_table(_target);	
								
				if (jQuery('#editWindow-table').css('display') != 'none') { return false; }
				table_obj._over = _target;

				var _w = jQuery(_target).css('width');
				jQuery('#editor-table-fix').css('width',_w);		
				m9_layer_position("editor-table-fix",_target,"up");		
				jQuery('#editor-table-fix').css('display','');
				
			} else {
				jQuery('#editor-table-fix').css('display','none');
			}
				
		};

		editor_selector.set(obj,[
			{ '_type' : 'mousedown' , '_kind' : 'is_parents' , '_selector' : 'table' , '_func' : mousedown_func, '_ignore' : 1 },
			{ '_type' : 'mouseover' , '_kind' : 'is_parents' , '_selector' : 'table' , '_func' : mouseover_func, '_ignore' : 1 }
		]);

		jQuery(document).on('mouseup',function(e) {

			var et = e.target;

			if (jQuery('#editWindow-table').css('display') != 'none') {
				table_obj.btn_setting();
			}

			if (jQuery(et).is('th,td')) {

				if (table_obj.th_td_on == 1) {
					placeCaretAtEnd(et);
				}

			}
		});

		jQuery(document).on('mousedown',function(e) {

			var et = e.target;

			table_obj.th_td_on = (jQuery(et).is('th,td') && jQuery(et).hasClass('selected_tag')) ? 0 : 1;

			if (table_obj.x_sortable._now) {
				if (!get_is_parents(et,'._table-x-sortable','.m9_editor_box')) {
					table_obj.x_sortable.destroy();
				}	
			}

			if (table_obj.y_sortable._now) {
				if (!get_is_parents(et,'._table-y-sortable','.m9_editor_box')) {
					table_obj.y_sortable.destroy();
				}	
			}
									
		});
		
	},
	
	btn_setting : function(_type) {

		var obj = table_obj._now;

		var _hash = table_obj._check_group(obj);	

		var join_ok = 1;
		var same_width_ok = 1;
		if (_hash['num'] < 2) {
			join_ok = 0;
			same_width_ok = 0;			
		}
		if (_hash['count'] != 1) {
			join_ok = 0;			
		}

		if (_hash['num'] > 0) {
			//jQuery('._table-btn').removeClass('disabled');	
		}
							
		var checking = table_obj.get_selected(obj);
		if (!checking) {
			join_ok = 0;
		}
		if (join_ok == 1) {
			jQuery('.icon2-table-join').removeClass('disabled');			
		} else {
			jQuery('.icon2-table-join').addClass('disabled');				
		}
		
		if (same_width_ok == 1) {
			jQuery('.icon2-table-same_width').removeClass('disabled');			
		} else {
			jQuery('.icon2-table-same_width').addClass('disabled');				
		}

	},
	
	join : function() {
	// 합치기
		var obj = table_obj._now;

		var _hash = table_obj._check_group(obj);

		if (_hash['num'] < 2) {
			alert(msg_msg('msg_38')); // '합치기는 표의 두칸이상이여야합니다!\n드래그하여 선택해주세요!'
			return false;					
		}
		if (_hash['count'] != 1) {
			alert(msg_msg('msg_39')); // '합치기는 표의 \n머리글[thead], 내용글[tbody], 바닥글[tfoot]\n끼리만 가능합니다!'
			return false;					
		}

		var checking = table_obj.get_selected(obj);
		if (!checking) {
			alert(msg_msg('msg_40')); // '드래그 범위가 잘못되었습니다!\n[사각형]형태로 드래그해주세요!'
			return false;	
		}

		var _html = '';
		jQuery(obj).find('.selected_tag').each(function(i) {
			_html += jQuery(this).html() + '\n\n';
		});
		
		jQuery(obj).find('.selected_tag').each(function(i) {
			if (i == 0) {
				jQuery(this).attr({'colspan':checking['colspan'],'rowspan':checking['rowspan']}).removeClass('selected_tag').html(_html);
			} else {
				jQuery(this).remove();				
			}
		});

		table_obj._table_check(obj);
		table_obj.set_colgroup.reset(obj);
		table_obj.table_silder.destroy();

		undo_obj._add(obj);
	},

	_table_check : function(obj) {

		jQuery('th[colspan],td[colspan]').each(function(){
			if (jQuery(this).attr('colspan') < 2) {
				jQuery(this).removeAttr('colspan');
			}				
		});

		jQuery('th[rowspan],td[rowspan]').each(function(){
			if (jQuery(this).attr('rowspan') < 2) {
				jQuery(this).removeAttr('rowspan');
			}				
		});
			
		// rowspan 비교/수정
		jQuery(obj).find("tr").each(function(){
			
			var empty_count = 0;
			var cell_count = 0;
			var _rowspan = {};
			jQuery(this).find("th,td").each(function(){
				var _row = jQuery(this).prop('rowspan');
				if (!_rowspan[_row]) { _rowspan[_row] = 0; }
				_rowspan[_row]++;
				empty_count++;
				cell_count++;
			});

			for (var i in _rowspan) {
				if (i > 1 && _rowspan[i] == cell_count) {
					jQuery(this).find('th,td').removeAttr('rowspan'); // rowspan > 1이고 한줄 모두이면 rowspan 삭제
				}	
			}
			
			if (empty_count == 0) {
				jQuery(this).remove(); //빈 tr삭제
			}
		});

		// colspan 비교/수정
		var _array = table_obj._one_check(obj);

		for (var x=0;x<_array['t_x'];x++) {		

			var _colspan = {};
						
			for (var y=0;y<_array['t_y'];y++) {
				
				if (_array['be'][y][x] == 1) {
					var a = _array['array'][y][x];
					var _col = jQuery(a).prop('colspan');
					//if (_col < 2) { continue; }
					if (!_colspan[_col]) { _colspan[_col] = 0; }
					_colspan[_col]++;					
				}
				
			}

			var count = 0;
			var _col = 0;
			for (var i in _colspan) { _col = i; count++; }

			if (count == 1 && _col > 1) {
				for (var y2=0;y2<_array['t_y'];y2++) {			
					if (_array['be'][y2][x] == 1) {					
						jQuery(_array['array'][y2][x]).removeAttr('colspan');
					}
				}
				
			}			

		}
		
	},
						
	_table_group : { 'thead' : 1, 'tbody' : 1, 'tfoot' : 1 },
	_check_group : function(_table) {
		var _hash = { count : 0, num : 0 };
		for (var i in table_obj._table_group) {
			if (jQuery(_table).find(i).find('.selected_tag').length > 0) {
				_hash['count']++;
				_hash['num'] += jQuery(_table).find(i).find('.selected_tag').length;
			}
		}
		
		if (_hash['num'] == 0 && jQuery(element_obj._now).is('th,td')) {
			jQuery(element_obj._now).addClass('selected_tag');
			_hash = { 'count' : 1 , 'num' : 1 };
		}
		return _hash;
	},

	convert : {
		
		thead : function() {

			var obj = table_obj._now;

			var _selected = jQuery(obj).find('.selected_tag');
			var tr_count = _selected.parent('tr').length;
			if (tr_count != 1) {
				alert(msg_msg('msg_42')); // '한줄만 가능합니다!'
				return false;
			}

			var _array = table_obj._one_check(obj,_selected[0]);
			table_obj.y_sortable._now = obj;
			var cells = table_obj.y_sortable.get_rowspan_list();

			var y_index = 0;
			var _index = 0;
			var y_count = 0;

			for (var i=0;i<cells.length;i++) {
				_index += cells[i];
				if (_index >= (_array['y']+1)) {
					y_count = cells[i];
					break;
				}
				y_index += cells[i];
			}

			var trs = [];
			jQuery(obj).find('tr').each(function(i) {
				
				if (i >= y_index && i < (y_index + y_count)) {
					trs.push(jQuery(this)[0]);
				}

			});

			var _parent = jQuery(_selected).parents('thead,tbody,tfoot');
			var _parent_tag = _parent.prop('tagName').toLowerCase();

			if (_parent_tag != 'thead') {

				if (jQuery(obj).find('thead').length == 0) {

					if (jQuery(obj).find('tbody').length > 0) {
						jQuery(obj).find('tbody').before('<thead></head>');			
					} else if  (jQuery(obj).find('colgroup').length > 0) {
						jQuery(obj).find('colgroup').after('<thead></head>');
					} else {
						jQuery(obj).prepend('<thead></head>');		
					}

				}

				jQuery(obj).find('thead').append(jQuery(trs));

				jQuery(trs).find('th,td').each(function() {
					jQuery(this).attr('scope','col');
					changeTag(this,'th');
				});

			} else {

				if (jQuery(obj).find('tbody').length == 0) {

					if (jQuery(obj).find('thead').length > 0) {
						jQuery(obj).find('thead').after('<tbody></tbody>');			
					} else if  (jQuery(obj).find('colgroup').length > 0) {
						jQuery(obj).find('colgroup').after('<tbody></tbody>');
					} else {
						jQuery(obj).after('<tbody></tbody>');		
					}

				}

				jQuery(obj).find('tbody').prepend(jQuery(trs));

				jQuery(trs).find('th,td').each(function(i) {
					if (i == 0) {
						jQuery(this).attr('scope','row');
						changeTag(this,'th');
					} else {
						jQuery(this).removeAttr('scope');
						changeTag(this,'td');
					}
				});

				if (jQuery(obj).find('thead').children().length == 0) {
					jQuery(obj).find('thead').remove();
				}

			}
			
		},

		tfoot : function() {

			var obj = table_obj._now;

			var _selected = jQuery(obj).find('.selected_tag');
			var tr_count = _selected.parent('tr').length;
			if (tr_count != 1) {
				alert(msg_msg('msg_42')); // '한줄만 가능합니다!'
				return false;
			}

			var _array = table_obj._one_check(obj,_selected[0]);
			table_obj.y_sortable._now = obj;
			var cells = table_obj.y_sortable.get_rowspan_list();

			var y_index = 0;
			var _index = 0;
			var y_count = 0;

			for (var i=0;i<cells.length;i++) {
				_index += cells[i];
				if (_index >= (_array['y']+1)) {
					y_count = cells[i];
					break;
				}
				y_index += cells[i];
			}

			var trs = [];
			jQuery(obj).find('tr').each(function(i) {
				
				if (i >= y_index && i < (y_index + y_count)) {
					trs.push(jQuery(this)[0]);
				}

			});

			var _parent = jQuery(_selected).parents('thead,tbody,tfoot');
			var _parent_tag = _parent.prop('tagName').toLowerCase();

			if (_parent_tag != 'tfoot') {

				if (jQuery(obj).find('tfoot').length == 0) {
					jQuery(obj).append('<tfoot></tfoot>');		
				}

				jQuery(obj).find('tfoot').append(jQuery(trs));

				jQuery(trs).find('th,td').each(function(i) {
					if (i == 0) {
						jQuery(this).attr('scope','row');
						changeTag(this,'th');
					} else {
						jQuery(this).removeAttr('scope');
						changeTag(this,'td');
					}
				});

			} else {

				if (jQuery(obj).find('tbody').length == 0) {

					if (jQuery(obj).find('thead').length > 0) {
						jQuery(obj).find('thead').after('<tbody></tbody>');			
					} else if  (jQuery(obj).find('colgroup').length > 0) {
						jQuery(obj).find('colgroup').after('<tbody></tbody>');
					} else {
						jQuery(obj).after('<tbody></tbody>');		
					}

				}

				jQuery(obj).find('tbody').append(jQuery(trs));

				jQuery(trs).find('th,td').each(function(i) {
					if (i == 0) {
						jQuery(this).attr('scope','row');
						changeTag(this,'th');
					} else {
						jQuery(this).removeAttr('scope');
						changeTag(this,'td');
					}
				});

				if (jQuery(obj).find('tfoot').children().length == 0) {
					jQuery(obj).find('tfoot').remove();
				}

			}
			
		},

		tbody_th : function() {

			var obj = table_obj._now;

			var selected_objs = jQuery(obj).find('.selected_tag');

			if (jQuery(selected_objs[0]).parents('tbody').length == 0) {
				alert(msg_msg('msg_77')); // '[tbody] 태그에서만 가능합니다!'
				return false;	
			}

			var _hash = table_obj._check_group(obj);

			if (_hash['count'] != 1) {
				alert(msg_msg('msg_77')); // '[tbody] 태그에서만 가능합니다!'
				return false;					
			}
		
			var checking = table_obj.get_selected(obj);
			if (!checking) {
				alert(msg_msg('msg_40')); // '드래그 범위가 잘못되었습니다!\n[사각형]형태로 드래그해주세요!'
				return false;	
			}

			selected_objs.each(function() {
				jQuery(this).attr('scope','row');
				changeTag(this,'th');
			});

		},

		tbody_td : function() {

			var obj = table_obj._now;

			var selected_objs = jQuery(obj).find('.selected_tag');

			if (jQuery(selected_objs[0]).parents('tbody').length == 0) {
				alert(msg_msg('msg_77')); // '[tbody] 태그에서만 가능합니다!'
				return false;	
			}

			var _hash = table_obj._check_group(obj);

			if (_hash['count'] != 1) {
				alert(msg_msg('msg_77')); // '[tbody] 태그에서만 가능합니다!'
				return false;					
			}
			
			var checking = table_obj.get_selected(obj);
			if (!checking) {
				alert(msg_msg('msg_40')); // '드래그 범위가 잘못되었습니다!\n[사각형]형태로 드래그해주세요!'
				return false;	
			}

			selected_objs.each(function() {
				jQuery(this).removeAttr('scope');
				changeTag(this,'td');
			});

		}

	},
	
	divide : {

		vertical : function() {

			var obj = table_obj._now;

			var _hash = table_obj._check_group(obj);
			if (_hash['num'] < 1) {
				alert(msg_msg('msg_44')); // '수직나누기는 한칸이상 선택되어져야합니다!'
				return false;					
			}
					
			jQuery(obj).find('.selected_tag').each(function(){
	
				var _selected_one = jQuery(this)[0];
				
				var colspan = jQuery(this).prop('colspan');
				
				if (colspan > 1) {

					var b = parseInt(colspan / 2);					
					var a = b + colspan % 2;

					jQuery(this).prop('colspan',a);
					if (a < 2) { jQuery(this).removeAttr('colspan'); }
					jQuery(this).after(jQuery(this).clone().removeAttr('colspan').html(table_obj._insert_char));		
					if (b > 1) { jQuery(this).next().prop('colspan',b); }			
			
				} else {

					var _array = table_obj._one_check(obj,_selected_one);
						
					var matching = 0;
					var _x = _array['x'];
					for(var i=0;i<_array['array'].length;i++) {
						var _cell = _array['array'][i][_x];
						if (_cell == _selected_one) {
							if (matching == 0) {

								var _colgroup = [];
								var colgroup_obj = jQuery(obj).find('colgroup');
								colgroup_obj.children().each(function(index) {
									var _col = jQuery(this).attr('width');
									if (index == _x) {
										var _half = _col / 2;
										_colgroup.push(_half,_half);
									} else {
										_colgroup.push(_col);
									}
								});
								colgroup_obj.html("");
								for (var p=0;p<_colgroup.length;p++) {
									colgroup_obj.append('<col	width="' + _colgroup[p] + '">');
								}								
								jQuery(_cell).after(jQuery(_cell).clone().removeAttr('colspan').html(table_obj._insert_char));											
							}
							matching++;
						} else {
							if (!jQuery(_cell).is('._td_colspan')) {
								jQuery(_cell).addClass('_td_colspan').prop('colspan',jQuery(_cell).prop('colspan')+1);		
							}
						}
					}
					jQuery('._td_colspan').removeClass('_td_colspan');
					
				}	
					
			});

			table_obj._table_check();		
			table_obj.table_silder.destroy();
			undo_obj._add(obj);
		
		},
				
		horizontal : function() {
	
			var obj = table_obj._now;

			var _hash = table_obj._check_group(obj);
			if (_hash['num'] < 1) {
				alert(msg_msg('msg_45')); // '수평나누기는 한칸이상 선택되어져야합니다!'
				return false;					
			}
				
			jQuery(obj).find('.selected_tag').each(function(){

				var _selected_one = jQuery(this)[0];
					
				var _array = table_obj._one_check(obj,_selected_one);
				var rowspan = jQuery(this).prop('rowspan');
				
				if (rowspan > 1) {

					var b = parseInt(rowspan /2);					
					var a = b + rowspan % 2;
	
					jQuery(this).prop('rowspan',a);
					if (a < 2) { jQuery(this).removeAttr('rowspan'); }
						
					var _y = _array['y'] + a;		
	
					var _num = 0;
					for (var i=0;i<_array['x'];i++) {
						_num += _array['be'][_y][i] * 1;
					}
	
					if (_num == 0) {
						var _target = jQuery(obj).find('tr').eq(_y).find('th,td').eq(0);
						jQuery(_target).before(jQuery(this).clone().removeAttr('rowspan'));
						if (b > 1) { jQuery(_target).prev().prop('rowspan',b); }			
					} else {
						var _target = jQuery(obj).find('tr').eq(_y).find('th,td').eq(_num - 1);
						jQuery(_target).after(jQuery(this).clone().removeAttr('rowspan').html(table_obj._insert_char));
						if (b > 1) { jQuery(_target).next().prop('rowspan',b); }		
					}
										
				} else {
	
					var _x = _array['x'];
					var _y = _array['y'];
	
					for(var i=0;i<_array['array'][_y].length;i++) {
						var _target = _array['array'][_y][i];
						if (_target != jQuery(this)[0]) {
							if (!jQuery(_target).is('._rowspan_doing')) {
								jQuery(_target).addClass('_rowspan_doing').prop('rowspan',jQuery(_target).prop('rowspan') + 1);
							}	
						}
					}
					jQuery('._rowspan_doing').removeClass('_rowspan_doing');
												
					if (jQuery(_selected_one).prop('rowspan') > 1) {
						jQuery(_selected_one).prop('rowspan',jQuery(_selected_one).prop('rowspan') - 1);
					}
					jQuery(obj).find('tr').eq(_y).after(jQuery(jQuery(obj).find('tr').eq(_y).clone()).html(jQuery(_selected_one).clone().html(table_obj._insert_char)));							
				}		
			});
	
			table_obj._table_check();
			table_obj.table_silder.destroy();
			undo_obj._add(obj);			
		}
		
	},

	same_width : function() {
		
		var obj = table_obj._now;		

		var _array = table_obj._one_check(obj);

		var match_max = 0;
		var match_max_list = [];
		var match_y = 0;
		for (var y=0;y<_array['t_y'];y++) {
			var match_num = 0;
			var match_list = [];
			for (var x=0;x<_array['t_x'];x++) {			
				var a = _array['array'][y][x];
				if (jQuery(a).hasClass('selected_tag')) {
					match_num++;
					match_list.push(x);
				}
			}
			if (match_num > match_max) { 
				match_max = match_num;
				match_max_list = match_list;
				match_y = y;
			}
		}

		var total_w = 0;		
		for (var x=0;x<match_max_list.length;x++) {
			var be = _array['be'][match_y][x];
			if (be == 1) {
				total_w += table_obj.get_td_width(_array['array'][match_y][x]);
			}
		}

		var cell_w = parseInt(total_w / match_max_list.length);

		var colgroups = jQuery(obj).find('colgroup').children();
		if (colgroups.length == 0) {
			table_obj.set_colgroup.int(obj);
			colgroups = jQuery(obj).find('colgroup').children();
		}
		
		for (var x=0;x<match_max_list.length;x++) {
			var i = match_max_list[x];
			colgroups.eq(i).attr('width',cell_w+'px');			
		}

		table_obj.table_silder.destroy();

		undo_obj._add(obj);
		
	},	
	
	'x_sortable' : {
		
		'_now' : false,
		
		'destroy' : function() {
			if (table_obj.x_sortable._now) {
				jQuery(table_obj.x_sortable._now).parent().find('._table-x-sortable').remove();			
				table_obj.x_sortable._now = false;				
				table_obj._sortabled = false;
			}
		},
				
		'int' : function() {

			obj_fadeOut('#editMenu-setting');	

			var obj = table_obj._now;			
			var _array = table_obj._one_check(obj);

			table_obj.x_sortable._now = obj;
						
			var cells = table_obj.x_sortable.get_colspan_list();
			var _handles = jQuery(obj).parent().find('._div-colresize').find('span');

			var color_length = table_obj.color_set.length;
					
			var _html = '<div class="_table-x-sortable" contenteditable="false">\n';		
			var total = 0;
			var total_w = 0;
			var _index = 1;

			for (var x=0;x<cells.length;x++) {
				var num = (cells[x] - 1) + total;
				var w = m9_get_num(jQuery(_handles[num]).css('left'));				
				var _w = w - total_w;

				var color_index = x % color_length;	
				_html += '<a class="_not" style="width:' + _w + 'px" data-order="' + _index + '"><span style="background:' + table_obj.color_set[color_index] + '">' + (x+1) + '</span></a>';				
				total += cells[x];	
				total_w = w;
				_index++;
			}	
			_html += '</div>\n';
	
			jQuery(obj).parent().find('._div-colresize').before(_html);
	
			jQuery(obj).parent().find('._table-x-sortable').sortable({
				axis : "x",
				cursor : "move",
				distance : 5,
				delay : 200,
				tolerance : "pointer",					
				stop : function(event,ui) {
					table_obj.x_sortable.change(ui);				
				}
			});
	
			table_obj._sortabled = 1;
			table_obj.table_silder.destroy();
									
		},
		
		'change' : function() {

			var obj = table_obj.x_sortable._now;
			var _array = table_obj._one_check(obj);
			
			var aaa = function(_s,_e) {
				var arrays = [];
				for (var y=0;y<_array['t_y'];y++) {
					var _html = "";
					for (var x=_s;x<(_s+_e);x++) {
						if (_array['be'][y][x] == 1) {
							_html += jQuery(_array['array'][y][x])[0].outerHTML;
						}
					}		
					arrays.push(_html);								
				}
				return arrays;
			};
	
			var cells = table_obj.x_sortable.get_colspan_list();

			var colgroups_w = [];
			var colgroups = jQuery(obj).find('colgroup').children();
			colgroups.each(function(i) {
				colgroups_w.push(jQuery(this).attr('width'));
			});

			var cols_w = [];
			var count = 0;
			for (var x=0;x<cells.length;x++) {
				cols_w[x] = [];
				for (var i=0;i<cells[x];i++) {
					cols_w[x][i] = colgroups_w[count];
					count++;
				}
			}
							
			var tds = [];
			var _start = 0;
			for (var i=0;i<cells.length;i++) {
				tds.push(aaa(_start,cells[i]));
				_start += cells[i];	
			}

			var _handles = jQuery(obj).parent().find('._table-x-sortable').find('a');
			
			var re_tds = [];
			for(var i=0;i<_handles.length;i++) {
				var _order = jQuery(_handles[i]).attr('data-order');
				re_tds.push(tds[_order-1]);
			}
	
			var tr_htmls = [];
			for (var x=0;x<re_tds.length;x++) {	
				for (var y=0;y<re_tds[x].length;y++) {
					if (!tr_htmls[y]) { tr_htmls[y] = []; }
					tr_htmls[y][x] = re_tds[x][y];
				}
			}
	
			for (var y=0;y<tr_htmls.length;y++) {
				jQuery(obj).find('tr').eq(y).html(tr_htmls[y].join('\n'));
			}		

			var count = 0;
			_handles.each(function(i) {
				var _index = jQuery(this).attr('data-order') - 1;
				for (var x=0;x<cols_w[_index].length;x++) {
					colgroups.eq(count).attr('width',cols_w[_index][x]);					
					count++;
				}
			});
			
			_handles.each(function(i) {
				jQuery(this).attr('data-order',i+1);
			});
					
		},

		'get_colspan_list' :function(_start) {
	
			var obj = table_obj.x_sortable._now;			
			var _array = table_obj._one_check(obj);
	
			var get_list = function(_colspan) {
				var matching = 0;
				var _y = _array['colspan'].length;
		
				for (var y=0;y<_y;y++) {		
					var total = 0;
					for (var x=0;x<_array['colspan'][y].length;x++) {		
						total += _array['colspan'][y][x];
						if (total == _colspan) { matching++; }
					}
				}
		
				if (matching == _y) {	
					return _colspan; // 매칭
				}
				return false;
			};
		
			var cells = [];
			var _before = 0;
			for (var y=0;y<_array['t_x'];y++) {		
				var columns = get_list(y+1);			
				var a = columns - _before;
				if (columns) {
					cells.push(a);
					_before = columns;				
				}
			}

			return cells;
		}
		
	},
	
	'y_sortable' : {

		'_now' : false,
		
		'destroy' : function() {
			if (table_obj.y_sortable._now) {
				jQuery(table_obj.y_sortable._now).parents('._table-colresize').find('._table-y-sortable').remove();			
				table_obj.y_sortable._now = false;				
				table_obj._sortabled = false;
			}
		},
				
		'int' : function() {

			obj_fadeOut('#editMenu-setting');	

			var obj = table_obj._now;
			var _top1 = m9_getRealOffsetTop(obj);	

			var _selected = jQuery(obj).find('.selected_tag');
			if (_selected.parents('thead,tbody,tfoot').length > 0) {
				obj = _selected.parents('thead,tbody,tfoot')[0];
			}

			var _top2 = m9_getRealOffsetTop(obj);						
			var _top = _top2 - _top1;

			var _array = table_obj._one_check(obj);

			table_obj.y_sortable._now = obj;
						
			var cells = table_obj.y_sortable.get_rowspan_list();

			var _handles = jQuery(obj).find('tr');
			
			var color_length = table_obj.color_set.length;
					
			var _html = '<div class="_table-y-sortable" contenteditable="false" style="margin-top:' + _top + 'px;height:' + jQuery(obj).css('height') + '">\n';		
			var total = 0;
			var total_w = 0;
			var _index = 1;
			
			
			var _tr_index = 0;
			var _index = 1;			
			for (var y=0;y<cells.length;y++) {
				var _h = 0;
				for (var i=0;i<cells[y];i++) {
					_h += m9_get_num(_handles.eq(_tr_index).css('height'));
					_tr_index++;
				}
				var color_index = y % color_length;
				_html += '<a class="_not" style="height:' + _h + 'px" data-order="' + _index + '"><span style="height:' + _h + 'px;background:' + table_obj.color_set[color_index] + '"><i class="m9-valign"></i>' + (y+1) + '</span></a>';		
				_index++;
			}	
			_html += '</div>\n';
	
			jQuery(table_obj._now).parents('._table-colresize').append(_html);					

			jQuery(obj).parents('._table-colresize').find('._table-y-sortable').sortable({
				//item : "._one-entry",
				axis : "y",
				cursor : "move",
				placeholder : "editor-placeholder",
				//connectWith : "#connecta",
				distance : 5,
				delay : 200,
				tolerance : "pointer",
				//handle : "._handle",
				start : function(event,ui) {
					jQuery(ui.placeholder).slideUp(50);
				},		
				change : function(event,ui) {
					jQuery(ui.placeholder).hide().slideDown(50);
				},					
				stop : function(event,ui) {
					table_obj.y_sortable.change(ui);
				}
			});

			table_obj._sortabled = 1;
			table_obj.table_silder.destroy();			
			
		},
		
		'change' : function() {

			var obj = table_obj.y_sortable._now;
			var _array = table_obj._one_check(obj);

			var cells = table_obj.y_sortable.get_rowspan_list();

			var _handles = jQuery(obj).find('tr');
			
			var tds = [];
			
			var _tr_index = 0;
			for (var y=0;y<cells.length;y++) {
				var _html = "";
				for (var i=0;i<cells[y];i++) {
					_html += _handles.eq(_tr_index)[0].outerHTML;
					_tr_index++;
				}
				tds.push(_html);
			}	

			var _handles = jQuery(obj).parents('._table-colresize').find('._table-y-sortable').find('a');
						
			var re_tds = [];
			for(var i=0;i<_handles.length;i++) {
				var _order = jQuery(_handles[i]).attr('data-order');
				re_tds.push(tds[_order-1]);
				jQuery(obj).find('tr').eq(i).html(tds[_order-1]);								
			}

			jQuery(obj).html(re_tds.join('\n'));

			_handles.each(function(i) {
				jQuery(this).attr('data-order',i+1);
			});
					
		},

		'get_rowspan_list' :function(_start) {
	
			var obj = table_obj.y_sortable._now;

			var _array = table_obj._one_check(obj);

			var cells = [];
			for (var y=0;y<_array['t_y'];y++) {		
				var _max = 0;
				for (var x=0;x<_array['rowspan'][y].length;x++) {
					if (_array['rowspan'][y][x] > _max) { _max = _array['rowspan'][y][x]; }
				}
				cells[y] = _max;
			}

			var jari = 0;
			var re_cells = [];

			for (var y=0;y<cells.length;y++) {


				if (jari == 0) {
					jari = cells[y];
				}

				var yyy = y + cells[y];

				if (yyy > jari) {
					jari = yyy; // 4
				}

				if ((y+1) == jari) {				
					re_cells.push(jari);
					jari = 0;
				}

			}

			var reset = 0;
			var before = 0;
			var ddd = [];

			for (var u=0;u<re_cells.length;u++) {
				reset = re_cells[u] - before;
				ddd.push(reset);				
				before = re_cells[u];
			}

			return ddd;

		}

	},	

	insert : {

		before_horizontal : function() {

			var obj = table_obj._now;

			var _selected = jQuery(obj).find('.selected_tag');
			var _array = table_obj._one_check(obj,jQuery(obj).find('.selected_tag')[0]);
			var _y = _array['y'];
	
			var tds = [];
			for (var x=0;x<_array['t_x'];x++) {
				
				var _be = _array['be'][_y][x];
				var _target = _array['array'][_y][x];			
	
				if (_y > 0 && _array['array'][_y-1][x] == _target) {
					if (!jQuery(_target).is('._add_column')) {				
						jQuery(_target).removeClass('selected_tag').addClass('_add_column').prop('rowspan',jQuery(_target).prop('rowspan') + 1);
					}				
				} else {
					if (!jQuery(_target).is('._add_column')) {
						jQuery(_target).removeClass('selected_tag').addClass('_add_column');
						tds.push(jQuery(_target).clone().removeAttr('rowspan').html(table_obj._insert_char)[0].outerHTML);
					}			
				}
				
			}
	
			jQuery(obj).find('tr').eq(_y).before(jQuery(obj).find('tr').eq(_y).clone().html(tds.join("")));				
			jQuery('._add_column').removeClass('_add_column');

			if (jQuery(obj).find('.selected_tag').length > 0) {
				table_obj.insert.before_horizontal();
			} else {
				jQuery(obj).parent().find("._div-colresize").find('a').css('height',jQuery(obj).css('height'));					
			}
			table_obj.table_silder.destroy();			
			jQuery(_selected).addClass('selected_tag');
			undo_obj._add(obj);
		},		

		after_horizontal : function() {
			
			var obj = table_obj._now;

			var _selected = jQuery(obj).find('.selected_tag');	
			var _array = table_obj._one_check(obj,jQuery(obj).find('.selected_tag')[0]);
			var _y = _array['y'];
	
			var tds = [];
			for (var x=0;x<_array['t_x'];x++) {
				
				var _be = _array['be'][_y][x];
				var _target = _array['array'][_y][x];			
	
				if (_array['array'][_y+1] && _array['array'][_y+1][x] == _target) {
					if (!jQuery(_target).is('._add_column')) {				
						jQuery(_target).removeClass('selected_tag').addClass('_add_column').prop('rowspan',jQuery(_target).prop('rowspan') + 1);
					}				
				} else {
					if (!jQuery(_target).is('._add_column')) {
						jQuery(_target).removeClass('selected_tag').addClass('_add_column');
						tds.push(jQuery(_target).clone().removeAttr('rowspan').html(table_obj._insert_char)[0].outerHTML);
					}			
				}
				
			}
	
			jQuery(obj).find('tr').eq(_y).after(jQuery(obj).find('tr').eq(_y).clone().html(tds.join("")));				
			jQuery('._add_column').removeClass('_add_column');

			if (jQuery(obj).find('.selected_tag').length > 0) {
				table_obj.insert.after_horizontal();
			} else {
				jQuery(obj).parent().find("._div-colresize").find('a').css('height',jQuery(obj).css('height'));					
			}
			table_obj.table_silder.destroy();			
			jQuery(_selected).addClass('selected_tag');
			undo_obj._add(obj);				
		},

		after_vertical : function() {
			
			var obj = table_obj._now;
	
			var _selected = jQuery(obj).find('.selected_tag');
			var _array = table_obj._one_check(obj,jQuery(obj).find('.selected_tag')[0]);

			var _x = _array['x'];
			var _y = _array['y'];
					
			for (var y=0;y<_array['t_y'];y++) {
				
				var _be = _array['be'][y][_x];
				var _target = _array['array'][y][_x];			
	
				if (_array['array'][y][_x+1] == _target) {
					if (!jQuery(_target).is('._add_column')) {				
						jQuery(_target).removeClass('selected_tag').addClass('_add_column').prop('colspan',jQuery(_target).prop('colspan') + 1);
					}				
				} else {
					if (!jQuery(_target).is('._add_column')) {
						jQuery(_target).removeClass('selected_tag').addClass('_add_column').after(jQuery(_target).clone().html(table_obj._insert_char).removeAttr('colspan'));
					}			
				}
				
			}
			jQuery('._add_column').removeClass('_add_column');

			if (jQuery(obj).find('.selected_tag').length > 0) {
				table_obj.insert.after_vertical();
			} else {
				table_obj.set_colgroup.remove();			
				table_obj.table_silder.destroy();
			}
			jQuery(_selected).addClass('selected_tag');
			undo_obj._add(obj);
						
		},
	
		before_vertical : function() {
			
			var obj = table_obj._now;

			var _selected = jQuery(obj).find('.selected_tag');
			var _array = table_obj._one_check(obj,jQuery(obj).find('.selected_tag')[0]);
	
			var _x = _array['x'];
			var _y = _array['y'];
					
			for (var y=0;y<_array['t_y'];y++) {
				
				var _be = _array['be'][y][_x];
				var _target = _array['array'][y][_x];			
	
				if (_array['array'][y][_x-1] == _target) {
					if (!jQuery(_target).is('._add_column')) {				
						jQuery(_target).removeClass('selected_tag').addClass('_add_column').prop('colspan',jQuery(_target).prop('colspan') + 1);
					}				
				} else {
					if (!jQuery(_target).is('._add_column')) {
						jQuery(_target).removeClass('selected_tag').addClass('_add_column').before(jQuery(_target).clone().html(table_obj._insert_char).removeAttr('colspan'));
					}			
				}
				
			}
			jQuery('._add_column').removeClass('_add_column');

			if (jQuery(obj).find('.selected_tag').length > 0) {
				table_obj.insert.before_vertical();
			} else {
				table_obj.set_colgroup.remove();			
				table_obj.table_silder.destroy();
			}
			jQuery(_selected).addClass('selected_tag');
			undo_obj._add(obj);			
		}		
			
	},	
		
	remove : {
		
		'table' : function() {
			
			var obj = table_obj._now;

			undo_obj._add(obj);
						
			if (jQuery(obj).parent().hasClass("_table-colresize")) {	
				obj = jQuery(obj).parent()[0];
			}	
			
			if (jQuery(obj).length == 0) { return false; }
			
			jQuery(obj).fadeOut(300,function(){
				var _undo_obj = undo_obj.get_obj_for_delete(this);
				jQuery(this).remove();	
				table_obj._now = false;
				obj_fadeOut('#editWindow-table');
				undo_obj._add(_undo_obj);
			});
				
		},

		'vertical' : function() {

			var obj = table_obj._now;

			undo_obj._add(obj);
			var _re = obj;
									
			var _array = table_obj._one_check(obj,jQuery(obj).find('.selected_tag')[0]);
			var _x = _array['x'];
	
			var tds = [];
			for (var y=0;y<_array['t_y'];y++) {
	
				var _target = _array['array'][y][_x];						
				if (jQuery(_target).is('._cell_changing')) { continue; }
				
				var colspan = jQuery(_target).prop('colspan');
	
				var _be = _array['be'][y][_x];			
				if (_be == 1) {
					if (colspan > 1) {										
						jQuery(_target).addClass('_cell_changing').prop('colspan',jQuery(_target).prop('colspan') - 1);
					} else {
						jQuery(_target).remove();
					}	
				} else {			
					if (colspan > 1) {
						jQuery(_target).addClass('_cell_changing').removeClass('selected_tag').prop('colspan',jQuery(_target).prop('colspan') - 1);													
					}
				}
				
			}
			jQuery('._cell_changing').removeClass('_cell_changing');
	
			jQuery(obj).find('tr').each(function() {
				if (jQuery(this).children().length == 0) {
					jQuery(this).remove();
				}	
			});
	
			jQuery(obj).find('thead,tbody,tfoot').each(function() {
				if (jQuery(this).children().length == 0) {
					jQuery(this).remove();
				}	
			});
	
			if (jQuery(obj).find('thead,tbody,tfoot').length == 0) {
				jQuery(obj).remove();			
			} else {
				if (jQuery(obj).find('.selected_tag').length > 0) {
					table_obj.remove.vertical();
				} else {
					table_obj.set_colgroup.remove();			
					table_obj.table_silder.destroy();						
				}
			}

			undo_obj._add(_re);			
		},

		'horizontal' : function() {
	
			var obj = table_obj._now;

			undo_obj._add(obj);
			var _re = obj;
			
			var _array = table_obj._one_check(obj,jQuery(obj).find('.selected_tag')[0]);
			var _y = _array['y'];
			
			var tds = [];
			for (var x=0;x<_array['t_x'];x++) {
	
				var _be = _array['be'][_y][x];
				var _target = _array['array'][_y][x];			
	
				var rowspan = jQuery(_target).prop('rowspan');
				
				if (_be == 1) {
					if (rowspan > 1) {										
						tds[x] = jQuery(_target).prop('rowspan',jQuery(_target).prop('rowspan') - 1)[0].outerHTML;
					}	
					jQuery(_target).remove();
				} else {			
					if (rowspan > 1) {
						jQuery(_target).removeClass('selected_tag').prop('rowspan',jQuery(_target).prop('rowspan') - 1);													
					}
				}
			}
	
			for (var x=0;x<_array['t_x'];x++) {
				if (!tds[x]) {
					if (_array['be'][_y+1] && _array['be'][_y+1][x] == 1) {
						tds[x] = jQuery(_array['array'][_y+1][x])[0].outerHTML;
					}
				}
			}
	
			if (tds.length > 0) {
				jQuery(obj).find('tr').eq(_y+1).html(tds.join(""));		
			}
	
			var _now = jQuery(obj).find('tr').eq(_y);
			var _parent = _now.parent();
	
			var tr_total = _parent.children().length;

			_now.remove();

			if (tr_total < 2) {
				_parent.remove();
				var table_son = jQuery(obj).find('thead,tbody,tfoot');
				if (table_son.length == 0) { jQuery(obj).remove(); }
			}
	
			if (jQuery(obj).find('.selected_tag').length > 0) {
				table_obj.remove.horizontal();
			} else {
				jQuery(obj).parent().find("._div-colresize").find('a').css('height',jQuery(obj).css('height'));				
			}
			table_obj.table_silder.destroy();
			undo_obj._add(_re);				
		}		
		
	},
	
	table_silder : {
	// 테이블 셀 넓이 슬라이드

		'lists' : {},
			
		'int' : function(obj) {

			if (!obj) { return false; }
			if (table_obj._sortabled == 1) { return false; } // sortable 중일 때는 무시

			var _slider = jQuery.data(obj,'table_slider');
			if (_slider == 1) { return false; }

			if (!jQuery(obj).parent().hasClass("_table-colresize")) {
				jQuery(obj).wrap('<div class="_table-colresize _cell_parent"></div>');
			}

			if (jQuery(obj).parent().find("._div-colresize").length == 0) {
				jQuery(obj).before('<div class="_div-colresize" contenteditable="false"></div>');			
			}

			jQuery.data(obj,'table_slider',1);		
						
			table_obj.set_colgroup.int(obj);

			var _total_w = m9_get_num(jQuery(obj).css("width"));

			var values = [];
			var _sum = 0;
			var colgroups = jQuery(obj).find('colgroup').children();
			colgroups.each(function(i) {
				var _w = m9_get_num(jQuery(this).attr('width'));
				values[i] = _w + _sum;
				_sum += _w;
			});
							
			var _resize_div = jQuery(obj).parent().find("._div-colresize")[0];
			
			jQuery(_resize_div).slider({		
				slide:table_obj.table_silder.update,
				stop:table_obj.table_silder.stop,				
				min: 0,
				max: _total_w,
				values:values,
				start : function(event,ui) {
					if (ui.value == ui.values[ui.values.length - 1]) { // 마지막 드래그 불가하게
						return false;
					}
				}
			});
			jQuery(_resize_div).find('.ui-slider-handle').css('height',jQuery(obj).css('height')).addClass('_not');
			jQuery(_resize_div).find('.ui-slider-handle:last').css('cursor','default');			
		},

		'stop' : function(event,ui) {
			var obj = jQuery(event.target)[0];
			undo_obj._add(obj);										
		},

		'update' : function(event,ui) {

			var obj = jQuery(event.target).parents("._table-colresize").find('table')[0];
					
			if (jQuery(obj).find('colgroup').length == 0) {		
				table_obj.set_colgroup.int(obj);
			}
	
			var before_w = 0;
			jQuery(obj).find('colgroup').children().each(function(i) {
				var alls = ui.values[i] - before_w;
				jQuery(this).attr('width',alls+'px');			
				before_w = ui.values[i];
			});

			jQuery(obj).parent().find("._div-colresize").find('a').css('height',jQuery(obj).css('height'));

		},
		
		'destroy' : function() {
	
			var obj = table_obj._now;

			if (jQuery(obj).parent().find("._div-colresize").length > 0) {
				var _slider = jQuery(obj).parent().find("._div-colresize")[0];
				if (jQuery.data(obj,'table_slider') == 1) {
					jQuery(_slider).slider("destroy");
					jQuery.data(obj,'table_slider',0);
				}
			}
										
		}

	},

	select_table : function(obj) {

		var _data = jQuery.data(obj,'table_select');
		if (_data == 1) { return false; }
		
	    jQuery(obj).selectable({
	        filter:'td,th',
	        cancel:'.selected_tag',
			distance: 30,
			delay: 50,
			stop: function() {	
				jQuery('.ui-selected').addClass('selected_tag').removeClass('ui-selected');
				table_obj.btn_setting();
	 		}
	    });
		jQuery.data(obj,'table_select',1);	    

	},
	
	'set_colgroup' : {

		'int' : function(obj,num) {

			var _array = table_obj._one_check(obj);			
		
			var cols_w = [];
			var match_i = 0;
			for (var y=0;y<_array['t_y'];y++) {
				for (var x=0;x<_array['t_x'];x++) {
					var _be = _array['be'][y][x];
					var _target = _array['array'][y][x];
					if (cols_w[x]) { continue; }
					if (_be == 1 && jQuery(_target).prop('colspan') == 1) {
						cols_w[x] = table_obj.get_td_width(_target);
						match_i++;
					}
					if (match_i == _array['t_x']) { break; }
				}
				if (match_i == _array['t_x']) { break; }
			}

			var _total_w = m9_get_num(jQuery(obj).css("width"));
			var _sum = 0;
			var _empty = 0;
			for (var x=0;x<_array['t_x'];x++) {			
				if (cols_w[x]) {
					_sum += cols_w[x];
				} else {
					_empty++;
				}
			}
			
			var _average = parseInt((_total_w - _sum) / _empty);
			if (!_average) { _average = ""; }
			var _return = [];

			var _html = '<colgroup>\n';	
			for (var i=0;i<_array['t_x'];i++) {
				var _w = (cols_w[i]) ? cols_w[i] : _average;
				_html += '<col width="' + _w + '" />\n';
				_return[i] = _w;
			}
			_html += '</colgroup>\n';

			// 이전 colgroup 제거
			if (jQuery(obj).find('colgroup').length > 0) {				
				jQuery(obj).find('colgroup').remove();
			}
				
			if (jQuery(obj).find('caption').length > 0) {
				jQuery(obj).find('caption').after(_html);
			} else {
				jQuery(obj).children().eq(0).before(_html);				
			}

			return _return;

		},
			
		'empty' : function() {
			var obj = table_obj._now;
			var _colgroup = jQuery(obj).find('colgroup');
			if (_colgroup.length > 0) {
				_colgroup.find('col').each(function() {
					jQuery(this).attr('width','');
				});
			}
		},
		
		'remove' : function() {
			var obj = table_obj._now;			
			var _colgroup = jQuery(obj).find('colgroup');
			if (_colgroup.length > 0) {
				_colgroup.remove();
			}			
		},

		'reset' : function(obj) {

			if (jQuery(obj).data('table_slider') == 1) {

				if (jQuery(obj).parent().hasClass("_table-colresize")) {

					var _cols = jQuery(obj).find('colgroup').children();					
					var _target = jQuery(obj).parent().find('._div-colresize');
					var ui_values = jQuery(_target).slider('option','values');

					var num = ui_values.length;
					var max_num = num - 1;
					var max_w = ui_values[max_num] * 1;
					var last_w = 0;
					
					var width_array = [];
					for (var i=0;i<num;i++) {
						var _w = ui_values[i] * 1 - last_w * 1;
						//var _w = (_w / max_w) * 100;
						width_array.push(roundXL(_w,2));
						//_cols[i].attr('width',_w);
						jQuery(_cols[i]).css('width',_w);
						
						last_w = ui_values[i];
					}

				}
			}
			
		}
		
	},
	
	get_selected : function(_table) {

		//현재선택되어진 영역 얻어오기
		// 리턴값 : top,left,colspan,rowspan,array
		var _hash = { top : 0, left : 0, colspan : 0, rowspan : 0 };	
		
		var tr_objs = jQuery(_table).find("tr");
		var tr_num = tr_objs.length;
		var td_num = 0;
						
		tr_objs.each(function() {
			var _num = jQuery(this).find('th,td').length;
			if (_num > td_num) { td_num = _num; }
		});

		var tr_array = new Array(tr_num);

		var tr_i = 0;
		var left_i = tr_num;
		tr_objs.each(function(){
			
			var td_i = 0;
			jQuery(this).find("th,td").each(function(){
		
				if (jQuery(this).hasClass('selected_tag')) {
					if (!tr_array[tr_i]) { tr_array[tr_i] = 0; }
					var _cols = jQuery(this).prop('colspan');
					tr_array[tr_i] += _cols;
					var _row = jQuery(this).prop('rowspan');
					for (z=1;z<_row;z++) {
						var _index = tr_i + z;
						if (!tr_array[_index]) { tr_array[_index] = 0; }
						tr_array[_index]++;
						if (_cols > 1) { tr_array[_index] += _cols - 1; }
					}
					if (td_i < left_i) { left_i = td_i; }						
				}	
				td_i++;	
			});
			tr_i++;
		});
		_hash['left'] = left_i;

		var num = 0;
		for(i=0;i<tr_array.length;i++) {
			if (tr_array[i]) {
				if (num == 0) { num = tr_array[i]; }
				if (tr_array[i] != num) { return false; }
				_hash['rowspan']++;
			} else {
				if (num == 0) {
					_hash['top']++;	
				}
			}
		}
		
		_hash['colspan'] = num;
		_hash['array'] = tr_array;

		return _hash;

	},

	_one_check : function(obj,_cell) {
		
		var _hash = { x : 0 , y : 0 , t_x : 0 , t_y : 0 };
		var _x=0,_y=0,_table = [],_being = [];
		var _colspan = [];
		var _rowspan = [];
				
		var _tr = 0;
		var _max_td = 0;
		var _matching = 0;
		jQuery(obj).find("tr").each(function() {
			
			if (!_being[_tr]) { _being[_tr] = []; _table[_tr] = []; _colspan[_tr] = []; _rowspan[_tr] = []; }
			
			var _td = 0;
			jQuery(this).find("th,td").each(function(){

				var _col = jQuery(this).prop('colspan');
				var _row = jQuery(this).prop('rowspan');		

				for (var i=0;i<_col;i++) {
					while(_being[_tr][_td]) { _td++; }					
					_being[_tr][_td] = (i == 0) ? 1 : 0;
					_table[_tr][_td] = jQuery(this)[0];
					_colspan[_tr][_td] = (i == 0) ? _col : 0;
					_rowspan[_tr][_td] = (i == 0) ? _row : 0;					
										
					if (jQuery(this)[0] == _cell && _matching == 0) { _hash['x'] = _td; _hash['y'] = _tr; _matching++; }
					if (_max_td < _td) { _max_td = _td; }
					
					for (var z=1;z<_row;z++) {
					var _tr2 = _tr + z;
					if (!_being[_tr2]) { _being[_tr2] = []; _table[_tr2] = []; _colspan[_tr2] = []; _rowspan[_tr2] = []; }
						_being[_tr2][_td] = "0"; // 중요
//						_being[_tr2][_td] = 0;
						_table[_tr2][_td] = jQuery(this)[0];										
						_colspan[_tr2][_td] = (i == 0) ? _col : 0;						
						_rowspan[_tr2][_td] = 0;//(i == 0) ? _row : 0;								
					}
					_td++;
				}
												
			});			
			_tr++;					
		});

		_hash['t_x'] = _max_td + 1;
		_hash['t_y'] = _tr;
		_hash['array'] = _table;
		_hash['be'] = _being;

		var colspans = [];
		for (var y=0;y<_colspan.length;y++) {
			colspans[y] = [];
			for (var x=0;x<_colspan[y].length;x++) {
				if (_colspan[y][x] != 0) {
					colspans[y].push(_colspan[y][x]);
				}
			}	
		}
		_hash['colspan'] = colspans;
		
		var rowspans = [];
		for (var y=0;y<_rowspan.length;y++) {
			rowspans[y] = [];
			for (var x=0;x<_rowspan[y].length;x++) {
				if (_rowspan[y][x] != 0) {
					rowspans[y].push(_rowspan[y][x]);
				}
			}	
		}
		_hash['rowspan'] = rowspans;	

		return _hash;				
	},

	'get_td_width' : function(_target) {
		return m9_get_num(jQuery(_target).css("width"));
	}
	    	
}; //table_obj