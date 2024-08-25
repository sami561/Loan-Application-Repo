package com.bank.user;

import com.bank.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllAdmins() {
        return userRepository.findAllAdmins();
    }
    public List<User> getAllUsers(){
        return  userRepository.findAllUser();
    }
    public List<User> getAllManagers(){
        return  userRepository.findAllManager();
    }
    public long getUserCountWithRoleUser() {
        return userRepository.countUsersWithRoleUser();
    }
    public long getUserCountWithRoleAdmin() {
        return userRepository.countUsersWithRoleAdmin();
    }
    public long getUserCountWithRoleManager() {
        return userRepository.countUsersWithRoleManager();
    }
    public Map<String, Long> getUserCountsByRole() {
        Map<String, Long> counts = new HashMap<>();
        counts.put("Client", userRepository.countUsersWithRoleUser());
        counts.put("Admin", userRepository.countUsersWithRoleAdmin());
        counts.put("Manager", userRepository.countUsersWithRoleManager());
        return counts;
    }
}