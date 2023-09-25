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

function getAllPickup($data){
     $sql = "SELECT * FROM Subscribe_Service";
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

function deletePickup($inputData) {
    $ID = $inputData[1] -> ID;
    $sql = "DELETE FROM Subscribe_Service WHERE ID = $ID";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "TASK Removed Successfully";
        http_response_code(200);
    } else {
        echo "Failed to remove the TASK. Please contact the Administrator";
        http_response_code(422);
    } 
}
?>