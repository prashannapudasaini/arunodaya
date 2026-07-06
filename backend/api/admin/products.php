<?php
// 1. CORS Setup (Consider changing localhost to * or your live domain when deploying)
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With, Accept");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

header("Content-Type: application/json; charset=UTF-8");
include_once '../../config/database.php';

// ========================================================================
// SECURITY BARRIER: TOKEN VALIDATION
// ========================================================================
$headers = apache_request_headers();
// Sometimes Apache capitalizes headers differently, so we check both
$authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

if (!$authHeader) {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Access denied. No token provided."]);
    exit();
}

// Extract the token (Format is usually "Bearer token_string")
$token = trim(str_replace('Bearer', '', $authHeader));

// Check if this token exists in our users table
$authStmt = $conn->prepare("SELECT id, role FROM users WHERE token = ? LIMIT 1");
$authStmt->execute([$token]);
$adminUser = $authStmt->fetch(PDO::FETCH_ASSOC);

if (!$adminUser || $adminUser['role'] !== 'admin') {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Access denied. Invalid or expired token."]);
    exit();
}
// ========================================================================
// END SECURITY BARRIER - If the script reaches here, the user is a verified Admin!
// ========================================================================

$method = $_SERVER['REQUEST_METHOD'];

try {
    if ($method === 'GET') {
        $stmt = $conn->prepare("SELECT * FROM products ORDER BY id DESC");
        $stmt->execute();
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    }
    
    elseif ($method === 'DELETE') {
        $id = $_GET['id'] ?? null;
        if ($id) {
            // Optional: Fetch image path and delete the actual file from the server too
            $imgStmt = $conn->prepare("SELECT image FROM products WHERE id = ?");
            $imgStmt->execute([$id]);
            $product = $imgStmt->fetch();
            if ($product && $product['image'] && file_exists('../../' . $product['image'])) {
                unlink('../../' . $product['image']);
            }

            $stmt = $conn->prepare("DELETE FROM products WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(["success" => true, "message" => "Product deleted."]);
        }
    }
    
    elseif ($method === 'POST') {
        $name = $_POST['name'] ?? '';
        $category = $_POST['category'] ?? '';
        $short_desc = $_POST['short_description'] ?? '';
        $full_desc = $_POST['full_description'] ?? '';
        $featured = isset($_POST['featured']) ? (int)$_POST['featured'] : 0;
        $upcoming = isset($_POST['upcoming']) ? (int)$_POST['upcoming'] : 0;
        
        $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $name)));
        $imagePath = '';

        // SECURE FILE UPLOAD HANDLING
        if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
            $tmpName = $_FILES['image']['tmp_name'];
            
            // 1. Verify it's actually an image using finfo (much safer than checking extensions)
            $finfo = finfo_open(FILEINFO_MIME_TYPE);
            $mimeType = finfo_file($finfo, $tmpName);
            finfo_close($finfo);
            
            $allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
            
            if (!in_array($mimeType, $allowedTypes)) {
                http_response_code(400);
                echo json_encode(["success" => false, "message" => "Invalid file type. Only JPG, PNG, WEBP, and GIF are allowed."]);
                exit();
            }

            // 2. Process the upload
            $uploadDir = '../../uploads/products/';
            if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);
            
            // Strip out weird characters from the original filename just to be safe
            $cleanFileName = preg_replace("/[^a-zA-Z0-9.]/", "_", basename($_FILES['image']['name']));
            $fileName = uniqid() . '_' . $cleanFileName;
            
            if (move_uploaded_file($tmpName, $uploadDir . $fileName)) {
                $imagePath = 'uploads/products/' . $fileName; 
            }
        }

        $query = "INSERT INTO products (name, slug, category, short_description, full_description, featured, upcoming, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($query);
        $stmt->execute([$name, $slug, $category, $short_desc, $full_desc, $featured, $upcoming, $imagePath]);
        
        http_response_code(201);
        echo json_encode(["success" => true, "message" => "Product successfully added."]);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database error: " . $e->getMessage()]);
}
?>