import React from 'react';

const PersonsForm = ({
    addperson, newName, handleNameChange, newNumber, handleNumberchange
}) => {
    return(
        <form onSubmit = {addperson}>
            <div>
                name: <input 
                value = {newName}
                onChange = {handleNameChange}
                />
            </div>
            <div>
                number: <input
                value = {newNumber}
                onChange = {handleNumberchange}
                />
            </div>
            <div>
                <button type = 'submit'>add</button>
            </div>
        </form>
    );
}

export default PersonsForm;