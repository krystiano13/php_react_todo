<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (isset($_POST['task'])) {
  require_once "database.php";
  $task = $_POST['task'];
  $task = htmlentities($task);

  $sql = $db -> prepare("INSERT INTO tasks VALUES(NULL, :task)");
  $sql -> bindValue(':task',$task);
  
  if($sql -> execute()) {
    echo json_encode(['msg' => 'success']);
  }
  else {
    echo json_encode(['msg' => 'error']);
  }
}
  

