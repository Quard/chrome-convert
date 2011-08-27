<?php
$ch = curl_init("http://api.online-convert.com/queue-insert");
$request["queue"] = file_get_contents("t.xml");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
$response = curl_exec($ch);
curl_close ($ch);
echo $response;
?>
