package com.bank.gouvernorat;

import java.util.List;

public interface IGouvernoratService {
    public Gouvernorat createGouvernorat(Gouvernorat g);
    public Gouvernorat findGouvernoratById(int id);
    public List<Gouvernorat> findAllGouvernorats() ;

    public Gouvernorat updateGouvernorat(Gouvernorat a);
    public void deleteGouvernorat(int id);
}
