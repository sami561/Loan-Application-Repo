package com.bank.bank;

import java.util.List;

public interface IBankService  {
    public Bank createBank(Bank b);
    public Bank findBankById(int id);
    public List<Bank> findAllBanks() ;

    public Bank updateBank(Bank a);
    public void deleteBank(int id);
    public long getBankCount();
}
