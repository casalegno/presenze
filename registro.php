<?php
//recupero il mese e l'anno attuali
$mese = date('m');
$anno = date('Y');


?>
<p>Visualizzo l'elenco di tutte le lezioni fatte nel mese</p>
<section id="formRegistro">
  <form id="userInfo" class="">
    <div class="mb-3">
      <label for="nome" class="form-label">Seleziona Allievo</label>
      <div class="d-flex gap-4">
        <select class="form-select" aria-describedby="nomeHelpBlock" required onchange="getInfoAllievo()" id="nomeRegistro">
          <?= $optAllievi; ?>
        </select>
        <input type="number" min="2010" max="2050" value="<?= $anno ?>" id="annoRegistro" class="form-control" onchange="getInfoAllievo()" />
      </div>
      <div id="nomeHelpBlock" class="form-text">
        Seleziona l'allievo per il quale vuoi visualizzare le informazioni
      </div>
    </div>
  </form>
  <form id="formInsert" class="d-none">
    <div class="mb-3">
      <label for="nome" class="form-label">Nome</label>
      <input type="text" id="nome" name="textCognomeNome" class="form-control" aria-describedby="nomeHelpBlock" required placeholder="Cognome Nome">
      <div id="nomeHelpBlock" class="form-text">
        Inserisci il cognome ed il nome dell'allievo con le iniziali maiuscole: Cognome Nome
      </div>
    </div>
    <div class="mb-3">
      <label for="telefono" class="form-label">Cellulare</label>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">+39</span>
        <input type="tel" pattern="[0-9]{3}[0-9]{7}" name="telTelefono" id="telefono" class="form-control" placeholder="000 1122333" aria-describedby="telefonoHelpBlock">
      </div>
      <div id="telefonoHelpBlock" class="form-text">
        Numero di celluare nel formato prefisso[spazio]numero
      </div>
    </div>
    <div class="mb-3">
      <label for="email" class="form-label">Email address</label>
      <input type="email" class="form-control" name="emailEmail" id="email" aria-describedby="emailHelp" required placeholder="email@dominio.xx">
      <div id="emailHelp" class="form-text">L'indirizzo email serve esclusivamente per contattare l'utente dalla rks.</div>
    </div>
    <div class="mb-3">
      <label for="lePalestre" class="form-label">Palestre</label>
      <div class="btn-group btn-group-lg" role="group" aria-label="ScegliPalestra" id="lePalestre">
      </div>
    </div>
    <div class="mb-3">
      <label for="gliSport" class="form-label">Sport</label>
      <div class="btn-group btn-group-lg" role="group" aria-label="ScegliSport" id="gliSport">
      </div>
    </div>
    <div class="mb-3">
      <label for="livello" class="form-label">Livello</label>
      <input type="range" class="form-range" name="rangeLivello" value="1" min="1" max="5" step="1" id="livello" oninput="this.nextElementSibling.value = this.value">
      <output class="d-block text-center h2">1</output>
    </div>
    <button type="submit" class="btn btn-primary">Salva</button>
  </form>
</section>
<section id="infoRegistro" class="d-none">
  <p class="d-inline-flex gap-1">
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#listaPresenze" aria-expanded="false" aria-controls="listaPresenze">Lista Presenze</button>
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#totaliPresenze" aria-expanded="false" aria-controls="totaliPresenze">Totali Presenze</button>
  </p>

  <div class="accordion-collapse collapse multi-collapse" id="listaPresenze" data-bs-parent="#infoRegistro">
    <div class="card card-body" id="listaPresenzeCard">
      Questi sono le presenze
    </div>
  </div>
  <div class="accordion-collapse collapse multi-collapse" id="totaliPresenze" data-bs-parent="#infoRegistro">
    <div class="card card-body" id="totaliPresenzeCard">
      Questi sono i totali
    </div>
  </div>

</section>