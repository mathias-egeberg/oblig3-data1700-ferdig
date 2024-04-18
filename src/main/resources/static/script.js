function regData(){

        //Registrer dataene fra inputboksene
        const film = $("#dropdown").val();
        const antall = $("#antall").val();
        const navn = $("#navn").val();
        const telefon = $("#telefon").val();
        const epost = $("#epost").val();


        //Sjekker om feltene er tomme
        if (!film || !antall || !navn || !telefon || !epost){
            alert("Må fylle ut alle felter")
            return; //Og avslutter funskjonen hvis noen felter er tomme
        }

        //Sjekker om epost er riktig formatert
        const epostValidering = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!epostValidering.test(epost)){
            alert("Skriv inn en gyldig epost");
            return; //Avslutter funksjonen hvis epost ikke er riktig
        }

        //Telefonvalidering for 8 nummer
        const telefonValidering = /^\d{8}$/;
        if (!telefonValidering.test(telefon)){
            alert("Skriv inn 8 siffer for telefon")
            return; //Avlsutter funkjsonen hvis telefon ikke er riktig
        }

    const bilett = {
        film : film,
        antall : antall,
        navn : navn,
        telefon : telefon,
        epost : epost
    };
    $.post("/lagre", bilett, function (){
        hentAlle();
    });
    $("#dropdown").val("");
    $("#antall").val("");
    $("#navn").val("");
    $("#telefon").val("");
    $("#epost").val("");
}

function hentAlle(){
    $.get("/hentAlle", function (data){
        formaterOutput(data);
    });
}

function slettAlle(){
    $.get("/slettAlle", function (){
        hentAlle()
    })
}

function slettEn(id){
    const url = "slettEn?id=" + id;
    $.ajax({
        url: url,
        type: 'DELETE',
        success: function (result){
            hentAlle();
        }
    });
}

$(function(){
    console.log("laster inn ønsket billett");
    // hent kunden med kunde-id fra url og vis denne i skjemaet
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const url = "/hentEnBillett?" + id;
    $.get(url, function(bilett){
        $("#bilettId").val(bilett.id);
        $("#dropdown").val(bilett.film);
        $("#antall").val(bilett.antall);
        $("#navn").val(bilett.navn);
        $("#telefon").val(bilett.telefon);
        $("#epost").val(bilett.epost);
    });
});

function endreBilletten() {
    const kunde = {
        id: $("#bilettId").val(),
        film: $("#dropdown").val(),
        antall: $("#antall").val(),
        navn: $("#navn").val(),
        telefon: $("#telefon").val(),
        epost: $("#epost").val()
    };

    $.ajax({
        url: "/oppdaterBillett",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(kunde),
        success: function() {
            window.location.href = "/order.html";
        }
    });
}

function formaterOutput(bilettene){
    let ut = "<table><tr><th>Film</th><th>Antall</th><th>Navn</th><th>Telefon</th><th>Epost</th><th>Kommando</th></tr>";
    for (const biletter of bilettene){
        ut+="<tr><td>"+biletter.film+"</td><td>"+biletter.antall+"</td><td>"+biletter.navn+"</td><td>"+biletter.telefon+"</td><td>"+biletter.epost+"</td><td> <a class='btn btn-primary'\n" +
            "href='edit.html?id=" + biletter.id + "'>Endre</a> <br> <p></p> <button class='btn btn-danger' onclick='slettEn("+biletter.id+")'>Slett</button></td></tr>";
    }
    ut+="</table>";
    $("#output").html(ut);
}

//Funksjon for å laste inn dataene automatisk
window.addEventListener("load", hentAlle);