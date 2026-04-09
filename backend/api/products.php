<?php
// Handle Headers - Changed to '*' so it works on both localhost AND your live cPanel domain!
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight request from the browser
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Include database connection
include_once '../config/database.php';

// Failsafe: Check if database connection actually loaded
if (!isset($conn)) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection file missing or incorrect."]);
    exit();
}

$type = $_GET['type'] ?? 'all';

// Build the query dynamically based on what React is asking for
$query = "SELECT * FROM products";
if ($type === 'featured') {
    $query .= " WHERE featured = 1";
} elseif ($type === 'upcoming') {
    $query .= " WHERE upcoming = 1"; 
}

try {
    $stmt = $conn->prepare($query);
    $stmt->execute();
    
    // Fetch results
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Output JSON cleanly back to React
    echo json_encode($results);

} catch (PDOException $e) {
    // Log the actual error to your server for debugging, but send a clean message to React
    error_log("Database Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Database query failed."]);
}
?>