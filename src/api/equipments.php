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

function getAllEquipments($data){
     $sql = "SELECT * FROM Equipment";
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

function addNewEquipment($inputData) {
    $Order_ID = ($inputData[1] -> Order_ID);
    if(!$Order_ID) {
        $Order_ID = 0;
    }
    $Equipment_Type = $inputData[1] -> Equipment_Type;
    $Model_No = $inputData[1] -> Model_No;
    $Brand_Name = $inputData[1] -> Brand_Name;
    $Load_Capacity = ($inputData[1] -> Load_Capacity);
    if(!$Load_Capacity) {
        $Load_Capacity = 0;
    }
    $Status = $inputData[1] -> Status;
    $sql = "INSERT INTO Equipment (Order_ID, Equipment_Type, Model_No, Brand_Name, Load_Capacity, Status)
    VALUES($Order_ID, '$Equipment_Type', '$Model_No', '$Brand_Name', $Load_Capacity, '$Status')";
     $result = mysqli_query($inputData[0], $sql);
     if($result){
         echo "Order Placed Successfully";
         http_response_code(200);
     } else {
         echo "Failed to add new order. Please contact the Administrator";
         http_response_code(422);
     }
}

function deleteEquipment($inputData) {
    $ID = $inputData[1] -> ID;
    $sql = "DELETE FROM Equipment WHERE ID = $ID";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "Equipment Removed Successfully";
        http_response_code(200);
    } else {
        echo "Failed to remove the Equipment. Please contact the Administrator";
        http_response_code(422);
    } 
}

function alterRecord($inputData) {
    $Order_ID = ($inputData[1] -> Order_ID);
    if(!$Order_ID) {
        $Order_ID = 0;
    }
    $Equipment_Type = $inputData[1] -> Equipment_Type;
    $Model_No = $inputData[1] -> Model_No;
    $Brand_Name = $inputData[1] -> Brand_Name;
    $Load_Capacity = ($inputData[1] -> Load_Capacity);
    if(!$Load_Capacity) {
        $Load_Capacity = 0;
    }
    $Status = $inputData[1] -> Status;
    $ID = $inputData[1] -> ID;
    $sql = "UPDATE Equipment Set Order_ID  = $Order_ID ,Equipment_Type = '$Equipment_Type' ,Model_No = '$Model_No', Brand_Name = '$Brand_Name',
    Load_Capacity  = $Load_Capacity , Status = '$Status' WHERE ID = $ID";
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