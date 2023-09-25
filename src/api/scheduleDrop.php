<?php
require 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $firstName = $request->fname;
    $lastName = $request->lname;
    if(filter_var($request->email,FILTER_VALIDATE_EMAIL)){
        $email = $request -> email;
    }
    // $email = $request->email;
    $phoneNumber = $request->phoneNumber;
    $service = $request->service;
    $date = $request->date;
    $time = $request->time;
    $cust_ID=$request->customer_ID;
    $sql = "INSERT INTO Schedule_Drop(First_Name,Last_Name,Email,Phonenumber,service,date,time,customer_ID)
    VALUES('$firstName','$lastName','$email','$phoneNumber','$service','$date','$time','$cust_ID')";
    $result = mysqli_query($db, $sql);
    if($result) {
        http_response_code(200);
    } else {
        http_response_code(422);
    }
}
?>