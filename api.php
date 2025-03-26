<?php

// Includi il file load.php per avere accesso alle funzionalità di WordPress
require_once('load.php');

$search_method = filter_input(INPUT_SERVER, 'REQUEST_METHOD', FILTER_SANITIZE_SPECIAL_CHARS);
$action = filter_input(INPUT_GET, 'action', FILTER_SANITIZE_SPECIAL_CHARS);
$opts = filter_input(INPUT_GET, 'params', FILTER_SANITIZE_SPECIAL_CHARS, FILTER_REQUIRE_ARRAY);
/**
 * Questi sono i livelli utilizzati
 *
 * 0,1,2,3 Allievi
 * 4 Trainer
 * 5 Apprentice Instrucor
 * 6 Instructor
 * 7 Advanced Instructor
 * 8 Full Instructor
 * 9 Caposcuola
 *
 */
//la variabile di ritorno per tutte le azioni ajax
//$json = array('stato' => true);
// Azione da eseguire in base alla richiesta AJAX
if ($search_method == "GET" && isset($action)) {
    switch ($action) {
        case "lista":
            $or = $q_sport = $p_sport = '';
            foreach ($opts['spo'] as $k => $v) {
                $q_sport .= $or . "meta_value LIKE '%{$k}%'";
                $p_sport .= $or . "disciplina='{$k}'";
                $or = ' OR ';
            }
            $or = $q_pal = $p_pal = '';
            foreach ($opts['pal'] as $k => $v) {
                $q_pal .= $or . "meta_value LIKE '%{$k}%'";
                $p_pal .= $or . "palestra='{$k}'";
                $or = ' OR ';
            }
            $sql_id_allievi = "SELECT user_id FROM wp_usermeta WHERE (meta_key = 'rks_corsi_esami' AND ({$q_sport})) OR (meta_key = 'rks_palestra' AND ({$q_pal})) OR (meta_key = 'rks_ruolo' AND meta_value='0') GROUP BY user_id HAVING COUNT(DISTINCT meta_key) = 3; ";
            //$json['sql']=$sql_id_allievi;
            $listaAllievi = $wpdb->get_results($sql_id_allievi, ARRAY_A);
            foreach ($listaAllievi as $a) {
                $nome = get_user_meta($a['user_id'], 'first_name', true);
                $cognome = get_user_meta($a['user_id'], 'last_name', true);
                $json[$a['user_id']]['nome'] = $nome . ' ' . $cognome;
            }
            $sql_presenti = "SELECT id_utente FROM webapp_lezioni WHERE ladata='{$opts['tim']}' AND ({$p_sport}) AND ({$p_pal}) AND istruttore='{$opts['ins']}'";
            $ipresenti = $wpdb->get_results($sql_presenti, ARRAY_A);
            //            $json['sql_presenti']=$sql_presenti;
            foreach ($ipresenti as $p) {
                $json['presenze'][] = $p['id_utente'];
            }
            echo json_encode($json);
            break;
        case "salva":
            $sport = array_key_first($opts['spo']);
            $palestra = array_key_first($opts['pal']);
            $sql_salva = "INSERT INTO webapp_lezioni (id_utente,disciplina,palestra,istruttore,ladata) VALUES ('{$opts['id']}', '{$sport}', '{$palestra}', '{$opts['ins']}','{$opts['tim']}' );";
            $result = $wpdb->query($sql_salva);
            $json = array('msg' => 'salvato');
            //            $json['sql']=$sql_salva;
            echo json_encode($json);
            break;
        case "rimuovi":
            //            $sport=reset($opts['spo']); //restituisce il primo valore
            $sport = array_key_first($opts['spo']); //restituisce la prima chiave
            $palestra = array_key_first($opts['pal']);
            $sql_rimuovi = "DELETE FROM webapp_lezioni WHERE id_utente='{$opts['id']}' AND ladata='{$opts['tim']}' AND palestra='{$palestra}' AND disciplina='{$sport}'";
            $result = $wpdb->query($sql_rimuovi);
            $json = array('msg' => 'rimosso');
            //            $json['sql'] = $sql_rimuovi;
            echo json_encode($json);
            break;
        case "mese":
            $sql_mese = "SELECT ladata, palestra, disciplina, COUNT(DISTINCT id_utente) AS numero_presenti FROM webapp_lezioni WHERE YEAR(ladata) = '{$opts['yea']}' AND MONTH(ladata) = '{$opts['mon']}' GROUP BY ladata,palestra,disciplina ORDER BY ladata,palestra,disciplina";
            $result = $wpdb->get_results($sql_mese, ARRAY_A);
            if (count($result) > 0) {
                $json['presenze'] = $result;
            } else {
                $json['msg'] = 'nessun risultato';
            }
            echo json_encode($json);
            break;
        //
        case "inserisci":
            $sports = implode(',', $opts['btnSportC']);
            $palestre = implode(',', $opts['btnPalestraC']);
            $sql_inserisci = "INSERT INTO `webapp_utente` (`nome`, `livello`, `disciplina`, `palestra`, `data_iscrizione`, `data_rinnovo`, `telefono`, `email`) VALUES ('{$opts['textCognomeNome']}','{$opts['rangeLivello']}','{$sports}', '{$palestre}', NULL, '2023-09-12', '{$opts['telTelefono']}', '{$opts['emailEmail']}')";
            $stato = verificaStato($opts);
            //array_push($json,$opts);
            $json = array_merge($json, $stato);
            $json = array_merge($json, $opts);
            $json['sql'] = $sql_inserisci;

            //eseguire il contorllo e ritornare il salvataggio
            //    if($stato){
            //     echo json_encode($json);
            //    }else{
            //     $json['stato']=false;
            //     echo json_encode($json);
            //    }
            //$result = $conn->query($sql_mese);
            //            if ($result->num_rows > 0) {
            //
            //            }
            echo json_encode($json);
            break;
        case "allievo":
            getAllievoPresenze();
            break;
        case 'all':
            printAllievi();
            break;
    }
}

// Chiudi la connessione al database
//$conn->close();

function verificaStato($op): array {
    global $conn;
    $sql_verifica = "SELECT * FROM webapp_utente WHERE nome='{$op['textCognomeNome']}' OR email='{$op['emailEmail']}'";
    $result = $conn->query($sql_verifica);
    if ($result->num_rows > 0) {
        return array('stato' => false, 'messaggio' => "Nome o Indirizzo Email già esistente");
    }
    return array();
}

/**
 * Funzione che legge dallta tabella WP_usermeta il valore insegnante e crea un elenco degli insegnanti
 * @global type $wpdb
 */
function printIstruttori() {
    global $wpdb;
    $idInsegnante = (!isset($_COOKIE['insegnante'])) ? '1' : $_COOKIE['insegnante'];
    $sql_id_insegnanti = 'SELECT wp_usermeta.user_id from wp_usermeta where meta_key="rks_ruolo" and meta_value="1"';
    $res_id = $wpdb->get_results($sql_id_insegnanti, ARRAY_A);
    foreach ($res_id as $rid) {
        $palestre = implode(",", get_user_meta($rid['user_id'], 'rks_palestra', true));
        $corsi = implode(",", get_user_meta($rid['user_id'], 'rks_corsi_esami', true));
        $nome = get_user_meta($rid['user_id'], 'first_name');
        $attachment_id = get_user_meta($rid['user_id'], 'mm_sua_attachment_id', true);
        $guid = get_the_guid($attachment_id);
        $activeClass = ($rid['user_id'] == $idInsegnante) ? 'active' : '';
        echo "<div id='ins{$rid['user_id']}' class='carousel-item {$activeClass}'><img src='{$guid}' class='img-fluid img-thumbnail' alt='{$nome[0]}' data-id='{$rid['user_id']}' data-palestre='{$palestre}' data-corsi='{$corsi}'></div>";
    }
    printEventi();
}

/**
 * Questa funzione si occupa di estrarre gli eventi rks della giornata
 * Posso eseguire delle modifiche solo nella giornata stessa, altre modifiche devono essere fatte direttamente dal post!
 * Un evento per essere visualizzato deve essere PRIVATO, avere una data,un titolo ed una immagine!
 * @global type $wpdb
 */
function printEventi() {
    global $wpdb;

    $today = getdate();
    $args = array(
        'category_name' => 'seminari', // Sostituisci con il nome della tua categoria
        'meta_query' => array(
            array(
                'key' => '_thumbnail_id',
                'compare' => 'EXISTS',
            ),
        ),
        'post_status' => 'private',
        //        'date_query' => array(
        //            array(
        //                'year' => $today['year'], // Sostituisci con l'anno desiderato
        //                'month' => $today['mon'], // Sostituisci con il mese desiderato
        //                'day' => $today['mday'], // Sostituisci con il giorno desiderato
        //            ),
        //        ),
    );
    $posts_with_featured_image = get_posts($args);
    foreach ($posts_with_featured_image as $post) {
        $post_id = $post->ID;
        $post_title = get_the_title($post_id);
        $post_image = get_the_post_thumbnail_url($post_id);
        //        $post_date = get_the_date('Y-m-d', $post_id);
        echo "<div id='evn{$post_id}' class='carousel-item evento'><img src='{$post_image}' class='img-fluid img-thumbnail' alt='{$post_title}' data-id='0' data-evento='{$post_id}' data-palestre='lc' data-corsi='km,jk,pt,ae'></div>";
    }
}

/**
 * Funzione che prepara un js con l'elenco delle palestre e degli sport per averli in variabili.
 * @global type $wpdb
 */
function prepareJs() {
    global $wpdb;
    //estraggo i dati per l'elenco palestre
    $rks_P = $wpdb->get_results("SELECT post_content FROM wp_posts where post_excerpt LIKE 'rks_palestra'", ARRAY_A);
    $objp = maybe_unserialize($rks_P[0]['post_content']);
    $jsonP = json_encode($objp['choices']);
    $rks_E = $wpdb->get_results("SELECT post_content FROM wp_posts where post_excerpt='esami'", ARRAY_A);
    $objE = maybe_unserialize($rks_E[0]['post_content']);
    $jsonE = json_encode($objE['choices']);
    echo "<script> var elencoPalestre={$jsonP};"
        . "var elencoSport={$jsonE}"
        . "</script>";
}

/**
 * Funzione che stampa l'elenco di tutti gli allievi
 *
 * @param boolean $json indica se ritoranre un json o stampare direttamente
 * @author Casalegno Marco <casalegno.marco@sigesgroup.it> 
 * @return string
 */
function printAllievi(bool $ret = false) {
    global $wpdb, $opts;
    $sql_id_allievi = "SELECT user_id FROM wp_usermeta WHERE  meta_key = 'rks_ruolo' AND meta_value='0'";
    $listaAllievi = $wpdb->get_results($sql_id_allievi, ARRAY_A);
    foreach ($listaAllievi as $a) {
        $nome = get_user_meta($a['user_id'], 'first_name', true);
        $cognome = get_user_meta($a['user_id'], 'last_name', true);
        $sport = get_user_meta($a['user_id'], 'last_name', true);
        $json[$a['user_id']]['nome'] = $nome . ' ' . $cognome;
    }
    //vuol dire che sto chiamando la funzione tramite ajax
    if (isset($opts)) {
        // $sql_presenti = "SELECT id_utente FROM webapp_lezioni WHERE ladata='{$opts['tim']}' AND palestra='{$opts['pal']}' AND disciplina='{$opts['spo']}'";
        $sql_presenti = "SELECT id_utente FROM webapp_lezioni WHERE ladata='{$opts['tim']}' AND palestra='lm' AND disciplina='jk'";
        $ipresenti = $wpdb->get_results($sql_presenti, ARRAY_A);
        $json['sql'][] = $sql_presenti;
        $json['sql'][] = $sql_id_allievi;
        foreach ($ipresenti as $p) {
            $json['presenze'][] = $p['id_utente'];
        }
    }
    if ($ret) return json_encode($json);
    echo json_encode($json);
}
/**
 * Undocumented function
 *
 * @author Casalegno Marco <casalegno.marco@sigesgroup.it> 
 * @return string
 */
function getAllievoPresenze() {
    global $wpdb, $opts;
    if (!isset($opts['id'])) die(json_encode(['msg' => 'nessun allievo selezionato']));
    $sql_allievo = "SELECT * FROM webapp_lezioni WHERE id_utente='{$opts['id']}' AND YEAR(ladata) = '{$opts['anno']}' AND MONTH(ladata) = '{$opts['mese']}' ORDER By ladata";
    //al momento estraggo solo il mese, poi estrarro tutto l'anno e filtro per il mese
    //$sql_allievo = "SELECT * FROM webapp_lezioni WHERE id_utente='{$opts['id']}' AND YEAR(ladata) = '{$opts['anno']}' ;
    $result = $wpdb->get_results($sql_allievo, ARRAY_A);
    //setto le presenze cosi come vengono restituiti i dati
    $json['presenze']=$result;
    //estraggo il totale delle lezioni seguite
    $json['lezioni']=count($result);
    //raggru
    //se non ho nessun risultato
    if (count($result) == 0)
        die(json_encode(['msg' => 'nessun risultato']));
    echo json_encode($json);
}
