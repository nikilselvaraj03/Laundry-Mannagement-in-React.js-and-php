import axios from 'axios';
import React, { useEffect, useState } from 'react'
import edit from '../assets/images/edit.png'
function OrdersHistory () {
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        showOrderTable();
    },[]);
    function showOrderTable() {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/orders.php',
            headers: {
                'content-type': 'application/json'
            },
            data: {Function: 'getAllOrders'}
        }).then(result => {
            setOrders(result.data);
        }).catch(error => {
        });
    }
    function editOrderColumn(order) {
        orders.map(order => {if(order.addOrder) {
            order.addOrder = false;
        }});
        order.editOrder = true;
        let index =orders.findIndex(ord => ord.Order_ID === order.Order_ID);
        orders[index] = order;
        setOrders([...orders]);
    }
    function addOrEditOrder(order) {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/orders.php',
            headers: {
                'content-type': 'application/json'
            },
            data: {Function:'alterRecord', Data:order}
        }).then(result => {
            order.editOrder = false;
           setOrders([...orders]);
        }).catch(error => {
        });
        showOrderTable();
    }
    function handleChange(event,order) {
        const { name, value } = event.target;
        orders.forEach((ord) => {if(ord.Order_ID === order.Order_ID){
            ord[name] = value;
        }});
        setOrders([...orders]);
    }
    return(
        <div>
            <h1></h1>
            <div className="d-flex flex-direction-column align-items-center table-section-content">
                <span className="font-oswald section-header">
                    Order History
                </span> 
                <div className="table-container">
                    <table id="order-table" className="material-table">
                        <tbody>
                            <tr>
                                <th>Order ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Email</th>
                                <th>Items</th>
                                <th>Service Type</th>
                                <th></th>
                            </tr>
                            {orders.map(order=>{
                                if(order.editOrder)
                                return (
                                    <tr>
                                        <td>{order.customer_ID}</td>
                                        <td><input type="text" id="fname" name="First_Name" className="font-roboto" placeholder="First Name" value={order.First_Name} onChange={(event) => handleChange(event,order)} required/></td>
                                        <td><input type="text" id="lane"  name="Last_Name" className="font-roboto" placeholder="Last Name" value={order.Last_Name} onChange={(event) => handleChange(event,order)} required/></td>
                                        <td><input type="number" id="Phonenumber" className="font-roboto"  name="Phonenumber" placeholder="Phone Number" value={order.Phonenumber} onChange={(event) => handleChange(event,order)} required/></td>
                                        <td><input type="text" id="Email" className="font-roboto"  name="Email" placeholder="Email" value={order.Email} onChange={(event) => handleChange(event,order)} required/></td>
                                        <td><input type="number" id="noOfItems" name="items" placeholder="Number of Items" value={order.items} onChange={(event) => handleChange(event,order)} required/></td>
                                        <td>
                                        <span className="action-icons edit-icon">
                                        <img src={edit} onClick={() => addOrEditOrder(order)} title="Confirm"/>
                                        </span></td>
                                    </tr>
                                )
                                else return(
                                    <tr>
                                        <td>{order.Order_ID}</td>
                                        <td>{order.First_Name}</td>
                                        <td>{order.Last_Name}</td>
                                        <td>{order.Phonenumber}</td>
                                        <td>{order.Email}</td>
                                        <td>{order.items}</td>
                                        <td>{order.Service}</td>
                                        <td>
                                        <span className="action-icons edit-icon">
                                        <img src={edit} onClick={() => editOrderColumn(order)} title="edit"/>
                                        </span>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default OrdersHistory