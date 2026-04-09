<?php
// 1. MUST BE THE VERY FIRST THING: Handle CORS Preflight
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Include Database
include_once '../config/database.php';

// 3. Safely decode the JSON payload
$json_input = file_get_contents("php://input");
$data = json_decode($json_input);

// 4. Validate that data exists BEFORE trying to read it
if (!$data || !isset($data->username) || !isset($data->password)) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Username and password are required."]);
    exit();
}

// 5. Query the database
try {
    $query = "SELECT * FROM users WHERE username = ? LIMIT 1";
    $stmt = $conn->prepare($query);
    $stmt->execute([$data->username]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 6. Verify Password
    if ($user && password_verify($data->password, $user['password'])) {
        // Generate token
        $token = base64_encode(random_bytes(32));
        
        http_response_code(200);
        echo json_encode([
            "success" => true,
            "token" => $token, 
            "role" => $user['role'],
            "username" => $user['username']
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["success" => false, "message" => "Invalid credentials. Please try again."]);
    }
} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "message" => "Database error occurred."]);
}
?>