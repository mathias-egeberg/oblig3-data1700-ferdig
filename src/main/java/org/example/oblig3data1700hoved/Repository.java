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
        String sql = "INSERT INTO billett (film, antall, navn, telefon, epost) VALUES(?,?,?,?,?)";
        db.update(sql,innBilett.getFilm(), innBilett.getAntall(), innBilett.getNavn(), innBilett.getTelefon(), innBilett.getEpost());
    }

    public List<Bilett> hentAlle(){
        String sql = "SELECT * FROM billett";
        List<Bilett> alleBiletter = db.query(sql, new BeanPropertyRowMapper<>(Bilett.class));
        return alleBiletter;
    }

    public void slettAlle(){
        String sql = "DELETE FROM billett";
        db.update(sql);
    }

    public void slettEn(int innId){
        String sql = "DELETE FROM billett where ID=?";
        db.update(sql, innId);
    }

    public Bilett hentEnBilett(int id){
        String sql = "SELECT * FROM billett WHERE id=?";
        Bilett enBilett = db.queryForObject(sql,BeanPropertyRowMapper.newInstance(Bilett.class),id);
        return enBilett;
    }

    public void endreEnBillett(Bilett billett) {
        String sql = "UPDATE billett SET film=?, antall=?, navn=?, telefon=?, epost=?";
        db.update(sql, billett.getFilm(), billett.getAntall(), billett.getNavn(), billett.getTelefon(), billett.getEpost());
    }


}
