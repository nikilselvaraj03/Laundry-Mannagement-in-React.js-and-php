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

function getAllEmployee($data){
    $sql = "SELECT * FROM Personel WHERE User_Type='Employee'";
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

function addNewEmployee($inputData) {
    $First_Name = $request->First_Name;
    $Last_Name = $request->Last_Name;
    $Email = $request->Email;
    if(!filter_var($Email,FILTER_VALIDATE_EMAIL)){
        http_response_code(401);
        return;
    }
    $User_Type = $request->User_Type;
    $ID = (int)((rand() * rand())/rand());
    $sql = "INSERT INTO Personel (First_Name,Last_Name,Email,User_Type,ID) VALUES ('$First_Name','$Last_Name','$Email','$User_Type',$ID)";
    $result = mysqli_query($db, $sql);
     if($result){
         echo "Employee added Successfully";
         http_response_code(200);
     } else {
         echo "Failed to add new Employee. Please contact the Administrator";
         http_response_code(422);
     }
}

function deleteEmployee($inputData) {
    $ID = $inputData[1] -> ID;
    $sql = "DELETE FROM Personel WHERE ID = $ID";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "Employee Removed Successfully";
        http_response_code(200);
    } else {
        echo "Failed to remove the Employee. Please contact the Administrator";
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
    $sql = "UPDATE Personel Set Email = '$Email' ,First_Name = '$First_Name' ,Last_Name = '$Last_Name',User_Type = '$User_Type'  WHERE ID = $ID";
    $result = mysqli_query($inputData[0], $sql);
    if($result){
        echo "Employee Updated Successfully";
        http_response_code(200);
    } else {
        echo "Failed to update the Employee. Please contact the Administrator";
        http_response_code(422);
    } 
}
?>