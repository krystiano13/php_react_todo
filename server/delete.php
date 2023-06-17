<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

class Delete {
    public $id;

    public function __construct($id) {
        $this -> id = $id;
    }

    public function remove() {
        require_once "database.php";
        try {
            $query = $db -> prepare("DELETE FROM tasks WHERE id = :id");
            $query -> bindValue(':id',$this -> id);
            $query -> execute();

            echo json_encode(['info' => 'success']);

        } catch(Exception $e) {
            echo json_encode(['msg' => 'error']);
        }
    }
}

if(isset($_POST['id'])) {
    $del = new Delete($_POST['id']);
    $del -> remove();
}

