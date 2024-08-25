package com.bank.bank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BankService implements IBankService {
    @Autowired
    BankRepo br;
    @Override
    public Bank createBank(Bank b) {
        return br.save(b);
    }

    @Override
    public Bank findBankById(int id) {
        return br.findById(id).get();
    }

    @Override
    public List<Bank> findAllBanks() {
        return br.findAll();
    }

    @Override
    public Bank updateBank(Bank a) {
        return br.save(a);
    }

    @Override
    public void deleteBank(int id) {
       br.deleteById(id);
    }

    @Override
    public long getBankCount() {
        return br.count();
    }
}

