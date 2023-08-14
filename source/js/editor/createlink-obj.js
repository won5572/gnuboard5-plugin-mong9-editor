var createlink_obj = {

	_now : false,
	_over : false,

	int : function(obj) {
		
		if (jQuery('#editWindow-createLink').length == 0) {

			var _html = '' +
			'<ul class="_edit-list-1">' +
				'<li>' +
					'<dl class="_edit-dl-1">' +
						'<dt><label for="_editor_a_text">'+ msg_msg('explan') +'(TITLE/ALT)</label><span class="help-icon edit-btn-etc" title="'+ msg_msg('msg_9') +'">?</span></dt>' +
						'<dd><input type="text" id="_editor_a_text" value="" placeholder="'+ msg_msg('msg_9') +'" class="_drag-btn-3" /></dd>' +
					'</dl>' +	
				'</li>' +
				'<li>' +
					'<dl class="_edit-dl-1">' +
						'<dt><label for="_editor_a_url">'+ msg_msg('link') +'(URL)</label><span class="help-icon edit-btn-etc" title="'+ msg_msg('msg_10') +'">?</span></dt>' +
						'<dd><input type="text" id="_editor_a_url" value="http://" placeholder="'+ msg_msg('msg_10') +'" class="_drag-btn-3" /></dd>' +
					'</dl>' +	
				'</li>' +
				'<li>' +
					'<dl class="_edit-dl-2">' +
						'<dt>'+ msg_msg('new_window') +'(TARGET)</dt>' +
						'<dd><span class="check-switch"><input type="checkbox" id="_editor_a_target" class="_drag-btn-3"> <label for="_editor_a_target">'+ msg_msg('msg_11') +'</label></span></dd>' +
					'</dl>' +	
				'</li>' +	
				'<li id="_link_box_for_btn">' +
					'<dl class="_edit-dl-2">' +
						'<dt></dt>' +
						'<dd><button onclick="btn_obj.view(createlink_obj._now,this);return false;" class="class-btn">'+ msg_msg('button_setting') +'</button></dd>' +
					'</dl>' +	
				'</li>' +
			'</ul>' +
			'<div class="_edit_remove_box"><a href="#" id="createlink_unlink" onclick="createlink_obj.unlink();return false" title="'+ msg_msg('delete_link') +'" data-alt-no="1" class="edit-btn-8 _drag-btn-3 icon2-eraser disabled"></a></div>';

			_html += '<button onclick="createlink_obj.change()" class="curtain-btn editor-btn-yes _drag-btn-3">OK</button>';

			edit_window_obj.int("editWindow-createLink",_html,msg_msg('set_link'),{
				'reset' : function() {
					//createlink_obj.reset();
				}	
			});

		}

		if (jQuery('#editor-link-fix').length == 0) {

			var _html = '<div id="editor-link-fix" class="btn_width _m9editor no" style="display:none"><a href="#" onclick="createlink_obj.view();return false;" class="setting-btn-1">'+ msg_msg('set_link') +'</a></div>';
			jQuery("body").append(_html);

			var mousedown_func = function(e,obj) {

				var et = e.target;			
				var _target = get_is_parents(et,'a','.m9_editor_box');

				if (_target) {

					createlink_obj._now = _target;
					editor._now = _target;
					createlink_obj.get();

				} else {

					createlink_obj.reset();

				}

			};

			var mouseover_func = function(e,obj) {

				var _target = obj;

				if (_target) {

					if (jQuery('#editWindow-createLink').css('display') != 'none') { return false; }

					if (jQuery(_target).is('.m9-tab-btn-on,.m9-tab-btn-off')) { /* 탭박스-버튼 */
						return false;
					}

					if (jQuery(_target).find('img,.m9-img-box').length > 0) {
						return false;
					}

					createlink_obj._over = _target;
					m9_layer_position("editor-link-fix",_target,"up");		
					jQuery('#editor-link-fix').css('display','');
					
				} else {
					jQuery('#editor-link-fix').css('display','none');
				}

			};

			editor_selector.set(obj,[
				{ '_type' : 'mousedown' , '_func' : mousedown_func },
				{ '_type' : 'mouseover' , '_kind' : 'is_parents' , '_selector' : 'a' , '_func' : mouseover_func, '_ignore' : 1 }
			]);		
					
		}

	},

	'view' : function(obj) {

		if (obj) { createlink_obj._over = obj; }
		createlink_obj._now = createlink_obj._over;

		jQuery('.selected_tag').removeClass('selected_tag');
		jQuery(createlink_obj._now).addClass('selected_tag');
		
		this.get();

		m9_layer_position('editWindow-createLink',createlink_obj._now,'up',m9_getObject('body'));							
		edit_window_obj.view('editWindow-createLink');
		jQuery("#editor-link-fix").css("display","none");

	},

	'get' : function() {

		var J_obj = jQuery(createlink_obj._now);

		var _href = (J_obj.attr("href")) ? J_obj.attr("href") : "http://";
		jQuery("#_editor_a_url").val(_href);
		var check = (J_obj.attr("target") == "_blank") ? true : false;
		jQuery("#_editor_a_target").prop("checked",check);

		var _title = "";
		var son_tag = createlink_obj.check_only_obj(J_obj);
		if (son_tag) {
			var son_obj = J_obj.children();
			if (son_tag == "img") {
				_title = (son_obj.attr("alt")) ? son_obj.attr("alt") : son_obj.attr("title");
			} else {		
				_title = (son_obj.attr("title")) ? son_obj.attr("title") : son_obj.attr("alt");			
			}
		}
			
		if (!_title) {
			_title = (J_obj.attr("title")) ? J_obj.attr("title") : J_obj.attr("alt");		
		}

		jQuery("#_editor_a_text").val(_title);	

		if (createlink_obj._now) {		
			jQuery('#createlink_unlink').removeClass('disabled');
		} else {
			jQuery('#createlink_unlink').addClass('disabled');
		}

		if (jQuery(createlink_obj._now).is('img')) {
			jQuery('#_link_box_for_btn').css('display','none');
		} else {
			jQuery('#_link_box_for_btn').css('display','block');
		}

	},

	'unlink' : function() {

		if (!createlink_obj._now) {
			return false;
		}

		var _delete_parent = jQuery(createlink_obj._now).parent();

		undo_obj._add(createlink_obj._now,'link_delete');

		if (jQuery(createlink_obj._now).prop('tagName').toLowerCase() != 'a') {
			return false;	
		}

		jQuery(createlink_obj._now).replaceWith(jQuery(createlink_obj._now).html());

		createlink_obj.remove();
		jQuery('#editWindow-createLink').css('display','none');		

		createlink_obj._now = false;

		undo_obj._add_one(_delete_parent,'link_delete_after');
		
	},
		
	'change' : function() {

		var _url = jQuery("#_editor_a_url").val();
		var _text = jQuery("#_editor_a_text").val();
		var _target = jQuery("#_editor_a_target").prop("checked");

		var _type = 2;
	
		if (createlink_obj._now) {	
			Editor_Container = createlink_obj._now;			
		} else {					
			RestoreSelection(editor._last_selected);
			_type = get_container();			
		}		

		var Dkind = "href";

		if (_type == 1) { // 드래그 한 부분

			document.execCommand("fontSize",false,"7");
			jQuery(document).find("font").each(function(){
				if (jQuery(this).attr("size") == "7") {
					jQuery(this).after('<a href="' + _url + '">' + jQuery(this).html() + '</a>');					
					Editor_Container = jQuery(this).next()[0];
					jQuery(this).remove();					
				}
			});

		} else { // 하나의 객체

			if (jQuery(Editor_Container).prop("tagName").toLowerCase() != 'a') {

				if (jQuery(Editor_Container).is('img,.m9-img-box')) { // 예외처리
					jQuery(Editor_Container).wrap('<a href="' + _url + '"></a>');				
					Editor_Container = jQuery(Editor_Container).parent()[0];
				} else {		
					var random_class = '__this_is__random_class__' + Math.round(Math.random()*100000);
					jQuery(Editor_Container).html('<a href="' + _url + '" class="'+random_class+'">' + jQuery(Editor_Container).html() + '</a>');
					Editor_Container = jQuery('.' + random_class)[0];
					jQuery('.' + random_class).removeClass(random_class);	
				}

			} else {		
	 			jQuery(Editor_Container).attr(Dkind,_url);
	 		}

		}

		if (_target) {
			jQuery(Editor_Container).attr("target","_blank");
		} else {
			jQuery(Editor_Container).removeAttr("target");			
		}

		var Dselected = Editor_Container;

		var son_tag = createlink_obj.check_only_obj(Dselected);	

		if (son_tag) {
			var son_obj = jQuery(Dselected).children();			
			if (son_tag == "img") {
				son_obj.attr("alt",_text).removeAttr("title");
				jQuery(Dselected).removeAttr("alt").removeAttr("title");
			} else {					
				son_obj.attr("title",_text).removeAttr("alt");
				jQuery(Dselected).removeAttr("alt").removeAttr("title");
			}
		} else {
			jQuery(Dselected).attr("title",_text).removeAttr("alt");
		}

		createlink_obj.remove();
		jQuery('#editWindow-createLink').css('display','none');		

		undo_obj._add(Dselected);		
			
	},		

	'check_only_obj' : function(_obj) {

		if (jQuery(_obj).children().length == 1) {
			var _tag = jQuery(_obj).children().prop("tagName").toLowerCase();
			if (_tag == "img" || _tag == "iframe") {
				if (jQuery(_obj).text() == "") {
					return _tag;
				}
			}
		}
		return false;

	},

	'remove' : function() {

		jQuery("#_editor_a_url").val("http://");
		jQuery("#_editor_a_text").val("");
		jQuery("#_editor_a_target").prop("checked",false);
		createlink_obj._now = false;
		createlink_obj._over = false;

	},

	'reset' : function() {

		jQuery("#_editor_a_url").val("http://");
		jQuery("#_editor_a_text").val("");
		jQuery("#_editor_a_target").prop("checked",false);
		jQuery('#createlink_unlink').addClass('disabled');

	}	
		
}; //createlink_obj