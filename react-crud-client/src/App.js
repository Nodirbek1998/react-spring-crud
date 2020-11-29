import React, {Component} from 'react';
import './App.css';
import { PersonService } from './service/PersonService';
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Panel} from 'primereact/panel';
import {Menubar} from 'primereact/menubar';
import {Dialog} from 'primereact/dialog';
import {InputText} from 'primereact/inputtext';
import {Button}from 'primereact/button';
import {Toast} from 'primereact/toast';

import 'primereact/resources/themes/nova-accent/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


export default class App extends Component{
  constructor(){
    super();
   this.state = {
    visible : false,
    person : {
      id : null,
      name : null,
      lastName: null,
      email : null,
      number : null
    },
    selectedPerson :{

    }
   };
   this.items = [
    {
      label : 'Creat Person',
      icon : 'pi pi-fw pi-plus',
      command : () => {this.showSaveDialog()}
    },
    {
      label : 'Edit',
      icon : 'pi pi-fw pi-pencil',
      command : () => {this.showEditDialog()}
    },
    {
      label : 'Delete',
      icon : 'pi pi-fw pi-trash',
      command : () => {this.delete()}
    }
   ];
   this.personService = new PersonService();
   this.save = this.save.bind(this);
   this.delete = this.delete.bind(this);
   this.footer = (
    <div>
      <Button label="Save" icon="pi pi-check" onClick={this.save} />
    </div>
   );
  }

  componentDidMount(){
    this.personService.getAll().then(data => this.setState({people:data}))
  }

  save() {
    this.personService.save(this.state.person).then(data => {
      this.setState({
        visible: false,
        person : {
          id : null,
          name : null,
          lastName: null,
          email : null,
          number : null
        }
      });
      this.toast.show({severity: 'success', summary: 'Malumot saqlandi', detail: 'Order submitted'});
      this.personService.getAll().then(data => this.setState({people:data}))
    })
  }
  delete(){
    if(window.confirm("O`chirishni hohlaysizma")){
      this.personService.delete(this.state.selectedPerson.id).then(data =>{
        this.toast.show({severity: 'success', summary: 'Malumot o`chirildi', detail: 'Order submitted'});
        this.personService.getAll().then(data => this.setState({people:data}));
      });
    }
  }
  render(){
    return(
      <div style={{width:'80%', margin:'0 auto', marginTop:'20px'}}> 
        <Menubar model={this.items} />
        <br />
        <Panel header="React CRUD App">
          <DataTable value={this.state.people} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedPerson} onSelectionChange={e => this.setState({selectedPerson : e.value})}>
              <Column field="id" header="ID"></Column>
              <Column field="name" header="Name"></Column>
              <Column field="lastName" header="Last Name"></Column>
              <Column field="email" header="E-mail" style={{width:'300px'}}></Column>
              <Column field="number" header="Phone Number"></Column>
          </DataTable>
        </Panel>
        <Dialog header="Crear person" visible={this.state.visible} style={{width: '400px'}} footer={this.footer} modal={true} onHide={()=> this.setState({visible:false})}>
         <form id="person-form">
         <span className="p-float-label">
          <InputText value={this.state.person.name} style={{width:'100%',marginTop:'10px'}} id="name" onChange={(e) =>{
          let val = e.target.value;
          this.setState(prevState => {
            let person = Object.assign({}, prevState.person)
            person.name = val;
            return{person};
            })}
            } />
            <label htmlFor="name">Name</label>
            </span>
            <span className="p-float-label">
          <InputText value={this.state.person.lastName} style={{width:'100%',marginTop:'10px'}} id="lastname" onChange={(e) =>{
            let val = e.target.value;
            this.setState(prevState => {
            let person = Object.assign({}, prevState.person)
            person.lastName = val; 
            return{person};
            })}
           } />
            <label htmlFor="lastname">Last Name</label>
            </span>
            <span className="p-float-label">
          <InputText value={this.state.person.email} style={{width:'100%',marginTop:'10px'}} id="email" onChange={(e) =>{
            let val = e.target.value;
            this.setState(prevState => {
            let person = Object.assign({}, prevState.person)
            person.email = val; 
            return{person};
            })} 
          }/>
            <label htmlFor="email">E-mail</label>
            </span>
            <span className="p-float-label">
          <InputText value={this.state.person.number} style={{width:'100%', marginTop:'10px'}}  id="number" onChange={(e) =>{
            let val = e.target.value; 
          this.setState(prevState => {
            let person = Object.assign({}, prevState.person)
            person.number = val;
            return{person};
            })}
           } />
            <label htmlFor="number">Phone number</label>
            </span>
         </form>
        </Dialog>
        <Toast ref={(el) => this.toast = el} />
      </div>
    );
  }
  showSaveDialog(){
    this.setState({
      visible : true,
      person : {
        id : null,
        name : null,
        lastName: null,
        email : null,
        number : null
      }
    });
    // document.getElementById('person-form').reset();
  }
  showEditDialog() {
    this.setState({
      visible : true,
      person : {
        id : this.state.selectedPerson.id,
        name : this.state.selectedPerson.name,
        lastName: this.state.selectedPerson.lastName,
        email : this.state.selectedPerson.email,
        number : this.state.selectedPerson.number
      }
    })
  }
};
