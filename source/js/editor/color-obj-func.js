var color_obj_func = {

	RGB2HEX : function(a) {
		if (a == '') { return ''; }
		if (a.match(/^#/)) { return a; }
		a = a.toLowerCase();
		a = a.replace(/ /g,""); // 공백치환		
		if (a.match(/^rgba\(/)) { return a; }
		if (a.match(/^[A-Za-z_]+$/)) { a = this._get_color_name(a); }
		a = a.replace(/^rgb\(/,""); // 공백치환
		a = a.replace(/\)$/,""); // 공백치환
		b = a.split(",");
		return this.RGB2HEX2(b);
	},
	RGB2HEX2 : function(a) {
		var c = "#";
		for (var i=0;i<a.length;i++) { c += this._dec2hex(a[i]); }
		return c;		
	},
	HEX2RGBA : function(a,_opacity) { // #ffffff ↔ '255,255,255' 문자 리턴
		if (a.toLowerCase().match(/^rgba\(/)) { return a; }					
		var b = this.HEX2RGB2(a);		
		return ("rgba(" + b.join(",") + ","+_opacity+")");
	},	
	HEX2RGB : function(a) { // #ffffff ↔ '255,255,255' 문자 리턴
		if (a.toLowerCase().match(/^rgb\(/)) { return a; }					
		var b = this.HEX2RGB2(a);		
		return ("rgb(" + b.join(",") + ")");
	},	
	HEX2RGB2 : function(a) { // #ffffff ↔ (255,255,255) 배열 리턴			
		a = a.replace(/^#/,""); // #치환
		if (a.length == 3) {
			var cc = a.split("");
			a = cc[0] + cc[0] + cc[1] + cc[1] + cc[2] + cc[2];
		}		
		var b = [a.substr(0,2),a.substr(2,2),a.substr(4,2)];
		var c = [];
		for (var i=0;i<b.length;i++) { c.push(this._hex2dec(b[i])); }
		return c;
	},
	_T	:	"0123456789abcdef",	
	_dec2hex : function(i) { //255 ↔ ff
		return (this._T.charAt(i>>4)+this._T.charAt(i%16));	
	},
	_hex2dec : function(i) { //ff ↔ 255
		var t;
		while (i.toString().length < 2) { i = "0" + i; }
		i = i.toUpperCase();
		if(!i.match(/[^0-9a-fA-F]/i)) {	t = parseInt(i,16); }
		return t;
	},	
	'_get_color_name' : function(a) {
		var _temp = jQuery('<span></span>');
		_temp.css('background-color',a);
		a = _temp.css('background-color');
		_temp.remove();
		return a;
	},

	// 2개의 색상(C1,C2)의 단계를 (unit)로 나눈 배열생성 후 그 이름 리턴
	'color_step' : function(C1,C2,Dstep) {

		if (!Dstep) { Dstep = 5; }
		C1 = C1.toLowerCase();
		C2 = C2.toLowerCase();
		var u1 = C1.replace(/^#/,""); // 치환
		var u2 = C2.replace(/^#/,""); // 치환
		
		var unit = Dstep;
		var a1 = this.HEX2RGB2(C1);	// 시작
		var a2 = this.HEX2RGB2(C2);	// 종착

		var b = []; // 증/감소값
		for (var i=0;i<3;i++) {
			b[i] = Math.floor((a2[i] - a1[i]) / unit);
			if (b[i] > 0) { b[i]++; } else { b[i]--; }
		}

		var d = [];
		d.push(C1);
		for (var i=0;i<unit-1;i++) {
			var e = [];
			for (var j=0;j<3;j++) {
				if (!e[j]) { e[j] = []; }
				var v = a1[j] + (b[j] * i);			
				if (b[j] < 0) { // -로 진행
					if (v < a2[j]) { v = a2[j]; }			
				} else {
					if (v > a2[j]) { v = a2[j]; }				
				}
				e[j].push(v);
			}	
			var Ccolor = this.RGB2HEX2(e);
			d[i] = Ccolor;
		}
		d.push(C2);
		
		return d;

	}
	
}; // color_obj_func