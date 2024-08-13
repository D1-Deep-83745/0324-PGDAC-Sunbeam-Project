import Sidebar from "../component/sidear";
import Header from "../component/header";
import InventoryTable from "../component/inventorytable";
import { useEffect, useState } from "react";
import { addInventory, getInventory, updateInventory } from "../service/books";
import { toast } from "react-toastify";

function BookInventory() {
    const [searchQuery, setSearchQuery] = useState("");
    const [select, setSelect] = useState("");
    const [tableData, setTableData] = useState([]);
    const [filteredTableData, setFilteredTableData] = useState([]);

    const handleAdd = async (newItem) => {
        try {
            const result = await addInventory(newItem);
            if (result.status === 201 && result.data === `Inventory for book ${newItem.title} created successfully.`) {
                toast.success("Item added successfully");
                await loadOnStartup();  // Ensure it waits for the data to be loaded
            } else {
                toast.error(result.data);
            }
        } catch (error) {
            toast.error("An error occurred while adding the item.");
        }
    };

    const handleUpdate = async (updatedItem) => {
        try {
            const result = await updateInventory(updatedItem);
            if (result.status === 200) {
                toast.success("Item updated successfully");
                await loadOnStartup();  // Ensure it waits for the data to be loaded
            }
        } catch (error) {
            toast.error("An error occurred while updating the item.");
        }
    };

    useEffect(() => {
        loadOnStartup();
    }, []);

    useEffect(() => {
        filterData();
    }, [searchQuery, select]);

    const loadOnStartup = async () => {
        try {
            const inventoryResult = await getInventory();
            if (inventoryResult.status === 200) {
                setTableData(inventoryResult.data);
                setFilteredTableData(inventoryResult.data); // Initialize the filtered data
            } else {
                toast.error("Failed to load inventory data.");
            }
        } catch (error) {
            toast.error("An error occurred while loading inventory data.");
        }
    };

    const handleSelectChange = (event) => {
        setSelect(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filterData = () => {
        let filteredData = tableData;

        if (select) {
            filteredData = filteredData.filter(item => item.location === select);
        }

        if (searchQuery) {
            filteredData = filteredData.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        setFilteredTableData(filteredData);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2">
                    <Sidebar />
                </div>
                <div className="col ms-0">
                    <Header />

                    <main className="mt-4 container-fluid">
                        <div className="search-filter">
                            <form className="form-inline" onSubmit={(e) => e.preventDefault()}>
                                <input
                                    className="form-control mr-sm-3"
                                    type="search"
                                    id="search-bar"
                                    placeholder="Search by title"
                                    aria-label="Search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                />
                            </form>

                            <div className="filters mt-3">
                                <div className="select-container">
                                    <select id="category-filter" onChange={handleSelectChange}>
                                        <option value="">All Locations</option>
                                        <option value="Ware_House1">Warehouse I</option>
                                        <option value="Ware_House2">Warehouse II</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <h2>Book Inventory</h2>
                        <InventoryTable
                            inventoryData={filteredTableData}
                            onAddItem={handleAdd}
                            onUpdateItem={handleUpdate}
                        />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default BookInventory;
