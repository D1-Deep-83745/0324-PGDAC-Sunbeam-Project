import React from 'react';
{/* <select id="status-filter">
<option value="">Status</option>
<option value="in-stock">In Stock</option>
<option value="out-of-stock">Out of Stock</option>
</select> */}




function FilterTemp({ filter, data , onSelect  }) {
    
    const handleSelectChange = (event) => {
        onSelect(event.target.value); 
    };

    return (
        <div className="select-container">
            <select id="category-filter" onChange={handleSelectChange}>
                <option value="">{filter}</option>
                {data.length > 0 && data.map((item) => (
                    <option key={item.id} value={item.categoryName}>
                        {item.categoryName}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default FilterTemp;


