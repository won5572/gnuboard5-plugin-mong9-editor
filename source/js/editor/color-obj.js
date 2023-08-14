var color_obj = {

	'colors' : ['#000000','#db2828','#fbbd08','#b5cc18','#16ab39','#2185d0','#6435c9','#a333c8','#e03997'],
	'_selected' : false,
	'_callback' : false,
	
	'set' : function(Dcolor,Dcallback) {
		this._callback = Dcallback;
		if (Dcolor == '') { Dcolor = 'transparent'; }		
		jQuery('#_color_picker').minicolors('value',{'color':Dcolor,opacity:1});
	},		
	
	'select' : function(Dcolor) {
		Dcolor = color_obj_func.RGB2HEX(Dcolor);
		if (Dcolor == '') { Dcolor = 'transparent'; }
		jQuery('#_color_picker').minicolors('value',{'color':Dcolor,opacity:1});
	},
	
	'callback' : function(Dcolor) {
		if (this._callback) {
			this._callback(Dcolor);
		}
	},
	
	'change_preview' : function(Dcolor) {
		jQuery('#_picker_color_preview').css('background-color',Dcolor);
		jQuery('#_picker_color').val(Dcolor);				
	},
	
	'get_temp_color' : function() {
		var str = m9_getCookie('_color_temp');
		var colors = [];		
		if (str) { colors = str.split('|'); }
		for (var i=0;i<7;i++) {
			var _id = '_temp_color_' + i;
			if (colors[i]) {			
				jQuery('#'+_id).replaceWith('<a href=#" id="' + _id + '" onclick="color_obj.select(\'' + colors[i] + '\');return false;" style="background-color:' + colors[i] + ';border-color:' + colors[i] + '"></a>');
			} else {
				jQuery('#'+_id).replaceWith('<a id="' + _id + '"></a>');				
			}
		}
	},
	
	'save' : function() {
		var _color = jQuery('#_picker_color').val();
		_color = _color.toLowerCase();
		// 공백,흰색,검은색,투명 무시
		if (_color != '' && _color != '#ffffff' && _color != '#fff' && _color != 'white' && _color != 'transparent' && _color != '#000000' && _color != '#000') {
			var str = m9_getCookie('_color_temp');
			var colors = [];
			if (str) { colors = str.split('|'); }
			var _array = [_color];
			for (var i=0;i<colors.length;i++) {
				if (colors[i] != _color) {
					_array.push(colors[i]);
				}
			}
			if (_array.length > 7) { _array.length = 7; } // 총수7
			var exdate = new Date();
  			exdate.setDate(exdate.getDate() + 365);			
			m9_setCookie('_color_temp',_array.join('|'),exdate);
			this.get_temp_color();
		}
		edit_window_obj.close('editWindow-color');
	},
	
	int : function() {

		if (jQuery('#editWindow-color').length == 0) {

			var _html = 
			'<div class="box">' +
				'<div id="_color_picker_select_box">' +
					'<div class="editor-line"></div>' +
					'<div style="padding:2px 0">' +
						'<input type="radio" name="_editor_color_target" id="color_target_radio0" value="color" checked><label for="color_target_radio0">'+ msg_msg('text_color') +'</label> ' +
						'<input type="radio" name="_editor_color_target" id="color_target_radio1" value="backgroundColor"><label for="color_target_radio1">'+ msg_msg('bg_color') +'</label> ' +
					'</div>' +						
				'</div>' +
			'</div>';

			var _color_index = [0,7,10,12,13,14]
			var _color_unit = 15;

			_html += '<div id="color">' +
			'<div class="color-box1">';
											
			_html += '<ul class="color-btn">' +
			'<li><a href="#" onclick="color_obj.select(\'\');return false;" class="color-btn-none"></a></li>' +
			'<li><a href="#" onclick="color_obj.select(\'#ffffff\');return false;" style="background:#fff"></a></li>';

			for (var i=0;i<7;i++) {
				_html += '<li><a href="#" id="_temp_color_'+i+'" onclick="color_obj.select(jQuery(this).css(\'background-color\'));return false;"></a></li>';
			}
			_html += '</ul>';
			
			for (var i=0;i<9;i++) {			
				_html += '<ul class="color-btn-col">';
				var _array = color_obj_func.color_step(this.colors[i],'#ffffff',_color_unit);
				for (var z=0;z<6;z++) {
					var z2 = _color_index[z];
					_html += '<li><a href="#" onclick="color_obj.select(\'' + _array[z2] + '\');return false;" style="background-color:' + _array[z2] + ';border-color:' + _array[z2] + '"></a></li>';					
				}
				_html += '</ul>';
			}
						
			_html += '</div>';

			_html += '<div class="color-box2"><input type="text" id="_color_picker" class="form-control demo" data-inline="true" data-opacity="1" value="#ffffff"></div>';

			_html += '<div class="color-box3">' +
			'<div class="counter-control-box">'+
				'<span class="counter-control">'+
					'<span class="box-btn minicolors-sprite color-bg-box"><span id="_picker_color_preview" class="color-bg"></span></span>'+
					'<span class="box-input"><input type="text" id="_picker_color" onchange="color_obj.select(this.value)" value="" /></span>'+
					'<span class="box-btn"><button href="#" onclick="color_obj.save();return false;" class="color-button"></button></span>'+
				'</span>'+
			'</div>' +
			'</div>';
			
			_html += '</div>' +
			'<input type="hidden" id="_color_picker_color">' +
			'<input type="hidden" id="_color_picker_alpha">';
						
			edit_window_obj.int("editWindow-color",_html,msg_msg('set_color'));
			
			color_obj.get_temp_color();

			jQuery('#_color_picker').minicolors({
				inline: 'true',
				opacity: 'true',
				change: function(value,opacity) {		
					var value2 = value;
					if (opacity < 1) { value2 = color_obj_func.HEX2RGBA(value2,opacity);	}
					jQuery('#_color_picker_color').val(value);
					jQuery('#_color_picker_alpha').val(opacity);	
					color_obj.callback(value2);
					color_obj.change_preview(value2);					
				}
			});
        
		}

	},

	change_by_input : function() {
		var Ccolor = jQuery('#_editor_color_value').val();
		color_obj.over(Ccolor);
		color_obj.close();		
	},

	change : function(Dvar) {

		RestoreSelection(color_obj._selected);

		var _type = get_container();

		var Dkind = m9_get_radio_value('_editor_color_target');

		if (_type == 1) {		
			document.execCommand("fontSize",false,"7");
			jQuery(document).find("font").each(function(){
				if (jQuery(this).attr("size") == "7") {
					jQuery(this).removeAttr("size").css(Dkind,Dvar);
				}
			});				
		} else {
	 		Editor_Container.css(Dkind,Dvar);			
		}
		color_obj._selected = SaveSelection();			
		RemoveSelection();	
	},

	'_target' : false,
	'functions' : {},
	'_now' : false,

	'view' : function(obj,_function,_type,replace_click_obj) {

		var _id = m9_random_id(obj);
		if (!color_obj.functions[_id]) {
			if (typeof(_function) == "function") {
				color_obj._callback = _function;
			}
		}

		color_obj._now = _id;
		color_obj._selected = SaveSelection();
		
		jQuery('#_color_picker_select_box').css('display',((_type == 1) ? "block" : "none"));

		var _clicked = (replace_click_obj) ? replace_click_obj : obj;

		m9_layer_position("editWindow-color",_clicked,'down');	
		edit_window_obj.view('editWindow-color');
		
	},
		
	'over' : function(Dcolor) {
		jQuery('#_editor_color_value').val(Dcolor);
		color_obj.functions[color_obj._now](Dcolor);
	},
	
	'close' : function() {
		edit_window_obj.close('editWindow-color');
		color_obj._now = false;
		color_obj._selected = false;	
	}	
	
}; //color_obj