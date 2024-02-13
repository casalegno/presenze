async function doajax(act, p) {
    return $.ajax({
        url: "api.php",
        method: "GET",
        data: {
            action: act, params: p,
        },
        cache: false,
        dataType: 'json', // ** ensure you add this line **
    });
}

function isJson(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}




function alertAppend(message, type, location) {
    //    -- inserisco l'alert
    location.before(`<div class="alert alert-${type} alert-dismissible" role="alert">`
            + `<div>${message}</div>`
            + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            +'</div>'
            );
}


function spinnerAppend(location) {
    location.html(`<div class="d-flex justify-content-center">
<div class="spinner-grow" role="status">
  <span class="sr-only">Loading...</span>
</div></div>`);
}

/**
 * Funzione che riceve un elenco di allievi e crea i pulsanti per gestirli
 * @param {type} data
 * @returns {undefined}
 */
function popoloAllievi(data) {
    delete data.sql;
    let presenze = "";
    if (data) {
        if (typeof data['presenze'] !== 'undefined') {
            presenze = data['presenze'];
            delete data['presenze'];
        }
        $('#elencoAllievi').empty();
        jQuery.each(data, function (id, obj) {
//            console.log(id);
//            console.log(obj);
            let check;
            if (presenze.includes(id)) {
                check = 'checked="checked"';
            }
            $('#elencoAllievi').append(' <input type="checkbox" ' + check + ' value="' + id + '" data-name="' + obj.nome + '" class="btn-check" id="btn-check-' + id + '-allievo" autocomplete="off"><label class="btn btn-outline-secondary btn-lg btn-block py-1" for="btn-check-' + id + '-allievo">' + obj.nome + '</label> ');
        });
        data=null;
        //$('#myTab a[href="#Presenze"]').tab('show');
    } else {
        console.log = "non ho data";
    }
}

/**
 * Funzione Asyncrona che lancia la chiamata Ajax per il recupero degli allievi se clicco i pulsanti palestra e sport
 */
async function getListAllievi(p) {
    data = await doajax('lista', p);
//    console.log('Risposta ajax:');
//    console.log(data);
    popoloAllievi(data);
    data=null;

}

/**
 * Funzione chiamata in caso di evento che mostra tutti gli allievi della scuola che possono partecipare all'evento!
 * @param {type} ev
 * @returns {undefined}
 */
async function listAllUsers(ev) {
    $('#Palestre,#Sport,#elencoAllievi').empty();
    let p = [];
    p['evn'] = ev;
    data = await doajax('all', p);
//    inputSearch=document.createElement('input');
//    inputSearch.classList.add("filterEventList");
//    console.log(inputSearch);
//    $(inputSearch).insertBefore( '#elencoAllievi' );
    popoloAllievi(data);
    data=null;
}



/**
 * Funzione per il salvataggio degli allievi
 */
async function saveListAllievi(obj, p) {
    console.log(p);
    if (p['evn'] == 0) {
        data = await doajax('salva', p);
        if (data) {
            obj.next().removeClass('btn-outline-secondary').addClass('btn-outline-warning');
            data=null;
        }
    } else {
        elencoObj = [];
        elencoEvento.push(p['id']);
        elencoObj.push(obj);
        //se esiste gia un timeout lo cancello
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // Imposta un nuovo timeout
        timeoutId = setTimeout(saveAllieviEvento, 8000, elencoObj, p);

    }
}
function saveAllieviEvento(objs, p) {
    data=null;
    //data = await doajax('salva', p);
    if (data) {
        each
        obj.next().removeClass('btn-outline-secondary').addClass('btn-outline-warning');
//        console.log(data);
//        console.log('Salvo id:' + obj.val() + ' = ' + obj.attr('data-name'));
        console.log('ho salvato');
        console.log(elencoEvento);
        console.log('timoutId: ' + timeoutId);
        timeoutId,data = null; //azzero il timoutid per una seconda chiamata
        
    }
}



async function removeListAllievi(obj, p) {
   
data = await doajax('rimuovi', p);
//console.log(data['sql']);
    if (data) {
        obj.next().removeClass('btn-outline-warning').addClass('btn-outline-secondary');
//        console.log(data);
//        console.log('Rimuovo id:' + obj.val() + ' = ' + obj.attr('data-name'));
        data=null;
    }
}
/**
 * Format date alternativa
 * Funzione presa da https://linuxhint.com/format-date-as-yyyy-mm-dd-in-javascript/
 */
function getDate() {
//var date = new Date("8 Sep 2000");
    var date = new Date();
    var dateFormat = date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    return dateFormat;
}


/**
 * Funzione che restituisce il contenuto del cookie passato come nome
 * Funzione presa da https://w3schools.com/js/js_cookies.asp
 */
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

/**
 * Queste funzioni si occupano di popolare i campi relativi alle palestre ed ai corsi seguiti
 * @param {*} dest 
 * @param {*} idx 
 * @param {*} val 
 * @param {*} ut 
 */
function popolaPalestra(dest, idx, val, ut = "") {
    $(dest).append(`<input type="checkbox" data-utente="${ut}" class="btn-check" name="btnPalestraC[]" id="btn${idx}Pal${ut}" autocomplete="off" value="${val}">`
            + `<label class="btn btn-outline-secondary btn-lg" for="btn${idx}Pal${ut}">${elencoPalestre[val]}</label>`);
}
function popolaSport(dest, idx, val, ut = "") {
    $(dest).append(`<input type="checkbox" data-utente="${ut}" class="btn-check" name="btnSportC[]" id="btn${idx}Spo${ut}"  value="${val}">`
            + `<label class="btn btn-outline-secondary btn-lg btn-block" for="btn${idx}Spo${ut}">${elencoSport[val]}</label>`);
}
function selectSport(ut) {
// $('#Sport,#elencoAllievi').empty();
    sport = $('#ins' + ut).children().data('corsi').split(',');
    $.each(sport, function (idx, val) {
        popolaSport('#Sport', idx, val, ut);
    });
}
function selectPalestra(ut) {
    $('#Palestre,#Sport,#elencoAllievi').empty(); //.html('<input type="hidden" name="btnPal" id="hidno" autocomplete="off" value="no">');
    palestre = $('#ins' + ut).children().data('palestre').split(',');
    $.each(palestre, function (idx, val) {
        popolaPalestra('#Palestre', idx, val, ut);
    });
    selectSport(ut);
}


/**
 * Funzione che salva l'utente
 * NON USATA
 */
async function insertUtente(p) {
    data = await doajax('inserisci', p);
    console.log('Ritorno i dati $opts da php');
    console.log(data);
    if (!data['stato']) {
        alertAppend('Inserimento NON riuscito: ' + data['messaggio'], 'danger', $('#formInsert'));
        return false;
    }
//$('#formInsert').trigger("reset");
    alertAppend('Inserimento Riusito', 'success', $('#formInsert'));
}


async function getListPresenze(p) {
    data = await doajax('mese', p);
    $('.tablePresenze').empty();
    if (data) {
        jQuery.each(data, function (id, nome) {
            $('.tablePresenze').append('<tr><th scope="row">1</th><td>Mark</td><td>Otto</td><td>@mdo</td></tr>');
        });
        data=null;
    } else {
        console.log = "non ho data";
    }
}
/**
 * Funzione che popola palestre e sport.
 */
function mostroPalestreSport() {
    $.each(elencoPalestre, function (idx, val) {
        popolaPalestra('#lePalestre', idx, val);
    });
    $.each(elencoSport, function (idx, val) {
        popolaSport('#gliSport', idx, idx);
    });
}

function clearInput(){
    idPalestra = {};
        idSport = {};
        idEvento=0;
        $('#tabPresTotP').html('0');
}




