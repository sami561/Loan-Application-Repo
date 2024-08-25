package com.bank.bank;

import org.springframework.data.jpa.repository.JpaRepository;


public interface BankRepo extends JpaRepository<Bank,Integer> {
    long count();
}
