<?php
require 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $firstName = $request->FirstName;
    $lastName = $request->LastName;
    $email = $request->email;
    $phoneNumer = $request->phoneNumber;
    $service = $request->service;
    $items=$request->Items;
    $instruction=$request->Instruction;
    $Customer_ID = $request->customerID;
    $sql = "INSERT INTO Service_Order (First_Name,Last_Name,Email,Phonenumber,Service,items,instruction,Customer_ID) 
    VALUES ('$firstName','$lastName','$email','$phoneNumer','$service','$items','$instruction','$Customer_ID')";
    $result = mysqli_query($db, $sql);
    if($result) {
        http_response_code(200);
    } else {
        http_response_code(422);
    }
}

?>

