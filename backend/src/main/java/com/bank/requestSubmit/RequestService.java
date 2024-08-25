package com.bank.requestSubmit;


import com.bank.common.PageResponse;
import com.bank.file.FileStorageService;
import com.bank.user.User;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class RequestService implements IRequestService {
    @Autowired
    RequestRepo rr;
    private final FileStorageService fileStorageSevic;

    @Override
    public RequestSubmit CreateRequest(RequestSubmit r) {
        return rr.save(r);
    }

    @Override
    public List<RequestSubmit> findAllRequest() {
        return rr.findAll();
    }

    @Override
    public RequestSubmit findRequestById(int id) {
        return rr.findById(id).get();
    }

    @Override
    public void DeleteRequest(int id) {
        rr.deleteById(id);
    }

    @Override
    public RequestSubmit UpdateRequest(RequestSubmit r) {
        return rr.save(r);
    }

    @Override
    public Page<RequestSubmit> findAllPaginatedRequest(int pageNum, int pageSize, String sortField, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ?
                Sort.by(sortField).ascending() : Sort.by(sortField).descending();
        Pageable pageable = PageRequest.of(pageNum - 1, pageSize, sort);
        return rr.findAll(pageable);
    }

    @Override
    public void uploadQuotePicture(MultipartFile file,Authentication connectedUser, Integer RequestId) {
       RequestSubmit request= rr.findById(RequestId).orElseThrow(() -> new EntityNotFoundException("No Request found with ID:: " + RequestId));
        User user = ((User) connectedUser.getPrincipal());
        var profilePicture = fileStorageSevic.saveFile(file, RequestId, user.getId());
        request.setFile(profilePicture);
         rr.save(request);
    }




}
