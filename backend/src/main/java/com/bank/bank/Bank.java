package com.bank.bank;

import com.bank.gouvernorat.Gouvernorat;
import com.bank.requestSubmit.RequestSubmit;
import com.bank.user.User;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.List;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@JsonIdentityInfo(
        generator = ObjectIdGenerators.PropertyGenerator.class,
        property = "id")
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nom;
    private String contactEmail;
    private String contactPhone;
    private String image;

    @OneToMany(mappedBy = "bank")
    private List<User> agents;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gouvernorat_id")
    private Gouvernorat gouvernorat;

    @JsonIgnore
    @OneToMany(mappedBy = "bank")
    private List<RequestSubmit> request;
}
