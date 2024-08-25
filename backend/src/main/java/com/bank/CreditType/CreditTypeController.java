package com.bank.CreditType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credit-types")
public class CreditTypeController {

    @Autowired
    private CreditTypeService creditTypeService;

    @PostMapping("/add")
    public CreditType createCreditType(@RequestBody CreditType creditType) {
        return creditTypeService.CreateCreditType(creditType);
    }

    @GetMapping("/getall")
    public List<CreditType> getAllCreditTypes() {
        return creditTypeService.findAllCreditType();
    }

    @GetMapping("/{id}")
    public CreditType getCreditTypeById(@PathVariable int id) {
        return creditTypeService.findCreditTypeById(id);
    }

    @PutMapping("/{id}")
    public CreditType updateCreditType(@PathVariable int id, @RequestBody CreditType creditType) {

        if (creditType.getId() == id) {
            return creditTypeService.UpdateCreditType(creditType);
        } else {
            throw new IllegalArgumentException("ID mismatch");
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCreditType(@PathVariable int id) {
        creditTypeService.DeleteCreditType(id);
    }

    @GetMapping("/paginated")
    public Page<CreditType> getPaginatedCreditTypes(
            @RequestParam int pageNum,
            @RequestParam int pageSize,
            @RequestParam String sortField,
            @RequestParam String sortDir) {
        return creditTypeService.findAllPaginatedCreditType(pageNum, pageSize, sortField, sortDir);
    }
}
