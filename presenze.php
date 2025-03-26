<?php
//recupero il mese e l'anno attuali
$mese = date('m');
$anno = date('Y');
$allieviJson = printAllievi(true);
echo "<script> var elencoAllievi={$allieviJson};"
  . "</script>";
$allieviArray = json_decode($allieviJson, true);
$optAllievi = "<option></option>";
foreach ($allieviArray as $key => $allievo) {
  $optAllievi .= "<option value='{$key}'>{$allievo['nome']}</option>";
}
?>
<section id="formPresenze">
  <label for="nome" class="form-label">Seleziona Allievo</label>
  <select class="form-select" aria-describedby="nomeHelpBlock" required onchange="getAllievoPresenze()" id="nomePresenze">
    <?= $optAllievi; ?>
  </select>
  <!--Riga per la selezione della data -->
  <div class="mb-3">
    <label for="dataPresenze" class="form-label">Seleziona Mese e Anno</label>
    <div class="d-flex">
      <input type="number" min="1" max="12" value="<?= intval($mese) ?>" id="mesePresenze" name="mesePresenze"  class="form-control mx-2" />
      <input type="number" min="2023" max="2030" value="<?= $anno ?>" id="annoPresenze" name="annoPresenze"  class="form-control mx-2" />
    </div>
  </div>
</section>

<section id="allievoPresenze" class="d-none">
  <p class="d-inline-flex gap-1">
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#listaPresenze" aria-expanded="false" aria-controls="listaPresenze">Lista Presenze</button>
    <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#totaliPresenze" aria-expanded="false" aria-controls="totaliPresenze">Totali Presenze</button>
  </p>

  <div class="accordion-collapse collapse multi-collapse" id="listaPresenze" data-bs-parent="#allievoPresenze">
    <div class="card card-body" id="listaPresenzeCard">
      Questi sono le presenze
    </div>
  </div>
  <div class="accordion-collapse collapse multi-collapse" id="totaliPresenze" data-bs-parent="#allievoPresenze">
    <div class="card card-body" id="totaliPresenzeCard">
      Questi sono i totali
    </div>
  </div>

</section>



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