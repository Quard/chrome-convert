<?php

function is_valid_url($url = "") {
    return substr($url, 0, 4) == "http";
}


$response = array(
    "code" => "400",
    "message" => "Unable to extract video info"
);


try {

    #$video_url = "http://www.youtube.com/watch?v=ovbtmQEXSEY&feature=topvideos_music";
    $video_url = $_GET["url"];
    
    if (!is_valid_url($video_url)) {
        throw new Exception("Invalid input URL");
    }

    $cookie_file = "/tmp/" . md5(rand(0, time()));
    $url = shell_exec("python youtube-dl.py --cookies=$cookie_file --get-url '$video_url' ");

    if (!is_valid_url($url)) {
        throw new Exception("Unable to extract download URL");
    }

    $_cookies = explode("\n", file_get_contents($cookie_file));

    # remove temporary file
    unlink($cookie_file);

    $cookies = array();
    foreach ($_cookies as $c) if (substr($c, 0, 1) != "#") {
        $tmp = trim($c);
        if (!empty($tmp)) {

            $values = explode("\t", $tmp);

            $cookies[] = array(
                "domain" => $values[0],
                "only_sent_to_creator" => $values[1],
                "path" => $values[2],
                "secure" => $values[3],
                "expires" => $values[4],
                "name" => $values[5],
                "value" => $values[6]
            );
        }
    }


    if (empty($cookies)) {
        throw new Exception("Unable to extract cookies");
    }


    $response = array(
        "code" => 200,
        "message" => "ok",
        "url" => $video_url,
        "download_link" => $url,
        "cookies" => $cookies
    );


} catch (Exception $e) {
    // output error
    $response = array(
        "code" => "401",
        "message" => $e->getMessage()
    );

}


header('Content-Type: application/json; charset=utf-8');
header("Expires: -1");
echo json_encode($response);

?>
