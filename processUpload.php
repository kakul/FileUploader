<?php
//continue only if $_POST is set and it is a Ajax request
if(isset($_POST) && isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest'){
	
	if(!isset($_FILES['upload']) || !is_uploaded_file($_FILES['upload']['tmp_name'])){
			die('Video file is Missing!'); // output error when above checks fail.
	}
	
	//uploaded file info we need to proceed
	$MB=8*1048576;
	$video_name = $_FILES['upload']['name']; //file name
	$video_size = $_FILES['upload']['size']; //file size
	$video_temp = $_FILES['upload']['tmp_name']; //file temp
	$video_type = $_FILES['upload']['type'];//file type
	$temp_name=substr($video_temp,strrpos($video_temp, '/')+1);
	if($video_size>$MB){
	 	die("Uploaded file is too large");
	}

	chdir('/tmp');
	$info='mediainfo --Inform="Video;%Duration% %Width% %Height%" '.$temp_name;
	$video_info 	= shell_exec($info); //get image size
	if($video_info){
		chdir('../var/www');
		$video_info=explode(" ",$video_info);
		$video_duration   	= intval($video_info[0]);
		$video_width 		= intval($video_info[1]); //image width
		$video_height 		= intval($video_info[2]); //image height
			
		if($video_duration <1000 && $video_duration>20000){
			die("Invalid video duration");
		}
		if($video_width<100 && $video_height<100){
			die("Invalid video dimensions");
		}
		move_uploaded_file($video_temp, 'upload/vids/'.$video_name);
		
	}
	else{
		die('Not a video file');
	}

}

