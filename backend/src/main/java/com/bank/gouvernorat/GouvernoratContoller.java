package com.bank.gouvernorat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gouvernorat")
public class GouvernoratContoller {

    @Autowired
    IGouvernoratService igs;
    @GetMapping("/find/{id}")
    public ResponseEntity<Gouvernorat> findGouvernoratById(@PathVariable("id") int id){
        Gouvernorat d = igs.findGouvernoratById(id);
        if (d==null){
            return ResponseEntity.notFound().build();
        }else {
            return ResponseEntity.ok(d);
        }
    }
    @PostMapping("/add")
    public ResponseEntity<Gouvernorat>addGouvernorat(@RequestBody Gouvernorat g){
        Gouvernorat gr = igs.createGouvernorat(g);
        return ResponseEntity.ok(gr);
    }

    @PutMapping("/update")
    public ResponseEntity<Gouvernorat>updateGouvernorat(@RequestBody Gouvernorat g){
        Gouvernorat gr = igs.updateGouvernorat(g);
        return ResponseEntity.ok(gr);
    }


    @DeleteMapping("/delete/{id}")
    public void  deleteGouvernorat(@PathVariable("id") int id){
        igs.deleteGouvernorat(id);
    }



    @GetMapping("/all")
    public ResponseEntity<List<Gouvernorat>> findAll(){
        return ResponseEntity.ok(igs.findAllGouvernorats());
    }
}
