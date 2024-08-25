package com.bank.requestSubmit;

import com.bank.CreditType.CreditType;
import com.bank.bank.Bank;
import com.bank.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.Date;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class RequestSubmit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int id;
    String Status;
    String File;
    String rejectionReasen;
    Double Devis;
    Date RequestDate;
    Date ApprovalDate;
    Integer periode;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Agent_id")
    private User user;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "bank_id")
    private Bank bank;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "CreditType_id")
    private CreditType creditType;
    @Transient
    private int userId;
    @Transient
    private int bankId;
    @Transient
    private int creditTypeId;



}
