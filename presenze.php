<?php
//recupero il mese e l'anno attuali
$mese=date('m');
$anno=date('Y');
?>
<!--Riga per la selezione della data -->
<p>Seleziono l'utente xxe visualizzo tutte le lezioni a cui ha partecipato</p>
<div class="mb-3">
    <label for="dataPresenze" class="form-label">Seleziona Mese e Anno</label>
    <div class="d-flex">
      <input type="number" min="01" max="12" value="<?= $mese ?>" id="mesePresenze" name="mesePresenze" class="form-control mx-2"/>
      <input type="number" min="2010" max="2050" value="<?= $anno ?>" id="annoPresenze" name="annoPresenze" class="form-control mx-2"/>
      <input type="date" class="form-control form-control-lg d-none" id="dataPresenze" name="dataGiorno">
    </div>
</div>

<table class="table" id="tablePresenze">
  <thead>
    <tr>
      <th scope="col">Giorno</th>
      <th scope="col">Palestra</th>
      <th scope="col">Corso</th>
      <th scope="col">Persone</th>
    </tr>
  </thead>
  <tbody class="tablePresenze">
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
  </tbody>
</table>

    <!-- Pannello presenze  - Fine -->