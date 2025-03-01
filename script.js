document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('studentForm');
    const fnameInput = document.getElementById('Fname');
    const lnameInput = document.getElementById('Lname');
    const addressInput = document.getElementById('address');
    const ageInput = document.getElementById('age');

    // Add form submit event listener
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        sendJSONData(event);
    });

    // Add character counter elements
    function addCharacterCounter(input, maxLength) {
        const counterDiv = document.createElement('div');
        counterDiv.className = 'character-counter';
        counterDiv.style.fontSize = '12px';
        counterDiv.style.color = '#666';
        counterDiv.style.marginTop = '2px';
        input.parentNode.insertBefore(counterDiv, input.nextSibling);
        
        function updateCounter() {
            const remaining = maxLength - input.value.length;
            counterDiv.textContent = `${input.value.length}/${maxLength} characters`;
            
            // Change color when approaching limit
            if (input.value.length >= maxLength) {
                counterDiv.style.color = 'red';
            } else if (input.value.length >= maxLength * 0.8) {
                counterDiv.style.color = 'orange';
            } else {
                counterDiv.style.color = '#666';
            }
        }
        
        input.addEventListener('input', updateCounter);
        updateCounter(); // Initial count
    }

    // Add counters to inputs
    addCharacterCounter(fnameInput, 50);
    addCharacterCounter(lnameInput, 50);
    addCharacterCounter(addressInput, 99);
    addCharacterCounter(ageInput, 2);

    // regular expressions
    const namePattern = /^.{2,50}$/;
    const agePattern = /^[0-9]{1,2}$/;
    // add max length attributes
    fnameInput.maxLength = 50;
    lnameInput.maxLength = 50;
    addressInput.maxLength = 99;
    ageInput.maxLength = 2;

    // function to show inline error
    function showInlineError(element, message) {
        element.classList.add('error-input');
        let errorDiv = element.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            element.parentNode.insertBefore(errorDiv, element.nextSibling);
        }
        errorDiv.textContent = message;
    }

    // function to remove inline error
    function removeInlineError(element) {
        element.classList.remove('error-input');
        const errorDiv = element.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    }

    // real-time validation for names
    [fnameInput, lnameInput].forEach(input => {
        input.addEventListener('input', function() {
            if (this.value && !namePattern.test(this.value)) {
                showInlineError(this, 'Name must be between 2-50 characters');
            } else if (!this.value) {
                showInlineError(this, 'This field is required');
            } else {
                removeInlineError(this);
            }
        });
    });

    // real-time validation for age
    ageInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        
        if (!this.value) {
            showInlineError(this, 'Age is required');
        } else if (!agePattern.test(this.value)) {
            showInlineError(this, 'Age must be a valid number');
        } else if (parseInt(this.value) < 1 || parseInt(this.value) > 99) {
            showInlineError(this, 'Age must be between 1 and 99');
            swal({
                title: "Invalid Age",
                text: "Age must be between 1 and 99",
                icon: "warning",
                button: {
                    text: "OK",
                    className: "btn-warning"
                }
            });
        } else {
            removeInlineError(this);
        }
    });

    // address validation
    addressInput.addEventListener('input', function() {
        if (!this.value) {
            showInlineError(this, 'Address is required');
        } else {
            removeInlineError(this);
        }
    });

    // add CSS for error styling
    const style = document.createElement('style');
    style.textContent = `
        .error-input {
            border-color: red !important;
            background-color: #fff6f6 !important;
        }
        .error-message {
            color: red;
            font-size: 12px;
            margin-top: 5px;
        }
        .character-counter {
            font-size: 12px;
            color: #666;
            margin-top: 2px;
            text-align: right;
        }
        input:focus {
            outline: none !important;
            box-shadow: none !important;
        }
        /* Remove browser default validation styling */
        input:invalid {
            box-shadow: none;
        }
        /* Remove default success/error icons */
        input::-webkit-validation-bubble-message,
        input::-webkit-validation-bubble,
        input::-webkit-validation-bubble-arrow-clipper {
            display: none;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0px 1000px white inset !important;
        }
    `;
    document.head.appendChild(style);

    // sticky header behavior
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

    // Add confirmation SweetAlert
    swal({
        title: "Confirm Submission",
        text: "Are you sure you want to submit this form?",
        icon: "question",
        buttons: {
            cancel: {
                text: "Cancel",
                value: false,
                visible: true,
                className: "btn-secondary",
            },
            confirm: {
                text: "Submit",
                value: true,
                visible: true,
                className: "btn-primary",
            }
        },
    }).then((willSubmit) => {
        if (willSubmit) {
            var jsonString = JSON.stringify(jsonData);
            const submitButton = document.querySelector('button[type="submit"]');
            submitButton.classList.add('loading');
            submitButton.disabled = true;

            $.ajax({
                url: "DesignDraft.php",
                type: 'POST',
                data: { myData: jsonString },
                success: function(response) {
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
    });
}

function validateForm(data) {
    const namePattern = /^.{2,50}$/;
    const agePattern = /^[0-9]{1,2}$/;

    if (!data.FName) {
        showError("Please enter your First Name");
        return false;
    }
    if (!namePattern.test(data.FName)) {
        showError("First Name must be between 2-50 characters");
        return false;
    }

    if (!data.LName) {
        showError("Please enter your Last Name");
        return false;
    }
    if (!namePattern.test(data.LName)) {
        showError("Last Name must be between 2-50 characters");
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

// prevent form resubmission on page refresh
if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}