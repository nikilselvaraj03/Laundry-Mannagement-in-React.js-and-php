import axios from 'axios';
import React,{useEffect,useState} from 'react'
import editIcon from '../assets/images/edit.png'
function ScheduleHistory (){
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        showScheduleTable();
    },[]);
    function showScheduleTable() {
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/schedule.php',
            headers: {
                'content-type': 'application/json'
            },
            data: {Function: 'getAllschedule'}
        }).then(result => {
            setOrders(result.data);
        }).catch(error => {
        });
    }
    function EditOrder(order) {
        debugger;
        axios({
            method: 'post',
            url: process.env.REACT_APP_API_PATH + '/schedule.php',
            headers: {
                'content-type': 'application/json'
            },
            data: {Function:'alterRecord', Data:order}
        }).then(result => {
            order.editOrder = false;
           setOrders([...orders]);
        }).catch(error => {
        });
        showScheduleTable();
    }
    function editOrderColumn(order) {
        orders.map(order => {if(order.addOrder) {
            order.addOrder = false;
        }});
        order.editOrder = true;
        let index =orders.findIndex(ord => ord.Phonenumber === order.Phonenumber);
        orders[index] = order;
        setOrders([...orders]);
    }
    function handleChange(event,order) {
        const { name, value } = event.target;
        orders.forEach((ord) => {if(ord.Phonenumber === order.Phonenumber){
            ord[name] = value;
        }});
        setOrders([...orders]);
    }
    return(
        <div>
            <h1></h1>
            <div className="d-flex flex-direction-column align-items-center table-section-content">
                <span className="font-oswald section-header">
                    Schedule History
                </span> 
                <div className="table-container">
                    <table id="order-table" className="material-table">
                        <tbody>
                        <tr>
                            {/* <th>Customer ID</th> */}
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Service</th>
                            <th></th>
                        </tr>
                        {orders.map(order=>{
                            if(order.editOrder)
                            return(
                                <tr>
                                {/* <td>{order.customer_ID}</td> */}
                                <td><input type="text" id="fname" name="First_Name" className="font-roboto" placeholder="First Name" value={order.First_Name} onChange={(event) => handleChange(event,order)} required/></td>
                                <td><input type="text" id="lane"  name="Last_Name" className="font-roboto" placeholder="Last Name" value={order.Last_Name} onChange={(event) => handleChange(event,order)} required/></td>
                                <td></td>
                                {/* <td><input type="number" id="Phonenumber" className="font-roboto"  name="Phonenumber" placeholder="Phone Number" value={order.Phonenumber} onChange={(event) => handleChange(event,order)} required/></td> */}
                                <td><input type="text" id="Email" className="font-roboto"  name="Email" placeholder="Email" value={order.Email} onChange={(event) => handleChange(event,order)} required/></td>
                                <td><input type="date" id="start" name="date" value={order.date} min="2021-10-01" max="2030-12-31" className="dayTime" onChange={(event) => handleChange(event,order)} required/></td>
                                <td><input type="time" id="appt" name="time" value={order.time} min="09:00" max="18:00" className="dayTime" onChange={(event) => handleChange(event,order)}  required /></td>
                                <td>
                                <select name="service" id="service" className="font-roboto" value={order.service} onChange={(event) => handleChange(event,order)} required>
                                        <option hidden selected>Select Required Service</option>
                                        <option value="Washing">Washing</option>
                                        <option value="Drying">Drying</option>
                                        <option value="Ironing">Ironing</option>
                                        <option value="Complete Laundry Service">Complete Laundry Service (Washing+Drying+Ironing)</option>
                                </select>
                                </td>
                                <td>
                                <span className="action-icons edit-icon">
                                <img src={editIcon} onClick={() => EditOrder(order)} title="Confirm"/>
                                </span></td>
                            </tr>
                            )
                            else return(
                                <tr>
                                {/* <td>{order.customer_ID}</td> */}
                                <td>{order.First_Name}</td>
                                <td>{order.Last_Name}</td>
                                <td>{order.Phonenumber}</td>
                                <td>{order.Email}</td>
                                <td>{order.date}</td>
                                <td>{order.time}</td>
                                <td>{order.service}</td>
                                <td>
                                <span className="action-icons edit-icon">
                                <img src={editIcon} onClick={() => editOrderColumn(order)} title="edit"/>
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
export default ScheduleHistory