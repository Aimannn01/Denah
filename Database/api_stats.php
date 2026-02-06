<?php 
header('Content-Type: application/json');

$host = "localhost";
$user = "root";
$pass = "";
$db   = "bbm";

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Koneksi gagal']);
    exit;
}

$sql = "SELECT COUNT(*) as total FROM bbm WHERE bidang = 'IT'";
$result = $conn->query($sql);

if ($result) {
    $data = $result->fetch_assoc();
    echo json_encode([
        'status' => 'success',
        'sales_aktif' => $data['total']
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Query gagal']);
}

echo json_encode ([
    'status' => 'success',
    'sales_aktif' =>$dataSales['total'],
    'mobil_count' => 0,
    'pintu_count' => 2
]);

$conn->close();
?>