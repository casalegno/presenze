<?php
// Includi il file load.php per avere accesso alle funzionalità di WordPress
require_once('load.php');
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Web App</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        .nav-pills .nav-link.active {
            background-color: var(--bs-warning);
        }
        .input-group > .custom-range {
  display: block;
  height: calc(2.25rem + 2px);
  padding: 0 .75rem;
  font-size: 1rem;
  line-height: 1.5;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.input-group > .custom-range {
  position: relative;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}
.input-group > .custom-range:focus {
  z-index: 3;
}
.input-group-sm > .custom-range {
  height: calc(1.8125rem + 2px);
  padding: 0 .5rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: .2rem;
}
.input-group-lg > .custom-range {
  height: calc(2.875rem + 2px);
  padding-left: 0 1rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: .3rem;
}
.input-group > .custom-range:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.input-group > .custom-range:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* Style for focusing custom-range when inside an .input-group.
 * Normally only the range thumb has focus styling, but this keeps
 * input-group inputs looking consistent during validation
 */
.input-group .custom-range:focus {
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 .2rem rgba(0,123,255,.25);
}
    </style>
</head>

<body>
    <div class="container">
        <!-- Begin page content -->
        <main role="main" class="pb-5">
            <div class="tab-content" id="myTab">


                <!-- Pannello per la registrazioni delle presenze a lezione -->
                <div class="tab-pane p-4 fade" id="Presenze" role="tabpanel" aria-labelledby="presenze-tab">
                    <?php require_once('presenze.php');?>
                </div>


                <!-- Pannello per le informazioni del registro soci -->
                <div class="tab-pane p-4 fade" id="Registro" role="tabpanel" aria-labelledby="registro-tab">
                    <?php require_once('registro.php');?>
                    <!-- Pannello registro  - Fine -->
                </div>

                <!-- Pannelo per le informazioni sull'utente -->
                <div class="tab-pane p-4 show active" id="Info" role="tabpanel" aria-labelledby="info-tab">
                        <?php require_once('info.php');?>
                    <!-- Pannello Informazioni  - Fine -->
                </div>
            </div>
        </main>

        <footer class="footer fixed-bottom mt-auto border-top bg-warning-subtle">
            <nav class="nav nav-pills  nav-justified" id="myTab" role="tablist">
                <a class="nav-link link-secondary " id="presenze-tab" data-bs-toggle="tab" href="#Presenze" role="tab"
                    aria-controls="Presenze" aria-selected="true">
                    <i class="fa-solid fa-users"></i><br />
                    Presenze</a>
                <a class="nav-link link-secondary" id="registro-tab" data-bs-toggle="tab" href="#Registro" role="tab"
                    aria-controls="Registro" aria-selected="false">
                    <i class="fa-solid fa-id-card"></i><br />
                    Registro</a>
                <a class="nav-link link-secondary active" id="info-tab" data-bs-toggle="tab" href="#Info" role="tab"
                    aria-controls="Info" aria-selected="false">
                    <i class="fa-solid fa-circle-info"></i><br />
                    Informazioni</a>

            </nav>
        </footer>
    </div>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="func.js?<?php echo time();?>"></script>
    <script src="app.js?<?php echo time();?>"></script>
</body>

</html>