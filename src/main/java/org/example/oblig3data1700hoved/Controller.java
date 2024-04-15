package org.example.oblig3data1700hoved;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

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


}
