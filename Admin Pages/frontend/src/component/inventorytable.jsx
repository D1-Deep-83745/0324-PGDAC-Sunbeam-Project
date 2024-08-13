import React, { useState } from 'react';

function InventoryTable({ inventoryData, onAddItem, onUpdateItem }) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [newItem, setNewItem] = useState({
        available_quantity: '',
        location: '',
        title: '',
    });
    const [quantityToAdd, setQuantityToAdd] = useState('');
    const [editingItem, setEditingItem] = useState(null);

    const handleIncrementQuantity = (item) => {
        setEditingItem(item);
        setQuantityToAdd(''); 
    };

    const handleQuantityChange = (e) => {
        setQuantityToAdd(e.target.value);
    };

    const handleAddQuantityClick = () => {
        if (quantityToAdd && editingItem) {
            const updatedItem = {
                ...editingItem,
                available_quantity: editingItem.available_quantity + parseInt(quantityToAdd, 10),
            };
            onUpdateItem(updatedItem);
            setEditingItem(null);
        }
    };

    const handleNewInputChange = (e) => {
        const { name, value } = e.target;
        setNewItem((prevItem) => ({
            ...prevItem,
            [name]: value,
        }));
    };

    const handleAddClick = () => {
        onAddItem(newItem);
        setNewItem({ available_quantity: '', location: '', title: '' });
        setShowAddForm(false); // Hide form after adding item
    };

    return (
        <div className="inventory-table container-fluid">
            <div className="table table-responsive container-fluid" style={{ maxHeight: "400px", overflowY: "auto" }}>
                <table className="table-hover" style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Available Quantity</th>
                            <th>Location</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inventoryData.length > 0 ? (
                            inventoryData.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>
                                        {item.available_quantity}
                                        {editingItem && editingItem.id === item.id && (
                                            <>
                                                <input
                                                    type="number"
                                                    value={quantityToAdd}
                                                    onChange={handleQuantityChange}
                                                    className="form-control mt-2"
                                                    style={{ width: '100px' }}
                                                />
                                                <button
                                                    onClick={handleAddQuantityClick}
                                                    className="btn btn-secondary ms-2"
                                                >
                                                    Add Quantity
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td>{item.location}</td>
                                    <td>
                                        <button
                                            onClick={() => handleIncrementQuantity(item)}
                                            className="btn btn-secondary"
                                        >
                                            Add Items
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No inventory items found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <button
                onClick={() => setShowAddForm(!showAddForm)}
                className="btn btn-primary"
            >
                {showAddForm ? 'Cancel' : 'Add Inventory'}
            </button>

            {showAddForm && (
                <div className="mt-4">
                    <h3>Add New Inventory Item</h3>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={newItem.title}
                            onChange={handleNewInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Available Quantity</label>
                        <input
                            type="number"
                            name="available_quantity"
                            value={newItem.available_quantity}
                            onChange={handleNewInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Location</label>
                        <select
                            name="location"
                            value={newItem.location}
                            onChange={handleNewInputChange}
                            className="form-control"
                        >
                            <option value="">Select Location</option>
                            <option value="Ware_House1">Ware_House1</option>
                            <option value="Ware_House2">Ware_House2</option>
                        </select>
                    </div>
                    <button onClick={handleAddClick} className="btn btn-primary">Add Item</button>
                </div>
            )}
        </div>
    );
}

export default InventoryTable;
