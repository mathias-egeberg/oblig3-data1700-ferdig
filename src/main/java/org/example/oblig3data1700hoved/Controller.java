package org.example.oblig3data1700hoved;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {


    @Autowired
    private Repository rep;


    @PostMapping("/lagre")
    public void lagreBilett(Bilett innBilett){
        rep.lagreBilett(innBilett);
    }

    @GetMapping("/hentAlle")
    public List<Bilett> hentAlle(){
        return rep.hentAlle();
    }

    @GetMapping("/slettAlle")
    public void slettAlle(){
        rep.slettAlle();
    }

    @DeleteMapping("/slettEn")
    public void slettEn(@RequestParam("id") int innId){rep.slettEn(innId);}

    @GetMapping("/hentEnBillett")
    public Bilett hentEn(@RequestParam("id") int id) {
        return rep.hentEnBilett(id);
    }

    @PostMapping("/endreEnBillett")
    public void endreEnBillett(Bilett endreBilletten){rep.endreEnBillett(endreBilletten);}
}
