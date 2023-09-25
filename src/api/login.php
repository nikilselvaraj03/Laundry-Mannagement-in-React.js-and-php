<?php
require 'connect.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
$postdata = file_get_contents("php://input");
if(isset($postdata) && !empty($postdata)){
    $request = json_decode($postdata);
    $email = $request->email;
    if(!filter_var($email,FILTER_VALIDATE_EMAIL)){
        http_response_code(401);
        return;
    }
    $password = $request->password;
    $sql_Customer = "SELECT First_Name, Last_Name, User_Type, ID, Email,Password FROM Customer
    WHERE Email = '$email'";
    $result = mysqli_query($db, $sql_Customer);
    if($result) {
        while($r = mysqli_fetch_assoc($result)) {
            $rows = $r;
        }
    }
    if($rows && password_verify($password,$rows['Password'])){
        $rows['Password'] = '';
        echo json_encode($rows);
    }
    else{
        $sql_Personel = "SELECT First_Name, Last_Name, User_Type, ID, Email, Password FROM Personel
        WHERE Email = '$email'";
        $result_row = mysqli_query($db, $sql_Personel);
        if($result_row) {
            while($r = mysqli_fetch_assoc($result_row)) {
                $row = $r;
            }
        }
        if($row && password_verify(`$password`,$row['Password'])){
            $row['Password'] = '';
            echo json_encode($row);
        } else {
        http_response_code(409); }
    }
         
}
?> 