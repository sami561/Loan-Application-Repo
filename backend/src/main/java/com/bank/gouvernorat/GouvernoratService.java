package com.bank.gouvernorat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class GouvernoratService implements IGouvernoratService {
    @Autowired
    GouvernoratRepo gr;
    @Override
    public Gouvernorat createGouvernorat(Gouvernorat g) {
        return gr.save(g);
    }

    @Override
    public Gouvernorat findGouvernoratById(int id) {
        return gr.findById(id).get();
    }

    @Override
    public List<Gouvernorat> findAllGouvernorats() {
        return gr.findAll();
    }

    @Override
    public Gouvernorat updateGouvernorat(Gouvernorat a) {
        return gr.save(a);}

    @Override
    public void deleteGouvernorat(int id) {
        gr.deleteById(id);

    }
}
