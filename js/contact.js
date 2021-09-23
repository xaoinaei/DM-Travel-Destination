function rootpath(){
	var root = "/";
	return root;
}
$(document).ready(function() {
    $("#contactid").click(function() {
        //Get values of the input fields and store it into the variables.
        var name = $("#name").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var country = $("#country").val();
        var message = $("#message").val();
		var grecaptcha = $("#g-recaptcha-response").val();

        var errors = [];

        if (name == "") {
            errors[errors.length] = "Name field is Mandatory .";
        }

        if (email.indexOf('@') < 1 || email.indexOf('.') < 1) {
            errors[errors.length] = "You must enter a valid email address.";
        }

        if (phone == "") {
            errors[errors.length] = "Contact Number is Mandatory";
        } else if (isNaN(phone)) {
            errors[errors.length] = "Invalid Contact Number";
        }
		if (grecaptcha=="") {
		errors[errors.length] = "Please click on the reCAPTCHA box";
		}

        if (errors.length > 0) {
            reportErrors(errors);
            return false;
        }

        function reportErrors(errors) {
            var msg = "Please Enter Valid Data...\n";
            for (var i = 0; i < errors.length; i++) {
                var numError = i + 1;
                msg += "\n" + numError + ". " + errors[i];
            }
            alert(msg);
        }
        $.ajax({
            url: rootpath()+'verify',
            type: 'post',
            data: {
                name: name,
                email: email,
                phone: phone,
                country: country,
                message: message,
				grecaptcha: grecaptcha
            },

            dataType: 'html',
            beforeSend: function() {
                //$( "body" ).append('<div id="dvLoading"></div>');
                $('#contact').after('<span class="wait">&nbsp;<img src="images/loading.gif" alt="" /></span>');
                $('#contact').attr('disabled', true);
            },
            complete: function() {

                $('.wait').remove();
                $('#easy').attr('disabled', false);
            },
            success: function(response) {
 				alert(response);
			  window.open(rootpath()+"thank-you","_self");
                //$("#message").html(response);
                $('#easy').trigger("reset");
            },
            error: function(xhr, ajaxOptions, thrownError) {
                alert(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });

        return false;
    });

});