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
    formData["contact"] = document.getElementById("contact").value;
    formData["date"] = document.getElementById("date").value;
    formData["name"] = document.getElementById("name").value;
    formData["time"] = document.getElementById("time").value;
   
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.contact;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.date;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.name;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.time;

    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("contact").value = "";
    document.getElementById("date").value = "";
    document.getElementById("name").value = "";
    document.getElementById("time").value = "";

    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("contact").value = selectedRow.cells[1].innerHTML;
    document.getElementById("date").value = selectedRow.cells[2].innerHTML;
    document.getElementById("name").value = selectedRow.cells[3].innerHTML;
    document.getElementById("time").value = selectedRow.cells[4].innerHTML;

    const open = document.getElementById("open");
    const modal_container = document.getElementById("modal_container");
    const close = document.getElementById("close");
    modal_container.classList.add("show");
    close.addEventListener("click", () => {
    modal_container.classList.remove("show");
    
});

}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.contact;
    selectedRow.cells[1].innerHTML = formData.date;
    selectedRow.cells[2].innerHTML = formData.name;
    selectedRow.cells[3].innerHTML = formData.time;

}

function onDelete(td) {

    selectedRow = td.parentElement.parentElement;
    var id = selectedRow.cells[0].innerHTML;
    var weHaveSuccess = false;
  
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        contentType:'application/json',
        url: 'https://wqjwh8wfh3.execute-api.us-east-1.amazonaws.com/dev/appointment/' + id,
        success: function(newOrder,status,xhr) {
            
            alert("Delete success!"  + xhr.status);
            location.reload(); 
            weHaveSuccess = true;
        },
        error: function(xhr, status,error) {
            
            alert("Error!" + xhr.status); 
        }
        }
    );
}

function validate() {
    isValid = true;
    if (document.getElementById("contact").value == "") {
        isValid = false;
        document.getElementById("contactValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("contactValidationError").classList.contains("hide"))
            document.getElementById("contactValidationError").classList.add("hide");
    }
    return isValid;
}
$(function () {

    var $orders = $('#orders');
    var $contact = $('#contact');
    var $date = $('#date');
    var $name = $('#name');
    var $time = $('#time');

    function addOrder(order) {
        $orders.append('<li>contact: ' + order.contact + ',date'  + order.date+ 
        ',name'  + order.name+',time'  + order.time +'</li>');
    }

   

    $('#add-order').on('click', function() {

        var order = {
            contact: $('#contact').val(),
            date: $('#date').val(), 
            name: $('#name').val(),
            time: $('#time').val()
            
        };
        var weHaveSuccess = false;
        console.log(order);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType:'application/json',
            url: 'https://wqjwh8wfh3.execute-api.us-east-1.amazonaws.com/dev/appointment',
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
            contact: $('#contact').val(),
            date: $('#date').val(), 
            name: $('#name').val(),
            time: $('#time').val(),
          
        };
        var weHaveSuccess = false;
        console.log(order);
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType:'application/json',
            url: 'https://wqjwh8wfh3.execute-api.us-east-1.amazonaws.com/dev/appointment',
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