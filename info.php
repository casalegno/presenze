<?php
require_once 'api.php';

prepareJs();
?>
<!--Riga per la selezione della data -->
                    <div class="mb-3">
                        <label for="dataGiorno" class="form-label">Seleziona Data</label>
                        <input type="date" class="form-control form-control-lg" id="dataGiorno" name="dataGiorno">
                    </div>

                    <!--Riga per la selezione del istruttore tramite carousel -->
                    <div id="carouselInstructor" class="carousel slide mb-3" data-bs-interval="false">
                        <div class="carousel-inner">
                                <?php printIstruttori(); ?>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselInstructor"
                            data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselInstructor"
                            data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                    <!--Riga per la selezione della palestra -->
                    <div class="mb-3 d-flex justify-content-center">
                        <div class="btn-group btn-group-lg" role="group" aria-label="ScegliPalestra" id="Palestre">
                        </div>
                    </div>

                    <!--Riga per la selezione delle sport -->
                    <div class="mb-5">
                        <div class="form-check d-grid gap-2 d-block" id="Sport" role="group"
                            aria-label="Scegli lo sport">
                        </div>
                    </div>
                    <h2 class="text-center">Elenco Allievi: <span id="tabPresTotP"></span></h2>
                    <div class="mb-3 ">
                        <input type="text" class="form-control form-control-lg" id="filtraAllievi" name="filtraAllievi" placeholder="FiltraAllievi">
                    </div>
                    <div id="elencoAllievi" class="my-4 d-grid gap-1 d-block" role="group"
                        aria-label="Lista degli Alliei">
                        
                    </div>
