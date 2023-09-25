import axios from 'axios';
var orders, equipment, pickupdelivery, customer, tasks, employees, managers;
export function populateTables() {

    // // fetch equipments list
    //         equipment =  require('../assets/staticData/ManageEqupment.json');
    //         populateEquipmentList(equipment['ManageEquipment'])


    // // fetch pickup/delivery list
    //         pickupdelivery = require('../assets/staticData/ManageService.json');
    //         populatePickupDeliveryList(pickupdelivery['ManageService']);


    // // fetch customer list
    //         customer = require('../assets/staticData/ManageCustomers.json')
    //         populateCustomerList(customer['ManageCustomer']);


    // fetch tasks list
            tasks = require('../assets/staticData/ManageTask.json')
            populateTaskList(tasks['ManageTask'])
    // // fetch employees list
    //         employees = require('../assets/staticData/ManageEmployee.json');
    //         populateEmployeeList(employees['ManageEmployee'])

    // // fetch managers list
    //         managers = require('../assets/staticData/ManageManagers.json');
    //         populateManagerList(managers['ManageManagers'])
}


// populate order table
export function populateOrderList(orders) {
    var orderTable = document.getElementById('order-table')?.childNodes[0];
    if(orderTable) {
    orders.forEach(element => {
        orderTable.innerHTML += `<tr id="${element.Order_ID}">
                <td>${element.Order_ID}</td>
                <td>${element.First_Name}</td>
                <td>${element.Last_Name}</td>
                <td>${element.Phonenumber}</td>
                <td>${element.Email}</td>
                <td>${element.items}</td>
                <td>${element.Service}</td>
                <td><span class="action-icons"><img src="../../assets/images/edit.png" onclick="editOrder(${element.Order_ID})" title="edit"> <img src="../../assets/images/delete.png" onclick="deleteRecord(${element.Order_ID})" title="delete"></span></td>
            </tr>`;
    });
}
}

// populate employee table
function populateEmployeeList(employees) {
    var employeeTable = document.getElementById('employee-table')?.childNodes[0];
    if(employeeTable){
    employees.forEach(element => {
        employeeTable.innerHTML += `<tr id="${`employee_` + element.id}">
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.Address}</td>
                <td>${element.PhoneNo}</td>
                <td>${element.Gender}</td>
                <td><span class="action-icons"><img src="../assets/images/edit.png" onclick= "editOrder(${`order_` + element.id})" title="edit"> <img src="../assets/images/delete.png" onclick="deleteRecord(order_${element.id})" title="delete"></span></td>
            </tr>`;
    }); }
}

//// populate manager table
function populateManagerList(managers) {
    var managerTable = document.getElementById('manager-table')?.childNodes[0];
    if(managerTable) {
    managers.forEach(element => {
        managerTable.innerHTML += `<tr id="${`employee_` + element.id}">
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.email}</td>
                <td>${element.Address}</td>
                <td>${element.PhoneNo}</td>
                <td>${element.Gender}</td>
                <td>${element.Position}</td>
                <td>${element.Branch}</td>
                <td><span class="action-icons"><img src="../assets/images/edit.png" onclick= "editOrder(${`order_` + element.id})" title="edit"> <img src="../assets/images/delete.png" onclick="deleteRecord(order_${element.id})" title="delete"></span></td>
            </tr>`;
    }); }
}

// populate equipment table
function populateEquipmentList(equipment) {
    var equipmentTable = document.getElementById('equipment-table')?.childNodes[0];
    if(equipmentTable) {
    equipment.forEach(element => {
        equipmentTable.innerHTML += `<tr id="${`equipment_` + element.No}">
                <td>${element.No}</td>
                <td>${element.EquipmentName}</td>
                <td>${element.Status}</td>
                <td>${element.OrderNo}</td>
                <td>${element.CustomerName}</td>
                <td><span class="action-icons"><img src="../assets/images/edit.png" onclick="editEquipment(${`equipment_` + element.No}) title="edit"> <img src="../assets/images/delete.png" onclick="deleteRecord(equipment_${element.No})" title="delete"></span></td>
            </tr>`;
    });}
}

// populate customer table
function populateCustomerList(customers) {
    let customerTable = document.getElementById('customer-table')?.childNodes[0];
    if(customerTable) {
    customers.forEach(element => {
        customerTable.innerHTML += `<tr id="${`employee_` + element.id}">
                <td>${element.id}</td>
                <td>${element.name}</td>
                <td>${element.Address}</td>
                <td>${element.email}</td>
                <td>${element.PhoneNo}</td>
                <td>${element.Gender}</td>
                <td><span class="action-icons"><img src="../assets/images/edit.png" onclick="editEquipment(${`customer_` + element.id}) title="edit"> <img src="../assets/images/delete.png" onclick="deleteRecord(customer_${element.id})" title="delete"></span></td>
            </tr>`;
    });
 }
}

//// populate pickupdelivery table
function populatePickupDeliveryList(pickupdeliveries) {
    let pickupdeliveryTable = document.getElementById('delivery-table')?.childNodes[0];
    if(pickupdeliveryTable) {
    pickupdeliveries.forEach(element => {
        pickupdeliveryTable.innerHTML += `<tr id="${`pickupdelivery_` + element.Sno}">
                <td>${element.Sno}</td>
                <td>${element.OrderNo}</td>
                <td>${element.Name}</td>
                <td>${element.Address}</td>
                <td>${element.PhoneNo}</td>
                <td>${element.AssignedTo}</td>
                <td>${element.ServiceType}</td>
                <td><span class="action-icons"><img src="../assets/images/edit.png" onclick="editEquipment(${`pickupdelivery_` + element.Sno}) title="edit"> <img src="../assets/images/delete.png" onclick="deleteRecord(pickupdelivery_${element.Sno})" title="delete"></span></td>
            </tr>`;
    });
 }
}

// populate tasks table
function populateTaskList(tasks) {
    let tasksTable = document.getElementById('tasks-table')?.childNodes[0];
    if(tasksTable) {
    tasks.forEach(element => {
        tasksTable.innerHTML += `<tr id="${`tasks_` + element.Sno}">
                <td>${element.Sno}</td>
                <td>${element.CustomerName}</td>
                <td>${element['Assigned To']}</td>
                <td>${element.Desc}</td>
                <td>${element.Services}</td>
                <td><span class="action-icons"><img src="../assets/images/edit.png" onclick="editEquipment(${`tasks_` + element.Sno}) title="edit"> <img src="../assets/images/delete.png" onclick="deleteRecord(tasks_${element.Sno})" title="delete"></span></td>
            </tr>`;
    });
 }
}

//add new row to order table
export function addOrder() {
    var orderTable = document.getElementById('order-table').childNodes[0];
    let number = orders['Manage Orders'].length + 1;
    orderTable.innerHTML += `<tr id="order_${number}">
        <td>${number}</td>
        <td>${(Number((orders['Manage Orders'])[orders['Manage Orders'].length - 1].OrderNo) + 1).toString()}</td>
        <td><input type="text" placeholder="Customer Name"></td>
        <td><input type="number" maxLength="10" placeholder="Phone"></td>
        <td><input type="text" placeholder="Type"></td>
        <td><span class="action-icons"><img src="../assets/images/tick.png" title="accept"> <img src="../assets/images/close.png" title="discard" onclick="discardRow(order_${number})"></span></td></tr>`;
}

//add new row to equipment table
export function addEquipment() {
    let number = Number(equipment['ManageEquipment'][equipment['ManageEquipment'].length - 1].No)
    var equipmentTable = document.getElementById('equipment-table').childNodes[0];
    equipmentTable.innerHTML += `<tr id="equipment_${number + 1}">
                <td>${number + 1}</td>
                <td><input type="text" placeholder="Equipment Name"></td>
                <td><input type="text" placeholder="Status"></td>
                <td><input type="text" placeholder="Order No"></td>
                <td><input type="text" placeholder="Customer Name"></td>
                <td><span class="action-icons"><img src="../assets/images/tick.png" title="accept"> <img src="../assets/images/close.png" title="discard" onclick="discardRow(equipment_${number + 1})"></span></td>
            </tr>`;
}

//add new row to tasks table
export function addTasks() {
    let number = Number(tasks['ManageTask'][tasks['ManageTask'].length - 1].Sno)
    var taskTable = document.getElementById('tasks-table').childNodes[0];
    taskTable.innerHTML += `<tr id="tasks_${number + 1}">
                <td>${number + 1}</td>
                <td><input type="text" placeholder="Customer Name"></td>
                <td><input type="text" placeholder="Assigned to"></td>
                <td><input type="text" placeholder="Desc"></td>
                <td><input type="text" placeholder="Services"></td>
                <td><span class="action-icons"><img src="../assets/images/tick.png" title="accept"> <img src="../assets/images/close.png" title="discard" onclick="discardRow(tasks_${number + 1})"></span></td>
            </tr>`;
}

////add new row to customer table
export function addCustomer() {
    let number = Number(customer['ManageCustomer'][customer['ManageCustomer'].length - 1].id)
    var customerTable = document.getElementById('customer-table').childNodes[0];
    customerTable.innerHTML += `<tr id="customer_${number + 1}">
                <td>${number + 1}</td>
                <td><input type="text" placeholder="Name"></td>
                <td><input type="text" placeholder="Address"></td>
                <td><input type="email" placeholder="Email"></td>
                <td><input type="number" placeholder="Phone No"></td>
                <td><input type="text" placeholder="Gender"></td>
                <td><span class="action-icons"><img src="../assets/images/tick.png" title="accept"> <img src="../assets/images/close.png" title="discard" onclick="discardRow(customer_${number + 1})"></span></td>
            </tr>`;
}

//add new row to employee table
export function addEmployee() {
    let number = Number(employees['ManageEmployee'][employees['ManageEmployee'].length - 1].id)
    var employeeTable = document.getElementById('employee-table').childNodes[0];
    employeeTable.innerHTML += `<tr id="employee_${number + 1}">
                <td>${number + 1}</td>
                <td><input type="text" placeholder="Name"></td>
                <td><input type="text" placeholder="Email"></td>
                <td><input type="email" placeholder="Address"></td>
                <td><input type="number" placeholder="Phone No"></td>
                <td><input type="text" placeholder="Gender"></td>
                <td><span class="action-icons"><img src="../assets/images/tick.png" title="accept"> <img src="../assets/images/close.png" title="discard" onclick="discardRow(employee_${number + 1})"></span></td>
            </tr>`;
}

//add new row to manager table
export function addManager() {
    let number = Number(managers['ManageManagers'][managers['ManageManagers'].length - 1].id)
    var managerTable = document.getElementById('manager-table').childNodes[0];
    managerTable.innerHTML += `<tr id="manager_${number + 1}">
                <td>${number + 1}</td>
                <td><input type="text" placeholder="Name"></td>
                <td><input type="text" placeholder="Email"></td>
                <td><input type="email" placeholder="Address"></td>
                <td><input type="number" placeholder="Phone No"></td>
                <td><input type="text" placeholder="Gender"></td>
                <td><input type="text" placeholder="Position"></td>
                <td><input type="text" placeholder="Location"></td>
                <td><span class="action-icons"><img src="../assets/images/tick.png" title="accept"> <img src="../assets/images/close.png" title="discard" onclick="discardRow(manager_${number + 1})"></span></td>
            </tr>`;
}

//add new row to delivery table
export function addDeliveries() {
    let number = Number(pickupdelivery['ManageService'][pickupdelivery['ManageService'].length - 1].Sno)
    var pickupdeliveryTable = document.getElementById('delivery-table').childNodes[0];
    pickupdeliveryTable.innerHTML += `<tr id="pickupdelivery_${number + 1}">
                <td>${number + 1}</td>
                <td><input type="text" placeholder="Order No"></td>
                <td><input type="text" placeholder="Name"></td>
                <td><input type="text" placeholder="Address"></td>
                <td><input type="text" placeholder="Phone No"></td>
                <td><input type="text" placeholder="Assigned To"></td>
                <td><input type="text" placeholder="Service Type"></td>
                <td><span class="action-icons"><img src="../assets/images/tick.png" title="accept"> <img src="../assets/images/close.png" title="discard" onclick="discardRow(pickupdelivery_${number + 1})"></span></td>
            </tr>`;
}

// discard added row
export function discardRow(element) {
    element.remove();
}
