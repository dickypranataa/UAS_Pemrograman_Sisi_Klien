<?php
header("Access-Control-Allow-Origin: *"); // Mengizinkan akses dari semua origin
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Mengizinkan metode HTTP tertentu
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Mengizinkan header tertentu
header("Content-Type: application/json");

$servername = "localhost";
$username = "root"; // Username default XAMPP
$password = ""; // Password default XAMPP
$dbname = "gunung_merapi"; // Nama database yang Anda gunakan

// Buat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

// Ambil data dari body request
$input = json_decode(file_get_contents('php://input'), true);
$username = $input['username'];
$password = $input['password'];

// Validasi input
if (empty($username) || empty($password)) {
    echo json_encode(["status" => "error", "message" => "Username and password are required"]);
    exit();
}

// Cek apakah username sudah ada
$sql = "SELECT * FROM users WHERE username = '$username'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Username already exists"]);
    exit();
}

// Masukkan data pengguna baru ke database tanpa hashing password
$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Registration successful"]);
} else {
    echo json_encode(["status" => "error", "message" => "Error: " . $conn->error]);
}

$conn->close();
