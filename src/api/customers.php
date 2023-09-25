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

function getAllCustomers($data){
     $sql = "SELECT * FROM Customer";
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

function addNewCustomer($inputData) {
    $First_Name = $request->First_Name;
    $Last_Name = $request->Last_Name;
    $Email = $request->Email;
    if(!filter_var($Email,FILTER_VALIDATE_EMAIL)){
        http_response_code(401);
        return;
    }
    $User_Type = $request->User_Type;
    $ID = (int)((rand() * rand())/rand());
    $sql = "INSERT INTO Customer (First_Name,Last_Name,Email,User_Type,ID) VALUES ('$First_Name','$Last_Name','$Email','$User_Type',$ID)";
    $result = mysqli_query($db, $sql);
     if($result){
         echo "Customer added Successfully";
         http_response_code(200);
     } else {
         echo "Failed to add new Customer. Please contact the Administrator";
         http_response_code(422);
     }
}

function deleteCustomer($inputData) {
    $ID = $inputData[1] -> ID;
    $sql = "DELETE FROM Customer WHERE ID = $ID";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "Customer Removed Successfully";
        http_response_code(200);
    } else {
        echo "Failed to remove the Customer. Please contact the Administrator";
        http_response_code(422);
    } 
}

function alterRecord($inputData) {
    $First_Name = $request->First_Name;
    $Last_Name = $request->Last_Name;
    $Email = $request->Email;
    if(!filter_var($Email,FILTER_VALIDATE_EMAIL)){
        http_response_code(401);
        return;
    }
    $User_Type = $request->User_Type;
    $sql = "UPDATE Customer Set Email = '$Email' ,First_Name = '$First_Name' ,Last_Name = '$Last_Name',User_Type = '$User_Type'  WHERE ID = $ID";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "Customer Updated Successfully";
        http_response_code(200);
    } else {
        echo "Failed to update the Customer. Please contact the Administrator";
        http_response_code(422);
    } 
}
?>