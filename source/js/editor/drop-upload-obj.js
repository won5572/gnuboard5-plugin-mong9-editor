var drop_upload_obj = {

	_taget : null,
	int : function(_obj) {

		if (jQuery('#img_drag_box').length == 0) {

			jQuery('<div id="img_drag_box" style="position:absolute;display:none"><div></div></div>').appendTo('body');

			jQuery('#img_drag_box').on('dragover',function(e) {
				e.stopPropagation();
				e.preventDefault();			
			}).on('drop',function(e) {

				e.stopPropagation();
				e.preventDefault();		

				var _files = [].slice.call(e.originalEvent.dataTransfer.files);

				var files = _files.sort(function(a, b) {  
					var textA = a.name.toLowerCase();  
					var textB = b.name.toLowerCase();  
					return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;  
				});  

				if(files.length < 1) {
					return;
				}

				jQuery('#img_drag_box').css('display','none');

				var node_objs = drop_upload_obj.search_node(drop_upload_obj._target);

				var start_num = 0;

				var img_objs = new Array();
				node_objs.each(function(index) {
					if (this == drop_upload_obj._target) {
						start_num = index;
					}
					img_objs.push(this);
				});

				var reset_order_objs = new Array();
				if (start_num > 0) {
					reset_order_objs = img_objs.splice(start_num,img_objs.length);
					reset_order_objs = reset_order_objs.concat(img_objs);
				} else {
					reset_order_objs = img_objs;
				}

				for (var i = 0; i < files.length;i++) {
					var file_ok = img_obj.upload.file_name_check(files[i]['name']);
					if (!file_ok) {
						return false;
					}
				}

				for (var i = 0; i < files.length;i++) {
					if (reset_order_objs[i]) {
						img_obj._now = reset_order_objs[i];
						img_obj.upload.now = img_obj._now;
						drop_upload_obj.muti_upload(files[i],reset_order_objs[i]);
					}
				}

			});

		}

		jQuery(_obj).on('dragover',function(e) {

			var et = e.target;
			var J_et = jQuery(et);
			var _tag = J_et.prop('tagName');

			if (_tag.toLowerCase() == 'img') { // 이미지 일때만 처리

				drop_upload_obj._target = J_et[0];
				var modal_img = J_et;
				if (J_et.parents('.m9-img-box').length > 0) {
					modal_img = J_et.parents('.m9-img-box');
				}

				var _w = modal_img.css('width');
				var _h = modal_img.css('height');
				var _l2 = m9_getRealOffsetLeft(modal_img[0]);
				var _t2 = m9_getRealOffsetTop(modal_img[0]);

				jQuery('#img_drag_box').css({'width':_w,'height':_h,'top':_t2,'left':_l2,'display':''});

			} else {
				jQuery('#img_drag_box').css('display','none');
			}

		});

	},

	search_node : function(_obj) {

		var obj = jQuery(_obj);

		var _parent_obj = obj.parents('._one-row');
		var _id = _parent_obj.attr('id');
		if (!_id) {
			_id = m9_random_id(_parent_obj[0]);
		}

		var nodes_tag = new Array();
		obj.parentsUntil('#'+_id).each(function() {
			var _tag = jQuery(this).prop('tagName');
			nodes_tag.push(_tag);
		});

		var nodes_reverse = nodes_tag.reverse();		
		var selector = '#'+_id + '>' + nodes_reverse.join('>') + '>img';
		return jQuery(selector);

	},
	
	muti_upload : function(files,obj) { // 파일 멀티 업로드

		var data = new FormData();
		data.append('img_upload_file',files);

		jQuery.ajax({
			url : img_obj.settings['upload_url'],
			method : 'post',
			enctype : 'multipart/form-data',
			data : data,
			processData : false,
			contentType : false,
			success : function(res) {
				drop_upload_obj.upload_callback(res,obj);
			},
			error : function(res) {
				var _str = 'Upload Error' + ((res.statusText && res.statusText != '') ? ' : ' + res.statusText : '');
				error_msg(_str,img_obj.upload.now,3000);
			//	img_obj.upload.finish(img_obj.upload.now);
			}
		});

	},
	
	upload_callback : function(res,obj) { // 업로드 후 콜백함수
		img_obj._now = obj;
		img_obj.upload.now = img_obj._now;
		img_obj.upload.completeCallback(res,obj);
	}

}; // drop_upload_obj