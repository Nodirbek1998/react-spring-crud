import axios from 'axios';


export class PersonService{
    baseUrl = "https://spring-boot-person.herokuapp.com/api/user";

    getAll(){
        return axios.get(this.baseUrl).then(res => res.data);
    }
    save(person){
        return axios.post(this.baseUrl, person).then(res => res.data);
    }

    delete(id){
        return axios.delete(this.baseUrl +"/"+ id).then(res => res.data);
    }
}