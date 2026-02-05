<?php 

$host = "localhost";
$user = "root";
$pass = "";
$db   = "bbm";

$conn = new mysqli($host, $user, $pass, $db);

$sql = "SELECT COUNT() as total FROM bbm WHERE bidang = 'IT' ";
$result = $conn->query($sql);
$data = $result->fetch_assoc();

header('Content-Type: application/json');
echo json_encode([
    'sales_aktif' => $data['total'],
    'status' => 'success'
]);
?>