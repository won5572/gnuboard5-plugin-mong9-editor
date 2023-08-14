var undo_obj = {
	
	_id : "",
	_objs : {},
	_timer : false,
	_count : 0,
	is_ctrl : 0,
	editable : '._one-row',
	
	int : function(obj) {

		jQuery(document).on('keydown',function(e) {

			if (undo_obj._id != "") {

				if (e.which == 17){ // ctrl키
					undo_obj.is_ctrl = 1; // 컨트롤 키 누름 여부
					return;
				}
				
				if (undo_obj.is_ctrl == 1) {				
					
					var et = e.target;	        	
					
					if (e.which == 90) { // 90 => z					
						undo_obj._prevent(e);
						undo_obj.undo();					
					} else if (e.which == 89) { // 89 => y
						undo_obj._prevent(e);
						undo_obj.redo();
					}
					
				}  
	
			}
			      
//		}).keyup(function (e){
		}).on('keyup',function (e){

			if (e.which == 17){
				undo_obj.is_ctrl = 0;
			}

		}).on('mouseup',function(e) {

			var et = e.target;
			if (jQuery(et).parents(undo_obj.editable).length > 0) {

				var _one = jQuery(et).parents(undo_obj.editable)[0];
				var _id = m9_random_id(_one);
				
				if (!undo_obj._objs[_id]) {
					undo_obj._objs[_id] = { step : 0 , content : [jQuery('#' + _id).html()] };				
				}
				
				undo_obj._id = _id;

			} else if (jQuery(et).is('._setting_area_box') || jQuery(et).parents('._setting_area_box').length > 0) {

				var _one = jQuery(editor._now).parents(undo_obj.editable)[0]; // editor._now ***
				if (_one) {
					var _id = m9_random_id(_one);
					
					if (!undo_obj._objs[_id]) {
						undo_obj._objs[_id] = { step : 0 , content : [jQuery('#' + _id).html()] };				
					}
					
					undo_obj._id = _id;
				}

			} else {	
				undo_obj._id = "";		
			}
	
		});

		jQuery(obj).on('keyup',function(e) {

			var et = e.target;
			if (jQuery(et).parents(undo_obj.editable).length > 0) {
				
				var _one = jQuery(et).parents(undo_obj.editable)[0];
				var _id = m9_random_id(_one);

				clearTimeout(undo_obj._timer);
				undo_obj._timer = setTimeout(function() {
					undo_obj._add();
				},250);

			}
			
		});

	},
		
	_prevent : function(e) {
		if (e.preventDefault) {
			e.preventDefault();
		} else {
			e.returnValue = false;
		}		
	},

	_add_before_id : '',
	_add_before_kind : '',

	_add : function(obj,_kind) {

		jQuery('.selected_tag').each(function() {
			undo_obj._add_one(this,_kind);
		});

		tag_obj.print_obj(obj);

	},

	_add_one : function(obj,_kind) {

		if (obj) {			
			if (jQuery(obj).parents(undo_obj.editable).length > 0) {
				var _one = jQuery(obj).parents(undo_obj.editable)[0];
				var _id = m9_random_id(_one);				
				undo_obj._id = _id;
				
				if (!undo_obj._objs[_id]) {
					undo_obj._objs[_id] = { step : 0 , content : [jQuery('#' + _id).html()] };				
				}
				
			}			
		}

		if (!undo_obj._id) { return false; }

		var _id = undo_obj._id;
		var _hash = undo_obj._objs[_id];

		var _step = _hash['step'];
		var _content = _hash['content'][_step];

		var _now_content = jQuery('#' + _id).html();

		if (_now_content != _content) {

			if (_kind && (undo_obj._add_before_id == _id && undo_obj._add_before_kind == _kind)) { //덥어쓰기
				_hash['content'][_hash['step']] = _now_content;
				_hash['content'].length = _hash['step'] + 1;		
			} else {
				_hash['step']++;			
				_hash['content'][_hash['step']] = _now_content;
				_hash['content'].length = _hash['step'] + 1;							
			}

			undo_obj._add_before_id = _id;
			undo_obj._add_before_kind = _kind;

		}						

	},
	
	undo : function() {

		if (!undo_obj._id) { return false; }
		
		var _id = undo_obj._id;
		var _hash = undo_obj._objs[_id];

		if (_hash['step'] <= 0) { return false; }
		_hash['step']--;					
		var _step = _hash['step'];

		builder.html._html_obj = jQuery('#'+_id).parents('.ui-draggable');
		var _html = builder.html.convert(_hash['content'][_step]);			
		jQuery('#' + _id).html(_html);		
		builder.setting.check();
				
	},
	
	redo : function() {

		if (!undo_obj._id) { return false; }
		
		var _id = undo_obj._id;
		var _hash = undo_obj._objs[_id];
		if (_hash['step'] >= (_hash['content'].length - 1)) { return false; }
		_hash['step']++;					
		var _step = _hash['step'];
		var _html = builder.html.convert(_hash['content'][_step]);			
		jQuery('#' + _id).html(_html);		
		builder.setting.check();

	},
	
	remove : function(_id) {
		if (undo_obj._objs[_id]) {
			delete undo_obj._objs[_id];	
		}
	},
	
	get_obj_for_delete : function(obj) {
		return jQuery(obj).parents(undo_obj.editable).children()[0];
	},

	editor_history : function() {

		undo_obj._count++;

		if (undo_obj._count > 10) {
			var _id = 'content';
			from_mong9_editor_to_classic_editor(_id);
			undo_obj._count = 0;
		}

	}

}; //undo_obj