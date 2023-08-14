var grid_obj = {

	_id : false,
	// **** builder.int() 전에 처리해야함
	_grids : ".m9-grid-1,.m9-grid-2,.m9-grid-3,.m9-grid-4,.m9-grid-5,.m9-grid-6",
	_columns : ".m9-column-1,.m9-column-2,.m9-column-3,.m9-column-4,.m9-column-5,.m9-column-6",
	_ignore : "#editMenu-grid,.editMenu-column,#m9_alt_view1,._setting_area_box",
	_grid_before : false,	
	_column_before : false,
	_int_count : 0,

	get_div_kind_num : function(_class) {
		var d = _class.split('-');
		return d[d.length-1] * 1;
	},	
	
	// grid 셋팅
	int : function(_id) {

		this._id = _id;

		var grid_html_parser = this.html.parser(jQuery("#"+_id).html()); // grid 처리
		jQuery('#'+_id).html(grid_html_parser);

		jQuery("#"+_id).find(this._grids).each(function(){
			grid_obj.set_one_grid(this); //grid와column 처리
		});

		if (this._int_count > 0) { return; }
		this._int_count++;

		if (jQuery('#editMenu-grid').length == 0) {	
			var _html = '<div id="editMenu-grid" class="handle_height _m9editor" style="display:none">' +
			'<ul>' +		
				'<li><a onclick="grid_obj.mode.column.int();return false;" alt="'+ msg_msg('column_set') +'" title="'+ msg_msg('msg_72') +'" data-alt-no="1" class="edit-btn icon-columns-set hd-fix"></a></li>' +						
				'<li><a onclick="grid_obj.spacing.change();return false;" alt="'+ msg_msg('set_type') +'" title="'+ msg_msg('msg_4') +'" data-alt-no="1" class="edit-btn icon-cellspacing hd-fix"></a></li>' +				
				'<li><a onclick="grid_obj.column.add_column();return false;" alt="'+ msg_msg('add_column') +'" title="'+ msg_msg('msg_5') +'" data-alt-no="1" class="edit-btn icon-plus-right hd-copy"></a></li>' +		
				'<li><a onclick="grid_obj.column.add_grid();return false;" alt="'+ msg_msg('add_grid') +'" title="'+ msg_msg('msg_6') +'" data-alt-no="1" class="edit-btn icon-plus-bottom hd-copy"></a></li>' +
			'</ul>' +
			'</div>';
			jQuery("body").append(_html);
		}

		this.html.int();

		jQuery(document).on('mousedown',function(e) {
			var et = m9_get_evt_obj(e);	
			if (jQuery(et).parents('.m9_editor_box').length > 0 || (jQuery(et).parents(grid_obj._ignore).length > 0 || jQuery(et).is(grid_obj._ignore))) { // 편집부분에 마우스 다운이 이루어지면
				grid_obj.setting.set(et);
				m9_obj_set_data(grid_obj._id,'edit_on',1);
			} else { // 편집부분 외에 마우스 다운이 이루어지면
				grid_obj.setting.reset();		
				m9_obj_set_data(grid_obj._id,'edit_on',0);
			}
		});
		
	}, //int
		
	setting : {

		'set' : function(obj) { // 클릭지점의 그리드 활성화
			
			var J_obj = jQuery(obj); // 클릭지점
				
			if (J_obj.parents(grid_obj._ignore).length == 0 && !J_obj.is(grid_obj._ignore)) {
								
				var _grid = (J_obj.is(grid_obj._grids)) ? obj : J_obj.parents(grid_obj._grids)[0];						
				var _column = (J_obj.is(grid_obj._columns)) ? obj  : J_obj.parents(grid_obj._columns)[0];								
				if (!_column) { _column = jQuery(_grid).find(grid_obj._columns).last()[0]; }

				var J_column = jQuery(_column);
				
				if (grid_obj._grid_before && grid_obj._column_before != _column) {
					jQuery(grid_obj._grid_before).removeClass("grid-line-on").find(grid_obj._columns).removeClass("grid-line-on");	
					obj_fadeOut(jQuery(grid_obj._column_before).find(".editMenu-column")[0]);					
				}
	
				jQuery(_grid).addClass("grid-line-on").find(grid_obj._columns).addClass("grid-line-on");	
				
				var _mode = m9_mode_obj.get();

				var Cstr = grid_obj.get_name(_grid);
				var grid_num = grid_obj.get_div_kind_num(Cstr);
					
				if (_mode == '') { // PC 이면

					var _display = (grid_num <= 1) ? 'none' : '';						
					var _menu = J_column.find(".editMenu-column")[0];
					jQuery(_menu).find('.hd-mover,.hd-fix,.hd-remove').css('display',_display); // grid-1이면 필요없는 기능버튼 감추기
					obj_fadeIn(J_column.find(".editMenu-column")[0]);	

					jQuery('#editMenu-grid .icon-columns-set').css('display','none'); // 컬럼설정 감추기(모바일전용)
					jQuery('#editMenu-grid .hd-copy').css('display',''); // 하단 그리드 복사 버튼(PC전용)
		
					if (J_column.hasClass('_not-copy')) {
						J_column.find('.hd-copy').addClass('locked');
					} else {
						J_column.find('.hd-copy').removeClass('locked');						
					}

				} else {

					var _display = (grid_num <= 1) ? 'none' : '';
					jQuery('#editMenu-grid .icon-columns-set').css('display',_display); // 컬럼설정 감추기(모바일전용)
					jQuery('#editMenu-grid .hd-copy').css('display','none'); // 하단 그리드 복사 버튼(PC전용)
						
				}

				var m = _get_box_info(_grid,1);
				var _t = m['t'];
				var _l = (m['w2'] + m['l2']) + 'px';			
				jQuery('#editMenu-grid').css({top:_t,left:_l});
				obj_fadeIn('#editMenu-grid');
			
				grid_obj._grid_before = _grid;
				grid_obj._column_before = _column;

			}

		},
		
		reset : function(obj) {
			obj_fadeOut('.editMenu-column');
			obj_fadeOut('#editMenu-grid');						
			jQuery('.grid-line-on').removeClass('grid-line-on');
		}		

	}, //setting

	column : {
	
		'_hd_html' : 
			'<div class="editMenu-column handle_width _m9editor no" style="display:none">' +					
				'<div>' +
					'<ul>' +
						'<li><a onclick="return false;" alt="'+ msg_msg('set_order') +'" title="'+ msg_msg('msg_3') + ((m9_ie_var <= 7) ? "(1초간)" : "") + '" data-alt-no="1" class="edit-btn icon-arrow-width hd-mover _column-hd-mover ui-sortable-handle"></a></li>' +
						'<li><a onclick="grid_obj.column.copy(this);return false;" title="'+ msg_msg('copy') +'" data-alt-no="1" class="edit-btn icon-plus hd-copy"></a></li>' +
						'<li><a onclick="grid_obj.column.widen();return false;" title="'+ msg_msg('widen') +'" data-alt-no="1" class="edit-btn icon-widen hd-fix"></a></li>' +
						'<li><a onclick="grid_obj.column.narrow();return false;" title="'+ msg_msg('narrow') +'" data-alt-no="1" class="edit-btn icon-narrow hd-fix"></a></li>' +				
						'<li><a onclick="grid_obj.html.view();return false;" title="'+ msg_msg('fix_html') +'" data-alt-no="1" class="edit-btn icon-tag hd-html"><i class="edit-btn-popup-2"></i></a></li>' +	
						'<li><a onclick="grid_obj.column.del(this);return false;" title="'+ msg_msg('delete') +'" data-alt-no="1" class="edit-btn icon-del hd-remove"></a></li>' +	
					'</ul>' +	
				'</div>' +
			'</div>',

		'add_grid' : function() {	
			var _grid_html = '<div class="m9-grid-block">\n<div class="m9-grid-1">\n\t<div class="m9-column-1">\n\t\t<p class="placeholder_txt">' + msg_msg('msg_36') + '</p>\n\t</div>\n</div>\n</div>';  // "내용입력해주세요"
			jQuery(_grid_html).insertAfter(jQuery(grid_obj._grid_before).parents('.ui-draggable')[0]).css('display','none').fadeIn(300,function(){				
				editor.mode.adjust_display(this);
				builder.setting.check();
			});
		},
			
		'add_column' : function() {
	
			var Cstr = grid_obj.get_name(grid_obj._grid_before);
			var grid_num = grid_obj.get_div_kind_num(Cstr);
		
			var sum = grid_num + 1;
		
			if (sum > 6) {
				var _str = msg_msg('msg_55').msg_format('6'); // "총 [6]칸을 넘을 수 없습니다"
				error_msg(_str);				
				return false;	
			}		

			jQuery(grid_obj._grid_before).append('\n\t<div class="m9-column-1 m9-column-last grid-line-on" style="display:none">\n\t\t<p class="placeholder_txt">' + msg_msg('msg_36') + '</p>\n\t</div>\n');  // "내용입력해주세요"
	
			grid_obj.reset_grid();
			grid_obj.set_one_grid(grid_obj._grid_before);
					
			jQuery(grid_obj._grid_before).find(grid_obj._columns).last().fadeIn(300,function() {
				undo_obj._add(this);				
			});
	
		},
			
		'copy' : function(obj) {

			if (jQuery(obj).hasClass('locked')) {
				error_msg(msg_msg('msg_69')); // '잠금기능으로 복사 불가합니다'
				return false;	
			}
			
			var Cstr = grid_obj.get_name(grid_obj._grid_before);
			var grid_num = grid_obj.get_div_kind_num(Cstr);

			// 현재 column의 종류 얻어오기
			var Cstr = grid_obj.column.get_name(grid_obj._column_before);
			var column_num = grid_obj.get_div_kind_num(Cstr);
	
			var sum = grid_num + column_num;

			if (sum > 6) {
				var _str = msg_msg('msg_55').msg_format('6'); // "총 [6]칸을 넘을 수 없습니다"
				error_msg(_str);
				return false;	
			}

			M9ALT.hidden(obj); // 복사 버튼 title값 삭제방지
			
			var J_clone = jQuery(grid_obj._column_before).clone();
			var J_grid_column_before = jQuery(grid_obj._column_before);
						
			J_grid_column_before.after(J_clone).next().css("display","none");			
			grid_obj.reset_grid();
											
			J_grid_column_before.next().fadeIn(300,function() {
				jQuery(this).next().before("\n\t");
				undo_obj._add(this);				
			});

			J_clone.find('.selected_tag').removeClass('selected_tag');	
			J_clone.find('.grid-line-on').removeClass('grid-line-on');
			J_clone.find('.editMenu-column').css('display','none');
			process_M9ALT(J_clone[0]);

			grid_obj.setting.set(editor._now);
			
		},

		'del' : function(e) {
	
			var grid_name = grid_obj.get_name(grid_obj._grid_before);
			var grid_num = grid_obj.get_div_kind_num(grid_name);

			M9ALT.hidden(e); // 복사 버튼 title값 삭제방지	
						
			if (grid_num <= 1) {
				error_msg(msg_msg('msg_56')); // "더 이상 삭제 할 수 없습니다"
				return false;	
			}

			// 선택영역 삭제를 위한 로직
			RestoreSelection(storedSelections);
			get_container();
			var now_block = get_is_parents(e,'._one-column','.m9_editor_box');
			jQuery(now_block).addClass('_delete_block');
			if (jQuery(Editor_Container).parents('._delete_block').length > 0) {
				storedSelections = false;	
			}
			
			jQuery(grid_obj._column_before).fadeOut(300,function(){
				var _re = this;
				jQuery(this).remove();
				grid_obj.reset_grid();
				undo_obj._add(_re);				
			});
	
		},
		
		'widen' : function() {
	
			var grid_name = grid_obj.get_name(grid_obj._grid_before);
			var grid_num = grid_obj.get_div_kind_num(grid_name);
			
			// 현재 column의 종류 얻어오기
			var column_name = grid_obj.column.get_name(grid_obj._column_before);
			var column_num = grid_obj.get_div_kind_num(column_name);
		
			if (grid_num == 1 && column_num == 1) { return false; }
				
			var sum = grid_num + 1;
			
			if (sum > 6) {
				error_msg(msg_msg('msg_57')); // "더이상 넓힐 수 없습니다!"
				return false;	
			}
		
			var _return = "m9-column-" + (column_num + 1);
			jQuery(grid_obj._column_before).removeClass(column_name).addClass(_return);				
			grid_obj.reset_grid();	

			undo_obj._add(grid_obj._column_before);
							
		},
	
		'narrow' : function() {
		
			// 현재 column의 종류 얻어오기
			var column_name = grid_obj.column.get_name(grid_obj._column_before);
			var column_num = grid_obj.get_div_kind_num(column_name);			

			if (column_num <= 1) {
				error_msg(msg_msg('msg_58')); // "더이상 줄일 수 없습니다!"
				return false;	
			}
		
			var _return = "m9-column-" + (column_num - 1);
			jQuery(grid_obj._column_before).removeClass(column_name).addClass(_return);				
			grid_obj.reset_grid();	

			undo_obj._add(grid_obj._column_before);
					
		},
	
		'get_name' : function(obj) {
			var _class = jQuery(obj).attr("class");
			var rgExp = /m9\-column\-\d/;
			var Cstr = String(_class.match(rgExp));			
			return Cstr;			
		}	
	
	}, // column

	html : {
		
		'int' : function() {

			if (jQuery("#column-html").length == 0) {
				var _html = '<div id="column-html" class="html-win curtain-box">' +
				'<textarea id="column_html_textarea" title="'+ msg_msg('fix_html') +'"></textarea>' +
				'<div class="btn_box">'+
				'<div class="_full"><button onclick="builder.html.fullscreen(this)" data-alt-no="1" class="edit-btn icon-arrows-alt hd-fix no">'+ msg_msg('msg_22') +'</button></div>'+
				'<div><button onclick="grid_obj.html.change()" class="curtain-btn editor-btn-yes">OK</button></div>' +
				'</div>'+
				'</div>';
				jQuery("body").append(_html);
			}
					
		},

		'view' : function() {

			remove_m9_ani_tag(grid_obj._column_before);
			
			var _html = grid_obj._column_before.outerHTML;
			_html = grid_obj.html.convert(_html);	

			html_obj.view('grid_obj.html.change',_html);

		},

		'convert' : function(_html) {

			jQuery("body").append('<div id="_edit_covert_box" style="display:none"></div>');		
			var convert_obj = jQuery('#_edit_covert_box');				
			convert_obj[0].innerHTML = _html;

			convert_obj.find(grid_obj._columns).each(function() {
				this.outerHTML = jQuery(this).find('._one-in-column').html();				
			});

			m9_editor_convert(convert_obj[0]);

			_html = convert_obj.html();
			convert_obj.remove();
			
			_html = remove_empty_line(_html);			
			_html = _html.replace(/\u200C/g, '');
			_html = jQuery.trim(_html);

//_html = m9_remove_xss_style.remove_xss(_html);

//_html = jQuery.htmlClean(_html);

			return _html;
			
		},

		'change' : function(_html) {

			var J_column_before = jQuery(grid_obj._column_before);

			J_column_before.find('._one-in-column').html('\n\n' + _html + '\n\n\t');	

			var J_one_in_column = J_column_before.find('._one-in-column');
			if (J_one_in_column.children().length == 0) { // 태그 없으면 감쌈
				J_one_in_column.html('<p>' + J_one_in_column.html() + '</p>');
			}

			ani_type_obj.checking(grid_obj._column_before); // 실행할 ani_type 실행
			
			undo_obj._add(grid_obj._column_before);	
					
		},

		'parser' : function(_html) { // grid 처리

			var _temp_id = '_edit_covert_box2';
			jQuery("body").append('<div id="'+_temp_id+'" style="display:none">'+_html+'</div>');		
			
			var _separator = '__this_is__m9grid_separator__' + Math.round(Math.random()*100000);
			var htmls = [];

			jQuery('#'+_temp_id).find(grid_obj._grids).each(function(index){
				if (jQuery(this).parent('.m9-grid-block').length > 0) {
					htmls[index] = jQuery(this).parent('.m9-grid-block')[0].outerHTML;												
					jQuery(this).parents('.m9-grid-block')[0].outerHTML = _separator;						
				} else {
					htmls[index] = this.outerHTML;
					this.outerHTML = _separator;									
				}
			});
		
			var _html = jQuery('#'+_temp_id).html();
			var lists = _html.split(_separator);
	
			var regExp = /\S/g;
			var return_html = "";
			for (var i=0;i<lists.length;i++) {
				if (regExp.test(lists[i])) {
					return_html += '<div class="m9-grid-block">\n<div class="m9-grid-1">\n\t<div class="m9-column-1">\n' + jQuery.trim(lists[i]) + '\n\t</div>\n</div>\n</div>\n\n\n';
				}
				if (htmls[i]) {	
					return_html += '' + jQuery.trim(htmls[i]) +'\n\n\n';
				}
			}

			jQuery('#'+_temp_id).remove();	
			return jQuery.trim(return_html);
							
		}

	}, //html
		
	get_name : function(obj) {
		var _class = jQuery(obj).attr("class");
		if (!_class) { return ""; }
		var rgExp = /m9\-grid\d?\-\d/;
		var Cstr = String(_class.match(rgExp));
		return Cstr;				
	},

	spacing : {
		
		keys : ['m9-spacing-0','m9-spacing-1','m9-spacing-2'],
		
		get_from_to : function(obj) { // 현재 간격Class,바꿀간격Class 두개 리턴

			var _mode = m9_mode_obj.get();
						
			var _from = this.get(obj);
			var _to = '';
			var index = -1;
			for (var i=0;i<this.keys.length;i++) {
				
				var _name = (_mode == '') ? this.keys[i] : _mode +'-'+ this.keys[i];
								
				if (_name == _from) {
					index = i;
				}
			}
			var _to_num = index + 1;
			
			if (_to_num > (this.keys.length - 1)) {
				_to = '';
			} else {
				var _name = (_mode == '') ? this.keys[_to_num] : _mode +'-'+ this.keys[_to_num];				
				_to = _name;				
			}
			
			return [_from,_to];

		},
		
		get : function(obj) { // 현재 간격 class 얻어오기('m9-spacing-0','m9-spacing-1','m9-spacing-2')

			var _mode = m9_mode_obj.get();
					
			for (var i=0;i<this.keys.length;i++) {
				var _name = (_mode == '') ? this.keys[i] : _mode +'-'+ this.keys[i];
				if (jQuery(obj).hasClass(_name)) {
					return _name;
				}
			}
			return '';
		},
		
		change : function() { // 간격변경 m9-spacing-0,1,2,0,1,2 순으로 계속 무한반복형태

			var _array = this.get_from_to(grid_obj._grid_before);			
			if (_array[0] != '') {
				jQuery(grid_obj._grid_before).removeClass(_array[0]);
			}
			if (_array[1] != '') {
				jQuery(grid_obj._grid_before).addClass(_array[1]);
			}

			M9ALT.hidden(m9_get_evt_obj(event));	
			var _str = (_array[0] != '') ? _array[0] : 'null';
			_str += ' → ';
			_str += (_array[1] != '') ? _array[1] : 'null';
			error_msg(_str);
						
		}
	},
	
	set_one_grid : function(obj) { // 그리드 설정

		var _sortable = obj;
		var J_obj = jQuery(obj); // 클릭지점 혹은 한개의 블럭
		
		if (J_obj.parents('.m9-grid-block').length > 0) {

			var _block = J_obj.parents('.m9-grid-block')[0];
			if (!jQuery(_block).parent().hasClass("_one-row")) {		
				_block.outerHTML = '<div class="_one-row">' + _block.outerHTML + '</div>'; /* 중요:jquery로바꾸면 column 이동안됨 */				
			}
		
		} else if (!J_obj.parent().hasClass("_one-row")) {	
			obj.outerHTML = '<div class="_one-row">' + obj.outerHTML + '</div>'; /* 중요:jquery로바꾸면 column 이동안됨 */			
		}
			
		J_obj.find(grid_obj._columns).each(function() {
			
			if (!jQuery(this).children().hasClass("_one-column")) {
				this.innerHTML = '<div class="_one-column"><div class="_one-in-column">'+this.innerHTML +'</div></div>';				
			}
			
			var J_this = jQuery(this);
			
			if (J_this.find("._one-in-column").children().length == 0) {
				J_this.find("._one-in-column").html('<div>' + J_this.find("._one-in-column").html() + '</div>');
			}
		
			if (J_this.find(".editMenu-column").length == 0) {
				J_this.find("._one-column").append(grid_obj.column._hd_html);
				process_M9ALT(J_this.find(".editMenu-column")[0]);
			}
		});

		if (!J_obj.hasClass("ui-sortable")) {			
			J_obj.sortable({
				//item : "",
				axis : "x",
				cursor : "move",
				//placeholder : "",
				//connectWith : "",
				distance : 5,
				delay : 200,
				tolerance : "pointer",
				handle : "._column-hd-mover",
				start : function(event,ui) {
					M9ALT.hidden(event.srcElement); // 복사 버튼 title값 삭제방지
					editor.event_doing.set(1);
				},
				//change : function(event,ui) {},					
				stop : function(event,ui) {
					editor.event_doing.set(0);
					grid_obj.reset_grid();
					undo_obj._add(this);					
				}
			});
		}				
		
	},

	reset_grid : function() {
		
		var class_name = this.get_name(this._grid_before);

		var _f = class_name.split('-');	
		var grid_num = _f[_f.length-1] * 1;
		
		var total = jQuery(this._grid_before).children().length;
		
		var sum = 0;
		jQuery(this._grid_before).children().each(function(index){

			var Cstr = grid_obj.column.get_name(this);
			sum += grid_obj.get_div_kind_num(Cstr);		

			var J_this = jQuery(this);
			
			if (total == 1) {
				J_this.removeClass("m9-column-first").removeClass("m9-column-last");			
			} else {		
				if (index == 0) {
					J_this.removeClass("m9-column-last").addClass("m9-column-first");		
				} else if (index == (total - 1)) {
					J_this.removeClass("m9-column-first").addClass("m9-column-last");						
				} else {
					J_this.removeClass("m9-column-first").removeClass("m9-column-last");						
				}
			}	
		});
	
		if (sum != grid_num) {		
			var _return = _f[0] +'-'+ _f[1] +'-'+ sum;			
			jQuery(this._grid_before).removeClass(class_name).addClass(_return);			
		}

		jQuery(this._grid_before).find(this._columns).each(function(){
			jQuery(this).css({'width':'','min-width':'auto','z-index':''});
			jQuery(this).css({'position':'','left':'','top':''});
		});
				
	},
	
	mode : {

		_now : false,

		column : {

			_kind : [20,25,33,50,66,80,100],
					
			int : function() {
				
				if (m9_mode_obj.get() == '') {
					alert(msg_msg('msg_70'));
					return false;	
				}
	
				if (jQuery('._cols-setting-area').length > 0) {
					alert(msg_msg('msg_71'));
					return false;	
				}
	
				grid_obj.mode._now = grid_obj._grid_before;
				
				var _cols = jQuery(grid_obj._grid_before).find(grid_obj._columns);
	
				jQuery(grid_obj._grid_before).append('<div class="grid-mode-setting-box"><button data-alt-no="1" class="grid-mode-btn editor-btn-yes _editor_btn" onclick="grid_obj.mode.column.compelete();return false">'+msg_msg('fix')+'</button></div>');
				
				_cols.each(function() {
		
					var _html = '<div class="_cols-setting-area"><div><div>' +
					'<select onchange="grid_obj.mode.column.change(this);return false" class="_w_kind">' +
					'<option value=""></option>';
					
					var _kind = grid_obj.mode.column._kind;
					for (var i=0;i<_kind.length;i++) {
						var w = grid_obj.mode.column.get(this);
						var _selected = (_kind[i] == w) ? 'selected' : '';
						_html += '<option value="' + _kind[i] + '" '+ _selected +'>' + _kind[i] + '%</option>';
					}
					_html += '</select>';
	
					_html += '<select onchange="grid_obj.mode.margin.change(this);return false" class="_m_kind">' +
					'<option value=""></option>';
									
					var _kind = grid_obj.mode.margin._kind;
					for (var i=0;i<_kind.length;i++) {
						var m = grid_obj.mode.margin.get(this);
						var _selected = (_kind[i] == m) ? 'selected' : '';
						var _msg = (_kind[i] == 'rm') ? 'margin-right' : 'margin-left';
						_html += '<option value="' + _kind[i] + '" '+ _selected +'>' + _msg + '</option>';
					}
					_html += '</select>';
									
					_html += '</div></div></div>';
					
					jQuery(this).find('._one-column').append(_html);
					
				});
							
			},
			
			compelete : function() {
				
				jQuery(grid_obj.mode._now).find('.grid-mode-setting-box').remove();
				jQuery(grid_obj.mode._now).find('._cols-setting-area').remove();
				grid_obj.mode._now = false;
			
			},
			
			change : function(obj) {
				
				var mode = m9_mode_obj.get();
				
				var _var = jQuery(obj).val();			
				var _target = jQuery(obj).parents(grid_obj._columns);

				this.remove(_target);

				if (_var != '') {		
					jQuery(obj).parents(grid_obj._columns).addClass(_class = mode + '-width-' + _var);
				}
	
				grid_obj.mode.margin.optimum(_target[0]);
	
			},
			
			get : function(obj) {
					
				var mode = m9_mode_obj.get();
				var J_obj = jQuery(obj);
				
				var lists = grid_obj.mode.column._kind;
				
				for (var i=0;i<lists.length;i++) {
					if (J_obj.hasClass(mode +'-width-'+ lists[i])) {
						return lists[i];
					}
				}
				return '';
				
			},
			
			remove : function(obj) {
			
				var mode = m9_mode_obj.get();
				var J_obj = jQuery(obj);
				
				for (var i=0;i<this._kind.length;i++) {
					J_obj.removeClass(mode + '-width-' + this._kind[i]);
				}				
			}
			
		},
		
		margin : {

			_kind : ['rm','lm'],
		
			change : function(obj) {
				
				var mode = m9_mode_obj.get();
				
				var _var = jQuery(obj).val();			
				var _target = jQuery(obj).parents(grid_obj._columns);

				this.remove(_target);

				if (_var != '') {		
					jQuery(obj).parents(grid_obj._columns).addClass(_class = mode + '-' + _var);
				}
			
			},
						
			get : function(obj) {
			
				var mode = m9_mode_obj.get();
				
				var lists = grid_obj.mode.margin._kind;

				var J_obj = jQuery(obj);
								
				for (var i=0;i<lists.length;i++) {
					var m = mode +'-'+ lists[i];
					if (J_obj.hasClass(m)) {
						return lists[i];
					}
				}
				return '';
				
			},

			remove : function(obj) {
			
				var mode = m9_mode_obj.get();

				var J_obj = jQuery(obj);
								
				for (var i=0;i<this._kind.length;i++) {
					J_obj.removeClass(mode + '-' + this._kind[i]);
				}				
			},

			optimum : function(obj) {
				
				var grid = jQuery(obj).parents(grid_obj._grids)[0];
				var columns = jQuery(grid).find(grid_obj._columns);
				var next_obj = false;
					
				var index = 0;
				for (var i=0;i<columns.length;i++) {		
					if (columns[i] == obj) {
						index = i;
						var _next = i + 1;
						if (columns[_next]) { next_obj = columns[_next]; }
						break;	
					}	
				}
				
				var _mode = m9_mode_obj.get();
				
				var total_w = 0;
				for (var i=0;i<index;i++) {
					total_w += grid_obj.mode.column.get(columns[i]);	
				}
	
				var etc_w = total_w % 100;

				if (etc_w == 0 || etc_w == 99) {
					
					this.remove(obj);
					jQuery(obj).addClass(_mode+'-rm').find('._m_kind').val('rm');					

				} else {
					
					var _w2 = (etc_w + grid_obj.mode.column.get(columns[index])) % 100;
					
					if (_w2 == 0 || _w2 == 99) {

						this.remove(obj);
						jQuery(obj).addClass(_mode+'-lm').find('._m_kind').val('lm');

						if (next_obj) {
							this.remove(next_obj);
							jQuery(next_obj).addClass(_mode+'-rm').find('._m_kind').val('rm');							
						}
											
					} else {
		
						this.remove(obj);
						jQuery(obj).find('._m_kind').val('');
						
					}
					
				}

				this.remove(columns[0]);
				jQuery(columns[0]).addClass(_mode+'-rm').find('._m_kind').val('rm');				

				if (!(_w2 == 0 || _w2 == 99)) {	
					var _last = columns.length - 1;
					this.remove(columns[_last]);									
					jQuery(columns[_last]).addClass(_mode+'-lm').find('._m_kind').val('lm');						
				}
								
				if (jQuery(obj).hasClass(_mode+'-width-100')) {
					this.remove(obj);
					jQuery(obj).find('._m_kind').val('');		
				}
				
			}
											
		}
	
	} // mode
	
}; // grid_obj