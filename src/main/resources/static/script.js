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

function formaterOutput(bilettene){
    let ut = "<table><tr><th>Film</th><th>Antall</th><th>Navn</th><th>Telefon</th><th>Epost</th><th>Kommando</th></tr>";
    for (const biletter of bilettene){
        ut+="<tr><td>"+biletter.film+"</td><td>"+biletter.antall+"</td><td>"+biletter.navn+"</td><td>"+biletter.telefon+"</td><td>"+biletter.epost+"</td><td><button class='btn btn-danger' onclick='slettEn("+biletter.id+")'>Slett</button></td></tr>";
    }
    ut+="</table>";
    $("#output").html(ut);
}

//Funksjon for å laste inn dataene automatisk
window.addEventListener("load", hentAlle);