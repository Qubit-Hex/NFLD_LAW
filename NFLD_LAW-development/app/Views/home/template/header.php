<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" />
    <link rel="shortcut icon" href="/img/Freewill-logos/Freewill-logos_black.png" />
    <link rel='stylesheet' href='/css/index.css' />
    <script src='/js/router.js'></script>

    <title>NFLD LEGAL </title>
</head>

<body>
    <!-- header end -->

    <nav class="navbar navbar-expand-lg navbar-light">

        <ul class='navbar-nav'>

         <li class='nav-item'> <button class="navbar-toggler" id='btn-menu-collapse' type="button" data-toggle="collapse" data-target="#navbarNav"
              aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>

          </button></li></ul>
        <a class='nav-link' href='' style='text-decoration: none; color: black; font-weight:200; font-size: 20px;'>NFLD LEGAL
        <img class='img-fluid'
                src='/img/Freewill-logos/Freewill-logos_black.png' style='max-width: 200px; max-height: 200px' /></a>

        <ul class="navbar-nav" id='nav-section-topMenu'>
            <li class="nav-item active">
                <a class="nav-link" href="/">Home </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/home/about/">About Us</a>
            </li>
            <li class='nav-item'>
                <a href='/home/login/' class='nav-link'>Login</a>
            </li>
            <li>
                <a href='/home/register/'><button class='btn btn-transparent started'>Get Started</button></a>
            </li>
            <li class='nav-item'>
                <a href="/"><i class="bi bi-facebook social"></i></a>


            </li>
            <li class='nav-item'>
                <a href="/"><i class="bi bi-twitter social"></i></a>
            </li>

            <li class='nav-item'>
                 <a href=''><i class="bi bi-whatsapp social"></i> </a>
            </li>

        </ul>
        <div class="collapse navbar-collapse" id="navbarNav">

        </div>
    </nav>

    <script>
                let btnCollapse = document.getElementById('btn-menu-collapse');
                let navMenu = document.getElementById('nav-section-topMenu');

                btnCollapse.addEventListener('click', () => {

                    if (navMenu.style.display === 'flex') {
                        navMenu.style.display = 'none';
                    } else {
                        navMenu.style.display = 'flex';
                    }
                });
            </script>
