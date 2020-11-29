package uz.person.reposiory;

import org.springframework.data.jpa.repository.JpaRepository;
import uz.person.entity.Person;

public interface PersonRepository extends JpaRepository<Person, Integer> {
        boolean existsByEmail(String email);
        boolean existsByEmailAndIdNot(String email, Integer id);
}
