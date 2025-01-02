<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Koneksi ke database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "gunung_merapi";

$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Operasi CRUD berdasarkan metode HTTP
$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Mendapatkan data bencana
        $sql = "SELECT * FROM disasters";
        $result = $conn->query($sql);
        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        echo json_encode($data);
        break;

    case 'POST':
        // Menambah data bencana
        $input = json_decode(file_get_contents('php://input'), true);
        $name = $input['name'];
        $status = $input['status'];
        $type = $input['type'];
        $impact = $input['impact'];
        $mitigation = $input['mitigation'];

        $sql = "INSERT INTO disasters (name, status, type, impact, mitigation) 
                VALUES ('$name', '$status', '$type', '$impact', '$mitigation')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Disaster added successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
        break;

    case 'PUT':
        // Mengupdate data bencana
        $input = json_decode(file_get_contents('php://input'), true);
        $id = $input['id'];
        $name = $input['name'];
        $status = $input['status'];
        $type = $input['type'];
        $impact = $input['impact'];
        $mitigation = $input['mitigation'];

        $sql = "UPDATE disasters 
                SET name='$name', status='$status', type='$type', impact='$impact', mitigation='$mitigation' 
                WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Disaster updated successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
        break;

    case 'DELETE':
        // Menghapus data bencana
        $id = $_GET['id'];
        $sql = "DELETE FROM disasters WHERE id=$id";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["status" => "success", "message" => "Disaster deleted successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => $conn->error]);
        }
        break;

    default:
        echo json_encode(["status" => "error", "message" => "Invalid request"]);
        break;
}

$conn->close();
