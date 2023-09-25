<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'connect.php';
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
	$request = json_decode($postdata);
	$firstName = $request->fname;
	// $to = "sujitrajt@gmail.com";
    $Email = $request -> email;
	$query = $request -> query;
	$lastName = $request -> lname;
	$phoneNumber = $request -> PhoneNumber;
    $phoneNumberLength = strlen((string)$phoneNumber);
	$sql = "INSERT INTO Contact_Us(First_Name,Last_Name,Email,Phonenumber,Query) 
	VALUES('$firstName','$lastName','$Email','$phoneNumber','$query')";
    if(filter_var($Email,FILTER_VALIDATE_EMAIL) && $phoneNumberLength<11){
        $result = mysqli_query($db, $sql);
    }
		if($result) {
        $msg =  "
        <HTML><HEAD>Instawash</HEAD>
        <BODY>
        <p>
        Hello Admin, <br /> $firstName $lastName has Contacted Instawash with following message <br /> $query <br /> 
		Please respond back within 24 hours
		Thanks,<br />InstaWash Team.
        </p>
        </BODY>
        </HTML>";
        $mail = new PHPMailer;
		// echo "success";
        $mail->isSMTP();                                     
        $mail->Host = 'smtp.sendgrid.net'; 
        $mail->SMTPAuth = True;                                    
        $mail->SMTPSecure = 'TLS';    
        $mail->Username = 'apikey';
        $mail->Password = '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';                       
        $mail->Port = 25;                                   
        $mail->setFrom('nxs4184@mavs.uta.edu', 'Instawash Inc.');
        $mail->addAddress($Email);
        $mail->addReplyTo('nxs4184@mavs.uta.edu', 'Support');
        $mail->isHTML(true);                                 
        $mail->Subject = 'Thanks for Contacting Instawash';
        $mail->Body = $msg;
        $mail->AltBody = 'Please Upgrade Your Browser to view this email';
        if(!$mail->send()) {
        echo "Unable to send email"; 
		exit;
	}
        http_response_code(201);
    }
    else{
         http_response_code(422); 
    	}
	}
?>