package com.bank.CreditType;

import com.bank.requestSubmit.RequestSubmit;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ICreditTypeService {
    public CreditType CreateCreditType(CreditType ct);
    public List<CreditType> findAllCreditType();
    public CreditType  findCreditTypeById(int id);
    public void DeleteCreditType(int id);
    public CreditType UpdateCreditType(CreditType ct);
    public Page<CreditType> findAllPaginatedCreditType(int pageNum, int pageSize, String sortField, String sortDir);

}
