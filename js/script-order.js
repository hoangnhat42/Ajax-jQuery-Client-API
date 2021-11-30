var selectedRow = null

function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["bookTitle"] = document.getElementById("bookTitle").value;
    formData["quantity"] = document.getElementById("quantity").value;
    formData["orderDate"] = document.getElementById("orderDate").value;
    formData["name"] = document.getElementById("name").value;
    formData["contact"] = document.getElementById("contact").value;
    formData["shippingAddress"] = document.getElementById("shippingAddress").value;
    formData["total"] = document.getElementById("total").value;
    formData["status"] = document.getElementById("status").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.bookTitle;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.quantity;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.orderDate;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.name;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.contact;
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = data.shippingAddress;
    cell7 = newRow.insertCell(6);
    cell7.innerHTML = data.total;
    cell8 = newRow.insertCell(7);
    cell8.innerHTML = data.status;

    cell8 = newRow.insertCell(8);
    cell8.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("bookTitle").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("orderDate").value = "";
    document.getElementById("name").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("shippingAddress").value = "";
    document.getElementById("total").value = "";
    document.getElementById("status").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("bookTitle").value = selectedRow.cells[1].innerHTML;
    document.getElementById("quantity").value = selectedRow.cells[2].innerHTML;
    document.getElementById("orderDate").value = selectedRow.cells[3].innerHTML;
    document.getElementById("name").value = selectedRow.cells[4].innerHTML;
    document.getElementById("contact").value = selectedRow.cells[5].innerHTML;
    document.getElementById("shippingAddress").value = selectedRow.cells[6].innerHTML;
    document.getElementById("total").value = selectedRow.cells[7].innerHTML;
    document.getElementById("status").value = selectedRow.cells[8].innerHTML;

    const open = document.getElementById("open");
    const modal_container = document.getElementById("modal_container");
    const close = document.getElementById("close");
    modal_container.classList.add("show");
    close.addEventListener("click", () => {
    modal_container.classList.remove("show");
    
});
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.bookTitle;
    selectedRow.cells[1].innerHTML = formData.quantity;
    selectedRow.cells[2].innerHTML = formData.orderDate;
    selectedRow.cells[3].innerHTML = formData.name;
    selectedRow.cells[4].innerHTML = formData.contact;
    selectedRow.cells[5].innerHTML = formData.shippingAddress;
    selectedRow.cells[6].innerHTML = formData.total;
    selectedRow.cells[7].innerHTML = formData.status;

}

function onDelete(td) {

    selectedRow = td.parentElement.parentElement;
    var id = selectedRow.cells[0].innerHTML;
    
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        contentType:'application/json',
        url: 'https://610s4r7hw8.execute-api.us-east-1.amazonaws.com/dev/order/' + id,
        success: function() {
            
            alert("Delete success!");
            location.reload(); 
            weHaveSuccess = true;
        },
        error: function(xhr) {
            
            alert("Error!" + xhr.status); 
        }
        }
    );
}

function validate() {
    isValid = true;
    if (document.getElementById("bookTitle").value == "") {
        isValid = false;
        document.getElementById("bookTitleValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("bookTitleValidationError").classList.contains("hide"))
            document.getElementById("bookTitleValidationError").classList.add("hide");
    }
    return isValid;
}
$(function () {

    var $orders = $('#orders');
    var $bookTitle = $('#bookTitle');
    var $quantity = $('#quantity');
    var $orderDate = $('#orderDate');
    var $name = $('#name');
    var $contact = $('#contact');
    var $shippingAddress = $('#shippingAddress');
    var $total = $('#total');
    var $status = $('#status');

    function addOrder(order) {
        $orders.append('<li>bookTitle: ' + order.bookTitle + ',quantity'  + order.quantity+ 
        ',orderDate'  + order.orderDate+',name'  + order.name+', contact: ' + order.contact +
        ',shippingAddress'  + order.shippingAddress+',total'  + order.total+', status: ' + order.status+ '</li>');
    }



    $('#add-order').on('click', function() {

        var order = {
            bookTitle: $('#bookTitle').val(), 
            quantity: $('#quantity').val(), 
            orderDate: $('#orderDate').val(),
            name: $('#name').val(),
            contact: $('#contact').val(),
            shippingAddress: $('#shippingAddress').val(),
            total: parseFloat($('#total').val()),
            status: $('#status').val()
            
        };
        var weHaveSuccess = false;
        console.log(order);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType:'application/json',
            url: 'https://610s4r7hw8.execute-api.us-east-1.amazonaws.com/dev/order',
            data: JSON.stringify(order),
            success: function(newOrder,status,xhr) {
                addOrder(newOrder);
                location.reload(); 
                weHaveSuccess = true;
            },
            error: function(xhr, status,error) {
                
                alert("Error!" + xhr.status);
                alert('error saving orders');
                
            }
            }
        );
    });
    
    $('#update-order').on('click', function() {

        var order = {
            id: $('#id').val(),
            bookTitle: $('#bookTitle').val(), 
            quantity: $('#quantity').val(), 
            orderDate: $('#orderDate').val(),
            name: $('#name').val(),
            contact: $('#contact').val(),
            shippingAddress: $('#shippingAddress').val(),
            total: parseFloat($('#total').val()),
            status: $('#status').val()
            
        };
        var weHaveSuccess = false;
        console.log(order);
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType:'application/json',
            url: 'https://610s4r7hw8.execute-api.us-east-1.amazonaws.com/dev/order',
            data: JSON.stringify(order),
            success: function(newOrder,status,xhr) {
                addOrder(newOrder);
                location.reload();
                weHaveSuccess = true;
            },
            error: function(xhr, status,error) {
                
                alert("Error!" + xhr.status);
                alert('error saving orders');
                
            }
            }
        );
    });

    
});