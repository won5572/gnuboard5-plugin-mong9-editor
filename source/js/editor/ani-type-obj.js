var ani_type_obj = {

	'possible_type' : { 'google_map' : 1 , 'tab' : 1 },

	'checking' : function(obj) {

		jQuery(obj).find('[data-m9-execute]').each(function() {

			var _ani_types = [];
			var _anis = jQuery(this).attr("data-m9-execute").split(";");

			for (var m=0;m<_anis.length;m++) {
				var prop = m9_get_property(_anis[m]);
				if (ani_type_obj.possible_type[prop[0]]) {
					_ani_types.push(prop);
				}
			}

			for(var i=0;i<_ani_types.length;i++) {
				if (_ani_types[i][0] == "google_map") {			
					M9GOOGLE_MAP.int(this,_ani_types[i],1);					
				} else if (_ani_types[i][0] == "tab") {	
					M9TAB.int(this,_ani_types[i],1);	
				}
			}
		});

	}
		
};
