package com.bank.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String username);
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = 'Admin'")
    List<User> findAllAdmins();
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = 'USER'")
    List<User> findAllUser();
    @Query("SELECT u FROM User u JOIN u.roles r WHERE r.name = 'Manager'")
    List<User> findAllManager();
    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r.name = 'USER'")
    long countUsersWithRoleUser();
    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r.name = 'Admin'")
    long countUsersWithRoleAdmin();

    @Query("SELECT COUNT(u) FROM User u JOIN u.roles r WHERE r.name = 'Manager'")
    long countUsersWithRoleManager();
}

