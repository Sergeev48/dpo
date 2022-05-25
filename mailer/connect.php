<?php
$connect = mysqli_connect('localhost', 'root', 'root', 'request');
if (!$connect) {
    echo "Ошибка подключения бд";
}
