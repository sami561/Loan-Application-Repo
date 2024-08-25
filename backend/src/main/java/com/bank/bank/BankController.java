package com.bank.bank;

import com.bank.file.FileStorageService;
import com.bank.gouvernorat.IGouvernoratService;
import com.bank.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/bank")
public class BankController {
    @Autowired
    IBankService ibs;
    @Autowired
    IGouvernoratService igs;
    @Autowired
    UserRepository ur;
    @Autowired
    private FileStorageService fileStorageService;
    @GetMapping("/find/{id}")
    public ResponseEntity<Bank> findBankById(@PathVariable("id") int id) {
        Bank bank = ibs.findBankById(id);
        if (bank == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(bank);
    }

    @PostMapping(value = "/add", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> addBank(
            @RequestPart("bank") Bank b,
            @RequestPart("file") MultipartFile file,
            @RequestParam("gauvernoratId") int gauvernoratId
    ) {
        b.setGouvernorat(igs.findGouvernoratById(gauvernoratId));

        if (b.getGouvernorat() != null) {

            String imagePath = fileStorageService.saveFile(file, b.getId(), null); // Assuming user ID is not required here
            b.setImage(imagePath);

            Bank br = ibs.createBank(b);
            return ResponseEntity.ok(br);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Gouvernorat not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }

    @PutMapping(value = "/update", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<?> updateBank(
            @RequestPart("bank") Bank b,
            @RequestPart("file") MultipartFile file,
            @RequestParam("gauvernoratId") int gauvernoratId
    ) {
        b.setGouvernorat(igs.findGouvernoratById(gauvernoratId));

        if (b.getGouvernorat() != null) {
            String imagePath = fileStorageService.saveFile(file, b.getId(), null); // Assuming user ID is not required here
            b.setImage(imagePath);

            Bank br = ibs.updateBank(b);
            return ResponseEntity.ok(br);
        } else {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Gouvernorat not found");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
        }
    }



    @DeleteMapping("/delete/{id}")
    public void  deleteBank(@PathVariable("id") int id){
        ibs.deleteBank(id);
    }



    @GetMapping("/all")
    public ResponseEntity<List<Bank>> findAll(){
        return ResponseEntity.ok(ibs.findAllBanks());
    }

    @GetMapping("/count")
    public long getBanksCount() {
        return ibs.getBankCount();
    }
}
