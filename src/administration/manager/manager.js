import React, { useEffect, useState } from "react";
import '../administration.css';
import add from '../../assets/images/plus.png';
import { populateTables } from '../administration';
import validateSession from "../../session/session";
import axios from "axios";
import deleteIcon from '../../assets/images/delete.png';
import confirmIcon from '../../assets/images/tick.png';
import discardIcon from '../../assets/images/close.png';
import edit from '../../assets/images/edit.png';
function Manager() {
    const [orders, setOrders] = useState([]);
    const [equipments, setEquipments] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [employee, setEmployee] = useState([]);
    const [pickup, setPickup] = useState([]);
    useEffect(() => {
        validateSession('Manager');
        document.getElementsByClassName('nav-item active')[0].classList.remove('active');
        document.getElementById('authenticationTab').classList.add('active');
        updateOrderTable()
        updateEquipmentsTable();
        updateCustomerTable();
        updateEmployeeTable();
        updatePickupTable();
        populateTables();
    }, []);
    function updateEquipmentsTable() {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/equipments.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'getAllEquipments' }
        }).then(result => {
            setEquipments(result.data);
        }).catch(error => {
        });
    }

    // delete row from given table
    function deleteEqp(elementId) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/equipments.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'deleteEquipment', Data: { ID: elementId } }
        }).then(result => {
            equipments.splice(equipments.findIndex(equipment => equipment.ID === elementId), 1)
            setEquipments(equipments);
            updateEquipmentsTable()
        }).catch(error => {
        });
    }

    function deleteCustomer(elementId) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/customers.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'deleteCustomer', Data: { ID: elementId } }
        }).then(result => {
            customers.splice(customers.findIndex(customer => customer.ID === elementId), 1)
            setCustomers(customers);
            updateCustomerTable()
        }).catch(error => {
        });
    }

    function deletePickup(elementId) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/pickupdelivery.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'deletePickup', Data: { ID: elementId } }
        }).then(result => {
            pickup.splice(pickup.findIndex(pick => pick.ID === elementId), 1)
            setPickup(pickup);
            updatePickupTable()
        }).catch(error => {
        });
    }

    function deleteEmployee(elementId) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/Employee.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'deleteEmployee', Data: { ID: elementId } }
        }).then(result => {
            employee.splice(employee.findIndex(emp => emp.ID === elementId), 1)
            setEmployee(employee);
            updateEmployeeTable()
        }).catch(error => {
        });
    }
    function editEquipmentColumn(equipment) {
        equipments.map(equipment => {
            if (equipment.addEquipment) {
                equipment.addEquipment = false;
            }
        });
        equipment.editEquipment = true;
        let index = equipments.findIndex(equip => equip.ID === equipment.ID);
        equipments[index] = equipment;
        setEquipments([...equipments]);
    }

    function addEquipmentColumn() {
        if (equipments.find(equipment => equipment.addEquipment)) {
            return;
        }
        let equipment = {
            ID: (100 || (Number(equipments[equipments.length - 1].ID) + 1)).toString(),
            addEquipment: true,
            Equipment_Type: 'Dryer',
            Model_No: '',
            Brand_Name: '',
            Load_Capacity: 0,
            Order_ID: 0,
            Status: 'Available'
        }
        equipments.push(equipment);
        setEquipments([...equipments]);
    }

    function addOrEditEquipment(equipment) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/equipments.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: (equipment.editEquipment ? 'alterRecord' : 'addNewEquipment'), Data: equipment }
        }).then(result => {
            equipment.editEquipment = false;
            equipment.addEquipment = false;
            setEquipments(equipments);
            updateEquipmentsTable();
        }).catch(error => {
        });
    }

    function handleEqpChange(event, equipment) {
        const { name, value } = event.target;
        equipments.forEach((equip) => {
            if (equip.ID === equipment.ID) {
                equip[name] = value;
            }
        });
        setEquipments([...equipments]);
    }


    function updateOrderTable() {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/orders.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'getAllOrders' }
        }).then(result => {
            setOrders(result.data);
        }).catch(error => {
        });
    }

    function updateEmployeeTable() {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/Employee.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'getAllEmployee' }
        }).then(result => {
            setEmployee(result.data);
        }).catch(error => {
        });
    }

    function updatePickupTable() {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/pickupdelivery.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'getAllPickup' }
        }).then(result => {
            setPickup(result.data);
        }).catch(error => {
        });
    }

    function updateCustomerTable() {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/customers.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'getAllCustomers' }
        }).then(result => {
            setCustomers(result.data);
        }).catch(error => {
        });
    }
    // delete row from given table
    function deleteOrder(elementId) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/orders.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: 'deleteOrder', Data: { Order_ID: elementId } }
        }).then(result => {
            orders.splice(orders.findIndex(order => order.Order_ID === elementId), 1)
            setOrders([...orders]);
            updateOrderTable();
        }).catch(error => {
        });
    }

    function editOrderColumn(order) {
        orders.map(order => {
            if (order.addOrder) {
                order.addOrder = false;
            }
        });
        order.editOrder = true;
        let index = orders.findIndex(ord => ord.Order_ID === order.Order_ID);
        orders[index] = order;
        setOrders([...orders]);
    }

    function addOrderColumn() {
        if (orders.find(order => order.addOrder)) {
            return;
        }
        let order = {
            Order_ID: (Number(orders[orders.length - 1].Order_ID) + 1).toString(),
            addOrder: true,
            First_Name: '',
            Last_Name: '',
            items: 0,
            Service: 'Washing',
            Email: '',
            Phonenumber: undefined,
            Customer_ID: undefined
        }
        orders.push(order);
        setOrders([...orders]);
    }

    function addOrEditOrder(order) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/orders.php',
            headers: {
                'content-type': 'application/json'
            },
            data: { Function: (order.editOrder ? 'alterRecord' : 'addNewOrder'), Data: order }
        }).then(result => {
            order.editOrder = false;
            order.addOrder = false;
            setOrders([...orders]);
            updateOrderTable();
        }).catch(error => {
        });

    }

    function handleOrdChange(event, order) {
        const { name, value } = event.target;
        orders.forEach((ord) => {
            if (ord.Order_ID === order.Order_ID) {
                ord[name] = value;
            }
        });
        setOrders([...orders]);
    }

    return (
        <section className='administration-bg hide-section'>
            {/* Header section title */}
            <div className="container" id="heading-container">
                <div className="font-oswald heading"> Manage Daily Tasks </div>
            </div>

            {/* Admin and manager section tables structure  */}
            <div className="manage-container d-flex flex-direction-column align-items-around justify-evenly">

                {/* Horizontal row section containing multiple tables  */}
                <div className="d-flex flex-direction-row justify-around section-container">

                    {/* Manage Order table  */}
                    <div className="d-flex flex-direction-column align-items-start section-content"><span
                        className="font-oswald section-header">Manage Order</span>
                        <div className="table-container">
                            <table id="order-table" className="material-table">
                                <tbody>
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Phone Number</th>
                                        <th>Email</th>
                                        <th>Items</th>
                                        <th>Service Type</th>
                                        <th className="text-align-center"><img className="cursor-pointer" title="Add Record"
                                            onClick={() => addOrderColumn()} src={add} height="13px"
                                            width="13px" alt='add records' /></th>
                                    </tr>
                                    {orders.map(order => {
                                        if ((order.editOrder || order.addOrder))
                                            return (<tr>
                                                <td>{order.Order_ID}</td>
                                                <td><input type="number" id="customerId" className="font-roboto" name="Customer_ID" placeholder="Customer ID" value={order.Customer_ID} onChange={(event) => handleOrdChange(event, order)} required /></td>
                                                <td><input type="text" id="fname" name="First_Name" className="font-roboto" placeholder="First Name" value={order.First_Name} onChange={(event) => handleOrdChange(event, order)} required /></td>
                                                <td><input type="text" id="lane" name="Last_Name" className="font-roboto" placeholder="Last Name" value={order.Last_Name} onChange={(event) => handleOrdChange(event, order)} required /></td>
                                                <td><input type="number" id="Phonenumber" className="font-roboto" name="Phonenumber" placeholder="Phone Number" value={order.Phonenumber} onChange={(event) => handleOrdChange(event, order)} required /></td>
                                                <td><input type="text" id="Email" className="font-roboto" name="Email" placeholder="Email" value={order.Email} onChange={(event) => handleOrdChange(event, order)} required /></td>
                                                <td><input type="number" id="noOfItems" name="items" placeholder="Number of Items" value={order.items} onChange={(event) => handleOrdChange(event, order)} required /></td>
                                                <td>
                                                    <select name="Service" id="service" className="font-roboto" value={order.Service} onChange={(event) => handleOrdChange(event, order)} required>
                                                        <option value="Washing" >Washing</option>
                                                        <option value="Drying">Drying</option>
                                                        <option value="Ironing">Ironing</option>
                                                        <option value="CompleteLaundryService">Complete Laundry Service (Washing+Drying+Ironing)</option>
                                                    </select>
                                                </td>
                                                <td>
                                                    <span className="action-icons">
                                                        <img src={confirmIcon} onClick={() => addOrEditOrder(order)} title="Confirm" />
                                                        <img src={discardIcon} onClick={() => order.editOrder = false} title="Cancel" />
                                                    </span></td>
                                            </tr>);
                                        else return (
                                            <tr>
                                                <td>{order.Order_ID}</td>
                                                <td>{order.Customer_ID}</td>
                                                <td>{order.First_Name}</td>
                                                <td>{order.Last_Name}</td>
                                                <td>{order.Phonenumber}</td>
                                                <td>{order.Email}</td>
                                                <td>{order.items}</td>
                                                <td>{order.Service}</td>
                                                <td>
                                                    <span className="action-icons">
                                                        <img src={edit} onClick={() => editOrderColumn(order)} title="edit" />
                                                        <img src={deleteIcon} onClick={() => deleteOrder(order.Order_ID)} title="delete" />
                                                    </span>
                                                </td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Manage equipment table  */}
                    <div className="d-flex flex-direction-column align-items-start section-content"><span
                        className="font-oswald section-header">Manage Equipment</span>
                        <div className="table-container">
                            <table id="equipment-table" className="material-table">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>Equipment Type</th>
                                        <th>Model No</th>
                                        <th>Brand Name</th>
                                        <th>Load Capacity</th>
                                        <th>Status</th>
                                        <th>Order ID</th>
                                        <th className="text-align-center"><img className="cursor-pointer" title="Add Record"
                                            onClick={() => addEquipmentColumn()} src={add} height="13px"
                                            width="13px" alt='add records' /></th>
                                    </tr>
                                    {equipments.map(equipment => {
                                        if ((equipment.editEquipment || equipment.addEquipment))
                                            return (<tr>
                                                <td>{equipment.ID}</td>
                                                <td>
                                                    <select name="Equipment_Type" id="equipmentType" className="font-roboto" value={equipment.Equipment_Type} onChange={(event) => handleEqpChange(event, equipment)} required>
                                                        <option value="Washing Machine" >Washing Machine</option>
                                                        <option value="Dryer">Dryer</option>
                                                        <option value="Iron Box">Iron Box</option>
                                                        <option value="Weights">Weights</option>
                                                        <option value="Basket">Basket</option>
                                                    </select>
                                                </td>
                                                <td><input type="text" id="modelNo" name="Model_No" className="font-roboto" placeholder="Model No" value={equipment.Model_No} onChange={(event) => handleEqpChange(event, equipment)} required /></td>
                                                <td><input type="text" id="brandName" name="Brand_Name" className="font-roboto" placeholder="Brand_Name" value={equipment.Brand_Name} onChange={(event) => handleEqpChange(event, equipment)} required /></td>
                                                <td><input type="number" id="loadCapacity" className="font-roboto" name="Load_Capacity" placeholder="Load_Capacity" value={equipment.Load_Capacity} onChange={(event) => handleEqpChange(event, equipment)} required /></td>
                                                <td><select name="Status" id="status" className="font-roboto" value={equipment.Status} onChange={(event) => handleEqpChange(event, equipment)} required>
                                                    <option value="Available" >Available</option>
                                                    <option value="InUse">In Use</option>
                                                </select></td>
                                                <td><input type="number" id="orderid" name="Order_ID" placeholder="Order ID" value={equipment.Order_ID} onChange={(event) => handleEqpChange(event, equipment)} required /></td>
                                                <td>
                                                    <span className="action-icons">
                                                        <img src={confirmIcon} onClick={() => addOrEditEquipment(equipment)} title="Confirm" />
                                                        <img src={discardIcon} onClick={() => equipment.editEquipment = false} title="Cancel" />
                                                    </span></td>
                                            </tr>);
                                        else return (
                                            <tr>
                                                <td>{equipment.ID}</td>
                                                <td>{equipment.Equipment_Type}</td>
                                                <td>{equipment.Model_No}</td>
                                                <td>{equipment.Brand_Name}</td>
                                                <td>{equipment.Load_Capacity}</td>
                                                <td>{equipment.Status}</td>
                                                <td>{equipment.Order_ID}</td>
                                                <td>
                                                    <span className="action-icons">
                                                        <img src={edit} onClick={() => editEquipmentColumn(equipment)} title="edit" />
                                                        <img src={deleteIcon} onClick={() => deleteEqp(equipment.ID)} title="delete" />
                                                    </span>
                                                </td>
                                            </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Horizontal row section containing multiple tables  */}
                <div className="d-flex flex-direction-row justify-around section-container" id="manager-actions">

                    {/* Manual Order table  */}
                    <div className="d-flex flex-direction-column align-items-start section-content"><span
                        className="font-oswald section-header">Manual Order</span>
                        <div className="d-flex flex-direction-row order-container">
                            <div className="d-flex flex-direction-column justify-between">
                                <input type="text" placeholder="Customer Name" required="required" />
                                <input type="text" placeholder="Phone Number" required="required" maxLength="10" />
                                <label>Service Type:</label>
                                <select name="services" id="services">
                                    <option value="Washing">Washing</option>
                                    <option value="Drying">Drying</option>
                                    <option value="Ironing">Ironing</option>
                                    <option value="Pickup">Pickup</option>
                                    <option value="Delivery">Delivery</option>
                                </select>
                            </div>
                            <div className="d-flex flex-direction-column justify-between">
                                <input type="text-area" placeholder="Description" />
                                <input type="submit" className="btn submit-order" />
                            </div>
                        </div>
                    </div>

                    {/* Manage tasks table  */}
                    <div className="d-flex flex-direction-column align-items-start section-content"><span
                        className="font-oswald section-header">Manage Tasks</span>
                        <div className="table-container">
                            <table id="tasks-table" className="material-table">
                                <tbody>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Assigned to</th>
                                        <th>Desc</th>
                                        <th>Services</th>
                                        <th className="text-align-center"><img className="cursor-pointer" title="Add Record"
                                            src={add} height="13px"
                                            width="13px" alt='add-record' /></th>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Horizontal row section containing multiple tables  */}
                <div className="d-flex flex-direction-row justify-around section-container">

                    {/* Manage Customers table  */}
                    <div className="d-flex flex-direction-column align-items-start section-content"><span
                        className="font-oswald section-header">Manage Customers</span>
                        <div className="table-container">
                            <table id="customer-table" className="material-table">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Nmae</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Created Date</th>
                                        <th>User Type</th>
                                        <th>Address</th>
                                        <th className="text-align-center"><img className="cursor-pointer" title="Add Record"
                                            onClick={() => { }} src={add} height="13px"
                                            width="13px" alt='add records' /></th>
                                    </tr>
                                    {customers.map(customer => (
                                        <tr>
                                            <td>{customer.ID}</td>
                                            <td>{customer.First_Name}</td>
                                            <td>{customer.Last_Name}</td>
                                            <td>{customer.Email}</td>
                                            <td>{customer.Created_Date}</td>
                                            <td>{customer.User_Type}</td>
                                            <td>{''}</td>
                                            <td>
                                                <span className="action-icons">
                                                    <img src={edit} onClick={() => { }} title="edit" />
                                                    <img src={deleteIcon} onClick={() => deleteCustomer(customer.ID)} title="delete" />
                                                </span>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Manage Pickup/Delivery table  */}
                    <div className="d-flex flex-direction-column align-items-start section-content"><span
                        className="font-oswald section-header">Manage Pickup / Delivery</span>
                        <div className="table-container">
                            <table id="pickup-table" className="material-table">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Nmae</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Subscription</th>
                                        <th>Plan</th>
                                        <th>Day</th>
                                        <th>Address</th>
                                        <th className="text-align-center"><img className="cursor-pointer" title="Add Record"
                                            onClick={() => { }} src={add} height="13px"
                                            width="13px" alt='add records' /></th>
                                    </tr>
                                    {pickup.map(pickup => (
                                        <tr>
                                            <td>{pickup.ID}</td>
                                            <td>{pickup.First_Name}</td>
                                            <td>{pickup.Last_Name}</td>
                                            <td>{pickup.Email}</td>
                                            <td>{pickup.Phonenumber}</td>
                                            <td>{pickup.subscribe}</td>
                                            <td>{pickup.plan}</td>
                                            <td>{pickup.day}</td>
                                            <td>{pickup.address}</td>
                                            <td>
                                                <span className="action-icons">
                                                    <img src={edit} onClick={() => { }} title="edit" />
                                                    <img src={deleteIcon} onClick={() => deletePickup(pickup.ID)} title="delete" />
                                                </span>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Horizontal row section containing Employee table  */}
                <div className="d-flex flex-direction-row justify-around section-container" id='employee-table-container'>
                    <div className="d-flex flex-direction-column align-items-start section-content"><span
                        className="font-oswald section-header">Manage Employees</span>
                        <div className="table-container">
                            <table id="employee-table" className="material-table">
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <th>First Nmae</th>
                                        <th>Last Name</th>
                                        <th>Email</th>
                                        <th>Created Date</th>
                                        <th>User Type</th>
                                        <th>Address</th>
                                        <th className="text-align-center"><img className="cursor-pointer" title="Add Record"
                                            onClick={() => { }} src={add} height="13px"
                                            width="13px" alt='add records' /></th>
                                    </tr>
                                    {employee.map(emp => (
                                        <tr>
                                            <td>{emp.ID}</td>
                                            <td>{emp.First_Name}</td>
                                            <td>{emp.Last_Name}</td>
                                            <td>{emp.Email}</td>
                                            <td>{emp.Created_Date}</td>
                                            <td>{emp.User_Type}</td>
                                            <td>{''}</td>
                                            <td>
                                                <span className="action-icons">
                                                    <img src={edit} onClick={() => { }} title="edit" />
                                                    <img src={deleteIcon} onClick={() => deleteEmployee(emp.ID)} title="delete" />
                                                </span>
                                            </td>
                                        </tr>))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
export default Manager;