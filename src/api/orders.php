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

function getAllOrders($data){
     $sql = "SELECT * FROM Service_Order";
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

function addNewOrder($inputData) {
    $Customer_ID = ($inputData[1] -> Customer_ID);
    if(!$Customer_ID) {
        $Customer_ID = 0;
    }
    $Email = $inputData[1] -> Email;
    $First_Name = $inputData[1] -> First_Name;
    $Last_Name = $inputData[1] -> Last_Name;
    $instruction = $inputData[1] -> instruction;
    $items = $inputData[1] -> items;
    $Phonenumber = ($inputData[1] -> Phonenumber);
    if(!$Phonenumber) {
        $Phonenumber = 0000000001;
    }
    $Service = $inputData[1] -> Service;
    $sql = "INSERT INTO Service_Order (Customer_ID, Email, First_Name, Last_Name, instruction, items, Phonenumber, Service)
    VALUES($Customer_ID, '$Email', '$First_Name', '$Last_Name', '$instruction', $items, $Phonenumber, '$Service')";
     $result = mysqli_query($inputData[0], $sql);
     if($result){
         echo "Order Placed Successfully";
         http_response_code(200);
     } else {
         echo "Failed to add new order. Please contact the Administrator";
         http_response_code(422);
     }
}

function deleteOrder($inputData) {
    $Order_ID = $inputData[1] -> Order_ID;
    $sql = "DELETE FROM Service_Order WHERE Order_ID = $Order_ID";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "Order Removed Successfully";
        http_response_code(200);
    } else {
        echo "Failed to remove the order. Please contact the Administrator";
        http_response_code(422);
    } 
}

function alterRecord($inputData) {
    $Email = $inputData[1] -> Email;
    $First_Name = $inputData[1] -> First_Name;
    $Last_Name = $inputData[1] -> Last_Name;
    $instruction = $inputData[1] -> instruction;
    $items = $inputData[1] -> items;
    $Phonenumber = $inputData[1] -> Phonenumber;
    $Service = $inputData[1] -> Service;
    $Order_ID = $inputData[1] -> Order_ID;
    $sql = "UPDATE Service_Order Set Email = '$Email' ,First_Name = '$First_Name' ,Last_Name = '$Last_Name', instruction = '$instruction',
    items = $items, Phonenumber = $Phonenumber, Service = '$Service' WHERE Order_ID = $Order_ID";
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