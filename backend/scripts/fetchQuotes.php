<?php
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
// Enable CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: http://127.0.0.1:3000"); // Adjust the origin to match your Live Server URL
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Set the content type to JSON


try {
    $db = new PDO("sqlite:/Library/WebServer/Documents/Projects/21Saylorisms/database/quotes.db");
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //enables error reporting

    $query = $db->query("SELECT id, quote, vote FROM quotes");
    $results = $query->fetchAll(PDO::FETCH_ASSOC); // PDO::FETCH_ASSOC ensures that the results are returned with column names as keys (e.g., ["id" => 1, "quote" => "Example quote"]).

    echo json_encode($results);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>