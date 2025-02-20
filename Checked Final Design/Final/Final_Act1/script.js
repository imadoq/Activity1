document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        sendJSONData(event);
    });
});

function sendJSONData(event) {
    event.preventDefault();
    
    var selectedGender = document.querySelector('input[name="gender"]:checked');
    var jsonData = {
        FName: document.getElementById("Fname").value.trim(),
        LName: document.getElementById("Lname").value.trim(),
        Address: document.getElementById("address").value.trim(),
        Age: document.getElementById("age").value.trim(),
        Gender: selectedGender ? selectedGender.value : "No selection"
    };

    if (!validateForm(jsonData)) {
        return;
    }

    var jsonString = JSON.stringify(jsonData);
    const submitButton = document.querySelector('button[type="submit"]');
    submitButton.classList.add('loading');
    submitButton.disabled = true;

    $.ajax({
        url: "DesignDraft.php", 
        type: 'POST',
        data: { myData: jsonString },
        success: function(response) {
            
            //format the response for better display
            const formattedResponse = response.replace(/\|\s+/g, '\n');
            
            swal({
                title: "Result",
                text: formattedResponse,
                icon: "success",
                buttons: {  
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn-success",
                    }
                }
            }).then((value) => {
                if (response.includes("Section:")) {
                    form.reset();
                }
            });
        },
        error: function(xhr, status, error) {
            swal({
                title: "Error",
                text: "An error occurred while processing your request: " + error,
                icon: "error"
            });
        },
        complete: function() {
            submitButton.classList.remove('loading');
            submitButton.disabled = false;
        }
    });
}

function validateForm(data) {
    const namePattern = /^[A-Za-z\-'.\s]{2,50}$/;
    const agePattern = /^[0-9]{1,2}$/;

    if (!data.FName) {
        showError("Please enter your First Name");
        return false;
    }
    if (!namePattern.test(data.FName)) {
        showError("First Name should only contain letters and be between 2-50 characters");
        return false;
    }

    if (!data.LName) {
        showError("Please enter your Last Name");
        return false;
    }
    if (!namePattern.test(data.LName)) {
        showError("Last Name should only contain letters and be between 2-50 characters");
        return false;
    }

    if (!data.Address) {
        showError("Please enter your Address");
        return false;
    }

    if (!data.Age) {
        showError("Please enter your Age");
        return false;
    }
    if (!agePattern.test(data.Age)) {
        showError("Age should be a valid number between 1-99");
        return false;
    }
    if (parseInt(data.Age) < 1 || parseInt(data.Age) > 99) {
        showError("Age must be between 1 and 99");
        return false;
    }

    if (data.Gender === "No selection") {
        showError("Please select your Gender");
        return false;
    }

    return true;
}

function showError(message) {
    swal({
        title: "Validation Error",
        text: message,
        icon: "warning",
        button: {
            text: "OK",
            className: "btn-warning"
        }
    });
}

//real-time validation
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[type="text"]');
    const form = document.getElementById('studentForm');
    

    //sticky header behavior
    const header = document.querySelector('.sticky-header');
    let lastScroll = 1;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 200) {
            header.classList.add('visible');
        } else if (currentScroll < lastScroll) {
            if (currentScroll < 200) {
                header.classList.remove('visible');
            }
        }
        lastScroll = currentScroll;
    });
});
