<?php
// Includi il file load.php per avere accesso alle funzionalità di WordPress
require_once('load.php');
?>
<!--Riga per la selezione della data -->
<p>Seleziono l'utente e visualizzo tutte le lezioni a cui ha partecipato</p>
<div class="mb-3">
    <label for="dataPresenze" class="form-label">Seleziona Data</label>
    <input type="date" class="form-control form-control-lg" id="dataPresenze" name="dataGiorno">
</div>

<table class="table">
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