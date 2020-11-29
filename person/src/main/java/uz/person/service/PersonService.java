package uz.person.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import uz.person.entity.Person;
import uz.person.peyload.ApiResponse;
import uz.person.peyload.ReqPerson;
import uz.person.reposiory.PersonRepository;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;

    public ApiResponse addPerson(ReqPerson reqPerson){
        boolean exists = personRepository.existsByEmail(reqPerson.getEmail());
        if (!exists){
            Person person = new Person();
            pushPerson(reqPerson,person);
            return new ApiResponse("Malumot saqlandi.", true);
        }
        return new ApiResponse("Bunday username oldin ishlatilgan.", false);
    }

    public ApiResponse editPerson(ReqPerson reqPerson){
        boolean exists = personRepository.existsByEmailAndIdNot(reqPerson.getEmail(), reqPerson.getId());
        if (!exists){
            Person person = personRepository.findById(reqPerson.getId()).orElseThrow(()-> new ResourceNotFoundException("Malumot topilmadi"));
            pushPerson(reqPerson,person);
            return new ApiResponse("Shaxs malumoti o`zgartirildi.", true);
        }
        return new ApiResponse("Bunday username oldin ishlatilgan.", false);
    }

    void pushPerson(ReqPerson reqPerson, Person person){
        person.setName(reqPerson.getName());
        person.setLastName(reqPerson.getLastName());
        person.setEmail(reqPerson.getEmail());
        person.setNumber(reqPerson.getNumber());
        personRepository.save(person);
    }
}
