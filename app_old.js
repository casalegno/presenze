// Codice JavaScript per la gestione delle interazioni della web app
// Sarà popolato man mano che implementiamo le varie funzionalità


//preso da bootstrap
//const alertList=document.querySelectorAll('.alert');

//const alerts=[...alertList].map(element=> new bootstrap.Alert(element));

const palestre={'UB':'Uboldo','VG':'Villaguardia','LM':'Lomazzo'};

//costante array di oggetti
const associa=[
{
        code:'ub', //codice palestra
        name:'Uboldo', // nome del paese
        ins:['3'], // gli insegnanti
        sport:['j','k']; // gli sport
    },
    {
        code:'vg', //codice palestra
        name:'Villaguardia', // nome del paese
        ins:['1','2'], // gli insegnanti
        sport:['j','k','f']; // gli sport
    },
    {
        code:'lm', //codice palestra
        name:'Lomazzo', // nome del paese
        ins:['2'], // gli insegnanti
        sport:['j']; // gli sport
    },
    ];


const dati={
    palestre:{'ub':'Uboldo','vg':'Villaguardia','lm':'Lomazzo'},
    insegnanti:{'1':'Riccardo Guidolin','2':'Marco Casalegno','3':'Paride Cartabia'},
    sport:{'j':'Jeet Kune Do','k':'Krav Maga','f':'Kali Filippino'},
relazione:[
    {insegnante:'1',sport:['k','f'],palestra:['vg']},
    {insegnante:'2',sport:['j'],palestra:['vg','lm']},
    {insegnante:'3',sport:['j'],palestra:['ub']},
    ]
};


function getListAllievi(p) {
    // Popola la lista delle palestre al caricamento della pagina
    $.ajax({
        url: "api.php",
        method: "GET",
        data: {
            action: 'allievi', params: p,
        },
        dataType: 'json', // ** ensure you add this line **
        success: function(data) {
            console.log(data);
            //$('#elencoAllievi').append("<p>prova</p>");
            jQuery.each(data, function(index, item) {
            //now you can access properties using dot notation
                //$('#elencoAllievi').append("<p>[id:"+index+"]=>"+item+"</p>");
                $('#elencoAllievi').append(' <input type="checkbox" class="btn-check" id="btn-check-'+index+'-allievo" autocomplete="off"><label class="btn btn-outline-secondary" for="btn-check-'+index+'-allievo">'+item+'</label> ');
            });
            $('#myTab a[href="#Presenze"]').tab('show');
        },
        // error: function(XMLHttpRequest, textStatus, errorThrown) {
        //    console.log("some error: "+XMLHttpRequest[]);
        // }
        error: function (response) {
            console.log("error:" +response.responseText);
            console.dir(response, { depth: null });
        },
        failure: function (response) {
            console.log("fail:"+response.responseText);
        }
        
    });
}




/**
 * Format date alternativa
 * Funzione presa da https://linuxhint.com/format-date-as-yyyy-mm-dd-in-javascript/
 */
function getDate(){
    //var date = new Date("8 Sep 2000");
    var date = new Date();
    var dateFormat = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate();
    console.log(dateFormat);
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


$(document).ready(function () {
    var datiUtente=[];
    //var 0 cookie inseg
    //var 1 data
    //var 2 palestra
    //var 3 nome palestra
    //var 4 sport
    //var 5 nome sport
    //var 6 nome ins.

    var mobile = (/iphone|ipad|ipod|android|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {
        //alert('mobile');
    } else {
        //alert('not');
    }


    //popolo le palestre
    $.each(dati.palestre,function(id,val){
        $('#Palestre').append('<input type="radio" class="btn-check" name="btnPal" id="btnpal'+id+'" autocomplete="off" value="'+id+'">'
            +'<label class="btn btn-outline-secondary btn-lg" for="btnpal'+id+'">'+val+'</label>');   
    });
    


    console.log('controllo il cookie:');
    datiUtente[0] = (getCookie('insegnante'))?getCookie('insegnante'):'1';
    datiUtente[6] = (datiUtente[0]!='1')?datiUtente[0]:'Riccardo Guidolin';
    
    console.log('il cookie insengnate:'+datiUtente[6]+'->'+datiUtente[0]);
    
    if(datiUtente[6]!=""){
        $("#carouselInstructor img[alt='"+datiUtente[6]+"']").parent().addClass('active');
        $("#selectPalestre").prop("disabled", false);
    }else{
        $("#carouselInstructor").find('img:first').parent().addClass('active');
    }

// controllo quale insegnante è attivo
    $('#carouselInstructor').on('slide.bs.carousel', function () {
        insName=$(this).find('.active').children().attr('alt');
        insId=$(this).find('.active').children().attr('data-id');
        console.log("event prima: l'insengnate selezionato è: "+insName);
    });

    $('#carouselInstructor').on('slid.bs.carousel', function () {
        insName=$(this).find('.active').children().attr('alt');
        insId=$(this).find('.active').children().attr('data-id');
        console.log("event selected: l'insengnate selezionato è: "+insName+'->'+insId);
        document.cookie = "insegnante=" + insId;
        datiUtente[0]=insId;
        datiUtente[6]=insName;
    });

    datiUtente[1]=getDate();
    $('#dataGiorno').val(datiUtente[1]);

/**
 * Gestisco la selezione delle palestre ed il passaggio dei dati
 * 
 */
    $('#dataGiorno').on('change',function(){
    //setto la data selezionata
        datiUtente[1]=$('#dataGiorno').val();

    });


    //ho gia aquisito il nome dell'insegnante
    $('input[type=radio][name=btnPal]').on('change',function(){
        datiUtente[2]=$(this).val();
        datiUtente[3]=$(this).next('label').text();
        $('#btnSport').removeClass('d-none');
        console.log('palestra='+datiUtente[2]+':'+datiUtente[3]+';');


    });

    $('input[type=radio][name=btnSport]').change(function() {
        datiUtente[4]=$(this).val();
        datiUtente[5]=$(this).next('label').text();

        $('[id*="tabPres"]').each(function(idx){
            $(this).html(datiUtente[idx]);
        });
        console.log('Ho settato i tre parametri: insegnante='+datiUtente[0]+':'+datiUtente[3]+'; palestra='+datiUtente[2]+':'+datiUtente[3]+'; data:'+datiUtente[1]+'; sport:'+datiUtente[4]+':'+datiUtente[5]);
        var params={};
        params['pal']=datiUtente[2];
        params['ins']=datiUtente[0];
        params['tim']=datiUtente[1];
        params['spo']=datiUtente[4];
        //console.info(params);
        var res=getListAllievi(params);
    });



});

