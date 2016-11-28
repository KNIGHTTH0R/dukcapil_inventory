<?php if( ! defined('BASEPATH') ) exit( 'No direct script access allowed' );

if ( ! function_exists('stringReplacer'))
{
	/**
	* Replace String by given array params
	* eq:
	*     $value = "my name is {0}. I want to {1}";
	*     $replacements = array("Adji","Eat");  
	*     stringReplacer($value, $replacements);
	*     
	* result: "my name is Adji. I want to Eat"
	*
	*/
	
	function stringReplacer($value, $strReplaces=array()){
		if ($strReplaces != null){
			$countArray = count($strReplaces);
			if ($countArray > 0){
				$i = 0;
				foreach ($strReplaces as $strReplace) {
					$value = str_replace("{".$i."}",$strReplace, $value);
					$i++;
				}
			}

		}

		return $value;
	}
}
