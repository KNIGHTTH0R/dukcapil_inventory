
	"use strict";
	
	var BASE_URL = '';
	
	var Base = {
		fetchIt: function(options){
			BASE_URL = options.baseUrl;
		}
	}
	
	var JsonFormatter = {
        stringify: function (cipherParams) {
            // create json object with ciphertext
            var jsonObj = {
                ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)
            };

            // optionally add iv and salt
            if (cipherParams.iv) {
                jsonObj.iv = cipherParams.iv.toString();
            }
            if (cipherParams.salt) {
                jsonObj.s = cipherParams.salt.toString();
            }

            // stringify json object
            return JSON.stringify(jsonObj);
        },

        parse: function (jsonStr) {
            // parse json string
            var jsonObj = JSON.parse(jsonStr);

            // extract ciphertext from json object, and create cipher params object
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(jsonObj.ct)
            });

            // optionally extract iv and salt
            if (jsonObj.iv) {
                cipherParams.iv = CryptoJS.enc.Hex.parse(jsonObj.iv)
            }
            if (jsonObj.s) {
                cipherParams.salt = CryptoJS.enc.Hex.parse(jsonObj.s)
            }

            return cipherParams;
        }
    };
	
	var LumiRequest = {
		sendApi: function(obj){
			if(typeof obj.front != 'undefined')
				return this.fsend(obj);
			else
				return this.send(obj);
		},
		
		fsend: function(obj){
			console.log('postdata', obj.postdata);
			
			var postdata = CryptoJS.AES.encrypt(JSON.stringify(obj.postdata), KEY, {iv: IV});
			var post = {
				data: postdata.toString()
			}
			
			$.ajax({
				url: obj.url,
				type: "POST",
				dataType: "JSON",
				//contentType: "application/json",
				/*
				beforeSend : function(xhr) {
					xhr.setRequestHeader("X-API-KEY", 'f184cf43c04c18737e9f6c9a06734727526dd57d');
				},
				*/
				//data: JSON.stringify(post),
				data: post,
				success: function(response) {
					var data = response.data;
					var decrypted = CryptoJS.AES.decrypt(data.toString(), KEY, {
						iv: IV, 
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
					});	
					
					var pText = decrypted.toString(CryptoJS.enc.Utf8).replace(/\u0000/gi, '');
					var object = $.parseJSON(pText);
					
					console.log('response', object);
					
					obj.success(object);
					
					//obj.success(CryptoJS.enc.Utf8.stringify(decrypted));
				},
				error: function(response) {
					//var response = CryptoJS.enc.Utf8.stringify(decrypted)
					if(typeof response.status != 'undefined'){
						console.log(response);
						if(response.status == 401){
							location.href = BASE_URL;
						}else{
							/*
							var data = response.responseText;
							var parse = $.parseJSON(data);
							
							var decrypted = CryptoJS.AES.decrypt(parse.data.toString(), key, {iv: iv});
							var pText = decrypted.toString(CryptoJS.enc.Utf8).replace(/\u0000/gi, '');
							var object = $.parseJSON(pText);
							*/
							obj.error(response);
						}
					}
				}
			}); 
		},
		
		send: function(obj){
			/*
			console.log('postdata', obj.postdata);
			
			var postdata = CryptoJS.AES.encrypt(JSON.stringify(obj.postdata), KEY, {iv: IV});
			var post = {
				data: postdata.toString()
			}
			*/
			$.ajax({
				url: obj.url,
				type: "POST",
				dataType: "JSON",
				//contentType: "application/json",
				/*
				beforeSend : function(xhr) {
					xhr.setRequestHeader("X-API-KEY", 'f184cf43c04c18737e9f6c9a06734727526dd57d');
				},
				*/
				//data: JSON.stringify(post),
				data: obj.postdata,
				success: function(response) {
					/*
					var data = response.data;
					var decrypted = CryptoJS.AES.decrypt(data.toString(), KEY, {
						iv: IV, 
						mode: CryptoJS.mode.CBC,
						padding: CryptoJS.pad.Pkcs7
					});	
					
					var pText = decrypted.toString(CryptoJS.enc.Utf8).replace(/\u0000/gi, '');
					var object = $.parseJSON(pText);
					
					console.log('response', object);
					*/
					obj.success(response);
					
					//obj.success(CryptoJS.enc.Utf8.stringify(decrypted));
				},
				error: function(response) {
					//var response = CryptoJS.enc.Utf8.stringify(decrypted)
					if(typeof response.status != 'undefined'){
						if(response.status == 401){
							location.href = BASE_URL + 'login/expired'
						}else{
							/*
							var data = response.responseText;
							var parse = $.parseJSON(data);
							
							var decrypted = CryptoJS.AES.decrypt(parse.data.toString(), key, {iv: iv});
							var pText = decrypted.toString(CryptoJS.enc.Utf8).replace(/\u0000/gi, '');
							var object = $.parseJSON(pText);
							*/
							obj.error(response);
						}
					}
				}
			}); 
		}
	}