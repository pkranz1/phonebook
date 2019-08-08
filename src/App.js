import React, {useState, useEffect} from 'react';
import Entry from './components/Entry';
import Filter from './components/Filter';
import PersonsForm from './components/PersonsForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setNewMessage] = useState(null);

    //When the page is intially rendered the useEffect function renders the page so the intial contents of the 
    //persons array is shown.
    useEffect(() =>{
        personService
        .getAll()
        .then((phoneBook) =>{
            setPersons(phoneBook);
        });
        
    }, [])
    
    //Event handler which adds a new entry to the phone book using the useState function.
    const addperson = (event) => {
        event.preventDefault();
        
        const person = {
            name: newName,
            number: newNumber,
        };
        
        for(let i = 0; i < persons.length; i++){
            if(persons[i].name === person.name && persons[i].number !== person.number){
                const changeNumber = window.confirm(`${newName} is already in the phonebook. Do you wish to update their number?`);
                
                if(changeNumber){
                    const editEntry = {...persons[i], number: person.number}
                    console.log(editEntry);
                    
                    personService
                    .update(persons[i].id, editEntry)
                    .then(returnEntry => {
                        const data = returnEntry.data;
                        
                        setPersons(persons.map(element => {
                            if(element.id === data.id)
                                return data;
                            else 
                                return element;
                        }));
                        
                        setNewMessage(`Changed ${person.name}'s phone Number!`);
                        
                        setTimeout(() => {
                            setNewMessage(null);
                        }, 5000);
                        
                        setNewName('');
                        setNewNumber('');
                    }).catch(error => {
                        console.log('the Error: ', error);
                        
                        setNewMessage(`${persons[i].name} was already deleted from the server`);
                        setTimeout(() => {
                            setNewMessage(null);
                        }, 5000);

                    })
                    return;
                    
                }
                else 
                    return;
            }
            else if(persons[i].name === person.name && persons[i].number === person.number){
                setNewMessage(`${person.name} is already in the phonebook`);
                setTimeout(() => {
                    setNewMessage(null);
                }, 10000);
                setNewName('');
                setNewNumber('');
                return;
            }
        }
        
        personService
        .create(person)
        .then(response => {
            setPersons(persons.concat(response.data));
            setNewMessage(`Added ${person.name} to the phonebook`);
            setTimeout(() => {
                setNewMessage(null);
            }, 5000);
            setNewNumber('');
            setNewName('');
            
        })
    }
    //Event deletes an entry from the array. The issue im having revolves around how to update the frontend 
    //so that it reflects the changes done in the back end.
    const deletePerson = (id) => {
        personService
        .deleteEntry(id)
        .then(response => {
            setPersons(persons.filter(n => n.id !== id))
        });
    }
    //reflects the typed change see in the name form.
    const handleNameChange = (event) => {
        const name = event.target.value;
        setNewName(name);

    }
    //relfects the typed chnage seen in the filter form
    const handlefilterChange = (event) => {
        const afilter = event.target.value;
        setFilter(afilter);
    }
    //reflects the typed change in the number form
    const handleNumberchange = (event) => {
        const number = event.target.value;
        setNewNumber(number);
    }
    //works in conjuction with what string is in the filter variable to display the "searched" 
    //name in the phone book.
    const book = () =>{
        return(persons.map((obj) => {
            if(obj.name.includes(filter)){
                return(
                        <Entry 
                        name = {obj.name}
                        id = {obj.id}
                        key = {obj.id}
                        number = {obj.number}
                        deleteEntry = {deletePerson}
                        /> 
                );
            }
        return null;
    }))
}

    return(
        <div>
            <h1>Phonebook</h1>
                <Filter 
                filter = {filter}
                handlefilterChange = {handlefilterChange}
                />
            <h3>Add a new entry</h3>
                <Notification
                message = {message}
                />
                <PersonsForm 
                handleNameChange = {handleNameChange}
                handleNumberchange = {handleNumberchange}
                addperson = {addperson}
                newName = {newName}
                newNumber = {newNumber}
                />
            <h3>Numbers</h3>
                <Persons book = {book()}
                />
        </div>
    );
}

export default App