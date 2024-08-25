package com.bank.CreditType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class CreditTypeService implements ICreditTypeService{
    @Autowired
    CreditTypeRepo ctr;
    @Override
    public CreditType CreateCreditType(CreditType ct) {
        return ctr.save(ct);
    }

    @Override
    public List<CreditType> findAllCreditType() {
        return ctr.findAll();
    }

    @Override
    public CreditType findCreditTypeById(int id) {
        return ctr.findById(id).get();
    }

    @Override
    public void DeleteCreditType(int id) {
        ctr.deleteById(id);
    }

    @Override
    public CreditType UpdateCreditType(CreditType ct) {
        return ctr.save(ct);
    }

    @Override
    public Page<CreditType> findAllPaginatedCreditType(int pageNum, int pageSize, String sortField, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);
        return ctr.findAll(pageable);
    }
}
