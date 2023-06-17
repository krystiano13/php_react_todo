<?php

require_once "database.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


$sql = $db -> prepare('SELECT * FROM tasks');

if($sql -> execute()) {
    $data = $sql -> fetchAll();
    echo json_encode(['data' => $data]);
}
else {
    echo json_encode(['msg' => 'error']);
}


