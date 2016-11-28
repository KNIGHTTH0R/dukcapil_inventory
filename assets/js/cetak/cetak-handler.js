
	'use strict';
	
	var Handler = {
		createIt: function(options){
			
			var dataTable;
			
			var handler = {
				_initialize: function(){
					var self = this;
					
				},
				
				_preview: function(){
					var self = this;					
					
					loading('Loading...',1);
					var success = function(response){ 
						if(response.status == 'OK'){
							
							var saldo = response.saldo,
								sLen = saldo.length,
								pengumpulan = response.pengumpulan,
								pLen = pengumpulan.length,
								pendistribusian = response.pendistribusian,
								dLen = pendistribusian.length,
								pengelolaan = response.pengelolaan,
								lLen = pengelolaan.length,
								apbd = response.apbd,
								apbn = response.apbn;
								
							var fitrah = 0,
								infak = 0,
								sosial = 0,
								dana = 0,
								apbda = 0,
								apbna = 0;
							
							var tpl = '<table style="width: 100%;">\
											<thead>\
												<tr>\
													<th colspan="6" align="center">BAZNAS</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="center">ANGGARAN PENGUMPULAN DAN PENDISTRIBUSIAN/PENDAYAGUNAAN ZAKAT</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="center">TAHUN '+$('#year').val()+'</th>\
												</tr>\
												<tr>\
													<th colspan="6">&nbsp;</th>\
												</tr>\
											</thead>\
											<tbody>\
												<tr>\
													<td align="center"><strong>No.</strong></td>\
													<td colspan="3"><strong>URAIAN</strong></td>\
													<td align="center"><strong>Rp</strong></td>\
													<td align="center"><strong>%</strong></td>\
												</tr>\
												<tr>\
													<td align="center">I</td>\
													<td colspan="3">SALDO DANA AWAL TAHUN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
										
										var totalSaldo = 0;
										
										for(var i = 0; i < sLen; i++){
											
											if(saldo[i]['category_id'] == 2)
												fitrah += parseInt(saldo[i]['anggaran']);
											
											if(saldo[i]['category_id'] == 3)
												infak += parseInt(saldo[i]['anggaran']);
											
											if(saldo[i]['category_id'] == 4)
												sosial += parseInt(saldo[i]['anggaran']);
											
											if(saldo[i]['category_id'] == 5)
												dana += parseInt(saldo[i]['anggaran']);
											
											if(saldo[i]['category_id'] == 6)
												apbda += parseInt(saldo[i]['anggaran']);
											
											if(saldo[i]['category_id'] == 7)
												apbna += parseInt(saldo[i]['anggaran']);
											
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+saldo[i]['name']+'</td>\
														<td align="right">'+formatMoney(saldo[i]['anggaran'], 2)+'</td>\
														<td align="center"></td>\
													</tr>';
													
											totalSaldo += parseInt(saldo[i]['anggaran']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah</i></td>\
													<td align="right"><strong>'+formatMoney(totalSaldo, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
												
										tpl += '<tr>\
													<td align="center">II</td>\
													<td colspan="3">PENGUMPULAN / PENERIMAAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
												
										var totalPengumpulan = 0;
										
										for(var i = 0; i < pLen; i++){
											var angg = formatMoney(pengumpulan[i]['anggaran'], 2);
											var sub = pengumpulan[i]['subcategory'];
											
											if(typeof sub != 'undefined')
												angg = '';
											
											if(pengumpulan[i]['category_id'] == 2)
												fitrah += parseInt(pengumpulan[i]['anggaran']);
											
											if(pengumpulan[i]['category_id'] == 3)
												infak += parseInt(pengumpulan[i]['anggaran']);
											
											if(pengumpulan[i]['category_id'] == 4)
												sosial += parseInt(pengumpulan[i]['anggaran']);
											
											if(pengumpulan[i]['category_id'] == 6)
												apbda += parseInt(pengumpulan[i]['anggaran']);
											
											if(pengumpulan[i]['category_id'] == 7)
												apbna += parseInt(pengumpulan[i]['anggaran']);
												
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+pengumpulan[i]['name']+'</td>\
														<td align="right">'+angg+'</td>\
														<td align="center"></td>\
													</tr>';
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length,
													totalSub = 0;
												for(var j = 0; j < iLen; j++){
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td>'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['anggaran'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalSub += parseInt(sub[j]['anggaran']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align=""><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalSub, 2)+'</strong></td>\
														</tr>';
											}
													
											totalPengumpulan += parseInt(pengumpulan[i]['anggaran']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Pengumpulan / Penerimaan</i></td>\
													<td align="right"><strong>'+formatMoney(totalPengumpulan, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
												
										tpl += '<tr>\
													<td align="center">III</td>\
													<td colspan="3">PENDISTRIBUSIAN DAN PENDAYAGUNAAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
												
										var totalPendistribusian = 0;
										
										for(var i = 0; i < dLen; i++){
											var angg = formatMoney(pendistribusian[i]['anggaran'], 2);
											var sub = pendistribusian[i]['subcategory'];
											
											if(typeof sub != 'undefined')
												angg = '';
											
											if(pendistribusian[i]['category_id'] == 2)
												fitrah = fitrah - parseInt(pendistribusian[i]['anggaran']);
											
											if(pendistribusian[i]['category_id'] == 3)
												infak = infak - parseInt(pendistribusian[i]['anggaran']);
											
											if(pendistribusian[i]['category_id'] == 4)
												sosial = sosial - parseInt(pendistribusian[i]['anggaran']);
												
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+pendistribusian[i]['name']+'</td>\
														<td align="right">'+angg+'</td>\
														<td align="center"></td>\
													</tr>';
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length,
													totalSub2 = 0;
												for(var j = 0; j < iLen; j++){
													
													if(sub[j]['subcategory_id'] == 12)
														dana += parseInt(sub[j]['anggaran']);
													
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td>'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['anggaran'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalSub2 += parseInt(sub[j]['anggaran']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align=""><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalSub2, 2)+'</strong></td>\
														</tr>';
											}
													
											totalPendistribusian += parseInt(pendistribusian[i]['anggaran']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Pendistribusian dan Pendayagunaan</i></td>\
													<td align="right"><strong>'+formatMoney(totalPendistribusian, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
										
										tpl += '<tr>\
													<td align="center">IV</td>\
													<td colspan="3">PENGUNAAN DANA PENGELOLAAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
												
										var totalPengelolaan = 0;
										
										for(var i = 0; i < lLen; i++){
											var sub = pengelolaan[i]['subcategory'];
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length;
												for(var j = 0; j < iLen; j++){
													
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td colspan="2">'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['anggaran'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalPengelolaan += parseInt(sub[j]['anggaran']);
												}
												
												dana = dana - totalPengelolaan;
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align="" colspan="2"><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalPengelolaan, 2)+'</strong></td>\
														</tr>\
														<tr>\
															<td colspan="6">&nbsp;</td>\
														</tr>';
											}
										}
							
												
										apbda = apbda - parseInt(apbd.anggaran);
												
										tpl += '<tr>\
													<td align="center">V</td>\
													<td colspan="3">PENGUNAAN DANA APBD</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Penggunaan Dana APBD</i></td>\
													<td align="right"><strong>'+formatMoney(apbd.anggaran, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
												
										apbna = apbna - parseInt(apbn.anggaran);
												
										tpl += '<tr>\
													<td align="center">VI</td>\
													<td colspan="3">PENGUNAAN DANA APBN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Penggunaan Dana APBN</i></td>\
													<td align="right"><strong>'+formatMoney(apbn.anggaran, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
										
										var mal = (totalSaldo + totalSub) - totalSub2;
										var total = mal + fitrah + infak + sosial + dana + apbda + apbna;
										
										tpl += '<tr>\
													<td align="center">VII</td>\
													<td colspan="3">SALDO DANA AKHIR TAHUN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td align="center">1</td>\
													<td colspan="2">Zakat Mal</td>\
													<td align="right"><strong>'+formatMoney(mal, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td align="center">2</td>\
													<td colspan="2">Zakat Fithrah</td>\
													<td align="right"><strong>'+formatMoney(fitrah, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td align="center">3</td>\
													<td colspan="2">Infak-Sedekah</td>\
													<td align="right"><strong>'+formatMoney(infak, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td align="center">4</td>\
													<td colspan="2">Dana Sosial Keagamaan Lainnya</td>\
													<td align="right"><strong>'+formatMoney(sosial, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td align="center">5</td>\
													<td colspan="2">Dana Pengelolaan</td>\
													<td align="right"><strong>'+formatMoney(dana, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td align="center">6</td>\
													<td colspan="2">APBD</td>\
													<td align="right"><strong>'+formatMoney(apbda, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td align="center">7</td>\
													<td colspan="2">APBN</td>\
													<td align="right"><strong>'+formatMoney(apbna, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah</i></td>\
													<td align="right"><strong>'+formatMoney(total, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Mengetahui,</strong></td>\
													<td align="">........, ....</td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Ketua,</strong></td>\
													<td align=""><strong>Wakil Ketua III</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>.........</strong></td>\
													<td align=""><strong>.........</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>';
										
								 tpl += '</tbody>\
										</table>';
										
							$('.preview-container').html(tpl);
							$('.export').show();
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Preview data gagal');
								}
							}else{
								alertMessage('error', 'Preview data gagal');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						year: $('#year').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'cetak/previewAnggaran',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_previewTeller: function(){
					var self = this;					
			
					
					if($('#to').val != 'undefined'){
						var from = $('#from').val().split('-');
						from = from[2];
						
						var to = $('#to').val().split('-');
						to = to[2];
						
						if(to != from){
							alertMessage('error', 'Periode hanya bisa di tahun yang sama');
							return false
						}
					}
					
					loading('Loading...',1);
					
					var success = function(response){ 
						if(response.status == 'OK'){
							
							var saldo = response.saldo,
								sLen = saldo.length,
								penerimaan = response.penerimaan,
								pLen = penerimaan.length,
								penyetoran = response.penyetoran,
								rLen = penyetoran.length;
								
								
							var tpl = '<table style="width: 100%;">\
											<thead>\
												<tr>\
													<th colspan="6" align="center">BAZNAS</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="center">LAPORAN HARIAN TELLER</th>\
												</tr>\
												<tr>\
													<th colspan="6">&nbsp;</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="left">Tanggal : '+$('#from').val()+' / '+$('#to').val()+'</th>\
												</tr>\
												<tr>\
													<th colspan="6">&nbsp;</th>\
												</tr>\
											</thead>\
											<tbody>\
												<tr>\
													<td align="center"><strong>No.</strong></td>\
													<td colspan="3"><strong>URAIAN</strong></td>\
													<td align="center"><strong>Rp</strong></td>\
													<td align="center"><strong>%</strong></td>\
												</tr>\
												<tr>\
													<td align="center">I</td>\
													<td colspan="3">SALDO KAS AWAL</td>\
													<td align="right">'+formatMoney(saldo['nominal'], 2)+'</td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
										
										var totalSaldo = parseInt(saldo['nominal']);
												
										tpl += '<tr>\
													<td align="center">II</td>\
													<td colspan="3">PENERIMAAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
										
										var totalPenerimaan = 0;
										
										for(var i = 0; i < pLen; i++){
											var angg = formatMoney(penerimaan[i]['nominal'], 2);
											var sub = penerimaan[i]['subcategory'];
											
											if(typeof sub != 'undefined')
												angg = '';
												
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+penerimaan[i]['name']+'</td>\
														<td align="right">'+angg+'</td>\
														<td align="center"></td>\
													</tr>';
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length,
													totalSub = 0;
												for(var j = 0; j < iLen; j++){
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td>'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['nominal'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalSub += parseInt(sub[j]['nominal']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align=""><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalSub, 2)+'</strong></td>\
														</tr>';
											}
													
											totalPenerimaan += parseInt(penerimaan[i]['nominal']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Penerimaan</i></td>\
													<td align="right"><strong>'+formatMoney(totalPenerimaan, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
												
										tpl += '<tr>\
													<td align="center">III</td>\
													<td colspan="3">PENYETORAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
												
										var totalPenyetoran = 0;
										
										for(var i = 0; i < rLen; i++){
											var sub = penyetoran[i]['subcategory'];
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length;
												for(var j = 0; j < iLen; j++){
													
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td colspan="2">'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['nominal'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalPenyetoran += parseInt(sub[j]['nominal']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align="" colspan="2"><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalPenyetoran, 2)+'</strong></td>\
														</tr>\
														<tr>\
															<td colspan="6">&nbsp;</td>\
														</tr>';
											}
										}
										
										var total = (totalSaldo + totalPenerimaan) - totalPenyetoran;
										
										tpl += '<tr>\
													<td align="center">IV</td>\
													<td colspan="3">SALDO KAS AKHIR</td>\
													<td align="right"><strong>'+formatMoney(total, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Mengetahui,</strong></td>\
													<td align="">........, ....</td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Direktur/Wakil Ketua III,</strong></td>\
													<td align=""><strong>Teller</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>.........</strong></td>\
													<td align=""><strong>.........</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>';
										
								 tpl += '</tbody>\
										</table>';
							
							$('.preview-container').html(tpl);
							$('.export').show();
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Preview data gagal');
								}
							}else{
								alertMessage('error', 'Preview data gagal');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						from: $('#from').val(),
						to: $('#to').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'cetak/previewTeller',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_previewKasir: function(){
					var self = this;					
			
					
					if($('#to').val != 'undefined'){
						var from = $('#from').val().split('-');
						from = from[2];
						
						var to = $('#to').val().split('-');
						to = to[2];
						
						if(to != from){
							alertMessage('error', 'Periode hanya bisa di tahun yang sama');
							return false
						}
					}
					
					loading('Loading...',1);
					
					var success = function(response){ 
						if(response.status == 'OK'){
							
							var saldo = response.saldo,
								sLen = saldo.length,
								penerimaan = response.penerimaan,
								pLen = penerimaan.length,
								pengeluaran = response.pengeluaran,
								rLen = pengeluaran.length;
								
								
							var tpl = '<table style="width: 100%;">\
											<thead>\
												<tr>\
													<th colspan="6" align="center">BAZNAS</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="center">LAPORAN HARIAN KASIR</th>\
												</tr>\
												<tr>\
													<th colspan="6">&nbsp;</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="left">Tanggal : '+$('#from').val()+' / '+$('#to').val()+'</th>\
												</tr>\
												<tr>\
													<th colspan="6">&nbsp;</th>\
												</tr>\
											</thead>\
											<tbody>\
												<tr>\
													<td align="center"><strong>No.</strong></td>\
													<td colspan="3"><strong>URAIAN</strong></td>\
													<td align="center"><strong>Rp</strong></td>\
													<td align="center"><strong>%</strong></td>\
												</tr>\
												<tr>\
													<td align="center">I</td>\
													<td colspan="3">SALDO KAS AWAL</td>\
													<td align="right">'+formatMoney(saldo['nominal'], 2)+'</td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
										
										var totalSaldo = parseInt(saldo['nominal']);
												
										tpl += '<tr>\
													<td align="center">II</td>\
													<td colspan="3">PENERIMAAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
										
										var totalPenerimaan = 0;
										
										for(var i = 0; i < pLen; i++){
											var angg = formatMoney(penerimaan[i]['nominal'], 2);
											var sub = penerimaan[i]['subcategory'];
											
											if(typeof sub != 'undefined')
												angg = '';
												
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+penerimaan[i]['name']+'</td>\
														<td align="right">'+angg+'</td>\
														<td align="center"></td>\
													</tr>';
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length,
													totalSub = 0;
												for(var j = 0; j < iLen; j++){
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td>'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['nominal'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalSub += parseInt(sub[j]['nominal']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align=""><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalSub, 2)+'</strong></td>\
														</tr>';
											}
													
											totalPenerimaan += parseInt(penerimaan[i]['nominal']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Penerimaan</i></td>\
													<td align="right"><strong>'+formatMoney(totalPenerimaan, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
												
										tpl += '<tr>\
													<td align="center">III</td>\
													<td colspan="3">PENGELUARAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
										
										var totalPengeluaran = 0;
										
										for(var i = 0; i < rLen; i++){
											var angg = formatMoney(pengeluaran[i]['nominal'], 2);
											var sub = pengeluaran[i]['subcategory'];
											
											if(typeof sub != 'undefined')
												angg = '';
												
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+pengeluaran[i]['name']+'</td>\
														<td align="right">'+angg+'</td>\
														<td align="center"></td>\
													</tr>';
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length,
													totalSub = 0;
												for(var j = 0; j < iLen; j++){
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td>'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['nominal'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalSub += parseInt(sub[j]['nominal']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align=""><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalSub, 2)+'</strong></td>\
														</tr>';
											}
													
											totalPengeluaran += parseInt(pengeluaran[i]['nominal']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Pengeluaran</i></td>\
													<td align="right"><strong>'+formatMoney(totalPengeluaran, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
										
										var total = (totalSaldo + totalPenerimaan) - totalPengeluaran;
										
										tpl += '<tr>\
													<td align="center">IV</td>\
													<td colspan="3">SALDO KAS AKHIR</td>\
													<td align="right"><strong>'+formatMoney(total, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Mengetahui,</strong></td>\
													<td align="">........, ....</td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Direktur/Wakil Ketua III,</strong></td>\
													<td align=""><strong>Kasir</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>.........</strong></td>\
													<td align=""><strong>.........</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>';
										
								 tpl += '</tbody>\
										</table>';
							
							$('.preview-container').html(tpl);
							$('.export').show();
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Preview data gagal');
								}
							}else{
								alertMessage('error', 'Preview data gagal');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						from: $('#from').val(),
						to: $('#to').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'cetak/previewKasir',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_previewBank: function(){
					var self = this;					
					
					loading('Loading...',1);
					
					var success = function(response){ 
						if(response.status == 'OK'){
							
							var saldo = response.saldo,
								sLen = saldo.length,
								penerimaan = response.penerimaan,
								pLen = penerimaan.length,
								pengeluaran = response.pengeluaran,
								rLen = pengeluaran.length,
								saldoAkhir = response.saldo_akhir,
								saLen = saldoAkhir.length;
								
								
							var tpl = '<table style="width: 100%;">\
											<thead>\
												<tr>\
													<th colspan="6" align="center">BAZNAS</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="center">LAPORAN PENERIMAAN DAN PENGELUARAN BANK</th>\
												</tr>\
												<tr>\
													<th colspan="6" align="center">BULAN : '+$('#month option:selected').html()+'  '+$('#year').val()+'</th>\
												</tr>\
												<tr>\
													<th colspan="6">&nbsp;</th>\
												</tr>\
											</thead>\
											<tbody>\
												<tr>\
													<td align="center"><strong>No.</strong></td>\
													<td colspan="3"><strong>URAIAN</strong></td>\
													<td align="center"><strong>Rp</strong></td>\
													<td align="center"><strong>%</strong></td>\
												</tr>\
												<tr>\
													<td align="center">I</td>\
													<td colspan="3">SALDO KAS AWAL</td>\
													<td align="right"></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td align="center"></td>\
													<td colspan="3">Saldo awal bank terdiri dari:</td>\
													<td align="right"></td>\
													<td align="center"></td>\
												</tr>';
										
										var totalSaldo = 0										
										
										for(var i = 0; i < sLen; i++){					
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+')</td>\
														<td colspan="2">'+saldo[i]['name']+'</td>\
														<td align="right">'+formatMoney(saldo[i]['nominal'], 2)+'</td>\
														<td align="center"></td>\
													</tr>';
													
											totalSaldo += parseInt(saldo[i]['nominal']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td></td>\
													<td align="" colspan="2"><i>Jumlah</i></td>\
													<td align="right"><strong>'+formatMoney(totalSaldo, 2)+'</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
												
										tpl += '<tr>\
													<td align="center">II</td>\
													<td colspan="3">PENERIMAAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
										
										var totalPenerimaan = 0;
										
										for(var i = 0; i < pLen; i++){
											var angg = formatMoney(penerimaan[i]['nominal'], 2);
											var sub = penerimaan[i]['subcategory'];
											
											if(typeof sub != 'undefined')
												angg = '';
												
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+penerimaan[i]['name']+'</td>\
														<td align="right">'+angg+'</td>\
														<td align="center"></td>\
													</tr>';
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length,
													totalSub = 0;
												for(var j = 0; j < iLen; j++){
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td>'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['nominal'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalSub += parseInt(sub[j]['nominal']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align=""><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalSub, 2)+'</strong></td>\
														</tr>';
											}
													
											totalPenerimaan += parseInt(penerimaan[i]['nominal']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Penerimaan</i></td>\
													<td align="right"><strong>'+formatMoney(totalPenerimaan, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
												
										tpl += '<tr>\
													<td align="center">III</td>\
													<td colspan="3">PENGELUARAN</td>\
													<td align="center"></td>\
													<td align="center"></td>\
												</tr>';
										
										var totalPengeluaran = 0;
										
										for(var i = 0; i < rLen; i++){
											var angg = formatMoney(pengeluaran[i]['nominal'], 2);
											var sub = pengeluaran[i]['subcategory'];
											
											if(typeof sub != 'undefined')
												angg = '';
												
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+'</td>\
														<td colspan="2">'+pengeluaran[i]['name']+'</td>\
														<td align="right">'+angg+'</td>\
														<td align="center"></td>\
													</tr>';
											
											if(typeof sub != 'undefined'){
												var iLen = sub.length,
													totalSub = 0;
												for(var j = 0; j < iLen; j++){
													tpl += '<tr>\
																<td>&nbsp;</td>\
																<td>&nbsp;</td>\
																<td align="center">'+(j+1)+')</td>\
																<td>'+sub[j]['name']+'</td>\
																<td align="right">'+formatMoney(sub[j]['nominal'], 2)+'</td>\
																<td align="center"></td>\
															</tr>';
															
													totalSub += parseInt(sub[j]['nominal']);
												}
												
												tpl += '<tr>\
															<td>&nbsp;</td>\
															<td>&nbsp;</td>\
															<td></td>\
															<td align=""><i>Jumlah</i></td>\
															<td align="right"><strong>'+formatMoney(totalSub, 2)+'</strong></td>\
														</tr>';
											}
													
											totalPengeluaran += parseInt(pengeluaran[i]['nominal']);
										}
										
										tpl += '<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><i>Jumlah Pengeluaran</i></td>\
													<td align="right"><strong>'+formatMoney(totalPengeluaran, 2)+'</strong></td>\
													<td align="center"><strong>100%</strong></td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>';
										
										var totalSaldoAkhir = 0;
										for(var i = 0; i < saLen; i++){	
											totalSaldoAkhir += parseInt(saldoAkhir[i]['nominal']);
										}
										
										tpl += '<tr>\
													<td align="center">IV</td>\
													<td colspan="3">SALDO AKHIR BANK</td>\
													<td align="right"><strong>'+formatMoney(totalSaldoAkhir, 2)+'</strong></td>\
													<td align="center"></td>\
												</tr>\
												<tr>\
													<td align="center"></td>\
													<td colspan="3">Saldo Akhir Bank terdiri atas saldo pada:</td>\
													<td align="right"></td>\
													<td align="center"></td>\
												</tr>';
										
										for(var i = 0; i < saLen; i++){					
											tpl += '<tr>\
														<td>&nbsp;</td>\
														<td align="center">'+(i+1)+')</td>\
														<td colspan="2">'+saldoAkhir[i]['name']+'</td>\
														<td align="right">'+formatMoney(saldoAkhir[i]['nominal'], 2)+'</td>\
														<td align="center"></td>\
													</tr>';
										}
												
										tpl += '<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Mengetahui,</strong></td>\
													<td align="">........, ....</td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>Direktur/Wakil Ketua III,</strong></td>\
													<td align=""><strong>Perbendaharaan</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td colspan="6">&nbsp;</td>\
												</tr>\
												<tr>\
													<td>&nbsp;</td>\
													<td>&nbsp;</td>\
													<td colspan="2"><strong>.........</strong></td>\
													<td align=""><strong>.........</strong></td>\
													<td align="center">&nbsp;</td>\
												</tr>';
										
								 tpl += '</tbody>\
										</table>';
							
							$('.preview-container').html(tpl);
							$('.export').show();
							
						}else{
							if(typeof response.message){
								if(response.message.length > 0){
									alertMessage('error', response.message);
								}else{
									alertMessage('error', 'Preview data gagal');
								}
							}else{
								alertMessage('error', 'Preview data gagal');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						month: $('#month').val(),
						year: $('#year').val()
					}
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'cetak/previewBank',
						postdata: postdata,
						success: success,
						error: error
					});
				},
				
				_base64_encode: function(data) {
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
				},
				
				_createXls: function(type){
					var self = this;
					
					loading('Loading...',1);
					
					var success = function(response){
						if(response.status == 'OK'){
							window.open(options.baseUrl + 'assets/laporan/' + response.name,'_blank');
						}else{
							if(response.message.length > 0){
								alertMessage('error', response.message);
							}else{
								alertMessage('error', 'Request failed');
							}
						}
						
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						type: type,
						html: self._base64_encode($('.preview-container').html())
					}
					
					//console.log(postdata);return false;
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'cetak/create_xls',
						postdata: postdata,
						success: success,
						error: error
					})
				},
				
				_createPdf: function(type){
					var self = this;
					
					loading('Loading...',1);
					
					var success = function(response){
						if(response.status == 'OK'){
							window.open(options.baseUrl + 'assets/laporan/' + response.name,'_blank');
						}else{
							if(response.message.length > 0){
								alertMessage('error', response.message);
							}else{
								alertMessage('error', 'Request failed');
							}
						}
						setTimeout("unloading()",1500);
						setTimeout(function(){
							alertHide();
						}, 1000);
					}
					
					var error = function(response){
						bootbox.alert(response.responseText);
					}
					
					var postdata = {
						type: type,
						html: self._base64_encode($('.preview-container').html())
					}
					
					//console.log(postdata);return false;
					
					LumiRequest.sendApi({
						url: options.baseUrl + 'cetak/create_pdf',
						postdata: postdata,
						success: success,
						error: error
					})
				},
				
				_clickListener: function(){
					var self = this;
					
					$('.excel-btn').on('click', function(){
						self._createXls(options.type);
					});
					
					$('.pdf-btn').on('click', function(){
						self._createPdf(options.type);
					});
					
					$('#form-action').on('submit', function(e){
						e.preventDefault();
						
						if(options.type == 'anggaran')
							self._preview();
						else if(options.type == 'teller')
							self._previewTeller();
						else if(options.type == 'kasir')
							self._previewKasir();
						else if(options.type == 'bank')
							self._previewBank();
						else if(options.type == 'kas')
							self._previewKas();
					});
				},
				
				init: function(){
					var self = this;
					
					self._initialize();
					self._clickListener();
				}
			}
			
			return handler;
		}
	}