package uz.person.peyload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqPerson {
    private Integer id;

    private String name;

    private String lastName;

    private String email;

    private String number;
}
