var html_info = {
	'p' : '<p>'+ msg_msg('P') +'(P)</p>',
	'div' : '<div>'+ msg_msg('DIV') +'(DIV)</div>',
	'img' : '<img src="//image.mong9.com/etc_img/etc/img.png" alt="" class="m9-fullimg" />',
	'icon' : '<i class="bi bi-check-square-fill"><i>&nbsp;</i></i>',
	'button' : '<a class="m9-btn">Button</a>',
	'video' : '<div class="m9-video-canvas-16x9"><div><iframe src="//www.youtube.com/embed/P5yHEKqx86U?rel=0" frameborder="0" allowfullscreen></iframe></div></div>',
	'map' : '<div data-m9-execute="google_map({\'x\':\'126.9753042\',\'y\':\'37.5599416\',\'zoom\':\'16\',\'address\':\'Address\',title:\'Company\'})" class="inline-block m9-map-canvas m9-google_map _not _aspectAll"></div>',
	'unlist' : '<ul class="m9-list-style-1">' + 
		'<li>Used to enter an unordered list.</li>' +
		'<li>Used to enter an unordered list.</li>' +
		'<li>Used to enter an unordered list.</li>' +
		'<li>Used to enter an unordered list.</li>' +
		'</ul>',
	'ollist' : '<ol class="m9-list-style-1">' + 
		'<li>Used to enter an ordered list.</li>' +
		'<li>Used to enter an ordered list.</li>' +
		'<li>Used to enter an ordered list.</li>' +
		'<li>Used to enter an ordered list.</li>' +
		'</ol>',
	'table' : '<table summary="" class="m9-table-1">' +
		'<caption></caption>' +
		'<thead>' +
		'<tr>' +
		'<th scope="col">Title</th>' +
		'<th scope="col">Title</th>' +
		'<th scope="col">Title</th>' +
		'<th scope="col">Title</th>' +
		'</tr>' +
		'</thead>' +
		'<tbody>' +
		'<tr>' +
		'<th scope="row">Content</th>' +
		'<td>Content</td>' +
		'<td>Content</td>' +
		'<td>Content</td>' +
		'</tr>' +
		'<tr>' +
		'<th scope="row">Content</th>' +
		'<td>Content</td>' +
		'<td>Content</td>' +
		'<td>Content</td>' +
		'</tr>' +
		'</tbody>' +
		'<tfoot>' +
		'<tr>' +
		'<th scope="row">Content</th>' +
		'<td>Content</td>' +
		'<td>Content</td>' +
		'<td>Content</td>' +
		'</tr>' +
		'</tfoot>' +
		'</table>',
	'h1' : '<h1 class="m9-h1">'+ msg_msg('HEADING') +'1(H1)</h1>',
	'h2' : '<h2 class="m9-h2">'+ msg_msg('HEADING') +'2(H2)</h2>',
	'h3' : '<h3 class="m9-h3">'+ msg_msg('HEADING') +'3(H3)</h3>',
	'h4' : '<h4 class="m9-h4">'+ msg_msg('HEADING') +'4(H4)</h4>',
	'h5' : '<h5 class="m9-h5">'+ msg_msg('HEADING') +'5(H5)</h5>',
	'h6' : '<h6 class="m9-h6">'+ msg_msg('HEADING') +'6(H6)</h6>'
};

var style_info = {

	'f_text_decoration' : {
		'keys' : ['m9-text-decoration-1','m9-text-decoration-2','m9-text-decoration-3'],		
		'values' : ['U1','U2','U3']
	},		
	'f_color' : {
		'keys' : ['m9-font-color-1','m9-font-color-2','m9-font-color-3','m9-font-color-4','m9-font-color-5'],		
		'values' : ['fc1','fc2','fc3','fc4','fc5']
	},	
	'f_strong' : {
		'keys' : ['m9-strong-1','m9-strong-2','m9-strong-3'],		
		'values' : ['fs1','fs2','fs3']
	},	
	'font_size' : {
		'keys' : ['m9-f-xxxsmall','m9-f-xxsmall','m9-f-xsmall','m9-f-small','m9-f-size','m9-f-large','m9-f-xlarge','m9-f-xxlarge','m9-f-xxxlarge','m9-f-big','m9-f-huge'],		
		'values' : ['s3','s2','s1','S','M','L','x1','x2','x3','big','huge']
	},
	'line_height' : {
		'keys' : ['line-height-100','line-height-110','line-height-120','line-height-140','line-height-160','line-height-170','line-height-200'],		
		'values' : ['1.0','1.1','1.2','1.4','1.6','1.7','2.0']
	},	
	'border_style' : {
		'keys' : ['solid','dotted','dashed','double','groove','ridge','inset','outset'],		
		'values' : ['solid','dotted','dashed','double','groove','ridge','inset','outset']
	},
		
	'box_style' : {
		'keys' : ['m9-box-style-1','m9-box-style-2','m9-box-style-3','m9-box-style-4','m9-box-style-5','m9-box-style-6','m9-box-style-7']
	},
	'box_pattern' : {
		'keys' : ['m9-box-pattern-1','m9-box-pattern-2','m9-box-pattern-3','m9-box-pattern-4','m9-box-pattern-5','m9-box-pattern-6','m9-box-pattern-7']
	},
	'box_color' : {
		'keys' : ['m9-black','m9-grey','m9-light-grey','m9-light-blue','m9-yellow','m9-blue','m9-gold','m9-green','m9-olive-green','m9-orange','m9-purple','m9-red','m9-turquoiseblue','m9-violet','m9-deepblue','m9-teal','m9-mauve','m9-pearl','m9-steelblue','m9-coffee','m9-coral','m9-crimson','m9-hotpink','m9-indianred','m9-aqua','m9-white','m9-grey2']
	},
	'box_round' : {
		'keys' : ['m9-round-0','m9-round-1','m9-round-2','m9-round-3','m9-round-4','m9-round-5','m9-round-6','m9-round-7','m9-round-8','m9-round-9','m9-round-10','m9-round-11','m9-round-12','m9-round-13','m9-round-14','m9-round-15','m9-round-16','m9-round-circle','m9-circle']
	},
	'text_shadow' : {			
		'keys' : ['m9-text-shadow-1','m9-text-shadow-2','m9-text-shadow-3','m9-text-shadow-4','m9-text-shadow-5']
	},
	'padding' : {
		'keys' : ['m9-padding-0','m9-padding-1','m9-padding-2','m9-padding-3','m9-padding-width-0','m9-padding-width-1','m9-padding-width-2','m9-padding-width-3','m9-padding-height-0','m9-padding-height-1','m9-padding-height-2','m9-padding-height-3','m9-padding-top-0','m9-padding-top-1','m9-padding-top-2','m9-padding-top-3','m9-padding-right-0','m9-padding-right-1','m9-padding-right-2','m9-padding-right-3','m9-padding-bottom-0','m9-padding-bottom-1','m9-padding-bottom-2','m9-padding-bottom-3','m9-padding-left-0','m9-padding-left-1','m9-padding-left-2','m9-padding-left-3'],
		'values' : ['0','1','2','3','W0','W1','W2','W3','H0','H1','H2','H3','T0','T1','T2','T3','R0','R1','R2','R3','B0','B1','B2','B3','L0','L1','L2','L3']
	},
	'margin' : {
		'keys' : ['m9-margin-0','m9-margin-1','m9-margin-2','m9-margin-3','m9-margin-width-0','m9-margin-width-1','m9-margin-width-2','m9-margin-width-3','m9-margin-height-0','m9-margin-height-1','m9-margin-height-2','m9-margin-height-3','m9-margin-top-0','m9-margin-top-1','m9-margin-top-2','m9-margin-top-3','m9-margin-right-0','m9-margin-right-1','m9-margin-right-2','m9-margin-right-3','m9-margin-bottom-0','m9-margin-bottom-1','m9-margin-bottom-2','m9-margin-bottom-3','m9-margin-left-0','m9-margin-left-1','m9-margin-left-2','m9-margin-left-3'],
		'values' : ['0','1','2','3','W0','W1','W2','W3','H0','H1','H2','H3','T0','T1','T2','T3','R0','R1','R2','R3','B0','B1','B2','B3','L0','L1','L2','L3']
	}
};

var tab_get = {
	'style' : ['box_style','box_pattern','box_color','box_round','text_shadow'],	
	'font' : ['font_family','color','font_weight','font_style','text_decoration','line_through','font_size','line_height','word_spacing','letter_spacing','f_strong','f_text_decoration','f_color'], // 'f_style'
	'border' : ['background_color','border','border_radius'],
	'padding_margin' : ['padding','margin'],
	'align' : ['text_align','vertical_align','float']
};

var m9evt = false;