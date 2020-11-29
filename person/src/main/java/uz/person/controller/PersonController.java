package uz.person.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uz.person.entity.Person;
import uz.person.peyload.ApiResponse;
import uz.person.peyload.ReqPerson;
import uz.person.reposiory.PersonRepository;
import uz.person.service.PersonService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class PersonController  {

    @Autowired
    PersonRepository personRepository;
    @Autowired
    PersonService personService;

    @GetMapping
    public HttpEntity<?> getPersons(){
        List<Person> all = personRepository.findAll();
        return ResponseEntity.ok(all);
    }
    @GetMapping("/{id}")
    public HttpEntity<?> getPerson(@PathVariable Integer id){
        Person person = personRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Bunday Person topilmadi"));
        return ResponseEntity.ok(person);
    }
    @PostMapping
    public HttpEntity<?> addPerson(@RequestBody ReqPerson reqPerson){
        if(reqPerson.getId() == null) {
            ApiResponse apiResponse = personService.addPerson(reqPerson);
            return ResponseEntity.status(apiResponse.isSuccess()? HttpStatus.CREATED:HttpStatus.CONFLICT).body(apiResponse);
        }else {
            ApiResponse apiResponse = personService.editPerson(reqPerson);
            return ResponseEntity.status(apiResponse.isSuccess()? HttpStatus.CREATED:HttpStatus.CONFLICT).body(apiResponse);
        }
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deletePerson(@PathVariable Integer id){
        personRepository.deleteById(id);
        return ResponseEntity.ok( new ApiResponse("Malumot o`chirildi", true));
    }
}
