$().ready (function() {   
    $("#add").click (function() {
        location.href = ("../html/edit.html");
    });
    getInfo();
    function getInfo() { //Loop LocalStorage and Display
        for (var i = 0; i < localStorage.length; i++) {
            let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
            $("#tbody").append ("<tr class=table-secondary>"
            + "<td><input type='checkbox' class='radio_task'></td>"
            + " <td class=text-center>"+ data.company +"</td>"
            + " <td class=text-center >"+ "<div style='background-color:  "+ data.color+";" + " width:40px;height:40px' class=m-auto ></div>"+ "</td>"
            + " <td class=text-center>"+ data.max +  "</td>"
            + " <td class=text-center>"+ data.whitelisted +"</td>"
            + " <td class=text-center>"+ data.status +"</td>"
            + " <td class=text-center>"+ '<i  class="fa fa-pencil icon" aria-hidden="true"></i>' +"</td>"
            + " </tr>");
        }
        }
})

$("#select").change ( function (){ //Select all checkbox
    var checkboxes = $(".radio_task");
    for (var checkbox of checkboxes) {
      checkbox.checked = this.checked;
    }
})
$("#delete").click( function () { //Delete local storage checkbox checked and display
    var checkboxes = document.getElementsByClassName("radio_task");
    for(var i =0; i<checkboxes.length ;i++){
        var keyCompany = checkboxes[i].parentElement.nextElementSibling.textContent; //Get company name
        if(checkboxes[i].checked){ 
            checkboxes[i].parentElement.parentElement.remove();  //Remove checkbox checked
            localStorage.removeItem(keyCompany); //Remove local storage with company name
            i--;
        } 
        }
})
$("#remove").click( function () { //Delete local storage and display      
    localStorage.clear();
    $("#tbody").html("");  
})
