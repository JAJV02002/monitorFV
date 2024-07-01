<?php
@include 'pdo.php';

$error = [];

if (isset($_POST['submit'])) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = md5($_POST['password']);
    $cpass = md5($_POST['cpassword']);
    $user_type = $_POST['user_type'];

    $select = "SELECT * FROM registro_usuarios WHERE email = :email";
    $stmt = $pdo->prepare($select);
    $stmt->execute(['email' => $email]);

    if ($stmt->rowCount() > 0) {
        $error[] = 'Este usuario ya existe';
    } else {
        if ($pass != $cpass) {
            $error[] = 'La contraseña no coincide';
        } else {
            $currentDate = date('Y-m-d H:i:s'); // get current date-time in 'YYYY-MM-DD HH:MM:SS' format
            $insert = "INSERT INTO registro_usuarios (name, email, password, user_type, registration_date) VALUES (:name, :email, :password, :user_type, :registration_date)";
            $stmt = $pdo->prepare($insert);
            $stmt->execute(['name' => $name, 'email' => $email, 'password' => $pass, 'user_type' => $user_type, 'registration_date' => $currentDate]);
            header('location:login_form.php');
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Registrarse - SolarVista</title>
    <link rel="stylesheet" type="text/css" href="./styles.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div id="header">
        <img src="./logo.png" alt="Logo" id="logo">
        <h1>SolarVista</h1>
    </div>

    <div class="form-container">
        <form action="" method="post">
            <h3>Registrarse ahora</h3>
            <?php
            if (!empty($error)) {
                $errorString = implode(", ", $error); // Convert the array to a string
                echo "<script type='text/javascript'>alert('$errorString');</script>";
            };
            ?>
            <label for="name" style="display: inline-block; text-align: justify;">Ingresa tu nombre completo:</label>
            <input type="text" name="name" required placeholder="Nombre completo">
            <label for="email" style="display: inline-block; text-align: justify;">Ingresa tu correo electrónico:</label>
            <input type="email" name="email" required placeholder="Correo electrónico">
            <label for="password" style="display: inline-block; text-align: justify;">Crea una contraseña:</label>
            <input type="password" name="password" required placeholder="Crea una contraseña">
            <label for="cpassword" style="display: inline-block; text-align: justify;">Confirma tu contraseña:</label>
            <input type="password" name="cpassword" required placeholder="Confirma la contraseña">
            <label for="user_type" style="text-align: left !important;">Selecciona un tipo de usuario:</label>
            <select name="user_type">
                <option value="user">user</option>
                <option value="admin">admin</option>
            </select>
            <input type="submit" name="submit" value="Registrarse ahora" class="form-btn">
            <p>¿Ya tienes una cuenta? <a href="login_form.php">ingresa aquí</a></p>
        </form>
    </div>
</body>

</html>

