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
if (isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $firstName = $request->fname;
    $lastName = $request->lname;
    $email = $request->email;
    $phoneNumber = $request->phoneNumber;
    $phoneNumberLength = strlen((string)$phoneNumber);
    $register = $request->register;
    $query=$request->query;
    $sql = "INSERT INTO Register_Incident(First_Name,Last_Name,Email,Phonenumber,register,query)
    VALUES('$firstName','$lastName','$email','$phoneNumber','$register','$query')";
    if(filter_var($email,FILTER_VALIDATE_EMAIL) && $phoneNumberLength<11){
            $result = mysqli_query($db, $sql);
    }
    if($result) {
        $msg =  "
        <HTML><HEAD>Instawash</HEAD>
        <BODY>
        <p>
        Hello $firstName $lastName, <br /> Your Request has been succesfully Submitted <br /> $query <br /> 
	    Our Representatives will be in touch with you with in 24 hours.
		Thanks,<br />InstaWash Team.
        </p>
        </BODY>
        </HTML>";
        $mail = new PHPMailer;
        $mail->isSMTP();                                     
        $mail->Host = 'smtp.sendgrid.net'; 
        $mail->SMTPAuth = True;                                    
        $mail->SMTPSecure = 'TLS';    
        $mail->Username = 'apikey';
        $mail->Password = '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';                       
        $mail->Port = 25;                                   
        $mail->setFrom('nxs4184@mavs.uta.edu', 'Instawash Inc.');
        $mail->addAddress($email);
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