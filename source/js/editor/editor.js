var editor = {

	_obj : null, // 에디터
	_now : false, // 클릭된 태그
	_align_check : false, // 클릭시 text-align:left 처럼 자동생성되는 현상을 삭제하기 위한 변수
	_ctrl : 0,
	_last_selected : false,
	_ctrl_v_type : false,
	_ctrl_v_obj : false,
	_ctrl_v_selection : false,
	_ignore : "#editMenu-setting,#alt_view0,.editMenu-column,.editMenu-builder,._not,.no",
	editable : "._one-in-column",	
	incapable : ".clearboth,._not", // 불가능한 요소
	menu_group : "#edit_menu",
	menu_group_together : {},

	defaults : {
		menu : "edit_menu",	
		example : "example",
		example_file : "./example.html",
		placeholder_txt : msg_msg('msg_36') // "내용입력해주세요"
	},
	
	property : {},

	event_doing : {
		'_var' : 0,
		'set' : function(Dvar) {
			this._var = Dvar;
		},
		'get' : function() {
			return this._var;	
		}
		
	},
		
	int : function(_id,_type) {

		editor._obj = jQuery("#"+_id+'_editor');
		var _editor_obj = editor._obj[0];
		
		var setting = editor.defaults;
		editor.property = setting;

		// 상단 빠른메뉴 설정창
		editor.int_extend.set_window(_id,_type);

		fontfamily_obj.int();
		fontsize_obj.int();
		formatpara_obj.int();
		createlink_obj.int(_editor_obj);
		special_char_obj.int();

		icon_obj.int(_editor_obj);
		google_map_obj.int(_editor_obj);
		video_obj.int(_editor_obj);
		table_obj.int(_editor_obj);

		color_obj.int(); // 마지막에 z-index때문(다른창위에 존재하여야 함 때문)

		tab_obj.int(_editor_obj);

		list_obj.int(_editor_obj);

		m9_mode_obj.int();

		// execCommand 실행
		var _activations = ['bold','italic','underline','strikethrough','removeFormat','subscript','superscript','unlink','InsertUnorderedList','InsertOrderedList'];
		
		for (var i=0;i<_activations.length;i++) {
			jQuery(".icon2-"+_activations[i]).click(function(e) {
				if (jQuery(this).data('var')) {
					var _var = jQuery(this).data('var');
					if (_var) {
						_var = _var.toLowerCase();	
						editor.execCommand_ex(_var);
					}
				}
			});
		}

		// 색상버튼 클릭
		jQuery('.icon2-color').click(function(e) {		
			var _type = get_container();
			color_obj._selected = Editor_Container[0];
			var _color = (_type == 1) ? jQuery(color_obj._selected).parent().css('color') : jQuery(color_obj._selected).css('color');
			color_obj.set(_color);
			color_obj.view(this,function(e){color_obj.change(e);},1);
		});

		// execCommand 연동
		var _activations_ex = ['formatPara','fontFamily','fontSize'];//,'createLink'];

		for (var i=0;i<_activations_ex.length;i++) {

			jQuery(".icon2-" + _activations_ex[i]).click(function(e) {				
				RestoreSelection();
				editor._last_selected = SaveSelection(); //createlink_obj 에서 사용????

 				var Cstr = jQuery(this).attr("class").match(/([^-])+$/g);
 				var _name = "editWindow-" + Cstr;
				m9_layer_position(_name,e.target,"up");
				edit_window_obj.view(_name);
			});

		}		

		jQuery(".icon2-createLink").click(function(e) {

			RestoreSelection();
			editor._last_selected = SaveSelection(); //createlink_obj 에서 사용????

			var _name = "editWindow-createLink";
			m9_layer_position(_name,e.target,"up");
			edit_window_obj.view(_name);

		});

		jQuery(document).on('keydown',function(e) {
			if (e.which == 17) { // ctrl키
				editor._ctrl = 1;
			}
		}).on('keyup',function(e) {
				editor._ctrl = 0;
		});
		
		jQuery(document).on('mousedown',function(e) {

			// style의 text-align 생기는거 삭제하기 위해
			editor._align_check = false;
							
			// 상/하 순서변경 실시중일때
			if (editor.sortable._now && editor.sortable._sorting_out == 1) { editor.sortable.destroy(); }			
			
			var et = e.target;
			var J_et = jQuery(et);
			
			// 이전 선택객체 표시 삭제
			if (J_et.parents('._m9editor,._m9editor').length == 0 && editor._ctrl != 1) {
				jQuery(".selected_tag").removeClass("selected_tag");
				jQuery(editor._obj).find('[contenteditable]').removeAttr('contenteditable');
			}

			var J_editor_now = jQuery(editor._now);
									
			// editor.editable 안에 속하고, editor.incapable가 아니면 
			if (J_et.parents(editor.editable).length > 0 && !J_et.is(editor.incapable) && J_et.parents(editor.incapable).length == 0) { // 지도 때문에 바꿈

				editor._now = et;
				J_editor_now = jQuery(editor._now);
			
				// 최초 입력영역에 포커스 일때					
				if (!editor.sortable._now) {
					if (J_editor_now.is('.placeholder_txt')){
						J_editor_now.removeClass("placeholder_txt").removeClass('_starting').html('<br>');								
					}			
				}				

				// style의 text-align 생기는거 삭제하기 위해
				var _style = J_editor_now.attr('style');
				if (_style) {
					if (_style.match(/text-align/g)) {
						editor._align_check = et;
					}
				}

				jQuery(editor._obj).find('[contenteditable]').removeAttr('contenteditable');	
				if (editor._ctrl == 1 && J_editor_now.is('.selected_tag')) {
					J_editor_now.removeClass('selected_tag');
				} else {
					J_editor_now.addClass('selected_tag'); // 현재선택범위 표시
				}

				var o_type = 1; // ie7이하 에러방지 위해

				var _contenteditabled = false;
				if (o_type == 1) {						
					J_editor_now.attr('contenteditable','true'); // 편집모드 부여
					_contenteditabled = J_editor_now[0];
				} else {
					J_editor_now.parents(editor.editable).attr('contenteditable','true'); // 편집모드 부여					
					_contenteditabled = J_editor_now.parents(editor.editable)[0];					
				}

				if (!editor.sortable._now) {
					editor.handle.text_align.view(editor._now,1); // undo_obj._add 실행방지
					editor.handle.close_son_menu();					
				}
				
				m9_obj_set_data(editor._obj[0],'edit_on',1);

			} else {

				if (J_et.parents(editor._ignore).length == 0 && !J_et.is(editor._ignore)) {		          			
					editor.handle.close_son_menu();
				}

				m9_obj_set_data(editor._obj[0],'edit_on',0);
								
			}

			// style의 text-align 생기는거 삭제하기 위해
			if (!editor._align_check) {
				var _style = jQuery(_contenteditabled).attr("style");
				if (_style != undefined) {				
					jQuery(_contenteditabled).attr("style",_style.replace(new RegExp("text\-align\:(\\s?)(\\w+)(\\;?)",'gi'),""));					
				}
			}

			if (get_is_parents(et,'._edit_window')) {
				RestoreSelection();
			}

			if (J_et.is('.m9_editor_box')) {	
				var _child = J_et.find('._one-block');
				if (_child.length <= 1) {
					var _last = J_et.find('._one-block').last();
					var _target = _last.find('._one-in-column').children().last();
					jQuery(_target[0]).trigger('mousedown');
					m9_delay('',100,function() {
						placeCaretAtEnd(_target[0]);			
					});
				}
			}	

		}).on('mouseup keyup',function(e) {

			var et = e.target;

			editor.handle.edit_menu_btn_preview();

			if (get_is_parents(et,'._one-in-column','.m9_editor_box')) {

				var _mode = m9_mode_obj.get();
			
				if (GetSelectedText()) { // 드래그 중이면

					jQuery('._drag-btn-2').addClass('disabled').prop('disabled','disabled');
					
					if (_mode == '') {

						jQuery('._drag-btn-1').removeClass('disabled').prop('disabled','');						

					} else {

						jQuery('._drag-btn-1').each(function() {
							var J_this = jQuery(this);
							if (!J_this.hasClass('_drag-btn-3')) { // 모바일 불가처리 _drag-btn-3
								J_this.removeClass('disabled').prop('disabled','');		
							}
						});

						jQuery('.icon2-createLink').addClass('disabled').prop('disabled','disabled');

					}

				} else {
										
					jQuery('._drag-btn-1').addClass('disabled').prop('disabled','disabled');

					if (jQuery('.selected_tag').length > 1) {

						jQuery('._drag-btn-2,._a_delete_icon').addClass('disabled').prop('disabled','disabled');	

					} else {


						if (_mode == '') {

							jQuery('._drag-btn-2').removeClass('disabled').prop('disabled','');						
							jQuery('.icon2-indent,.icon2-formatPara,.icon2-arrow-height,.icon2-move,._a_delete_icon').removeClass('disabled').prop('disabled','');

						} else {

							jQuery('._drag-btn-2').each(function() {
								var J_this = jQuery(this);							
								if (!J_this.hasClass('_drag-btn-3')) {
									J_this.removeClass('disabled').prop('disabled','');		
								}
							});

							jQuery('.icon2-indent,.icon2-formatPara,.icon2-arrow-height,.icon2-move,._a_delete_icon').addClass('disabled').prop('disabled','disabled');

						}									

					}

				}

			} else if (get_is_parents(et,'._setting_area_box',jQuery('html')[0])) { // 이미지 오버
				jQuery('._drag-btn-1,._drag-btn-2').addClass('disabled').prop('disabled','disabled');
				jQuery('._drag-btn-4').removeClass('disabled').prop('disabled','');
			} else {
				if (!get_is_parents(et,'#edit_menu')) {				
					jQuery('._drag-btn-1,._drag-btn-2').addClass('disabled').prop('disabled','disabled');
				}
			}
								
		});	

		editor._obj.on('mouseenter',function(e) {

			var J_this = jQuery(this);
			
			// 최초 입력영역 삽입
			if (J_this.children().length == 0) {
				
				jQuery('<div class="m9-grid-1">\n\t<div class="m9-column-1">\n\t\t<p class="placeholder_txt _starting">' + editor.property.placeholder_txt + '</p>\n\t</div>\n</div>').appendTo(J_this);	
				builder.setting.check();
				
			} else {
				
				var _count = 0;
				var _blocks = J_this.children();
		
				for (var i=0;i<_blocks.length;i++) {
					if (jQuery(_blocks[i]).find(grid_obj._grids).css('display') != 'none') {					
						_count++;
						break;
					}	
				}

				if (_count == 0) {
					jQuery('<div class="m9-grid-1">\n\t<div class="m9-column-1">\n\t\t<p class="placeholder_txt _starting">' + editor.property.placeholder_txt + '</p>\n\t</div>\n</div>').appendTo(J_this);	
					builder.setting.check();
				}
								
			}
			
		}).on('mouseup',function(e) {

			var et = e.target;	
			if (get_is_parents(et,'._one-in-column','.m9_editor_box') && !get_is_parents(et,'._m9editor','.m9_editor_box')) {					
				SaveSelection();
			}
			
		}).on('keydown',function(e) {

			if (e.keyCode == 13) { // 13 => enter

				var _mode = m9_mode_obj.get();
				var _br = (_mode == '') ? '<br>' : '<br class="'+_mode+'-only-br">';
				if (editor.is_ctrl == 1) { _br = '<br class="all-br">'; }
				
				if (M9_SET["navigator"] == "ie" && m9_ie_var <= 10) {
					      	
					var rangeObj = document.selection.createRange();
					if (rangeObj.parentElement) {
						//rangeObj.pasteHTML('<br>');
						rangeObj.pasteHTML(_br);						
						e.cancelBubble = true;
						e.returnValue = false;
						rangeObj.select();
						rangeObj.moveEnd("character",1);
						rangeObj.moveStart("character",1);
						rangeObj.collapse(false);
						return false;
					}
					
				} else {
            	
					var selection = window.getSelection();
					var rangeObj = selection.getRangeAt(0);
					rangeObj.extractContents();
					rangeObj.collapse(true);
					var _frag = rangeObj.createContextualFragment(_br);					
					var lastNode = _frag.lastChild;
					rangeObj.insertNode(_frag);
					rangeObj.setStartAfter(lastNode);
					rangeObj.setEndAfter(lastNode);

					var _frag2 = rangeObj.createContextualFragment('\u200C');					
					var lastNode2 = _frag2.lastChild;
					rangeObj.insertNode(_frag2);
					rangeObj.setStartAfter(lastNode2);
					rangeObj.setEndAfter(lastNode2);

					var comCon = rangeObj.commonAncestorContainer;
					if (comCon && comCon.parentNode) {
						try {
						comCon.parentNode.normalize();
						} catch(e) {
						}
					}
					selection.removeAllRanges();
					selection.addRange(rangeObj);

					return false;
				}
			}
		
			if (e.which == 17) { // ctrl키
				editor.is_ctrl = 1; // 컨트롤 키 누름 여부		
				return;			
			}

			if (editor.is_ctrl == 1) {

				editor._ctrl_v_type = GetSelectedText();

				if (e.which == 86) { // 86 => v

					editor._ctrl_v_obj = (get_container() == 1) ? jQuery(Editor_Container).parent()[0] : Editor_Container[0];

					if (jQuery('#_ctrl_v_memory').length == 0) {
					
						editor._ctrl_v_selection = SaveSelection(); //복사붙혀넣기 준비
	
						var _top = jQuery(editor._ctrl_v_obj).offset().top;	
						editor._obj.append('<div id="_ctrl_v_memory" contenteditable="true" style="position:absolute;top:' + _top + 'px;left:-100000px">&nbsp;</div>');
							
						if (M9_SET["navigator"] == "ie" && m9_ie_var <= 9) {  
							doSetCaretPosition(jQuery('#_ctrl_v_memory')[0],0); //ie 전용
						} else {
							setCaretPos(jQuery('#_ctrl_v_memory')[0],0); // 됨
						}
					}					
				}

			}

		}).on('keyup',function(e) {

			if (e.which == 17) { editor.is_ctrl = 0; } // ctrl 키 눟으면
			var J_ctrl_v = jQuery('#_ctrl_v_memory');
					
			if (J_ctrl_v.length > 0 && J_ctrl_v.html() == "&nbsp;") {		
				J_ctrl_v.remove();
				RestoreSelection(); //복사붙혀넣기 준비(복원)			
			}			

			setTimeout(function() {
				undo_obj._add(editor._now,'input');
			},200);

		}).on('click',function(e) {

			// 링크무력화			
			var et = e.target;
			var J_et = jQuery(et);
			
			if (J_et.is('a') || J_et.parents('a').length > 0) {									
				if (!J_et.is('._m9editor') && J_et.parents('._m9editor').length == 0) {
					if (e.preventDefault) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					}
				}
			}
			
		}).on('dblclick',function() { // 더블클릭시 오브젝트 텍스트 모두 선택
			
			var _range; // 범위의 시작점과 끝점을 모두 포함하며 가장 깊게 중첩되어 있는 노드, 즉 조상인 Document 노드
			var _parent;
			
			if (window.getSelection){ // ie 9 이상 + 다른 브라우져
				_range = window.getSelection().getRangeAt(0);
				_parent = window.getSelection().getRangeAt(0).commonAncestorContainer;		
			} else if (document.selection){ // ie 전용
				_range = document.selection.createRange();
				_parent = document.selection.createRange().parentElement();		
			}
			if (_range == "") { return false; }
			SelectFirstLine(_parent);
			SaveSelection();
			
		}).on('paste',function(e) { // 6. 편집기 paste 이벤트 설정(마우스오른쪽-붙여넣기 실행시)
			
			var J_e_target = jQuery(e.target);
						
			if (!J_e_target.is('#_ctrl_v_memory') && J_e_target.parents('#_ctrl_v_memory').length == 0) { return false; }

			setTimeout(function() {
					
				var e_obj = editor._ctrl_v_obj;
				var J_e_obj = jQuery(e_obj);
				
				var h_is = (J_e_obj.is('h1,h2,h3,h4,h5,h6') || J_e_obj.parents('h1,h2,h3,h4,h5,h6').length > 0) ? 1 : 0;

				var _tag = "div";
				if (J_e_obj.is('h1,h2,h3,h4,h5,h6') || J_e_obj.parents('h1,h2,h3,h4,h5,h6').length > 0) {
					_tag = "h";
				} else if (J_e_obj.is('p') || J_e_obj.parents('p').length > 0) {				
					_tag = "p";								
				}

				var convert_html = ctrl_v_convert(jQuery('#_ctrl_v_memory')[0],_tag);
				convert_html = convert_html.replace(/\s$/,""); // 마지막 &nbsp; 제거
				var paste_txt = '<span id="_ctrl_remove_wrap">' + convert_html + '</span>';						
				RestoreSelection(editor._ctrl_v_selection);

				if (editor._ctrl_v_type != false && editor._ctrl_v_type != '') {			
					document.execCommand('delete',false,null);
				}
				InsertObj(paste_txt);		

				placeCaretAtEnd(jQuery('#_ctrl_remove_wrap')[0]);
				var now_caret = getCaretPosition(jQuery(editor._obj)[0]);
															
				jQuery('#_ctrl_remove_wrap').replaceWith(jQuery('#_ctrl_remove_wrap').html());
				jQuery('#_ctrl_v_memory').remove();

				setCaretPos(editor._obj[0],now_caret);
																							
			},200);

		});

	},

	// 상단 메뉴 설정
	execCommand_ex : function(_var) {

		document.execCommand(_var,false,null);

		get_container();
		editor._now = Editor_Container[0];
		jQuery('.selected_tag').removeClass("selected_tag");		
		jQuery(editor._now).addClass("selected_tag");
		editor.mode.adjust_tag(editor._now,_var); // 모바일 태그적용
		editor.handle.edit_menu_btn_preview();
		storedSelections = SaveSelection();
		RestoreSelection();

		undo_obj._add(editor._now);

	},

	handle : {

		_son_menu : false,
		
		open_son_menu : function(_id,obj) { // 하위버튼 열기
			editor.handle._son_menu = _id;
			jQuery('._open_son').removeClass('active');			
			jQuery(obj).addClass('active');			
			m9_layer_position(_id,obj,"down");			
			//m9_layer_view_only(_id,{slide:'',opacity:100,speed:100});
			m9_layer_view_only(_id);
		},

		close_son_menu : function() { // 하위버튼 닫기
			jQuery('._open_son').removeClass('active');					
			_m9_layer_view_only_close();
		},
		
		indent : {
			
			_lists : ['indent','outdent'],
			
			change : function(Dvar) {

				var _lists = editor.handle.indent._lists;
				var _target = jQuery('#_edit_btn_indent');
				
				for (var i=0;i<_lists.length;i++) {
					var _class = 'icon-indent-' + _lists[i];
					if (_target.hasClass(_class)) {
						_target.removeClass(_class);
						break;
					}
				}	
				if (Dvar == 'indent') {
					edit_etc_obj.indent(jQuery('.selected_tag'));
				} else {
					edit_etc_obj.outdent(jQuery('.selected_tag'));
				}
				undo_obj._add(editor._now);				
				
				_target.addClass('icon-' + Dvar);	
					
			}
			
		},

		edit_menu_btn_preview : function() { // 버튼 상태 미리보기

			if (!editor._now) { return false; }
			var J_editor_now = jQuery(editor._now);
			
			var _var = J_editor_now.css('font-weight');
			var _ok = (_var == '' || _var == 'normal' || _var < 500) ? 0 : 1;
			toggle_class('.icon2-bold','active',_ok);

			var _var = J_editor_now.css('font-style');	
			var _ok = (_var == '' || _var == 'normal') ? 0 : 1;
			toggle_class('.icon2-italic','active',_ok);

			var _var = J_editor_now.css('text-decoration');

			var _ok = (_var.search(/underline/gi) == -1) ? 0 : 1;
			toggle_class('.icon2-underline','active',_ok);

			var _ok = (_var.search(/line\-through/gi) == -1) ? 0 : 1;
			toggle_class('.icon2-strikethrough','active',_ok);

			var _ok = (get_is_parents(editor._now,'sup','._one-in-column')) ? 1 : 0;
			toggle_class('.icon2-superscript','active',_ok);

			var _ok = (get_is_parents(editor._now,'sub','._one-in-column')) ? 1 : 0;
			toggle_class('.icon2-subscript','active',_ok);

			var _var = J_editor_now.css('text-align');					
			if (_var == 'start') { _var = 'left'; } // reset value
			editor.handle.text_align.change2(_var,1);

		},
						
		text_align : {

			_lists : ['left','center','right','justify'],

			change2 : function(Dvar,Dtype) {
		
				var _lists = this._lists;
				var _target = jQuery('#_edit_btn_text_align');
				
				for (var i=0;i<_lists.length;i++) {
					var _class = 'icon2-align-' + _lists[i];
					if (_target.hasClass(_class)) {
						_target.removeClass(_class);
						break;
					}
				}	

				_target.addClass('icon2-align-' + Dvar);	
				if (Dtype != 1) {
					this.change(Dvar);
				}
				
			},
									
			change : function(Dvar) {

				jQuery('._text_align').removeClass('active');
				var _align = get_inline_style(editor._now,'text-align');
				if (Dvar == _align) {
					element_obj.change_css_by_mode('text-align','');
					return false;
				}
		
				element_obj.change_css_by_mode('text-align',Dvar);
				jQuery('._text_align._'+ Dvar).addClass('active');
			
				undo_obj._add(editor._now,'text-align');				
				
			},
					
			view : function(obj,_type) { // 하위버튼 미리보기 설정
				
				jQuery('._text_align').removeClass('active');
				var _align = get_inline_style(editor._now,'text-align');
				if (_align) {
					jQuery('._text_align._'+ _align).addClass('active');
				}
				
			}
			
		},
		
		resize : function() {		
			resize_obj.change(editor._now);
		},

		copy_obj : false,
		copy : function() { // 복사하기

			if (jQuery(editor._now).is('dt,dd,li,tr,td,th')) {
				var _tag = jQuery(editor._now).prop('tagName');
				var _str = msg_msg('msg_46').msg_format(_tag); // '복사할수 없는 태그[' + _tag + ']입니다.'
				error_msg(_str);				
				return alse;
			}
									
			editor.handle.copy_obj = jQuery(editor._now)[0].outerHTML;

			editor.handle.close_son_menu();

			var _str = msg_msg('msg_73'); // '복사되었습니다'
			error_msg(_str);

		},

		paste : function() { // 붙혀넣기

			if (!editor.handle.copy_obj) {
				var _str = msg_msg('msg_76'); // '복사한 객체가 없습니다'
				error_msg(_str);
				return alse;
			}

			var _error = 0;
			if (jQuery(editor._now).is('img,br,iframe,tr')) {
				_error++;
			} else if (get_is_parents(editor._now,'.m9-img-box,.google_map,iframe,[class*=m9-video-canvas-]','.m9_editor_box')) {
				_error++;
			}

			if (_error != 0) {
				var _str = msg_msg('msg_75'); // '붙혀넣을 수 없는 객체입니다'
				error_msg(_str);
				return alse;
			}

			editor.handle.append_html(editor.handle.copy_obj,2);				
		},

		same : function() { // 상단복사
					
			if (!storedSelections) {
				alert(msg_msg('msg_65')); // '삽입할 위치를 지정해주세요!'
				return false;
			}
			
			if (jQuery(editor._now).is('dt,dd,tr,td,th')) {
				var _tag = jQuery(editor._now).prop('tagName');
				var _str = msg_msg('msg_46').msg_format(_tag); // '복사할수 없는 태그[' + _tag + ']입니다.'
				error_msg(_str);				
				return alse;
			}
			var cell_ok = editor.handle.checking_cell(jQuery(editor._now)[0]);	
			if (cell_ok > 0) {
				confirm_msg.view(msg_msg('msg_47'),"editor.handle._same"); // 1 // "[그룹]으로 복사할수 있습니다.<br>[그룹] 복사를 원하시면 [OK]를 선택해주세요.<br>[NO]를 선택하시면 현재 선택된 [객체]만 복사됩니다."
			} else {
				editor.handle._same(0);
			}
		},					
			
		_same : function(Dvar) { // 상단복사 처리
		
			if (Dvar == 1) {						
				editor.handle._cell_check('same'); // 외부삽입시, 복사기본단위 체크
			}
			
			var _clone = jQuery(editor._now).clone()[0].outerHTML;

			if (jQuery(editor._now).is("li") && jQuery(editor._now).parent('ol,ul').length > 0) {
				_clone = ollist_obj.calculate.string(_clone,1);
				ollist_obj.calculate.next(editor._now,1);
			}
						
			editor.handle.append_html(_clone);
		},

		heading : function(_num,_type) { // 제목글 삽입

			if (jQuery(editor._now).html() == "<br>" || jQuery(editor._now).html() == "<br />") {
				jQuery(editor._now).html("");
			}

			var h_name = 'h' + _num;			
			editor.handle.append_html(html_info[h_name],_type);
		},
		
		unlist : function(_type) {
			editor.handle.append_html(html_info['unlist'],_type);
		},

		ollist : function(_type) {
			editor.handle.append_html(html_info['ollist'],_type);
		},
								
		paragma : function(_type) {

			if (!storedSelections) {
				alert(msg_msg('msg_65')); // '삽입할 위치를 지정해주세요!'
				return false;
			}
						
			if (_type && _type == 2) {						
				editor.handle.append_html(html_info['p'],_type);	
			} else {
				editor.handle._cell_check('p'); // 외부삽입시, 복사기본단위 체크
				if (jQuery(editor._now).is("li,tr,th,td")) {
					error_msg(msg_msg('msg_48')); // "외부삽입할 위치가 아닙니다"
					return false;							
				}
				editor.handle.append_html(html_info['p'],_type);					
			}
		},

		div : function(_type) {

			if (!storedSelections) {
				alert(msg_msg('msg_65')); // '삽입할 위치를 지정해주세요!'
				return false;
			}
						
			if (_type && _type == 2) { // 내부삽입
				editor.handle.append_html(html_info['div'],_type);	
			} else {
				editor.handle._cell_check('div');  // 외부삽입시, 복사기본단위 체크	
				editor.handle.append_html(html_info['div'],_type);					
			}
		},
				
		img : function(_type) {
			editor.handle.append_html(html_info['img'],_type);	
		},

		icon : function(_type) {
			editor.handle.append_html(html_info['icon'],_type);	
		},

		button : function(_type) {
			editor.handle.append_html(html_info['button'],_type);	
		},
		
		video : function(_type) {
			editor.handle.append_html(html_info['video'],_type);		
		},

		map : function(_type) {
			editor.handle.append_html(html_info['map'],_type);	
		},

		table : function(_type) {
			editor.handle.append_html(html_info['table'],_type);	
		},
										
		append_html : function(str,_type) {

			if (!storedSelections) {
				alert(msg_msg('msg_65')); // '삽입할 위치를 지정해주세요!'
				return false;
			}

			if (!_type) { _type = 0; }

			if (_type == 2) { // 내부삽입

				RestoreSelection();

				var _mode = m9_mode_obj.get();
				
				if (_mode != '') {
					jQuery("body").append('<div id="_edit_covert_box" style="display:none"></div>');		
					jQuery("#_edit_covert_box")[0].innerHTML = str;
					editor.mode.adjust_display(jQuery("#_edit_covert_box").children().eq(0)[0]);
					str = jQuery('#_edit_covert_box').html();
					jQuery("#_edit_covert_box").remove();
				}

				InsertObj(str);		
				get_container();

				undo_obj._add(Editor_Container[0]);
					
			} else { // 외부삽입

				var _target = editor._now;
				if (jQuery(_target).is('table')) { // 테이블일때는 테이블 넓이 설정 태그들이 있어서
					if (jQuery(_target).parents('._table-colresize').length > 0) {
						_target = jQuery(_target).parents('._table-colresize')[0];
					}
				} else if (jQuery(_target).is('iframe')) {
					if (jQuery(_target).parents('[class*=m9-video-canvas-]').length > 0) {
						_target = jQuery(_target).parents('[class*=m9-video-canvas-]')[0];
					}
				}

				if (_type == 3) {
					str = '<div class="text-align-center margin-height-1">' + str + '</div>';
				}

				jQuery(str).insertAfter(_target).hide().fadeIn(100,function(){						
					
					var J_this = jQuery(this);				
					if (J_this.prop("tagName").toLowerCase() == 'li' && J_this.css('display') == 'list-item') { // 복사할것이 li일때, 복사한 후 style="display:list-item" 이 추가됨. 이를 삭제함
						J_this.css('display','');
					}
					
					J_this.before("\n\t\t").removeClass('selected_tag');
					J_this.find('.selected_tag').removeClass('selected_tag');
					editor.mode.adjust_display(this);
					J_this.css('display','');	
					undo_obj._add(this);	
					
				});
				
			}

			ani_type_obj.checking(grid_obj._column_before); // 실행할 ani_type 실행
			editor.handle.close_son_menu();				
		},

		del : function() {

			if (storedSelections != '') {
				editor.execCommand_ex('delete');
				return false;
			}
									
			if (!editor._now) { return false; }			

			if (jQuery(editor._now).is('td,th,dt,dd')) {
				var _tag = jQuery(editor._now).prop('tagName');
				var _str = msg_msg('msg_66').msg_format(_tag); // '삭제할수 없는 태그[' + _tag + ']입니다.'
				error_msg(_str);				
				return alse;
			}
			
			editor.handle._del(0);
	
		},
						
		_del : function(Dvar) {

			if (Dvar == 1) {
				editor.handle._cell_check('same'); // 외부삽입시, 복사기본단위 체크
			}

			if (jQuery(editor._now).is("li") && jQuery(editor._now).parent('ol,ul').length > 0) {
				ollist_obj.calculate.next(editor._now,0);
			}

			if (jQuery(editor._now).parent('._one-in-column').length > 0 && jQuery(editor._now).siblings().length <= 0) {
				error_msg(msg_msg('msg_51')); // "더 이상 삭제 할 수 없습니다"
				return false;
			}

			//undo_obj._add(editor._now);		

			M9ALT.hidden(m9_get_evt_obj(event));			

			storedSelections = false;	

			jQuery(editor._now).fadeOut(300,function() {
				var _re = editor._now;
				if (jQuery(this).prev().length > 0) {
					jQuery(jQuery(this).prev()[0]).addClass('selected_tag');
					editor._now = 	jQuery(this).prev()[0];
				}
				var _p = jQuery(this).parent()[0];
				jQuery(this).remove();			
				undo_obj._add(_p);
			});	
			
		},

		// 최소기준 단위 체크
		// 외부삽입시, 복사기본단위 체크
		_cell_check : function(_tag) {

			var obj;
			var _match = 0;

			var J_editor_now = jQuery(editor._now);
	
			if (_tag == "same") {

				if (J_editor_now.is("th,td,tr,thead,tbody,tfoot,table")) {
					obj = get_is_parents(editor._now,'table','.m9_editor_box');
				} else if (J_editor_now.is("dt,dd,dl")) {
					obj = get_is_parents(editor._now,'dl','.m9_editor_box');
				} else if (J_editor_now.parents("._cell,li").length > 0) {
					obj = get_is_parents(editor._now,'._cell,li','.m9_editor_box');
				}
				
			} else {

				if (J_editor_now.is("th,td,tr,thead,tbody,tfoot,table")) {
					obj = get_is_parents(editor._now,'table','.m9_editor_box');
				} else if (J_editor_now.is("dt,dd,dl")) {
					obj = get_is_parents(editor._now,'dl','.m9_editor_box');
				} else if (J_editor_now.is("li")) {				
					obj = get_is_parents(editor._now,'ul,ol','.m9_editor_box');					
				}

			}

			if (obj) { editor._now = obj; }
						
		},
				
		checking_cell : function(obj) {
			return jQuery(obj).parents('._cell,li').length;				
		},
		
		_del_content_id : '',
		del_content : function(_id) {
			this._del_content_id = _id;
			confirm_msg.view(msg_msg('msg_67'),"editor.handle._del_content"); // 문서를 삭제하시겠습니까?
		},

		_del_content : function(Dvar) {

			if (Dvar != 1) { return false; }
			var _id = this._del_content_id;
			var _textarea = jQuery('#' + _id);
			var edit_id = _id + "_editor";
			var _edit = jQuery('#' + edit_id);
			_textarea.val('');
			_edit.html('');

			edit_window_obj.close_all();

		}

	}, //handle

	html : {

		_html_id : '',

		view : function(_id,_this) {

			editor.html._html_id = _id;
			var edit_id = _id + "_editor";
			var _html = builder.html.get(edit_id);

			html_obj.view('editor.html.change',_html);

		},

		change : function(_html) {

			var _id = editor.html._html_id;
			var edit_id = _id + "_editor";
			var _edit = jQuery('#' + edit_id);

			_edit[0].innerHTML = _html;
			if (m9_editor.setting['use_grid'] == 1) { grid_obj.int(edit_id); }
			if (m9_editor.setting['use_builder'] == 1) { builder.int(edit_id); }

		}

	}, //html

	sortable : {
	
		_now : false,
		_sorting_out : 0,
	
		set : function() {
	
			if (jQuery(editor._now).is('th,td')) {
				error_msg(msg_msg('msg_52')); // "순서변경이 불가능한 요소(태그)입니다!"
				return false;				
			}
				
			var cell_ok = editor.handle.checking_cell(jQuery(editor._now)[0]);
			if (cell_ok > 0) {
				confirm_msg.view(msg_msg('msg_53'),"editor.sortable._sorting"); // "[그룹]으로 순서변경을 할 수 있습니다.<br>[그룹] 순서변경을 원하시면 [OK]를 선택해주세요.<br>[NO]를 선택하시면 현재 선택된 [객체] 레벨로 순서변경 됩니다."
			} else {
				editor.sortable._sorting(0);
			}							
		},

		_sorting : function(Dvar) {

			if (Dvar == 1) {
				editor.handle._cell_check('same'); // 외부삽입시, 복사기본단위 체크
			}
						
			var obj = jQuery(editor._now).parent();
			
			if (obj.children().length <= 1) {
				error_msg(msg_msg('msg_18'));				
				return false;
			}

			obj.removeAttr('contenteditable').find('[contenteditable]').removeAttr('contenteditable');

			obj.children().each(function(){
				var J_this = jQuery(this);
				if (!J_this.hasClass("_one-entry")) {
					m9_attrs_history.set(J_this[0]); /* 2020-11-30 추가 순서변경시, style의 top,left,position 값등이 변함 */
					J_this.addClass('_one-entry').addClass('editor-sorting').addClass('_not').append('<div class="_screen"></div>');
				}
			});
		
			obj.sortable({
				cursor : "move",
				placeholder : "editor-placeholder",
				distance : 5,
				delay : 200,
				tolerance : "pointer",
				start : function(event,ui) {
					jQuery(ui.placeholder).slideUp(50);
				},		
				change : function(event,ui) {
					jQuery(ui.placeholder).hide().slideDown(50);				
				},					
				stop : function(event,ui) {
					ollist_obj.calculate.reset(ui.item);
					editor.sortable._sorting_out = 0;
				}
			});

			editor.sortable._now = obj[0];

			obj.on("mouseenter",function(){ editor.sortable._sorting_out = 0; });
			obj.on("mouseleave",function(){ editor.sortable._sorting_out = 1; });
												
		},
		
		destroy : function() {

			if (!editor.sortable._now) { return false; }
			var obj = editor.sortable._now;
			var J_obj = jQuery(obj);
			
			J_obj.children().each(function(){
				var J_this = jQuery(this);
				if (J_this.hasClass("_one-entry")) {
					m9_attrs_history.reset(J_this[0]); /* 2020-11-30 추가 순서변경시, style의 top,left,position 값등이 변함 */
					J_this.removeClass('_one-entry').removeClass('editor-sorting').removeClass('_not').find('._screen').remove();
				}
			});
		
			J_obj.sortable("destroy");		
			editor.sortable._now = false;
			editor.sortable._sorting_out = 0;			
			
			J_obj.off("mouseleave");
			J_obj.off("mouseenter");			

			undo_obj._add(obj);

		}
					
	}, // sortable
	
	int_extend : {
		
		set_window : function(_id,_type) { // 상단 빠른메뉴 설정창(#edit_menu) 생성

			var setting = editor.property;

			if (jQuery('#' + setting["menu"]).length == 0) {
					
				var _html = '<div class="_edit_menu_in">';
				
				_html += '<div class="box1">' +
				'<ul>'+		
				'<li><button title="'+ msg_msg('bold') +'" data-var="bold" data-alt-no="1" class="edit-btn-8 _drag-btn-1 icon2-bold"></button></li>'+					
				'<li><button title="'+ msg_msg('italic') +'" data-var="italic" data-alt-no="1" class="edit-btn-8 _drag-btn-1 icon2-italic"></button></li>'+
				'<li><button title="'+ msg_msg('underline') +'" data-var="underline" data-alt-no="1" class="edit-btn-8 _drag-btn-1 icon2-underline"></button></li>'+
				'<li><button title="'+ msg_msg('line_through') +'" data-var="strikethrough" data-alt-no="1" class="edit-btn-8 _drag-btn-1 icon2-strikethrough"></button></li>'+												
				'<li><button title="'+ msg_msg('sup') +'" data-var="superscript" data-alt-no="1" class="edit-btn-8 _drag-btn-1 icon2-superscript"></button></li>'+
				'<li><button title="'+ msg_msg('sub') +'" data-var="subscript" data-alt-no="1" class="edit-btn-8 _drag-btn-1 icon2-subscript"></button></li>'+
				//'<li><button title="'+ msg_msg('color') +'" data-var="color" data-alt-no="1" class="edit-btn-8 open-1 _drag-btn-1 icon2-color"></button></li>'+
				'<li><button title="'+ msg_msg('remove_font_property') +'" data-var="removeFormat" data-alt-no="1" class="edit-btn-8 _drag-btn-1 icon2-removeFormat"></button></li>' +
				'<li><button title="'+ msg_msg('link') +'" data-var="createLink" data-alt-no="1" class="edit-btn-8 open-1 _drag-btn-1 icon2-createLink"></button></li>' +
				'</ul>' +
				'</div>';
				
				_html += '<div class="box2">' +
				'<ul>' +
				'<li>' +
					'<button id="_edit_btn_text_align" onclick="editor.handle.open_son_menu(\'_edit-btn-group-text-align\',this);return false;" title="'+ msg_msg('alignment') +'" data-alt-no="1" class="edit-btn-8 open-2 _drag-btn-2 _open_son icon2-align-left" draggable="false"></button>' +
					'<div id="_edit-btn-group-text-align" class="editMenu-setting-son _m9editor no">' +
						'<ul>' +
						'<li><button title="'+ msg_msg('left') +'" onclick="editor.handle.text_align.change2(\'left\');return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-align-left _text_align _left"></button></li>' +	
						'<li><button title="'+ msg_msg('center') +'" onclick="editor.handle.text_align.change2(\'center\');return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-align-center _text_align _center"></button></li>' +	
						'<li><button title="'+ msg_msg('right') +'" onclick="editor.handle.text_align.change2(\'right\');return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-align-right _text_align _right"></button></li>' +	
						'<li><button title="'+ msg_msg('justify') +'" onclick="editor.handle.text_align.change2(\'justify\');return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-align-justify _text_align _justify"></button></li>' +	
						'</ul>' +
					'</div>' +
				'</li>' +
					
				'<li>' +
					'<button id="_edit_btn_indent" onclick="editor.handle.open_son_menu(\'_edit-btn-group-indent\',this);return false;" title="'+ msg_msg('indent') +' & '+ msg_msg('outdent') +'" data-alt-no="1" class="edit-btn-8 open-2 _drag-btn-2 _open_son icon2-indent"></button>' +
					'<div id="_edit-btn-group-indent" class="editMenu-setting-son _m9editor no">' +
						'<ul>' +
						'<li><button title="'+ msg_msg('indent') +'" onclick="editor.handle.indent.change(\'indent\');return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-indent "></button></li>' +	
						'<li><button title="'+ msg_msg('outdent') +'" onclick="editor.handle.indent.change(\'outdent\');return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-outdent "></button></li>' +								
						'</ul>' +
					'</div>' +
				'</li>' +
							
				'<li>' +
					'<button id="_edit_btn_plus_in" onclick="editor.handle.open_son_menu(\'_edit-btn-group-plus-in\',this);return false;" title="'+ msg_msg('insertion') +'" data-alt-no="1" class="edit-btn-8 open-2 _drag-btn-2 _open_son icon2-plus-before"></button>' +				
					'<div id="_edit-btn-group-plus-in" class="editMenu-setting-son _m9editor no">' +
						'<ul id="_edit-btn-group-plus-in-ul">' +
						'<li><button title="'+ msg_msg('paragraph') +'" onclick="editor.handle.paragma(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-p"></button></li>' +	
						'<li><button title="'+ msg_msg('box') +'" onclick="editor.handle.div(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-div"></button></li>' +	
						'<li><button title="'+ msg_msg('image') +'" onclick="editor.handle.img(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-img"></button></li>' +	

						'<li><button title="'+ msg_msg('title') +'" onclick="editor.handle.open_son_menu(\'_edit-btn-group-heading\',jQuery(\'#_edit_btn_plus_in\')[0]);return false" data-alt-no="1" class="edit-btn-8 open-2 _drag-btn-2 _open_son  icon2-h"></button></li>' +	
						'<li><button title="'+ msg_msg('unorder_list') +'" onclick="editor.handle.unlist(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-InsertUnorderedList"></button></li>' +	
						'<li><button title="'+ msg_msg('order_list') +'" onclick="editor.handle.ollist(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-InsertOrderedList"></button></li>' +	
						'<li><button title="'+ msg_msg('table') +'" onclick="editor.handle.table(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-table-class"></button></li>' +	
						'<li><button title="'+ msg_msg('special_characters') +'" onclick="special_char_obj.view(editor._now);return false" data-alt-no="1" class="edit-btn-8 open-1 _drag-btn-2 icon2-special-char"></button></li>' +	
						'<li><button title="'+ msg_msg('icon') +'" onclick="editor.handle.icon(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-icon"></button></li>' +	
						'<li><button title="'+ msg_msg('button') +'" onclick="editor.handle.button(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-button"></button></li>' +
						'<li><button title="'+ msg_msg('video') +'" onclick="editor.handle.video(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-video"></button></li>' +	
						'<li><button title="'+ msg_msg('map') +'" onclick="editor.handle.map(2);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-map"></button></li>' +		
						'</ul>' +
					'</div>' +
				'</li>' +
			
				'<li>' +
					'<button id="_edit_btn_plus_out" onclick="editor.handle.open_son_menu(\'editMenu-setting-son-plus-out\',this);return false" title="'+ msg_msg('exsertion') +'" data-alt-no="1" class="edit-btn-8 open-2 _drag-btn-2 _drag-btn-4 _open_son icon2-append"></button>' +
					'<div id="editMenu-setting-son-plus-out" class="editMenu-setting-son _m9editor no">' +
						'<ul>' +						
							'<li><button title="'+ msg_msg('top_copy') +'" onclick="editor.handle.same();return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 _drag-btn-4 icon2-append"></button></li>' +	
							'<li><button title="'+ msg_msg('paragraph') +'" onclick="editor.handle.paragma(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 _drag-btn-4 icon2-p-before"></button></li>' +	
							'<li><button title="'+ msg_msg('box') +'" onclick="editor.handle.div(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 _drag-btn-4 icon2-div-before"></button></li>' +	
							'<li><button title="'+ msg_msg('image') +'" onclick="editor.handle.img(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-img"></button></li>' +	
							'<li><button title="'+ msg_msg('title') +'" onclick="editor.handle.open_son_menu(\'_edit-btn-group-heading2\',jQuery(\'#_edit_btn_plus_out\')[0]);return false" data-alt-no="1" class="edit-btn-8 open-2 _drag-btn-2 _open_son  icon2-h"></button></li>' +	
							'<li><button title="'+ msg_msg('unorder_list') +'" onclick="editor.handle.unlist(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-InsertUnorderedList"></button></li>' +	
							'<li><button title="'+ msg_msg('order_list') +'" onclick="editor.handle.ollist(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-InsertOrderedList"></button></li>' +	
							'<li><button title="'+ msg_msg('table') +'" onclick="editor.handle.table(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-table-class"></button></li>' +	
							'<li><button title="'+ msg_msg('icon') +'" onclick="editor.handle.icon(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-icon"></button></li>' +	
							'<li><button title="'+ msg_msg('button') +'" onclick="editor.handle.button(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-button"></button></li>' +
							'<li><button title="'+ msg_msg('video') +'" onclick="editor.handle.video(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-video"></button></li>' +	
							'<li><button title="'+ msg_msg('map') +'" onclick="editor.handle.map(3);return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-map"></button></li>' +		
						'</ul>' +
					'</div>' +
				'</li>' +					
				
				'<li>' +
					'<button onclick="editor.handle.open_son_menu(\'editMenu-setting-son-copy-paste\',this);return false" title="'+ msg_msg('copy') +' & '+ msg_msg('paste') +'" data-alt-no="1" class="edit-btn-8 open-2 _drag-btn-2 _drag-btn-4 _open_son icon2-copy"></button>' +
					'<div id="editMenu-setting-son-copy-paste" class="editMenu-setting-son _m9editor no">' +
						'<ul>' +						
						'<li><button title="'+ msg_msg('copy') +'" onclick="editor.handle.copy();return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 _drag-btn-4 icon2-copy"></button></li>' +	
						'<li><button title="'+ msg_msg('paste') +'" onclick="editor.handle.paste();return false" data-alt-no="1" class="edit-btn-8  _drag-btn-2 _drag-btn-4 icon2-paste"></button></li>' +
						'</ul>' +
					'</div>' +
				'</li>' +			
								
				'<li><button title="'+ msg_msg('set_type') +'" data-alt-no="1" class="edit-btn-8 open-1 _drag-btn-2 icon2-formatPara"></a></li>' +
				'<li><button id="_edit_btn_resize" title="'+ msg_msg('fix_size') +'" onclick="editor.handle.resize();return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-arrows-alt m9-only-master"></button></li>' +					
				'<li><button alt="'+ msg_msg('set_order') +'" onclick="editor.sortable.set();return false" data-alt-no="1" class="edit-btn-8 _drag-btn-2 _drag-btn-4 icon2-arrow-height m9-only-master"></button></li>' +
				'<li><button title="'+ msg_msg('delete') +'" onclick="editor.handle.del();return false;" data-alt-no="1" class="edit-btn-8 icon2-delete _a_delete_icon"></a></li>' +
				'</ul>' +
				'</div>';

				_html += '<div class="box3">' +
				'<ul>' +								
					'<li><button title="'+msg_msg('new_content')+'" onclick="editor.handle.del_content(\'' + _id + '\');return false;" data-alt-no="1" class="edit-btn-8 icon2-new-content"></button></li>' +	
					'<li><button title="'+msg_msg('tag_setting')+'" onclick="tag_obj.open_window();return false;" data-alt-no="1" class="edit-btn-8 open-1 icon2-tag"></button></li>' +	
				'</ul>' +
				'</div>';
				
				_html += '</div>';
				
				_html += '' +
				'<div id="_edit-btn-group-heading" class="editMenu-setting-son _m9editor no">' +
					'<ul>' +
						'<li><button onclick="editor.handle.heading(1,2);return false;" title="'+ msg_msg('title') +'1" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h1"></button></li>' +	
						'<li><button onclick="editor.handle.heading(2,2);return false;" title="'+ msg_msg('title') +'2" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h2"></button></li>' +	
						'<li><button onclick="editor.handle.heading(3,2);return false;" title="'+ msg_msg('title') +'3" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h3"></button></li>' +	
						'<li><button onclick="editor.handle.heading(4,2);return false;" title="'+ msg_msg('title') +'4" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h4"></button></li>' +	
						'<li><button onclick="editor.handle.heading(5,2);return false;" title="'+ msg_msg('title') +'5" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h5"></button></li>' +																					
					'</ul>' +
				'</div>';

				_html += '' +
				'<div id="_edit-btn-group-heading2" class="editMenu-setting-son _m9editor no">' +
					'<ul>' +
						'<li><button onclick="editor.handle.heading(1,3);return false;" title="'+ msg_msg('title') +'1" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h1"></button></li>' +	
						'<li><button onclick="editor.handle.heading(2,3);return false;" title="'+ msg_msg('title') +'2" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h2"></button></li>' +	
						'<li><button onclick="editor.handle.heading(3,3);return false;" title="'+ msg_msg('title') +'3" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h3"></button></li>' +	
						'<li><button onclick="editor.handle.heading(4,3);return false;" title="'+ msg_msg('title') +'4" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h4"></button></li>' +	
						'<li><button onclick="editor.handle.heading(5,3);return false;" title="'+ msg_msg('title') +'5" data-alt-no="1" class="edit-btn-8 _drag-btn-2 icon2-h5"></button></li>' +																					
					'</ul>' +
				'</div>';

				if (_type == 'master') {	
					edit_window_obj.int(setting["menu"],_html,msg_msg('general_setting'));
				} else {
					_html = '<div id="' + setting["menu"] + '" class="_m9editor">' + _html + '</div>';
					jQuery(_html).insertBefore('._editor-wrap');	
				}

			}
			
		}
		
	}, // int_extend

	mode : {
		
		_mode : '',
				
		get : function() { // 현재 모드 얻어오기
			return this._mode;	
		},
		
		get_class : function(class_name) { // class 명을 다른모드로 변경 (ex) f-large => m-f-large
			return (this._mode != '') ? this._mode +'-' + class_name : class_name;		
		},
				
		adjust_display : function(obj) { // 모드별 display 처리
			
			var _mode = m9_mode_obj.get();
			
			if (_mode != '') {
				var _display = jQuery(obj).css('display');
				var _class = _mode + '-from-display-' + _display;	
				jQuery(obj).addClass(_class);
			}		
		},
		
		// // 모바일 태그적용 ( ex) m-from-bold)
		// bold,italic,underline,strikethrough,superscript,subscript
		// m,e에서만 적용
		adjust_tag : function(obj,_tag) {
			var _mode = m9_mode_obj.get();
			if (_mode != '') {
				jQuery(obj).addClass(_mode + '-from-' + _tag);
			}		
		}
				
	}
	
}; //editor
