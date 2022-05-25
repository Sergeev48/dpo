<?php
require_once 'connect.php';
$fullname = $_POST['fullname'];
$mail = $_POST['mail'];
$phone = $_POST['phone'];
$comment = $_POST['comment'];
$time = $_POST['time'];

$res = $connect->query("SELECT COUNT(*) FROM `requests` WHERE email = '$mail' AND (date BETWEEN DATE_SUB(NOW(), INTERVAL 1 HOUR) AND NOW())");
$row = mysqli_fetch_row($res);
$total = $row[0]; // всего записей
if ($total > 0) {
    echo 'С момента вашей последней заявки не прошел 1 час, попробуйте позже.';
} else {
    $sending = mail(
        $mail,
        'Новое сообщение',
        'Ваша заявка:' . "\n" .
            'ФИО: ' . $fullname . "\n" .
            'Адрес почты: ' . $mail . "\n" .
            'Телефон: ' . $phone . "\n" .
            'комментарий: ' . $comment
    );
    mysqli_query($connect, "INSERT INTO `requests` (`id`, `fullname`, `email`, `phone`, `comment`, `date`) VALUES (NULL, '$fullname', '$mail', '$phone', '$comment', '$time')");
}
