import React from 'react';



const Entry = ({name, number, id, deleteEntry}) => {
    return(
        <div>
            {name} {number}
            <button onClick = {() => deleteEntry(id)}>Delete</button>
        </div>
    );
}
export default Entry;