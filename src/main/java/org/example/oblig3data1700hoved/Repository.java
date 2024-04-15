package org.example.oblig3data1700hoved;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@org.springframework.stereotype.Repository
public class Repository {

    @Autowired
    private JdbcTemplate db;


    public void lagreBilett(Bilett innBilett){
        String sql = "INSERT INTO bilett (film, antall, navn, telefon, epost) VALUES(?,?,?,?,?)";
        db.update(sql,innBilett.getFilm(), innBilett.getAntall(), innBilett.getNavn(), innBilett.getTelefon(), innBilett.getEpost());
    }

    public List<Bilett> hentAlle(){
        String sql = "SELECT * FROM bilett";
        List<Bilett> alleBiletter = db.query(sql, new BeanPropertyRowMapper<>(Bilett.class));
        return alleBiletter;
    }

    public void slettAlle(){
        String sql = "DROP TABLE bilett";
        db.update(sql);
    }

}
