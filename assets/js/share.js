
	var BASE_URL = '';
	var share = {
		init: function(baseurl){
			BASE_URL = baseurl;
		}
	}
	var ERROR = 'ruby',
		SUCCESS = 'lime',
		NOTIFIC_TIME = 2000;
		
	var formatMoney = function(n, c, d, t){
	var c = isNaN(c = Math.abs(c)) ? 2 : c, 
		d = d == undefined ? "." : d, 
		t = t == undefined ? "," : t, 
		s = n < 0 ? "-" : "", 
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
		j = (j = i.length) > 3 ? j % 3 : 0;
	   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
	 };
	function isEmail(email){
		var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		return re.test(email);
	}
	function isNumeric(e){
		var key = window.event ? event.keyCode : event.which;
		if (event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 46
		 || event.keyCode == 37 || event.keyCode == 39 || (event.keyCode >= 96 && event.keyCode <= 105)) {
			return true;
		}
		else if ( key < 48 || key > 57 ) {
			return false;
		}
		else return true;
	}
	function notific(type, message){
		var settings = {
			theme: type,
			sticky: 0,
			horizontalEdge: 'top',
			verticalEdge: 'right',
			life: NOTIFIC_TIME
		}		
		$.notific8('zindex', 11500);
		$.notific8(message, settings);
	}
	function base64_encode(data) {
		//  discuss at: http://phpjs.org/functions/base64_encode/
		// original by: Tyler Akins (http://rumkin.com)
		// improved by: Bayron Guevara
		// improved by: Thunder.m
		// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// improved by: Rafal Kukawski (http://kukawski.pl)
		// bugfixed by: Pellentesque Malesuada
		//   example 1: base64_encode('Kevin van Zonneveld');
		//   returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
		//   example 2: base64_encode('a');
		//   returns 2: 'YQ=='

		var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = '',
			tmp_arr = [];
		if (!data) {
			return data;
		}		
		do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);
			bits = o1 << 16 | o2 << 8 | o3;
			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;
			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);
		enc = tmp_arr.join('');
		var r = data.length % 3;		
		return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	}
	function zeroPad(number){
		var str = "" + number;
		var pad = "0000";
		var ans = pad.substring(0, pad.length - str.length) + str;
		return ans;
	}
	function encryptID(id){
		var a = CryptoJS.AES.encrypt(id, KEY, {iv: IV}).toString();
			a = a.replace(/\//gi, '%');
			a = a.replace(/\\/gi, '?');
		
		return encodeURIComponent(a);
	}
	$(document).ready(function(){
		$('.sidebar-toggler').on('click', function(){
			for(var i = 0; i < 2; i++){
				setTimeout(function(){
					$(window).trigger('resize');
				}, 500);
			}
		});
	});