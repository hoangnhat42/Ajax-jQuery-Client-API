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
    formData["author"] = document.getElementById("author").value;
    formData["description"] = document.getElementById("description").value;
    formData["publishDate"] = document.getElementById("publishDate").value;
    formData["title"] = document.getElementById("title").value;
    formData["price"] = document.getElementById("price").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.author;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.description;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.publishDate;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.title;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = data.price;
    cell5 = newRow.insertCell(5);
    cell5.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("author").value = "";
    document.getElementById("description").value = "";
    document.getElementById("publishDate").value = "";
    document.getElementById("title").value = "";
    document.getElementById("price").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("id").value = selectedRow.cells[0].innerHTML;
    document.getElementById("author").value = selectedRow.cells[1].innerHTML;
    document.getElementById("description").value = selectedRow.cells[2].innerHTML;
    document.getElementById("publishDate").value = selectedRow.cells[3].innerHTML;
    document.getElementById("title").value = selectedRow.cells[4].innerHTML;
    document.getElementById("price").value = selectedRow.cells[5].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.author;
    selectedRow.cells[1].innerHTML = formData.description;
    selectedRow.cells[2].innerHTML = formData.publishDate;
    selectedRow.cells[3].innerHTML = formData.title;
    selectedRow.cells[4].innerHTML = formData.price;
}

function onDelete(td) {

    selectedRow = td.parentElement.parentElement;
    var id = selectedRow.cells[0].innerHTML;
    var weHaveSuccess = false;
  
    $.ajax({
        type: 'DELETE',
        dataType: 'json',
        contentType:'application/json',
        url: 'https://4mnqff3wfj.execute-api.us-east-1.amazonaws.com/dev/book/' + id,
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
    if (document.getElementById("author").value == "") {
        isValid = false;
        document.getElementById("authorValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("authorValidationError").classList.contains("hide"))
            document.getElementById("authorValidationError").classList.add("hide");
    }
    return isValid;
}
$(function () {

    var $orders = $('#orders');
    var $author = $('#author');
    var $description = $('#description');
    var $publishDate = $('#publishDate');
    var $title = $('#title');
    var $price = $('#price');

    function addOrder(order) {
        $orders.append('<li>author: ' + order.author + ',description'  + order.description+ 
        ',publishDate'  + order.publishDate+',title'  + order.title+', price: ' + order.price +'</li>');
    }

   

    $('#add-order').on('click', function() {

        var order = {
            author: $('#author').val(), //$author.val(),
            description: $('#description').val(), 
            publishDate: $('#publishDate').val(),
            title: $('#title').val(),
            price: $('#price').val() ///$price.val(),
            
        };
        var weHaveSuccess = false;
        console.log(order);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType:'application/json',
            url: 'https://4mnqff3wfj.execute-api.us-east-1.amazonaws.com/dev/book',
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
            author: $('#author').val(), //$author.val(),
            description: $('#description').val(), 
            publishDate: $('#publishDate').val(),
            title: $('#title').val(),
            price: $('#price').val() ///$price.val(),
            
        };
        var weHaveSuccess = false;
        console.log(order);
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType:'application/json',
            url: 'https://4mnqff3wfj.execute-api.us-east-1.amazonaws.com/dev/book',
            data: JSON.stringify(order),
            success: function(newOrder,status,xhr) {
                addOrder(newOrder);
                weHaveSuccess = true;
            },
            error: function(xhr, status,error) {
                
                alert("Error!" + xhr.status);
                alert('error saving orders');
                
            }
            }
        );
    });

    $('#delete-order').on('click', function(td) {

        //var id = $('#id').val();
        selectedRow = td.parentElement.parentElement;
        var id = selectedRow.cells[0].innerHTML;
        var weHaveSuccess = false;
        console.log(order);
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            contentType:'application/json',
            url: 'https://4mnqff3wfj.execute-api.us-east-1.amazonaws.com/dev/book/' + id,
            data: JSON.stringify(order),
            success: function(newOrder,status,xhr) {
                addOrder(newOrder);
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