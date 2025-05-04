document.addEventListener('DOMContentLoaded', function() {
    // Get references to the day and year select elements.
    const daySelect = document.getElementById('birth-date-day');
    const yearSelect = document.getElementById('birth-date-year');
    const currentYear = new Date().getFullYear();

    // Populate the day select dropdown.
    if (daySelect) {
        for (let i = 1; i <= 31; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            daySelect.appendChild(option);
        }
    } else {
        console.error("Element with ID 'birth-date-day' not found.");
    }

    // Populate the year select dropdown.
    if (yearSelect) {
        for (let i = currentYear; i >= currentYear - 100; i--) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i;
            yearSelect.appendChild(option);
        }
    } else {
        console.error("Element with ID 'birth-date-year' not found.");
    }

    // Get a reference to the registration form and its submit button.
    const registrationForm = document.getElementById('registrationForm');
    const submitButton = document.getElementById('submit-button');
    const userDisplay = document.getElementById('user-display');


    // Add an event listener to the submit button.
    if (submitButton) {
        submitButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default form submission

            // Get the values of all the input fields.
            const name = document.getElementById('name').value;
            const birthDay = document.getElementById('birth-date-day').value;
            const birthMonth = document.getElementById('birth-date-month').value;
            const birthYear = document.getElementById('birth-date-year').value;
            const birthPlace = document.getElementById('birth-place').value;
            const permanentAddress = document.getElementById('permanent-address').value;
            const occupation = document.getElementById('occupation').value;
            const companyName = document.getElementById('company-name').value;
            const educationalAttainment = document.getElementById('educational-attainment').value;
            const school = document.getElementById('school').value;
            const topicInterests1 = document.getElementById('topic-interests').value;
            const topicInterests2 = document.getElementById('topic-interests-2').value;
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // --- Validation ---
            let isValid = true;
            let errorMessage = "";

            if (!name.trim()) {
                isValid = false;
                errorMessage += "Name is required.\n";
            }
            if (!birthDay || !birthMonth || !birthYear) {
                isValid = false;
                errorMessage += "Birth date is required.\n";
            }
            if (!birthPlace.trim()) {
                isValid = false;
                errorMessage += "Birth place is required.\n";
            }
            if (!permanentAddress.trim()) {
                isValid = false;
                errorMessage += "Permanent address is required.\n";
            }
            if (!occupation.trim()) {
                isValid = false;
                errorMessage += "Occupation is required.\n";
            }
            if (!companyName.trim()) {
                isValid = false;
                errorMessage += "Company name is required.\n";
            }
            if (!educationalAttainment) {
                isValid = false;
                errorMessage += "Educational attainment is required.\n";
            }
            if (!school.trim()) {
                isValid = false;
                errorMessage += "School is required.\n";
            }
            if (!topicInterests1.trim()) {
                isValid = false;
                errorMessage += "Topic Interest is required.\n";
            }
            if (!username.trim()) {
                isValid = false;
                errorMessage += "Username is required.\n";
            }
            if (!password.trim()) {
                isValid = false;
                errorMessage += "Password is required.\n";
            }
            if (!confirmPassword.trim()) {
                isValid = false;
                errorMessage += "Confirm Password is required.\n";
            }
            if (password !== confirmPassword) {
                isValid = false;
                errorMessage += "Passwords do not match.\n";
            }

            if (!isValid) {
                alert(errorMessage);
                return; // Stop processing if there are errors
            }
            // --- End Validation ---

            // Create an object to store the registration data.
            const registrationData = {
                name: name,
                birthDate: `${birthYear}-${birthMonth}-${birthDay}`,
                birthPlace: birthPlace,
                permanentAddress: permanentAddress,
                occupation: occupation,
                companyName: companyName,
                educationalAttainment: educationalAttainment,
                school: school,
                topicInterests: [topicInterests1, topicInterests2],
                username: username,
                password: password,
                confirmPassword: confirmPassword
            };

            // Store the registration data in localStorage.
            localStorage.setItem('registrationData', JSON.stringify(registrationData));
            console.log('Registration data saved to localStorage:', registrationData);
            userDisplay.textContent = username;

            // Redirect to signin.html after successful registration.
            window.location.href = "signin.html";
        });
    } else {
        console.error("Submit button not found within the registration form.");
    }

    // Get the login form
    const loginFormElement = document.getElementById('login-form');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get the values from the login form
            const enteredUsername = document.getElementById('login-email-username').value; // Correct ID
            const enteredPassword = document.getElementById('login-password').value;     // Correct ID

            // Get the stored registration data from localStorage
            const storedData = localStorage.getItem('registrationData');

            if (storedData) {
                const registrationData = JSON.parse(storedData);
                console.log("Retrieved data from localStorage:", registrationData);

                // Perform verification
                if (enteredUsername === registrationData.username && enteredPassword === registrationData.password) {
                    alert('Login successful!');
                    // Change the header content here
                    const headerElement = document.querySelector('header');
                    if (headerElement) {
                        headerElement.innerHTML = `
                            <div class="whole-nav">
                                <div class="navigation">
                                    <img src="https://img.icons8.com/ios-filled/50/lock--v1.png" alt="lock icon" class="w-8 h-8" />
                                    <div class="navlinks">
                                        <a href="#" class="hover:text-gray-200"> Home</a>
                                        <a href="#" class="hover:text-gray-200"> About</a>
                                        <a href="addtocart.html"> Pricing </a>
                                        <a href="#" class="hover:text-gray-200"> Documentation </a>
                                    </div>
                                </div>
                                <div class="registration">
                                    <span class="font-semibold text-white">  ${enteredUsername}  </span>
                                    <div class="text-3xl text-white">≡</div>
                                </div>
                            </div>
                        `;
                         headerElement.className = "root-nav";
                    }
                    window.location.href = "homepage.html";  // <--- Redirect AFTER successful login
                } else {
                    alert('Invalid credentials. Please try again.');
                }
            } else {
                alert('No registration data found. Please register first.');
                window.location.href = "register.html";
            }
        });
    }

    // --- Prevent navigation until form is submitted --- (Corrected to allow navigation if registered)
    const navLinks = document.querySelectorAll('header nav a');
    if (!localStorage.getItem('registrationData')) { //check if there is registration data
        navLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault();
                alert('Please register first.');
                window.location.href = "register.html";
            });
        });
    } else {
        navLinks.forEach(link => {
             link.style.pointerEvents = 'auto'; // Enable clicks
             link.style.color = '';
        })
    }

    // --- Clear button functionality ---
    const clearButton = document.getElementById('clear-button');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            const formElements = registrationForm.querySelectorAll('input, select, textarea');
            formElements.forEach(element => {
                if (element.type === 'select-one') {
                    element.selectedIndex = 0; // Reset dropdowns to the first option
                } else {
                    element.value = ''; // Clear input and textarea values
                }
            });
            userDisplay.textContent = 'Unknown User';
            localStorage.removeItem('registrationData');
        });
    }

    // --- Enable navigation links if registration data exists --- (No Issues here)
    const navLinksHeader = document.querySelectorAll('header nav a');
    if (localStorage.getItem('registrationData')) {
        navLinksHeader.forEach(link => {
            link.style.pointerEvents = 'auto';
            link.style.color = '';
        });
    } else {
        navLinksHeader.forEach(link => {
            link.style.pointerEvents = 'none';
            link.style.color = 'gray';
        });
    }

    // --- Highlight the Home link --- (No issues here)
    const homeLink = document.querySelector('header nav a[href="#"]');
    if (homeLink) {
        homeLink.style.backgroundColor = 'gray';
    }
});
