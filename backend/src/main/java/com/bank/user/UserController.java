package com.bank.user;

import com.bank.user.User;
import com.bank.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/admins")
    public ResponseEntity<List<User>> getAllAdmins() {
        List<User> admins = userService.getAllAdmins();
        return ResponseEntity.ok(admins);
    }
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> Users = userService.getAllUsers();
        return ResponseEntity.ok(Users);
    }
    @GetMapping("/Mangers")
    public ResponseEntity<List<User>> getAllManagers(){
        List<User> Users = userService.getAllManagers();
        return ResponseEntity.ok(Users);
    }
    @GetMapping("/count-users")
    public ResponseEntity<Long> getUserCountWithRoleUser() {
        long userCount = userService.getUserCountWithRoleUser();
        return ResponseEntity.ok(userCount);
    }
    @GetMapping("/count-admins")
    public ResponseEntity<Long> getUserCountWithRoleAdmins() {
        long userCount = userService.getUserCountWithRoleAdmin();
        return ResponseEntity.ok(userCount);
    }
    @GetMapping("/count-managers")
    public ResponseEntity<Long> getUserCountWithRoleManager() {
        long userCount = userService.getUserCountWithRoleManager();
        return ResponseEntity.ok(userCount);
    }
    @GetMapping("/count-by-role")
    public ResponseEntity<Map<String, Long>> getUserCountsByRole() {
        Map<String, Long> userCounts = userService.getUserCountsByRole();
        return ResponseEntity.ok(userCounts);
    }
}