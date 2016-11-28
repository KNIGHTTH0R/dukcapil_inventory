<?php

include_once APPPATH.'/libraries/html2pdf/html2pdf.class.php';
class GeneratePdf
{
	public function createIt(array $params = array()){
		$result = array();
		/*
		if(file_exists(FCPATH.'assets/laporan/laporan.php'))
			unlink(FCPATH.'assets/laporan/laporan.php');
		
		file_put_contents(FCPATH.'assets/laporan/laporan.php', base64_decode($params['html']));
		*/
		// get the HTML
		//ob_start();
		//include(FCPATH.'assets/laporan/laporan.php');
		//$content = ob_get_clean();
		$content = '';
		$content .= '<style>
						table {

							width: 580px !important;
						}
					</style>'; 

		$content .= base64_decode($params['html']);
		
		try
		{
			$mode = 'P';
			// init HTML2PDF
			$html2pdf = new HTML2PDF($mode, 'A4', 'en', false, 'ISO-8859-15');
			$html2pdf->setDefaultFont('Arial');
			// display the full page
			//$html2pdf->pdf->SetDisplayMode('fullpage');

			// convert
			$html2pdf->writeHTML($content, isset($_GET['vuehtml']));

			// add the automatic index
			//$html2pdf->createIndex('Sommaire', 30, 12, false, true, 2);

			// send the PDF
			$html2pdf->Output(FCPATH.'assets/laporan/'.$params['name'], 'F');
			
			$result['status'] = 'OK';
		}
		catch(HTML2PDF_exception $e) {
			$result['status'] = 'ERR';
			echo $e;
			exit;
		}
		
		return $result;
	}
}