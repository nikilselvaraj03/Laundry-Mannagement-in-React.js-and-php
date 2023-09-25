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
    $email = $request->email;
    $phoneNumber = $request->phoneNumber;
    $subscribe = $request->subscribe;
    $plan = $request->plan;
    $day = $request->day;
    $address = $request->address;
    $city = $request->city;
    $State = $request->State;
    // $cust_ID=$request->customerID;
    $sql = "INSERT INTO Subscribe_Service(First_Name,Last_Name,Email,Phonenumber,subscribe,plan,day,address,city,State)
    VALUES('$firstName','$lastName','$email','$phoneNumber','$subscribe','$plan','$day','$address','$city','$State')";
    $result = mysqli_query($db, $sql);
    if($result) {
        http_response_code(200);
    } else {
        http_response_code(422);
    }
}
?>