<?php
@include 'pdo.php';

session_start();

$error = []; // Initialize the error array

if (isset($_POST['submit'])) {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $pass = md5($_POST['password']);
    $cpass = md5($_POST['cpassword']);
    $user_type = $_POST['user_type'];

    $select = "SELECT * FROM registro_usuarios WHERE email = :email AND password = :password";
    $stmt = $pdo->prepare($select);
    $stmt->execute(['email' => $email, 'password' => $pass]);

    if ($stmt->rowCount() > 0) {

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row['user_type'] == 'admin') {

            $_SESSION['admin_name'] = $row['name'];
            header('location:admin_page.php');
        } elseif ($row['user_type'] == 'user') {

            $_SESSION['user_name'] = $row['name'];
            header('location:user_page.php');
        }
    } else {
        $error[] = 'La contraseña o el correo electrónico ingresados son incorrectos!';
    }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Iniciar Sesión - SolarVista</title>
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
            <h3>Inicia sesión</h3>
            <?php
            if (!empty($error)) {
                $errorString = implode(", ", $error); // Convert the array to a string
                echo "<script type='text/javascript'>alert('$errorString');</script>";
            };
            ?>
            <input type="email" name="email" required placeholder="Correo Electrónico">
            <input type="password" name="password" required placeholder="Contraseña">
            <input type="submit" name="submit" value="Ingresa ahora" class="form-btn">
            <p>¿Aún no estás registrado? <a href="register_form.php">registrarse aquí</a></p>
        </form>
    </div>
</body>

</html>
