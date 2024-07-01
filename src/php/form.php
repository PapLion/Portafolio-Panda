<?php
#Preguntamós al servidor cual es el metodo para la solicitud de los datos )
if($_SERVER["REQUEST_METHOD"] == "POST") /*En este caso nos interesa q sea post*/{
    #Ahora nos interesara conseguir los datos y trnasformarlos de una forma decente para su manejo
    $nombre = trim($_POST["Name"]);//Para los textos. Los limpiaremos con trim()
    $correo = filter_var($_POST["Email"], FILTER_VALIDATE_EMAIL); //Filtraremos el correo primero solicitando la variable filtro y luego indicandole que tipo de filtro, de este modo sabremos si el correo es valido o no
    $mensaje = trim($_POST["msg"]);
    
};
