<?php
ob_start();
error_log("Received request: " . file_get_contents("php://input"));
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://127.0.0.1:3000"); // Allow cross-origin requests
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

try {
    $pdo = new PDO("sqlite:/Library/WebServer/Documents/Projects/21Saylorisms/database/quotes.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); //enables error reporting

    // Get JSON data from the request
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data["id"]) && is_numeric($data["id"])) {
        $id = intval($data["id"]); // Ensure it's an integer

        // Update vote count in the database
        $stmt = $pdo->prepare("UPDATE quotes SET vote = vote + 1 WHERE id = :id");
        $stmt->bindParam(":id", $id, PDO::PARAM_INT);
        $stmt->execute();

        // Check if any rows were affected
        if ($stmt->rowCount() > 0) {
            echo json_encode(["message" => "Vote updated successfully"]);
            exit;
        } else {
            echo json_encode(["message" => "No quote found with this ID"]);
            exit;
        }
    } else {
        echo json_encode(["message" => "Invalid request"]); //error if not an integer
        exit;
    }
}
catch (PDOException $e) {
    ob_end_clean();
    echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    exit;
}
exit;
?>