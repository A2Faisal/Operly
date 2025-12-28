<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get JSON data from React
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    if ($data) {
        $name = strip_tags(trim($data["name"]));
        $email = filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL);
        $interest = strip_tags(trim($data["interest"]));
        $message = strip_tags(trim($data["message"]));

        $recipient = "admin@operly.org"; 
        $subject = "Operly Inquiry: $interest from $name";

        $email_content = "Name: $name\n";
        $email_content .= "Email: $email\n";
        $email_content .= "Interested In: $interest\n\n";
        $email_content .= "Message:\n$message\n";

        $headers = "From: $name <$email>";

        if (mail($recipient, $subject, $email_content, $headers)) {
            http_response_code(200);
            echo json_encode(["status" => "success"]);
        } else {
            http_response_code(500);
            echo json_encode(["status" => "error", "message" => "Mail server failed."]);
        }
    }
}
?>