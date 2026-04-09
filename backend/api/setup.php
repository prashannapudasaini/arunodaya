<?php
// Display errors so we can see if the database connection fails
ini_set('display_errors', 1);
error_reporting(E_ALL);

include_once '../config/database.php';

$username = 'admin';
$password = 'admin123';
// Generate the password hash directly on the live server
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

try {
    // Make sure the table exists
    $conn->exec("CREATE TABLE IF NOT EXISTS `users` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `username` varchar(50) NOT NULL,
      `password` varchar(255) NOT NULL,
      `role` varchar(20) DEFAULT 'admin',
      PRIMARY KEY (`id`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;");

    // Clear old broken users
    $conn->exec("TRUNCATE TABLE users");
    
    // Insert the correct admin user
    $stmt = $conn->prepare("INSERT INTO users (username, password, role) VALUES (?, ?, 'admin')");
    $stmt->execute([$username, $hashed_password]);
    
    echo "<h1 style='color: green;'>Success!</h1>";
    echo "<h3>The database has been updated. You can now log in to React with:</h3>";
    echo "<p>Username: <b>admin</b></p>";
    echo "<p>Password: <b>admin123</b></p>";
    echo "<br><hr><p style='color: red;'><b>SECURITY ALERT:</b> Please delete this setup.php file from cPanel immediately after you log in.</p>";

} catch (Exception $e) {
    echo "<h1 style='color: red;'>Database Error</h1>";
    echo "<p>Error details: " . $e->getMessage() . "</p>";
}
?>