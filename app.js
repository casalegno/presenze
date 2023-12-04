// Codice JavaScript per la gestione delle interazioni della web app
// Sarà popolato man mano che implementiamo le varie funzionalità

$(document).ready(function() {
    // Popola la lista delle palestre al caricamento della pagina
    $.ajax({
        url: "api.php",
        method: "GET",
        data: { action: "getPalestre" },
        success: function(data) {
            var selectPalestre = $("#selectPalestre");
            selectPalestre.empty();
            selectPalestre.append("<option value='' disabled selected>Seleziona palestra</option>");

            $.each(data, function(index, palestra) {
                selectPalestre.append("<option value='" + palestra.id_palestra + "'>" + palestra.nome + "</option>");
            });
        }
    });

    // Gestisci il cambiamento nella selezione della palestra
    $("#selectPalestre").change(function() {
        var idPalestra = $(this).val();

        // Popola la lista degli insegnanti in base alla palestra selezionata
        $.ajax({
            url: "api.php",
            method: "GET",
            data: { action: "getInsegnanti", idPalestra: idPalestra },
            success: function(data) {
                var selectInsegnanti = $("#selectInsegnanti");
                selectInsegnanti.empty();
                selectInsegnanti.append("<option value='' disabled selected>Seleziona insegnante</option>");

                $.each(data, function(index, insegnante) {
                    selectInsegnanti.append("<option value='" + insegnante.id_insegnante + "'>" + insegnante.nome + "</option>");
                });

                // Abilita la selezione degli insegnanti
                selectInsegnanti.prop("disabled", false);
            }
        });
    });

    // Gestisci il cambiamento nella selezione degli insegnanti
    $("#selectInsegnanti").change(function() {
        var idInsegnante = $(this).val();

        // Popola la lista delle discipline in base all'insegnante selezionato
        $.ajax({
            url: "api.php",
            method: "GET",
            data: { action: "getDiscipline", idInsegnante: idInsegnante },
            success: function(data) {
                var selectDiscipline = $("#selectDiscipline");
                selectDiscipline.empty();
                selectDiscipline.append("<option value='' disabled selected>Seleziona disciplina</option>");

                $.each(data, function(index, disciplina) {
                    selectDiscipline.append("<option value='" + disciplina.id_disciplina + "'>" + disciplina.nome + "</option>");
                });

                // Abilita la selezione delle discipline
                selectDiscipline.prop("disabled", false);
            }
        });
    });

    // Gestisci il cambiamento nella selezione della disciplina
    $("#selectDiscipline").change(function() {
        // Abilita la selezione della data
        $("#selectData").prop("disabled", false);
    });

    // Gestisci il click sul pulsante "Visualizza Iscritti"
    $("#btnVisualizzaIscritti").click(function() {
        var idInsegnante = $("#selectInsegnanti").val();
        var dataSvolgimento = $("#selectData").val();

        // Ottieni e visualizza l'elenco degli iscritti per l'insegnante e la data selezionati
        $.ajax({
            url: "api.php",
            method: "GET",
            data: { action: "getIscritti", idInsegnante: idInsegnante, dataSvolgimento: dataSvolgimento },
            success: function(data) {
                var elencoIscritti = $("#elencoIscritti");
                elencoIscritti.empty();

                if (data.length > 0) {
                    elencoIscritti.append("<h4>Elenco Iscritti:</h4>");
                    elencoIscritti.append("<ul>");

                    $.each(data, function(index, iscritto) {
                        elencoIscritti.append("<li>" + iscritto.nome + " - Presente: " + (iscritto.presente ? "Sì" : "No") + "</li>");
                    });

                    elencoIscritti.append("</ul>");
                } else {
                    elencoIscritti.append("<p>Nessun iscritto trovato per l'insegnante e la data selezionati.</p>");
                }
            }
        });
    });
});
