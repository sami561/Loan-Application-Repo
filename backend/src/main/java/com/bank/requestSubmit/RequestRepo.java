package com.bank.requestSubmit;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepo extends JpaRepository<RequestSubmit,Integer> {
}
