import axios from 'axios';
const baseUrl = 'http://localhost:3005/Persons';

// returns the entire contents of the database.
function getAll(){
    return axios
    .get(baseUrl)
    .then(response => {
        console.log(response.data);
        return response.data;
    });
}
//posts new content onto the database using the get method
function create(newObject){
    return axios.post(baseUrl, newObject);
}

//alters the number of an entry using the put method
function update( id, newObject){
    return axios.put(`${baseUrl}/${id}`, newObject);
}

//deletes a selected entry within the datebase using the delete method
function deleteEntry(id){
    return axios.delete(`${baseUrl}/${id}`);
}

export default {getAll, create, deleteEntry, update};