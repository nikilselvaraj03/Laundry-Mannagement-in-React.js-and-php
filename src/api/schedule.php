<?php
require 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$requestdata = json_decode(file_get_contents("php://input"));
if(isset($requestdata)){
    call_user_func($requestdata -> Function,[$db,($requestdata -> Data)]);
}
function getAllschedule($data){
    $sql = "SELECT * FROM Schedule_Drop";
    $result = mysqli_query($data[0], $sql);
    if($result){
         $rows = array();
        while($r = mysqli_fetch_assoc($result)) {
             $rows[] = $r;
        }
      echo json_encode($rows);
    } else {
        http_response_code(422);
    }
}
function alterRecord($inputData) {

    $Email = $inputData[1] -> Email;
    $First_Name = $inputData[1] -> First_Name;
    $Last_Name = $inputData[1] -> Last_Name;
    $Phonenumber = $inputData[1] -> Phonenumber;
    $Service = $inputData[1] -> service;
    $time = $inputData[1]->time;
    $date = $inputData[1]->date;
    $cust_ID=$inputData[1]->customer_ID;    
    $sql = "UPDATE Schedule_Drop Set Email = '$Email' ,First_Name = '$First_Name' ,Last_Name = '$Last_Name',
    Phonenumber = $Phonenumber, service = '$Service', date='$date', time='$time' WHERE Phonenumber = $Phonenumber";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "Order Updated Successfully";
        http_response_code(200);
    } else {
        echo "Failed to update the order. Please contact the Administrator";
        http_response_code(422);
    } 
}
?>