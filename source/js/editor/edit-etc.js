// ************** 함수 몇개됨

var m9_remove_xss_style = {

	'regexs' : {
		'color' : /^(transparent|inherit|[a-zA-Z]+|(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8})|((rgb|hsl)a?\([\d%,.\s]+\)))$/,
		'margin_top' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'margin_bottom' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'margin_left' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'margin_right' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'padding_top' : /^(0|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'padding_bottom' : /^(0|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'padding_left' : /^(0|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'padding_right' : /^(0|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'border_width' : /^(0|inherit|initial|thin|medium|thick|revert|unset|\d*\.?\d+(px|em|rem|%|cm|mm|in|pt|pc))$/,
		'border_style' : /^(none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset|inherit|initial|revert|unset)$/,
		'border_color' : /^(transparent|inherit|[a-zA-Z]+|(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8})|((rgb|hsl)a?\([\d%,.\s]+\)))$/,
		'font_size' : /^(xx-small|x-small|small|medium|large|x-large|xx-large|smaller|larger|inherit|\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'font_style' : /^(inherit|initial|italic|normal|oblique|revert|unset)$/,
		'font_weight' : /^(normal|bold|bolder|lighter|inherit|initial|revert|unset|\d{1,3})$/,
		'line_height' : /^(0|normal|inherit|initial|revert|unset|\d+|\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'letter_spacing' : /^(0|normal|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'word_spacing' :  /^(0|normal|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'border_radius' : /^(0|inherit|initial|revert|unset|\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax)(\s+\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax)){0,3})$/,
		'text_align' : /^(left|right|center|justify|start|end|inherit|initial|revert|unset)$/,
		'vertical_align' : /^(baseline|sub|super|top|text-top|middle|bottom|text-bottom|inherit|initial|revert|unset)$/,
		'background_color' : /^(transparent|inherit|[a-zA-Z]+|(#[0-9a-fA-F]{3}|#[0-9a-fA-F]{6}|#[0-9a-fA-F]{8})|((rgb|hsl)a?\([\d%,.\s]+\)))$/,
		'background_image' : /^url\(['"]?(.*?)['"]?\)$/,
		'background_position' : /^-?\d*\.?\d+(px|em|rem|%|top|bottom|left|right|center|inherit|initial|revert|unset)?\s*-?\d*\.?\d+(px|em|rem|%|top|bottom|left|right|center|inherit|initial|revert|unset)?$/,
		'background_size' : /^(auto|cover|contain|inherit|initial|revert|unset|\d*\.?\d+(px|em|rem|%|vw|vh|vmin|vmax))\s*(\/\s*(auto|cover|contain|inherit|initial|revert|unset|\d*\.?\d+(px|em|rem|%|vw|vh|vmin|vmax)))?$/,
		'background_repeat' : /^(repeat-x|repeat-y|repeat|no-repeat|round|space|inherit|initial|revert|unset)$/,
		'background_origin' : /^(padding-box|border-box|content-box|inherit|initial|revert|unset)$/,
		'background_clip' : /^(padding-box|border-box|content-box|inherit|initial|revert|unset)$/,
		'background_attachment' : /^(scroll|fixed|local|inherit|initial|revert|unset)$/,
		'display' : /^(block|inline|inline-block|none|flex|grid|table|table-cell|table-row|table-row-group|table-column|table-column-group|table-header-group|table-footer-group|list-item|inline-table|run-in|contents|flow-root|inline-flex|inline-grid|table-caption|inherit|initial|revert|unset)$/,
		'text_decoration' : /^(auto|blink|none|underline|overline|line-through|initial|inherit|revert|unset)$/,
		'float' : /^(left|none|right|inline-start|inline-end|inherit|initial|revert|unset)$/,
		'position' : /^(static|relative|absolute|fixed|sticky||inherit|initial|revert|unset)$/,
		'left' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'right' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'bottom' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'top' : /^(0|auto|inherit|initial|revert|unset|^-?\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'width' : /^(0|auto|fit-content|max-content|min-content|inherit|initial|revert|unset|^\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'min_width' : /^(0|auto|fit-content|max-content|min-content|inherit|initial|revert|unset|^\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'max_width' : /^(0|none|fit-content|max-content|min-content|inherit|initial|revert|unset|^\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'height' : /^(0|auto|fit-content|max-content|min-content|inherit|initial|revert|unset|^\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'min_height' : /^(0|auto|fit-content|max-content|min-content|inherit|initial|revert|unset|^\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'max_height' : /^(0|none|fit-content|max-content|min-content|inherit|initial|revert|unset|^\d*\.?\d+(px|%|cm|em|ex|in|mm|pc|pt|rem|vh|vw|vmin|vmax))$/,
		'z_index' : /^(auto|inherit|initial|revert|unset|^-?\d+)$/,
		'table_layout' : /^(auto|fixed)$/,

	},
	_important : /\s+\!important$/,
	background_list : ['background_color','background_image','background_position','background_size','background_repeat','background_origin','background_clip','background_attachment'],
	fonts : {},
	fonts_count : 0,

	convert_style : function(str) {

		str = str.replace(/\n|\t/g,'').replace(/\&quot\;/g,'"').replace(/;$/,''); // 글꼴위해 & 마지막 ; 제거
		var _styles = str.split(";");

		var re_styles = [];

		for (var i=0;i<_styles.length;i++) {

			var _re_style = '';
			var mm = m9_convertStyleToArray(_styles[i]);

			if (!mm[0] || !mm[1]) { return false; }

			var _value = jQuery.trim(mm[1]);
			var _key = mm[0].replace('-','_');
			_key = jQuery.trim(_key);

			// 값에 !important 체크
			var _important = 0;
			if (m9_remove_xss_style._important.test(_value)) {
				_value = _value.replace(m9_remove_xss_style._important,'');
				_important++;
			}

			if (_key == '') {

				continue;

			} else if (_key == 'font_family') {

				// 글꼴 목록 초기화
				if (m9_remove_xss_style.fonts_count == 0) {
					for (var x=0;x<fontfamily_obj._fonts.length;x++) {
						var font =  fontfamily_obj._fonts[x][0];
						m9_remove_xss_style.fonts[font] = 1;
					}
					m9_remove_xss_style.fonts_count++;
				}

				var _v = m9_trim_quotes(_value);
				if (m9_remove_xss_style.fonts[_v]) {
					_value = _value.replace(/"/g,'&quot;'); // 글꼴 " 변환
					_re_style = _value;
				}

			} else if (_key == 'border' || _key == 'border_top' || _key == 'border_left' || _key == 'border_right' || _key == 'border_bottom') {

				if (_value == '0' || _value == 'none') { _re_style= _value; }

				var b = _value.split(/\s+(?![^(]*\))/);

				var c1,c2,c3;
				for (var z=0;z<b.length;z++) {
				
					if (m9_remove_xss_style.regexs['border_width'].test(b[z])) {
						c1 = b[z];
					} else if (m9_remove_xss_style.regexs['border_style'].test(b[z])) {
						c2 = b[z];
					} else if (m9_remove_xss_style.regexs['border_color'].test(b[z])) {
						c3 = b[z];
					}
				}

				if (c1 && c2 && c3) {
					_re_style = c1 + ' ' + c2 + ' ' + c3;
				}

			} else if (_key == 'background') {

				var b = _value.split(/\s+(?![^(]*\))/);

				var c = [];
				for (var z=0;z<b.length;z++) {
				
					var list = m9_remove_xss_style.background_list;

					for (var y=0;y<list.length;y++) {
						if (m9_remove_xss_style.regexs[list[y]].test(b[z])) {
							c.push(b[z]);
							break;
						}
					}
				}

				_re_style = c.join(' ');

			} else if (_key == 'transform') {

				_re_style = _value;

			} else if (m9_remove_xss_style.regexs[_key]) {

				if (m9_remove_xss_style.regexs[_key].test(_value)) {
					_re_style = _value;
				}

			}
			// 정의되지 않은 항목 및 값일 경우
			else {

				var k_regex = /^[a-zA-Z\-]+$/; // key 는 알파벳과 - 로 구성됨.
				var v_regex = /^[0-9a-zA-Z #.%-]+$/; // value

				var ok = 0;
				if (k_regex.test(_key)) { ok++; }
				if (v_regex.test(_value)) { ok++; }

				// key,value 둘다 유효화하면 삭제하지 않음
				if (ok == 2) {
					_re_style = _value;
				}

			}

			if (_re_style != '') {
				if (_important > 0) {
					_re_style += ' !important';
				}
				re_styles.push(mm[0] +':'+_re_style);
			}

		} // for

		var d_styles = re_styles.join(';');
		return d_styles;

	},

	remove_xss : function(_html) {

		var styles_key = ['style','data-m9-style'];

		for (var i=0;i<m9_mode_obj.info.length;i++) {
			var _key = 'data-m9-' + m9_mode_obj.info[i]['name'] + '-style';
			styles_key.push(_key);
		}

		for (var i=0;i<styles_key.length;i++) {

			var _key = styles_key[i];

			var regexPattern = new RegExp(_key + '=(["\'])([\\s\\S]*?)\\1','g');
			_html = _html.replace(regexPattern, function(match) {

				var regexPattern2 = new RegExp('^' + _key + '=', '');
				var match2 = match.replace(regexPattern2,'');
				match2 = m9_trim_quotes(match2);

				var _value = m9_remove_xss_style.convert_style(match2);
				return _key + '="'+ _value + '"';

			});

		}

		return _html;

	}

};

var editor_selector = {

	events : {},
		
	set : function(obj,_ref) {

		var _event = this.events;
				
		for (var i in _ref) {
			
			var _data = _ref[i];
			var _type = _data['_type'];

			if (!_event[_type]) {
				_event[_type] = [];	
			}

			var _kind = _data['_kind'];
			
			if (!_event[_type][_kind]) {
				_event[_type][_kind] = [];	
			}
			
			var _hash = {
				'_selector' : _data['_selector'],
				'_func' : _data['_func'],
				'_ignore' : (_data['_ignore']) ? _data['_ignore'] : 0
			};

			_event[_type][_kind].push(_hash);

		}
			
	}
		
}; // editor_selector


var editor_event = {

	events : {},
	
	set : function(obj,_ref) {
		
		if (!this.events[obj]) {
			this.events[obj] = {};
		}

		var _event = this.events[obj];
		
		for (var i in _ref) {
			
			var _data = _ref[i];
			var _type = _data['_type'];

			if (!_event[_type]) {
				
				_event[_type] = [];	
				jQuery(obj).on(_type,function(e) {		
					editor_event.excute(this,e);
				});
				
			}
		
			_event[_type].push(_data['_func']);
			
		}
							
	},
	
	excute : function(obj,e) {
		
		var _event = this.events[obj][e.type];
		for (var i in _event) {
			_event[i](e);
		}
		
	}

}; // editor_event

var edit_window_obj = {
	'_list' : {},
	'_reset' : {},
	'_close' : {},

	_sons : {},

	'int' : function(_id,_html,txt,_function) {
		
		if (jQuery('#' + _id).length == 0) {
			
			if (!edit_window_obj._list[_id]) {
				edit_window_obj._list[_id]++;
			}
			if (!txt) { txt = ''; }
			jQuery('body').append('<div id="' + _id + '" class="_edit_window _m9editor _m9window"></div>');
			jQuery('#' + _id).append('<div class="_handle"><span class="_s_title">' + txt + '</span></div><div class="_win_btn_box"><a href="#" onclick="edit_window_obj.close(\'' + _id + '\');return false;" class="win_btn ___btn">X</a></div>')
			.append('<div class="_edit_in">' + _html + '</div>').draggable({'handle':'._handle'}).css('display','none');

			if (_id != 'editWindow-setting' && _id != 'edit_menu') {
				jQuery('#'+_id).addClass('_lineup').on('click',function() {
					edit_window_obj.lineup(this.id);
				});
			}
			
			if (_function) {
				if (_function['reset']) {
					this._reset[_id] = _function['reset'];
				}
				if (_function['close']) {
					this._close[_id] = _function['close'];
				}
			}
		}
	},

	_zindex : 0,
	'lineup' : function(_id) {

		if (_id == 'edit_menu') { return false; }

		if (edit_window_obj._zindex == 0) {
			edit_window_obj._zindex = jQuery('#'+_id).css('z-index') * 1;
		}

		jQuery('._lineup').css('z-index',edit_window_obj._zindex);
		jQuery('#'+_id).css('z-index',(edit_window_obj._zindex+1));

	},

	'view' : function(_id) {

		var _win = get_is_parents(m9evt,'._m9window');
		if (_win) {
			parent_win_id = jQuery(_win).prop('id');
			if (this._sons[parent_win_id]) {
				this.close(this._sons[parent_win_id]);
			}
			this._sons[parent_win_id] = _id;		
		}
		
		if (this._reset[_id]) {
			this._reset[_id]();
		}

		edit_window_obj.lineup(_id);
		obj_fadeIn('#' + _id);
	},
	'close' : function(_id) {
		if (this._sons[_id]) {
			this.close(this._sons[_id]);
			this._sons[_id] = false;
		}

		if (this._close[_id]) {
			this._close[_id]();
		}
		obj_fadeOut('#' + _id);
	},
	'close_all' : function() {
		for (var i in edit_window_obj._list) {
			if (i == 'editWindow-setting' || i == 'edit_menu') {
				continue;
			}
			edit_window_obj.close(i);
		}

	}

}; // edit_window_obj

var class_obj = {
	
	'change' : function(Dobj,Dname,Dvar) {

		var btn = jQuery(m9evt);
		if (btn.hasClass('active')) {
			btn.removeClass('active');
			jQuery(Dobj).removeClass(editor.mode.get_class(Dvar));
			return false;
		}
		
		jQuery('._'+Dname).removeClass('active'); // 클래스 버튼 active 제거		
		var Sarray = (style_info[Dname]) ? style_info[Dname]['keys'] : [];
		var J_Dobj = jQuery(Dobj);
		for (var i=0;i<Sarray.length;i++) {
			J_Dobj.removeClass(editor.mode.get_class(Sarray[i]));  // 속성제거
		}

		J_Dobj.addClass(editor.mode.get_class(Dvar)); // 속성추가		
		jQuery('._' + Dvar).addClass('active'); // 클래스 버튼 active 추가 //Dvar : f-xlarge		
		undo_obj._add(Dobj);

	},
	
	'get' : function(Dobj,Dname) {

		jQuery('._'+Dname).removeClass('active'); // 클래스 버튼 active 제거
		var Sarray = (style_info[Dname]) ? style_info[Dname]['keys'] : [];
		var _class = jQuery(Dobj).attr('class');
		if (_class) {
			var class_list = _class.split(' ');
			for (var i=0;i<Sarray.length;i++) {
				for (var z=0;z<class_list.length;z++) {
					var _kind = editor.mode.get_class(Sarray[i]);
					if (_kind == class_list[z]) {
						jQuery('._' + Sarray[i]).addClass('active');	
					}
				}
			}
		}

	},
	
	'remove' : function(Dobj,Dname) {

		jQuery('._'+Dname).removeClass('active'); // 클래스 버튼 active 제거		
		var Sarray = (style_info[Dname]) ? style_info[Dname]['keys'] : [];

		var J_Dobj = jQuery(Dobj);		
		for (var i=0;i<Sarray.length;i++) {
			J_Dobj.removeClass(editor.mode.get_class(Sarray[i]));  // 속성제거
		}

	}
	
}; // class_obj

var convert_unit = {

	'guess' : function(_var,orders_array) {

		var _val = m9_get_num(_var);
		var _unit = m9_get_str(_var);

		for (var i=0;i<orders_array.length;i++) {
			var _u = orders_array[i];
			var c = this._convert('px',_u,_val) + '';
			if (_u == '%') {
				if (c.indexOf(".") == -1) { // 소수점이 없으면
					if ((c % 10) == 0) { // 10단위이면
						return c + _u;
					}
				}
			} else { //em,rem 일때
				if (c.indexOf(".") > -1) {
					if (c.match(/^[0-9]+?\.[0-9][0-9]?$/)) { // 소수점 1자리수
						return c + _u;
					}
				} else {
					if (c.match(/^\d+$/)) { // 정수이면
						return c + _u;
					}
				}
			}
		}

		return roundXL(_val,0) + _unit;

	},

	'convert' : function(from_unit,to_unit,_var) {

		var x = this._convert(from_unit,to_unit,_var);
		var _round = (to_unit == 'px' || to_unit == 'pt') ? 0 : 3;
		return roundXL(x,_round);

	},

	'_convert' : function(from_unit,to_unit,_var) {

		if (!this._int_ok) { this._int(); }		
		var x = (from_unit != 'px') ? this._convert2px(_var,from_unit) : _var;
		if (to_unit == 'em') {
			x = x / this._em;	
		} else if (to_unit == '%') {
			x = (x / this._em) * 100;
		} else if (to_unit == 'rem') {
			x = x / this._rem;			
		} else if (to_unit == 'pt') {
			x = (x * this._pt) / this._dpi;							
		}

		return x * 1;

	},
	'_selected_unit' : false,
	'_pt' : 72,
	'_dpi' : 96,
	'_rem' : 16,
	'_em' : 16,
	'_convert2px' : function(_var,_unit,_round_not) {

		if (!this._int_ok) { this._int(); }
		var x = 0;	
		if (_unit == 'em') {
			x = _var * this._em;
		} else if (_unit == '%') {
			x = (_var / 100) * this._em;
		} else if (_unit == 'rem') {
			x = _var * this._rem;
		} else if (_unit == 'pt') {
			x = (_var * this._dpi) / this._pt;
		}
		if (_round_not != 1) {
			x = roundXL(x,0);
		}
		return x;

	},

	'_int_ok' : false,
	'_int' : function() {

		var _t = jQuery('<div>a</div>');
		_t.appendTo('body');
		this._em = m9_get_num(_t.css('font-size'));
		_t.remove();
		this._rem = m9_get_num(jQuery('html').css('font-size'));
		this._int_ok = true;

	}

}; // convert_unit

var fontfamily_obj = {

	_fonts : [
		['Arial','Arial',''],
		['arial black','Arial Black',''],
		['Times New Roman','Times New Roman',''],
		['Calibri','Calibri',''],
		['Verdana','Verdana',''],
		['Georgia','Georgia',''],
		['Abril Fatface','Abril Fatface','//fonts.googleapis.com/css?family=Abril+Fatface'],
		['Lobster','Lobster','//fonts.googleapis.com/css?family=Lobster'],
		['Pinyon Script','Pinyon Script','//fonts.googleapis.com/css?family=Pinyon+Script']	
	],

	_fonts_hash : {},
	
	_fontfamily_loaded : {},
	
	int : function() {

		if (jQuery('#editWindow-fontFamily').length == 0) {
			
			var _html = '<div class="box">';
			for (var i=0;i<fontfamily_obj._fonts.length;i++) {
				var _name = fontfamily_obj._fonts[i][0].replace(/ /gi,"_");	
				_html += '<div class="btn_' + _name + ' fonts-img"><a onclick="fontfamily_obj.change(\'' + i + '\');return false;"></a></div>	';
			}
			_html += '</div>';
			
			edit_window_obj.int("editWindow-fontFamily",_html,msg_msg('font_family')); // '글꼴'
			
			jQuery('#editWindow-fontFamily a').on("dblclick",function() {
				jQuery('#editWindow-fontFamily').css('display','none');
			});
			
			for (var i=0;i<fontfamily_obj._fonts.length;i++) {
				var _f = fontfamily_obj._fonts[i];
				fontfamily_obj._fonts_hash[_f[1]] = _f[0];
			}
		}
		
	},


	add_style : function(Dvar) {

		var Dcss = '';
		for (var i=0;i<fontfamily_obj._fonts.length;i++) {
			var _f = fontfamily_obj._fonts[i];
			if (_f[0] == Dvar) {
				Dcss = _f[2];
				break;
			}
		}

		if (Dcss != '') {

			var _loading_check = 0;
			var _links = document.getElementsByTagName("link");

			for (var i = 0; i < _links.length; i ++ ) {
				var _src = _links[i].href.toLowerCase(); // href 값 소문자 처리
				_src = _src.replace(/\+/g, ' ').replace(/%20/g, ' '); // 공백을 하나로 처리하고, %20을 하나의 공백(' ')으로 처리
				
				if (_src.indexOf(Dvar.toLowerCase()) !=- 1) {
					_loading_check++;
				}
			}

			if (_loading_check == 0) { // 파일 로딩
				jQuery('<link>').prop({'type':'text/css','rel':'stylesheet','property':'stylesheet','href':Dcss}).appendTo('div._mong9_setting_box');
				var _name = Dvar.replace(/ /gi,"_");	
				fontfamily_obj._fontfamily_loaded[_name] = Dcss;
			}
							                         			
		}

	},

	change : function(Cvar) {
		
		var Dvar = fontfamily_obj._fonts[Cvar][0];
		var Dcss = fontfamily_obj._fonts[Cvar][2];
				
		RestoreSelection();

		var _type = get_container();

		fontfamily_obj.add_style(Dvar);

		if (_type == 1) {		
			document.execCommand("fontSize",false,"7");
			jQuery(document).find("font").each(function(){
				if (jQuery(this).attr("size") == "7") {
					jQuery(this).removeAttr("size").css("fontFamily",Dvar);
				}
			});
		} else {
		 	Editor_Container.css('font-family',Dvar);
		}

		SaveSelection();

		undo_obj._add(Editor_Container[0],'font-family');		
							
	},

	get_css : function(_html) {

		var _return = "";
		for (var i in fontfamily_obj._fontfamily_loaded) {
			var _name = i.replace(/\_/gi," ");
			var rgExp = "/font-family:.+"+ _name  +"/gi";
			var _match = _html.match(eval(rgExp)); // 폰트사용 체크
			if (_match != null) {
				_return += '<link href="' + fontfamily_obj._fontfamily_loaded[i] + '" type="text/css" rel="stylesheet" property="stylesheet" />\n';
			}
		} //for
		return _return;		
	}
			
}; //fontfamily_obj

var fontsize_obj = {
		
	int : function() {

		if (jQuery('#editWindow-fontSize').length == 0) {
			
			var _px = new Array(8,9,10,11,12,14,16,18,20,22,24,28,32,36,40,45,50,55,55,60,65,70,75,80,85,90,95);
	
			var _html = '<div class="box">';
			for (var i=0;i<_px.length;i++) {
				_html += '<a onclick="fontsize_obj.change(\'' + _px[i] + 'px\');return false;"><div style="font-size:' + _px[i] + 'px">' + _px[i] + '<span>px</span></div></a>';							
			}
			_html += '</div>';
			
			edit_window_obj.int("editWindow-fontSize",_html,msg_msg('font_size')); // '글자크기'

			jQuery('#editWindow-fontSize a').on("dblclick",function() {
				jQuery('#editWindow-fontSize').css('display','none');
			});

		}
						
	},
	
	change : function(Dvar) {
		
		RestoreSelection();

		var _type = get_container();

		if (_type == 1) {		
			document.execCommand("fontSize",false,"7");
			jQuery(document).find("font").each(function() {
				if (jQuery(this).attr("size") == "7") {
					jQuery(this).removeAttr("size").css("fontSize",Dvar);
				}
			});	
		} else {
		 	Editor_Container.css('fontSize',Dvar);
		}

		SaveSelection();

		undo_obj._add(Editor_Container[0],'font-size');		
							
	}
	
}; //fontsize_obj

var formatpara_obj = {
		
	int : function() {

		if (jQuery('#editWindow-formatPara').length == 0) {
			
			var heading_msg = msg_msg('HEADING');

			var _kinds = new Array(
				['H1',heading_msg + '(H1)'],
				['H2',heading_msg + '(H2)'],
				['H3',heading_msg + '(H3)'],
				['H4',heading_msg + '(H4)'],
				['H5',heading_msg + '(H5)'],
				['H6',heading_msg + '(H6)'],
				['P',msg_msg('P') + '(P)'],
				['DIV',msg_msg('DIV') + '(DIV)'],			
				['A',msg_msg('A') + '(A)'],	
				['SPAN',msg_msg('SPAN') + '(SPAN)'],							
				['BLOCKQUOTE',msg_msg('BLOCKQUOTE') + '(BLOCKQUOTE)']																			
			);
				
			_html = '<div class="box">';
			for (var i=0;i<_kinds.length;i++) {
				if (_kinds[i][0] == 'A') {
					_html += '<div><a onclick="formatpara_obj.change(\'' + _kinds[i][0] + '\');return false;"><span>' + _kinds[i][1] + '</span></a></div>';	
				} else {
					_html += '<div><a onclick="formatpara_obj.change(\'' + _kinds[i][0] + '\');return false;"><' + _kinds[i][0] + '>' + _kinds[i][1] + '</' + _kinds[i][0] + '></a></div>';			
				}
			}
			_html += '</div>';
	
			edit_window_obj.int("editWindow-formatPara",_html,msg_msg('set_type'));

			jQuery('#editWindow-formatPara a').on("dblclick",function() {
				jQuery('#editWindow-formatPara').css('display','none');
			});
						
		}

	},
		
	change : function(Dvar) {

		if (jQuery(editor._now).is('table,thead,tbody,tfoot,th,td,ol,ul,li,dl,dt,dd,iframe')) {
			error_msg(msg_msg('msg_27')); // "현재 항목은 타입변경이 불가능합니다."
			return false;	
		}

		editor._now = changeTag(editor._now,Dvar);		
		undo_obj._add(editor._now,'formatpara');

		var msg = Dvar;
		var _str = msg_msg('msg_28').msg_format(msg); // "[" + msg + "]형으로 변경완료"	
		error_msg(_str);
			
	}
	
}; //formatpara_obj

// 기타변경
var edit_etc_obj = {

	'indent' : function(obj) {
		jQuery(obj).wrap('<blockquote class="m9-blockquote"></blockquote>');	
	},
	'outdent' : function(obj) {

		jQuery(obj).each(function() {
			
			var J_this = jQuery(this);
			
			if (J_this.parent().is('blockquote')) {
				var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);
				J_this.addClass(random_class);			
				J_this.parent()[0].outerHTML = J_this.parent().html();
				jQuery('.' + random_class).removeClass(random_class);			
			}
		});
		
	},
	'align' : function(obj,_align) {
			jQuery(obj).css('textAlign',_align);		
	},
	'removeformat' : function(obj) {

		var _type = get_container();
		document.execCommand("removeFormat",false,null);
						
		if (_type != 1) {		
	 		Editor_Container.css({'color':'','font-size':'',"font-family":'','line-height':'','word-spacing':'','letter-spacing':'','font-weight':'','text-decoration':'','font-style':''});			
		}
				
	},

	'class_name' : function(Did,Dvar) {
		fontsize_obj.change("");
		get_container();
		element_obj._now = Editor_Container[0];			
		element_obj.edit.class2.change(Did,Dvar);	
	}

}; //edit_etc_obj

var confirm_msg = {

	_Dfunc : null,
	
	int : function() {

		if (jQuery("#confirm-msg").length == 0) {
			var _html = '<div id="confirm-msg" class="html-win confirm-msg-box">' +
			'<div id="_confirm-msg"></div>' +
			'<button onclick="confirm_msg.change(1)" class="editor-btn-yes confirm-msg-btn">OK</button> <button onclick="confirm_msg.change(0)" class="editor-btn-no confirm-msg-btn">NO</button>' +
			'</div>';
			jQuery("body").append(_html);
		}		
	},	

	'view' : function(msg,Dfunc) {
		confirm_msg._Dfunc = Dfunc;				
		jQuery('#_confirm-msg').html(msg);
		curtain.show("confirm-msg");
	},

	'change' : function(Dvar) {
		curtain.hide();
		jQuery('#_confirm-msg').html("");
		eval(confirm_msg._Dfunc +"(" + Dvar + ")");
		confirm_msg._Dfunc = null;				
	}
					
};


var curtain = {
	
	_now : null,
	
	int : function() {
		if (jQuery("#curtain").length == 0) {
			jQuery("body").append('<div id="curtain"></div>');
			jQuery("#curtain").click(function (e){
				curtain.hide();
			});
		}		
	},

	show : function(Dbox,Doptions) {
		
		if (!m9_getObject(Dbox)) { return false; }
		curtain._now = Dbox;
						
		if (jQuery("#curtain").length == 0) { curtain.int(); }

		//jQuery("#curtain").stop(true, true).fadeIn(100);	
		obj_fadeIn('#curtain',100);
			
		if (Doptions) {
			jQuery("#"+Dbox).css(Doptions);
		} else {
			var _w = m9_get_object_size("curtain","width");
			var _h = m9_get_object_size("curtain","height");		
			var _w2 = m9_get_object_size(Dbox,"width");
			var _h2 = m9_get_object_size(Dbox,"height");	
			var pos = m9_get_xy_pos(_w,_h,_w2,_h2,0,0,5,0);					
			jQuery("#"+Dbox).css({left:pos[0],top:pos[1]});
		}
		jQuery("#"+Dbox).fadeIn(400);		
		//RestoreSelection();	
	},

	hide : function() {
		if (jQuery("#curtain").length == 0) { curtain.int(); }
      	obj_fadeOut('#curtain',100);						
		obj_fadeOut("#"+curtain._now,400);
		var Cstr = curtain._now.match(/([^-])+$/g); 		
		curtain._now = null;
		//RestoreSelection(); // 이미지 배경 ok클릭시 에러남 img_obj.handle2.fixed();
	}
}; //curtain

var class_func = {
	
	change_by_number : function(obj,s) {

		var a = s.split('-');
		var n = a.pop();
		var fc = a.join("-") + "-";
		var as = new RegExp(''+fc+'\\\d+','gi');
		var _class = jQuery(obj).attr('class');		
		var bc = _class.match(as);

		if (bc) {
			jQuery(obj).removeClass(bc[0]);
		}
		jQuery(obj).addClass(s);
			
	}	
	
};

var tag_obj = {

	now : false,
	nows : false,

	int : function(_type) {

		tag_obj.win.int();

		jQuery(document).on('mousedown',function(e) {

			var et = e.target;

			// m9_editor_box 편집기
			// _setting_area_box 이미지등의 가림막
			// _m9editor 각종핸들
			if (get_is_parents(et,'.m9_editor_box') || get_is_parents(et,'._setting_area_box')) { // 편집기
				if (!get_is_parents(et,'._m9editor')) { // 설정창		
					tag_obj.print_obj(et);
				}
			}

		});

	},

	open_window : function() {

		if (jQuery('#tagWindow-setting').length == 0 || jQuery('#tagWindow-setting').css('display') == 'none') {
			//tag_obj.now = element_obj._now;
			tag_obj.win.view(element_obj._now);
		} else {
			tag_obj.win.close();
		}

	},

	_index : 0,
	now_attr : '',

	select_tag : function(_index) {

		tag_obj.now = tag_obj.nows[_index];
		color_obj._selected = tag_obj.now;

		jQuery('#_tag_preview').find('.class-btn').removeClass('active');
		jQuery('#_tag_preview').find('.class-btn').eq(_index).addClass('active');

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(tag_obj.now).addClass('selected_tag').trigger('mousedown').trigger('mouseup'); // edit.js 의 상단메뉴 처리위해(mousedown,mouseup)

		tag_obj.print_attr();

	},

	select_tag_attr : function(_attr) {

		tag_obj.now_attr = _attr;

		jQuery('#_tag_attrs_preview').find('.class-btn').removeClass('active');
		jQuery('#_tag_attrs_preview').find('.class-btn.__'+_attr).addClass('active');

		tag_obj.print_textbox();

	},

	adjust : function() {

		if (!mong9_obj.status()) {
			alert(msg_msg('msg_80'));
			return false;
		}

		var _key = jQuery('#_tag_attr_key').val();
		var _value = jQuery('#_tag_attr_value').val();

		var before_selected_tag = jQuery('.selected_tag');
		var before_now = element_obj._now;

		element_obj._now = tag_obj.now;
		element_obj.get_selectedObj();

		if (_key == 'class') { // class 일 경우, 하나씩 추가해야함

			jQuery(element_obj._now).prop('class','');

			var _value2 = _value.replace(/\s\s+/g,' ');
			var cs_list = _value2.split(' ');

			for (var i=0;i<cs_list.length;i++) {
				jQuery(element_obj._now).addClass(cs_list[i]);
			}

		} else {
			jQuery(element_obj._now).attr(_key,_value);
		}

		jQuery(tag_obj.now).trigger('mousedown');

		before_selected_tag.addClass('selected_tag');
		element_obj._now = before_now;

		undo_obj._add(element_obj._now,_key);

	},

	print_obj : function(obj) {

		if (obj) { tag_obj.now = obj; }
		if (!tag_obj.now) { tag_obj.now = element_obj._now; }
		if (!tag_obj.now) { return false; }

		if (jQuery('#tagWindow-setting').css('display') == 'none') {
			return false;
		}

		if (!get_is_parents(tag_obj.now,'._one-in-column')) { // 설정창	
			return false;
		}

		var _parents = jQuery(tag_obj.now).parentsUntil('._one-in-column').toArray().reverse();

		_parents.push(jQuery(tag_obj.now)[0]); // 클릭 객체 추가

		tag_obj.nows = [];

		var _html = '';
		var z = 0;
		for (var i=0;i<_parents.length;i++) {

			if (jQuery(_parents[i]).is('._one-column,._one-in-column,._tab_slide,.slide_empty')) { continue; }

			if (_html != '') { _html += ' > '; }
			var active = '';
			if (i == (_parents.length-1)) {
				active = 'active';
			}
			_html += '<button href="#" onclick="tag_obj.select_tag(\'' + z + '\');return false;" class="class-btn ' + active + '">' + jQuery(_parents[i]).prop('tagName') + '</button>';
			z++;
			tag_obj.nows.push(_parents[i]);

		}

		jQuery('#_tag_preview').html(_html);

		tag_obj.print_attr();

	},

	print_attr : function() {

		if (!tag_obj.now) { return false; }
		var obj = tag_obj.now;
		var atts = ['style','class'];

		var _atts = obj.attributes; // 모든 속성 가져오기
		if (!_atts) { _atts = []; }

		for (var i=0;i<_atts.length;i++) {
			if (_atts[i].nodeName == 'style' || _atts[i].nodeName == 'class') { continue; }
			atts.push(_atts[i].nodeName);
		}

		if (tag_obj.now_attr == undefined || tag_obj.now_attr == '') {
			tag_obj.now_attr = atts[0]; // 초기값
		}

		var _index = 0;
		var _html = '';
		for (var i=0;i<atts.length;i++) {

			var _nodeName = atts[i];//.nodeName;
			if (_nodeName == 'contenteditable') { continue; }

			var _val = jQuery(obj).attr(_nodeName);
			if (!_val) { _val = ''; }

			if (_nodeName == 'class') {
				_val = _val.replace(/selected\_tag|ui\-sortable|\_not\-copy|\_mong9|ui\-selectee|ui\-selectable/g,'');
			}

			_val = jQuery.trim(_val);

			var active = (_nodeName == tag_obj.now_attr) ? 'active' : '';
			if (active == 'active') {
				_index = i;
			}

			var empty = (_val == '') ? '_empty' : '';
			_html += '<button href="#" onclick="tag_obj.select_tag_attr(\'' + _nodeName + '\');return false;" class="class-btn __' + _nodeName + ' ' + active + ' ' + empty + '">' + _nodeName + '</button>';

		}

		jQuery('#_tag_attrs_preview').html(_html);

		tag_obj.print_textbox();

	},

	print_textbox : function() {

		var str = jQuery(tag_obj.now).attr(tag_obj.now_attr);

		if (tag_obj.now_attr == 'class') {
			if (str) {
				str = str.replace(/selected\_tag|ui\-sortable|\_not\-copy|\_mong9|ui\-selectee|ui\-selectable/g,'');
			}
		}

		str = jQuery.trim(str);

		jQuery('#_tag_attr_key').val(tag_obj.now_attr);
		jQuery('#_tag_attr_value').val(str);

	},

	'win' : {

		'int' : function() {

			if (jQuery('#tagWindow-setting').length > 0) { return false; }

			var _html = '' +
			'<ul class="_edit-list-1">' +
				'<li class="_first">' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('tag') +'</dt>' +
						'<dd><div id="_tag_preview"></div></dd>' +
					'</dl>' +
				'</li>' +
				'<li class="_second">' +			
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('property') +'</dt>' +
						'<dd><div id="_tag_attrs_preview"></div></dd>' +
					'</dl>' +
				'</li>' +
			'</ul>' +
			'<div class="_tag_line">' +
			'<div class="_tag_preview_input"><input type="text" name="_tag_attr_preview" id="_tag_attr_key" onkeydown="tag_obj.win.check_enter(event)"></div>' +
			'<div class="_tag_attrs_input"><input type="text" name="_tag_attr_preview" id="_tag_attr_value" onkeydown="tag_obj.win.check_enter(event)"></div>' +
			'<div class="_tag_btn_box"><button href="#" onclick="tag_obj.adjust();return false;" class="editor-btn _save editor-btn-yes">OK</button></div>' +
			'</div>';

			edit_window_obj.int("tagWindow-setting",_html,msg_msg('tag_setting'),{
				'close' : function() {
					jQuery('.icon2-tag').removeClass('active');
				}				
			
			});
			var _left = (window.innerWidth - m9_get_num(jQuery('#tagWindow-setting').css('width')) ) / 2;
			var _top = window.innerHeight - m9_get_num(jQuery('#tagWindow-setting').css('height')) - 10;
			jQuery('#tagWindow-setting').css({'left':_left+'px','top':_top+'px'});

		},

		'check_enter' : function(event) {

			var keycode = event.keyCode || event.which;
			if (keycode === 13) {
				tag_obj.adjust();
				return false;
			}

		},

		'view' : function(obj) {

			tag_obj.print_obj(obj);

			if (jQuery('#tagWindow-setting').css('display') == 'none') {
				obj_fadeIn('#tagWindow-setting');
			}

			jQuery('.icon2-tag').addClass('active');

		},
		
		'close' : function() {

			if (jQuery('#tagWindow-setting').length > 0) {
				obj_fadeOut('#tagWindow-setting');
			}

			jQuery('.icon2-tag').removeClass('active');

		}

	}

}; // tag_obj

//////////////////////////////////////////////////////////////////////////////////


var box_html = {

	'slider' : {
		'handle' : {
			'setting' : function(_name,_var) {
				var _id = '#slider_editor_' + _name;
				jQuery(_id).find('.sliderBox-handle').text(_var);
				jQuery(_id).slider({"value":_var});	
			}
		},
		'get' : function(values) {
			this._temp[values.id] = values;
			return '<div id="slider_editor_' + values.id + '" class="sliderBox"><div class="sliderBox-handle ui-slider-handle"></div></div>';
		},		

		'setting' : function() { // options 라는 문자가 에러인지 확인을 위해
	
			for (var i in box_html.slider._temp) {
	
				var _options = this._temp[i];				

				var _id = "slider_editor_" + _options.id;
				this._ids[_id] = _options.id;

				jQuery('#'+_id).slider({
					max :_options.max,
					min:_options.min,
					step:_options.num,
					create: function() {		
						jQuery(this).find(".sliderBox-handle").text(jQuery(this).slider("value"));
					},
					change: function(event,ui) {				
						jQuery(this).find(".sliderBox-handle").text(ui.value);
					},
					slide: function(event,ui) {
						jQuery(this).find(".sliderBox-handle").text(ui.value);
						var _id = jQuery(this).attr('id');
						var _target = box_html.slider._ids[_id];
						element_obj.edit.operations(3,_target,ui.value); // type:3 슬라이드 드래그시
						element_obj.edit[_target].change();
					}
				});
	    
			}
			this._temp = {};
			
		},

		'_temp' : {},
		'_ids' : {}
		
	},
	'unit' : {
		'_selected_unit' : false,
		'select' : function(Dobj) {
			this._selected_unit = jQuery(Dobj).val();
		},
		'reset' : function(Dname,Dvar) {

			if (!box_html._options[Dname]) { return false; }	

			var _var = m9_get_num(Dvar);
			var _unit = m9_get_str(Dvar);

			var _id = '_editor_' + Dname;			
			jQuery('#'+_id).val(_var);			
			jQuery('#'+_id+'_unit').val(_unit);

			var max_unit = 1;
			var step = 1;
			if (_unit == 'em' || _unit == 'rem') {
				max_unit = 0.1;
				step = 0.1;
			} else if (_unit == '%') {
				if (Dname == 'line_height') {
					max_unit = 10;
					step = 10;
				} else {			
					max_unit = 1;
					step = 1;
				}
			}
				
			var options = box_html._options[Dname];	
			var _max = (options.max * 1)*(max_unit*1);	
			var _min = (options.min*1)*(max_unit*1);

			var _options = { 'max' : _max , 'min' : _min , 'num' : step };
			input_box.change_options(_id,_options);

			var _options = { 'max' : _max , 'min' : _min , 'step' : step };
			jQuery('#slider_editor_'+Dname).slider('option','max',_max).slider('option','min',_min).slider('option','step',step);
										
		},
		'change' : function(Dname) {
			var _id = '_editor_' + Dname;			
			var _unit = jQuery('#'+_id+'_unit').val();
			if (_unit == this._selected_unit) { return false; }
			var _var = jQuery('#'+_id).val();
			var x = convert_unit.convert(this._selected_unit,_unit,_var);
			this.reset(Dname,x+_unit);
			box_html.slider.handle.setting(Dname,x);
		}
	},
	'_options' : {},
	control_box : function(values) {
		
		this._options[values.id] = values;
		var _unit = (values.unit) ? values.unit : 'px';

		return '<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'_editor_' + values.id + '\',{},function(){element_obj.edit.' + values.id + '.change();})" onmouseup="input_box.stop(\'_editor_' + values.id + '\')" class="left-button icon2-plus"></button></span>' +
				'<span class="box-input"><input type="text" id="_editor_' + values.id + '" value="0" onchange="element_obj.edit.' + values.id + '.change();return false;" /></span>' +
				//'<span class="box-unit">'+ _unit + '</span>' +
				'<span class="box-unit">'+ 
				'<select id="_editor_'+ values.id +'_unit" onclick="box_html.unit.select(this);return false;" onchange="box_html.unit.change(\'' + values.id + '\');return false;" class="unit">' +				
				'<option value="px">px</option>'+
				'<option value="em">em</option>'+
				'<option value="rem">rem</option>'+								
				'<option value="%">%</option>'+		
				'<option value="pt">pt</option>'+										
				'</select>' +
				'</span>' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'_editor_' + values.id + '\',{},function(){element_obj.edit.' + values.id + '.change();})" onmouseup="input_box.stop(\'_editor_' + values.id + '\');" class="right-button icon2-minus"></button></span>' +
			'</span>' +
		'</div>' +
		'<script>input_box.change_options(\'_editor_' + values.id +'\',{\'max\':' + values.max + ',\'min\':' + values.min + ',\'num\':' + values.num + '})</script>';
			
	}
};

var edit_control_box = {

	'selectbox2' : function(options) {

		var _id = options.id;
		var obj_id = '_editor_' + _id;

		var _mode_class1 = '';
		var _mode_class2 = '';		
		if (options['mode_not'] == 1) {
			_mode_class1 = '_drag-btn-3';
			_mode_class2 = '_drag-element-3';
		}

		if (options['class_btn']) {
			_mode_class1 += ' ' + options['class_btn'];
		}

		if (options['class_input']) {
			_mode_class2 += ' ' + options['class_input'];
		}

		var onclick_function = (options.onclick_function) ? options.onclick_function : 'element_obj.edit.' + _id + '.change()';
								
		var _html = '' +
		'<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'' + obj_id + '\',{},function(){' + onclick_function + ';})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="left-button icon2-plus ' + _mode_class1 + '"></button></span>' +
				'<span class="box-input">' +
					'<select name="' + obj_id + '" id="' + obj_id + '" onchange="' + onclick_function + '" class="' + _mode_class2 + '">';

		if (!options['first_index_not']) {
			_html += '<option value=""></option>';
		}

		var lists = { 'keys' : [] , 'class_name' : [] };// = new Array();

		if (options.options) {

			lists = options.options;

		} else if (style_info && style_info[_id]) {

			lists = style_info[_id];

		}
	
		var _class = lists['keys'];
		for (var i=0;i<_class.length;i++) {
			var _name = (lists['values'] && lists['values'][i]) ? lists['values'][i] : _class[i];
			_html += '<option value="' + _class[i] +'">' + _name + '</option>';
		}

		_html += '' +					
					'</select>' +
				'</span>' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'' + obj_id + '\',{},function(){' + onclick_function + '})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="right-button icon2-minus ' + _mode_class1 + '""></button></span>' +
			'</span>' +
		'</div>' ;

		return _html;
				
	},
	
	'selectbox' : function(options) {

		var _id = options.id;
		var obj_id = '_editor_' + _id;

		var _mode_class1 = '';
		var _mode_class2 = '';		
		if (options['mode_not'] == 1) {
			_mode_class1 = '_drag-btn-3';
			_mode_class2 = 'class="_drag-element-3"';
		}
		
		var _html = '' +
		'<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.plus(\'' + obj_id + '\',{},function(){element_obj.edit.class.change(\'' + obj_id + '\');})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="left-button icon2-plus ' + _mode_class1 + '"></button></span>' +
				'<span class="box-input">' +
					'<select name="' + obj_id + '" id="' + obj_id + '" onchange="element_obj.edit.class.change(\'' + obj_id + '\')" ' + _mode_class2 + '>';
					
		if (!options['first_index_not']) {
			_html += '<option value=""></option>';
		}
		
		if (style_info && style_info[_id]) {
			var lists = style_info[_id];
			var _class = lists['keys'];
			for (var i=0;i<_class.length;i++) {
				var _name = (lists['values'] && lists['values'][i]) ? lists['values'][i] : _class[i];
				_html += '<option value="' + _class[i] +'">' + _name + '</option>';
			}
		}

		_html += '' +					
					'</select>' +
				'</span>' +
				'<span class="box-btn"><button href="#" onclick="return false;" onmousedown="input_box.minus(\'' + obj_id + '\',{},function(){element_obj.edit.class.change(\'' + obj_id + '\');})" onmouseup="input_box.stop(\'' + obj_id + '\');" class="right-button icon2-minus ' + _mode_class1 + '"></button></span>' +
			'</span>' +
		'</div>' ;

		return _html;
				
	},				
	'colorbox' : function(options) {
		var _id = '_editor_' + options.id;
		var _key = (options.key) ? options.key : options.id;

		if (_key == 'background_color') {
			element_obj.edit[_key].put_id(options.id);
		}

		return '<div class="counter-control-box">' +
			'<span class="counter-control">' +
				'<span class="box-btn minicolors-sprite color-bg-box"><span id="_color_preview_' + options.id + '" class="color-bg"></span></span>' +
				'<span class="box-input"><input type="text" id="' + _id + '" value="" onchange="element_obj.edit.' + _key + '.change();return false;" /></span>' +
				'<span class="box-btn"><button href="#" onclick="'+ ((options.before) ? options.before +'(\'' + _id + '\');' : '') +'color_obj.set(jQuery(\'#' + _id + '\').val(),function(e){' + options.callback + '(e);});color_obj.view(this,function(e){element_obj.edit.' + _key + '.set(e);},0,this);return false;" id="_color_btn" class="color-button"></button></span>' +
			'</span>' +
		'</div>';

	}
};

var html_obj = {

	'_callback' : false,

	'int' : function() {

		if (jQuery("#b-html").length == 0) {
			var _html = '<div id="b-html" class="html-win curtain-box">' +
			'<textarea id="html_textarea" title="'+ msg_msg('fix_html') +'"></textarea>' +
			'<div class="btn_box">'+
			'<div class="_full"><button id="_html_fullscreen_btn" onclick="html_obj.fullscreen(this)" class="edit-btn icon-arrows-alt hd-fix no">'+ msg_msg('msg_22') +'</button></div>'+
			'<div><button onclick="html_obj.change()" class="curtain-btn editor-btn-yes">OK</button></div>' +
			'</div>'+
			'</div>';
			jQuery("body").append(_html);			
		}
					
	},

	'view' : function(_callback,_html) {

		html_obj._callback = _callback;

		jQuery("#html_textarea").val(_html);		
		m9_code_editor.set('html_textarea',jQuery("#html_textarea").val());
		curtain.show("b-html");

	},

	'change' : function() {

		jQuery("#html_textarea").val(m9_code_editor.get('html_textarea'));
		var _html = jQuery("#html_textarea").val();	

		eval(html_obj._callback)(_html);

		curtain.hide();

	},

	'get' : function(_id) {

		var _html = jQuery("#"+_id).html();	
		_html = builder.html.convert(_html);
			
		return _html;
					
	},

	'fullscreen' : function(obj) {

		var _parent = jQuery(obj).parents('.html-win');
		if (_parent.hasClass('_fullscreen')) {
			_parent.removeClass('_fullscreen');
		} else {
			_parent.addClass('_fullscreen');
		}

		curtain.show("b-html");

	}

};


var focus_obj = {

	_now : false,

	set : function() {
		RestoreSelection();
		var _focus = SaveSelection();

		if (jQuery(_focus.commonAncestorContainer).parents('.m9_editor_box').length > 0) {
			this._now = _focus;		
		} else {
			this._now = false;
		}
	},

	insert : function(Dvar) {

		if (!this._now) { return false; }

		var Dobj = jQuery('body')[0];
		RestoreSelection(this._now);
		var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);		

		InsertObj('<i id="'+random_class+'">' + Dvar + '</i>');			
		placeCaretAtEnd(jQuery('#'+random_class)[0]);
		var now_caret = getCaretPosition(Dobj);

		if (m9_mode_obj.get() != '') {
			editor.mode.adjust_display(jQuery('#'+random_class)[0]);
		} else {
			jQuery('#'+random_class).replaceWith(jQuery('#'+random_class).html());
		}

		setCaretPos(Dobj,now_caret);

	}

}; // focus_obj