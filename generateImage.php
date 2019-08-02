<?php error_reporting( E_ALL ); ?>
<?php

header("Content-type: image/png");

$isExport = isset($_GET["export"]) ? $_GET["export"] : '';
if($isExport != ''){
	$outputWidth = 520;
	$outputHeight = 720;
	$outputPath = 'full';
}else{
	$outputWidth = 260;
	$outputHeight = 360;
	$outputPath = 'thumb';
}

$output = imagecreatetruecolor($outputWidth,$outputHeight);
$transparent = imagecolorallocatealpha($output, 255, 255, 255, 127);
imagecolortransparent($output, $transparent);
imagefill($output, 0, 0, $transparent);

function replaceColorsInImage($IMAGE, $COLOR){
	list($r, $g, $b) = sscanf('#'.$COLOR, "#%02x%02x%02x");
	$sx = imagesx($IMAGE);
	$sy = imagesy($IMAGE);
	for ($x = 0; $x < $sx; $x++){
		for ($y = 0; $y < $sy; $y++){
			$c = imagecolorat($IMAGE, $x, $y);
			$a = $c & 0xFF000000;
			$newColor = $a | $r << 16 | $g << 8 | $b;
			imagesetpixel($IMAGE, $x, $y, $newColor );
		}
	}
}
function addLayer($FILENAME, $COLOR = null){
	global $output, $outputWidth, $outputHeight, $outputPath;
	if(file_exists('assets/'.$outputPath.'/'.$FILENAME.'.png')){
		$image = imagecreatefrompng('assets/'.$outputPath.'/'.$FILENAME.'.png');
		if($COLOR != null){
			replaceColorsInImage($image, $COLOR);
		}
		imagecopy($output,$image,0,0,0,0,$outputWidth,$outputHeight);
		imagedestroy($image);
	}
	if(file_exists('assets/'.$outputPath.'/'.$FILENAME.'_outlines.png')){
		$outlines = imagecreatefrompng('assets/'.$outputPath.'/'.$FILENAME.'_outlines.png');
		imagecopy($output,$outlines,0,0,0,0,$outputWidth,$outputHeight);
		imagedestroy($outlines);
	}
}


$headID = isset($_GET["head"]) ? $_GET["head"] : rand(1,6);
$bodyID = isset($_GET["body"]) ? $_GET["body"] : rand(1,2);
$hairID = isset($_GET["hair"]) ? $_GET["hair"] : rand(1,17);
$mouthID = isset($_GET["mouth"]) ? $_GET["mouth"] : rand(1,6);
$eyesID = isset($_GET["eyes"]) ? $_GET["eyes"] : rand(1,10);
$shirtID = isset($_GET["shirt"]) ? $_GET["shirt"] : rand(1,3);
$sleevesID = isset($_GET["sleeves"]) ? $_GET["sleeves"] : rand(1,2);
$pantsID = isset($_GET["pants"]) ? $_GET["pants"] : rand(1,1);
$beltID = isset($_GET["belt"]) ? $_GET["belt"] : rand(1,3);
$glassesID = isset($_GET["glasses"]) ? $_GET["glasses"] : rand(1,8);
$facialHairID = isset($_GET["facialHair"]) ? $_GET["facialHair"] : rand(2,11);
$stubbleID = isset($_GET["stubble"]) ? $_GET["stubble"] : rand(0,1);
$decalID = isset($_GET["decal"]) ? $_GET["decal"] : rand(1,6);
$decorationID = isset($_GET["decoration"]) ? $_GET["decoration"] : rand(1,5);


$skinHex = isset($_GET["skinhex"]) ? $_GET["skinhex"] : 'f0f0f0';
$hairHex = isset($_GET["hairhex"]) ? $_GET["hairhex"] : 'ffff00';
$shirtHex = isset($_GET["shirthex"]) ? $_GET["shirthex"] : 'ff0000';
$pantsHex = isset($_GET["pantshex"]) ? $_GET["pantshex"] : '0000ff';
$decorationHex = isset($_GET["decorationhex"]) ? $_GET["decorationhex"] : '0000ff';

if(file_exists('assets/'.$outputPath.'/Hair'.$hairID.'_back.png')){
	addLayer('Hair'.$hairID.'_back', $hairHex);
}
addLayer('Body'.$bodyID.'_arms', $skinHex);
addLayer('Body'.$bodyID.'_Sleeves'.$sleevesID, $shirtHex);
addLayer('Body'.$bodyID, $skinHex);
addLayer('Body'.$bodyID.'_pants'.$pantsID, $pantsHex);
addLayer('Body'.$bodyID.'_belt'.$beltID);
addLayer('Body'.$bodyID.'_Shirt'.$shirtID, $shirtHex);
addLayer('Head'.$headID, $skinHex);
if($stubbleID == 1){
	addLayer('Head'.$headID.'_stubble');
}
addLayer('Eyes'.$eyesID);
addLayer('Glasses'.$glassesID);
addLayer('Mouth'.$mouthID);
addLayer('FacialHair'.$facialHairID, $hairHex);
addLayer('Hair'.$hairID, $hairHex);
addLayer('Decal'.$decalID);
if($decorationID == 1 || $decorationID == 2 || $decorationID == 5){
	addLayer('Decoration'.$decorationID, $decorationHex);
}else{
	addLayer('Decoration'.$decorationID);
}
$filename = uniqid('image_').'.png';
imagepng($output);
imagedestroy($output);

?>