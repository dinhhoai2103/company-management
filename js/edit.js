
$().ready (function() {   
    $.validator.addMethod("select", function(){ //Check Whitelisted Zone for non empty
        var a = $("#list2 option").text();
        if ( a == '') {
            return false;
        }
        return true;
    });
    $.validator.addMethod("number", function(){ //Check Max Working Hours > 0
        var b = $("#max").val();
        if ( b <= 0 ) {
            return false;
        }
        return true;
    });
    $.validator.addMethod("nameCompany", function(){  //Check Company Name for non empty
        var c = $("#company").val().trim();
        if ( c == '' ) {
            return false;
        }
        return true;
    });
    $("#form").validate({
        rules: {
            company: { required: true, nameCompany: true},
            operating: "required",
            max: { required: true, number: true},
            list2:  { select: true }
        },
        messages: {
            company: "Please enter company name",
            operating: "Please check",
            max: "Please enter Max Working Hours > 0",
            list2: { select: "Please select Whitelisted Zone" }
        },
      submitHandler: function() {
        registerForm();
      }
    })

   
    
    $("#cancel").click( function() {
        location.href="index.html";
    })
})
var user_obj = function(company, color, max, whitelisted, status) {
    this.company = company;
    this.color = color;
    this.max = max;
    this.whitelisted = whitelisted;
    this.status = status;
}
function registerForm(){    
        var whitelisted = '';
        for ( let i = 0 ; i < list.length; i++) { //Loop array list, add <br>
            whitelisted += "Zone " + list[i] + "<br>";
        }
        var userInput = $('#company').val();
        var userReg = localStorage.getItem(userInput);
        if ( userReg == null ){
            var user = new user_obj ( userInput, $('#color2').val(), $('#max').val(), whitelisted, $('#status2').val());
            localStorage.setItem(userInput, JSON.stringify(user));
            alert("Đăng kí thành công");
            $('#form').reset();
        } else {
            alert("Tên công ty đã tồn tại");
            $("#company").focus();  
        }
    }
var list = [];
$("#addZone").click(function () { //Event click for icon #addZone
    var selectedZoneValue = $('#list').val(); //Get value 
    if( selectedZoneValue == "") 
    {
        return false;
    }  
    else {
        for (let i = 0; i < selectedZoneValue.length; i++) {
            //Way 1 remove select tag with selectedZoneValue
            //var out_put =  "<option "
            // + "value = '" + selectedZoneValue[i] +"'"
            // + ">"
            // + selectedZoneValue[i] 
            // + "</option>" ;
            // $("#list2").append(out_put);
            //$("#list option[value='"+selectedZoneValue[i]+"']").remove(); //Remove tag option with selectedZoneValue[i] from element list2

             //Way 2 use disabled attribute
            var out_put =  "<option "
            + "value = '" + selectedZoneValue[i] +"'"
            + ">"
            + 'Zone ' + selectedZoneValue[i] 
            + "</option>" ;
            $("#list2").append(out_put);
            $("#list option[value='"+selectedZoneValue[i]+"']").attr('disabled', true); //Disable Selected Zone form Zone List
            list.push(selectedZoneValue[i]); //add selectedZoneValue[i] to list array  
        }
    } 
})

$("#removeZone").click(function () { //Event click for icon #removeZone
    var selectedZoneValue2 = $('#list2').val(); //Get value to select tag
    if( selectedZoneValue2 == "" )
    {
        return false;
    }  
    else {
        for (let i = 0; i < selectedZoneValue2.length; i++) {
            //Way 1 use remove select tag with selectedZoneValue, 
            // var out_put2 =  "<option "                           
            // + "value = '" + selectedZoneValue2[i] +"'"
            // + ">"
            // + selectedZoneValue2[i] 
            // + "</option>" 
            // $("#list").append(out_put2);
            // $("#list2 option[value='"+selectedZoneValue2[i]+"']").remove();


            //Way 2 use remove attribute disable
            $("#list2 option[value='"+selectedZoneValue2[i]+"']").remove(); //Remove tag option with selectedZoneValue2[i] from element list2
            $("#list option[value='"+selectedZoneValue2[i]+"']").attr('disabled', false);
            list.splice(list.indexOf(selectedZoneValue2[i]), 1); //Remove duplicate value in array   
        }       
    }
    return list;
})
