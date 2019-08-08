import React from 'react';

const Filter = ({filter, handlefilterChange}) =>{
    return(
        <form>
            <div>
                filter shown with <input
                value = {filter}
                onChange = {handlefilterChange}
                />
            </div>
        </form>
    );
}

export default Filter;