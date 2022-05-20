/**
 * DB class for mapping to user table in TrackerDb. This is a user details table.
 * Contains getters, setters and overridden toString()
 *
 * @author Vaibhavi Lokegaonkar
 */

package com.nplab.extension.db;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Table(name = "user")
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @Column(name = "user_id")
    private int userId;

    @Column(name = "username")
    private String username;

    @Column(name = "password")
    private String password;

    public String getRole() {
        return "admin";
    }


}
