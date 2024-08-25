package com.bank.gouvernorat;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GouvernoratRepo extends JpaRepository<Gouvernorat,Integer> {
}
