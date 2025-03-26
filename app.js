// Codice JavaScript per la gestione delle interazioni della web app
// Sarà popolato man mano che implementiamo le varie funzionalità


var nomeInsegnante, idInsegnante, nomePalestra, nomeSport, idEvento = 0;
var idPalestra = {};
var idSport = {};
var elencoEvento = [];
var timeoutId = null; //genero la variabile nulla da utilizzare per il salvataggio degli array con timeout
//una simulazione di jquery ma con vanilla
// const $ = (el) => document.querySelector(el);
// const $$ = (el) => document.querySelectorAll(el);
const ID = (el) => document.getElementById(el);


var dataGiorno = ID('dataGiorno');
var dataPresenze = ID('dataPresenze');

// insegnanti: {'1': 'Riccardo Guidolin', '2': 'Marco Casalegno', '3': 'Paride Cartabia', '4':''},
// palestre: {'ub': 'Uboldo', 'vg': 'Villaguardia', 'lm': 'Lomazzo'},
// sport: {'jk': 'Jeet Kune Do', 'km': 'Krav Maga', 'ae': 'Kali Filippino', 'bf':'Panantukan'},
// relazione: [
//     {id: '1', palestra: {'vg': ['k', 'f'], }},
//     {id: '2', palestra: {'vg': ['j'], 'lm': ['j'], }},
//     {id: '3', palestra: {'ub': ['j'], }},
// ]




//Il cookie “insegnante” non presenta un valore valido per l’attributo “SameSite”. Presto i cookie senza l’attributo “SameSite” o con un valore non valido verranno gestiti come “Lax”. Questo significa che il cookie non verrà più inviato in contesti di terze parti. Se l’applicazione dipende dalla disponibilità di questo cookie in questo tipo di contesto, aggiungere l’attributo “SameSite=None“. Per ulteriori informazioni sull’attributo “SameSite”, consultare https://developer.mozilla.org/docs/Web/HTTP/Headers/Set-Cookie/SameSite app.js:86:47




//come prima cosa inserisco la data di oggi
let dataSelezionata = getDate();
dataGiorno.value = dataSelezionata;//la data del blocco info


//attivo il dataScroll per gli elementi mese ed anno
ID('mesePresenze').dateScroller({
    label:[
		'','Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
		'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'
	]
});
ID('annoPresenze').dateScroller();

    /**
     * ------------------------------------------
     * Funzioni di lettura del cookie relativo alla ultima tab utilizzata
     * ------------------------------------------
     */
    $(document).ready(function () {
        tabAperta = (getCookie('theTab')) ? getCookie('theTab') : 'Info';
        //    console.log("Cookie Tab: " + tabAperta);
        $(`#myTab a[href="#${tabAperta}"]`).tab('show');
    });


/**
 * ------------------------------------------
 * Funzioni da attivare quando clicco su info
 * ------------------------------------------
 */

$(document).ready(function () {
    $('#myTab a[href="#Info"]').on('click', function () {
        //        console.log('Passo a Info');
        document.cookie = "theTab=Info";
        $('#elencoAllievi').empty();
    });
    //controllo il cookie e l'insegnante
    idInsegnante = (getCookie('insegnante')) ? getCookie('insegnante') : '1';

    $('#dataGiorno').on('change', function () {
        dataSelezionata = $('#dataGiorno').val();
        clearInput();
        selectPalestra(idInsegnante);
    });
    //popolo subito le palestre in base all'utente default
    selectPalestra(idInsegnante);
    //    //se ho gia selezionato l'insegnante lo mostro
    //    if (nomeInsegnante != "") {
    //        $("#carouselInstructor img[alt='" + nomeInsegnante + "']").parent().addClass('active');
    //        $("#selectPalestre").prop("disabled", false);
    //    } else {
    //        $("#carouselInstructor").find('img:first').parent().addClass('active');
    //    }
    //se invece seleziono un diverso insegnante lo salvo nel cookie
    $('#carouselInstructor').on('slid.bs.carousel', function () {
        idInsegnante = $(this).find('.active').children().data('id');
        nomeInsegnante = $(this).find('.active').children().attr('alt');
        clearInput();
        if (idInsegnante != "0") {
            document.cookie = "insegnante=" + idInsegnante;
            selectPalestra(idInsegnante);

        } else {
            //sono all'interno di un evento!
            idEvento = $(this).find('.active').children().data('evento');
            console.log(`registro l'evento: ` + idEvento);
            listAllUsers(idEvento);
        }
    });
    /**
     * applico la scelta della palestra
     * ho gia aquisito il nome dell'insegnante
     */
    $('#Info').on('click', '#Palestre input', function (e) {
        let idx = $(this).val();
        if ($(this).is(':checked')) {
            idPalestra[$(this).val()] = $(this).next('label').text();
        } else {
            delete idPalestra[$(this).val()];
        }
        if (Object.keys(idSport).length !== 0 && Object.keys(idPalestra).length !== 0) {
            // if(typeof idSport !== "undefined"){
            var params = {};

            params['evn'] = idEvento;
            params['pal'] = idPalestra;
            params['ins'] = idInsegnante;
            params['tim'] = dataSelezionata;
            params['spo'] = idSport;
            getListAllievi(params);
            //            console.log('getListAllievi - From Palestra');
            //            console.log(params);
        }
    });
    //imposto il controllo sul select dello sport.
    $('#Info').on('click', '#Sport input', function () {
        if ($(this).is(':checked')) {
            idSport[$(this).val()] = $(this).next('label').text();
        } else {
            delete idSport[$(this).val()];
        }
        if (Object.keys(idPalestra).length !== 0 && Object.keys(idSport).length !== 0) {
            var params = {};
            params['pal'] = idPalestra;
            params['ins'] = idInsegnante;
            params['tim'] = dataSelezionata;
            params['spo'] = idSport;
            params['evn'] = idEvento;
            getListAllievi(params);

            //            console.log('getListAllievi - From Sport');
            //            console.log(params);
        }
    });

    count = 0;

    /**
     * attivo il controllo sugli utenti
     * Quando clicco sull'utente e sono in un evento deve salvare in altro modo
     */
    $('body').on('click', '#elencoAllievi input', function () {
        var params = {};
        params['pal'] = idPalestra;
        params['ins'] = idInsegnante;
        params['tim'] = dataSelezionata;
        params['spo'] = idSport;
        params['id'] = $(this).val();
        params['evn'] = idEvento;

        if (this.checked) {
            saveListAllievi($(this), params);
            count++;
        } else {
            //            console.log(params);
            removeListAllievi($(this), params);
            count--;
        }
        $('#tabPresTotP').html(count);
    });

    $('body').on('keyup', '#filtraAllievi', function () {
        tx = $(this).val();
        TX = tx.toUpperCase();
        $("#elencoAllievi label").each(function (index) {
            nm = $(this).text();
            if (nm.toUpperCase().indexOf(TX) > -1) {
                $(this).next().removeClass('d-none');
                $(this).removeClass('d-none');
            } else {
                $(this).addClass('d-none');
                $(this).next().addClass('d-none');
            }

        });
    });



});



/**
 * ------------------------------------------
 * Funzioni da attivare quando clicco su Registro
 * ------------------------------------------
 */

$(document).ready(function () {
    //    mostroPalestreSport()
    $('#myTab a[href="#Registro"]').on('click', function () {
        console.log('Passo a Registro');
        //se tolgo il commento memorizzo il tab selezionato
        //        document.cookie = "theTab=Registro";
        //        $('#lePalestre,#gliSport').empty();
        //        mostroPalestreSport();
    });
    ////    --- Attivo la lettura del form quando clicco su Submit
    //    $('#formInsert').on("submit", function (event) {
    //        event.preventDefault();
    //        var data = $('#formInsert').serializeArray();
    //        let formData={};
    //        $.each($('#formInsert').serializeArray(), function (index, fieldData) {
    //            if (fieldData.name.endsWith('[]')) {
    //                let name = fieldData.name.substring(0, fieldData.name.length - 2);
    //                if (!(name in formData)) {
    //                    formData[name] = [];
    //                }
    //                formData[name].push(fieldData.value);
    //            } else {
    //                formData[fieldData.name] = fieldData.value;
    //            }
    //        });
    //        insertUtente(formData);
    //    });
});// document-ready


/**
 * ------------------------------------------
 * Funzioni da attivare quando clicco su Presenze
 * ------------------------------------------
 */
$(document).ready(function () {
    //lla pressione del tasto presenze
    document.querySelector('#myTab a[href="#Presenze"]').addEventListener('click', getListPresenze);

    //se cambio la data presenze devo rigenerare l'elenco in base al mese
    // document.getElementById('dataPresenze').addEventListener('change', (event) => {
    //     updDate(event);
    //     getListPresenze();
    // });

    document.getElementById('mesePresenze').addEventListener('blur', (event) => {
        let io = event.target;
        let val = io.value;
        // io.nextElementSibling.innerText=`0${val}`;
        updDate(event);
        getListPresenze();
    });
    document.getElementById('annoPresenze').addEventListener('blur', (event) => {
        debugger
        let io = event.target;
        let val = io.value;
        // io.nextElementSibling.innerText=val;
        updDate(event);
        getListPresenze();
    });


});