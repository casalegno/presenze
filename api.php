<?php
// Codice PHP per gestire le richieste AJAX e interagire con il database
// Sarà popolato man mano che implementiamo le varie funzionalità

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nomedeldatabase";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Azione da eseguire in base alla richiesta AJAX
if ($_SERVER["REQUEST_METHOD"] == "GET" && isset($_GET["action"])) {
    $action = $_GET["action"];

    switch ($action) {
        case "getPalestre":
            // Ottieni l'elenco delle palestre
            $result = $conn->query("SELECT * FROM palestre");

            if ($result->num_rows > 0) {
                $palestre = array();

                while ($row = $result->fetch_assoc()) {
                    $palestre[] = $row;
                }

                echo json_encode($palestre);
            }

            break;

        case "getInsegnanti":
            // Ottieni l'elenco degli insegnanti in base alla palestra selezionata
            $idPalestra = $_GET["idPalestra"];
            $result = $conn->query("SELECT * FROM insegnanti WHERE id_palestra = $idPalestra");

            if ($result->num_rows > 0) {
                $insegnanti = array();

                while ($row = $result->fetch_assoc()) {
                    $insegnanti[] = $row;
                }

                echo json_encode($insegnanti);
            }

            break;

        case "getDiscipline":
            // Ottieni l'elenco delle discipline in base all'insegnante selezionato
            $idInsegnante = $_GET["idInsegnante"];
            $result = $conn->query("SELECT * FROM discipline WHERE id_insegnante = $idInsegnante");

            if ($result->num_rows > 0) {
                $discipline = array();

                while ($row = $result->fetch_assoc()) {
                    $discipline[] = $row;
                }

                echo json_encode($discipline);
            }

            break;

        case "getIscritti":
            // Ottieni l'elenco degli iscritti per l'insegnante e la data selezionati
            $idInsegnante = $_GET["idInsegnante"];
            $dataSvolgimento = $_GET["dataSvolgimento"];

            $result = $conn->query("SELECT * FROM iscritti WHERE id_insegnante = $idInsegnante AND data_svolgimento = '$dataSvolgimento'");

            if ($result->num_rows > 0) {
                $iscritti = array();

                while ($row = $result->fetch_assoc()) {
                    $iscritti[] = $row;
                }

                echo json_encode($iscritti);
            }

            break;
    }
}

// Chiudi la connessione al database
$conn->close();