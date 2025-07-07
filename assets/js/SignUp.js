// Configuration
// const CONFIG = {
//   API_BASE_URL: 'https://your-api-endpoint.com/api',
//   LOCAL_API_URL: 'http://127.0.0.1:8000/api/auth/v1',
//   REDIRECT_DELAY: 2000
// };

// DOM Elements
const signupForm = document.getElementById('signupForm');
const alertMessage = document.getElementById('alertMessage');
const signupBtn = document.getElementById('signupBtn');
const btnText = signupBtn.querySelector('.btn-text');
const btnSpinner = signupBtn.querySelector('.btn-spinner');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordRequirements = document.getElementById('passwordRequirements');

// Password validation requirements
const passwordRules = {
  length: { regex: /.{8,}/, element: document.getElementById('length') },
  uppercase: { regex: /[A-Z]/, element: document.getElementById('uppercase') },
  lowercase: { regex: /[a-z]/, element: document.getElementById('lowercase') },
  number: { regex: /\d/, element: document.getElementById('number') },
  special: { regex: /[!@#$%^&*(),.?":{}|<>]/, element: document.getElementById('special') }
};

/**
 * Initialize the signup page
 */
document.addEventListener('DOMContentLoaded', function() {
  initializeEventListeners();
  checkIfAlreadyLoggedIn();
});

/**
 * Check if user is already logged in and redirect to dashboard
 */
function checkIfAlreadyLoggedIn() {
  const isLoggedIn = localStorage.getItem('autoEliteLoggedIn') || sessionStorage.getItem('autoEliteLoggedIn');
  if (isLoggedIn === 'true') {
    window.location.href = 'dashboard.html'; // Redirect to dashboard or main page
  }
}

/**
 * Initialize all event listeners
 */
function initializeEventListeners() {
  // Form submission
  signupForm.addEventListener('submit', handleSignup);
  
  // Password visibility toggles
  document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
      togglePasswordVisibility(this.dataset.target);
    });
  });
  
  // Password validation
  passwordInput.addEventListener('focus', showPasswordRequirements);
  passwordInput.addEventListener('blur', hidePasswordRequirements);
  passwordInput.addEventListener('input', validatePassword);
  
  // Confirm password validation
  confirmPasswordInput.addEventListener('input', validatePasswordMatch);
  
  // Real-time field validation
  document.getElementById('email').addEventListener('blur', validateEmail);
  document.getElementById('username').addEventListener('blur', validateUsername);
  document.getElementById('phone').addEventListener('blur', validatePhone);
}

/**
 * Handle signup form submission
 */
async function handleSignup(event) {
  event.preventDefault();
  
  // Get form data
  const formData = getFormData();
  
  // Validate form
  if (!validateForm(formData)) {
    return;
  }
  
  // Show loading state
  setLoadingState(true);
  
  try {
    const result = await submitSignup(formData);
    
    if (result.success) {
      showAlert(result.message, 'success');
      
      // Redirect to login page after successful signup
      setTimeout(() => {
        window.location.href = 'login.html';
      }, CONFIG.REDIRECT_DELAY);
    } else {
      showAlert(result.message, 'error');
    }
  } catch (error) {
    console.error('Signup error:', error);
    showAlert('An error occurred during signup. Please try again.', 'error');
  } finally {
    setLoadingState(false);
  }
}

/**
 * Get form data from inputs
 */
function getFormData() {
  return {
    firstName: document.getElementById('firstName').value.trim(),
    lastName: document.getElementById('lastName').value.trim(),
    email: document.getElementById('email').value.trim(),
    phone: document.getElementById('phone').value.trim(),
    username: document.getElementById('username').value.trim(),
    password: document.getElementById('password').value,
    confirmPassword: document.getElementById('confirmPassword').value,
    terms: document.getElementById('terms').checked,
    newsletter: document.getElementById('newsletter').checked
  };
}

/**
 * Validate the entire form
 */
function validateForm(data) {
  let isValid = true;
  
  // Check required fields
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'username', 'password', 'confirmPassword'];
  
  requiredFields.forEach(field => {
    if (!data[field]) {
      markFieldAsInvalid(field);
      isValid = false;
    } else {
      markFieldAsValid(field);
    }
  });
  
  // Validate email format
  if (data.email && !isValidEmail(data.email)) {
    markFieldAsInvalid('email');
    showAlert('Please enter a valid email address.', 'error');
    isValid = false;
  }
  
  // Validate password strength
  if (data.password && !isValidPassword(data.password)) {
    markFieldAsInvalid('password');
    showAlert('Password does not meet requirements.', 'error');
    isValid = false;
  }
  
  // Validate password match
  if (data.password !== data.confirmPassword) {
    markFieldAsInvalid('confirmPassword');
    showAlert('Passwords do not match.', 'error');
    isValid = false;
  }
  
  // Check terms acceptance
  if (!data.terms) {
    showAlert('Please accept the Terms of Service and Privacy Policy.', 'error');
    isValid = false;
  }
  
  return isValid;
}

/**
 * Submit signup data to API
 */
async function submitSignup(data) {
  try {
    const response = await fetch(`${CONFIG.LOCAL_API_URL}/register/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        username: data.username,
        password: data.password,
       
      })
    });
    
    const result = await response.json();
    
    if (response.ok) {
      return {
        success: true,
        message: 'Account created successfully! Please check your email to verify your account.'
      };
    } else {
      return {
        success: false,
        message: result.message || 'Registration failed. Please try again.'
      };
    }
  } catch (error) {
    console.error('API Error:', error);
    throw new Error('Network error occurred');
  }
}

/**
 * Toggle password visibility
 */
function togglePasswordVisibility(targetId) {
  const input = document.getElementById(targetId);
  const toggle = document.querySelector(`[data-target="${targetId}"]`);
  
  if (input.type === 'password') {
    input.type = 'text';
    toggle.classList.remove('fa-eye');
    toggle.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    toggle.classList.remove('fa-eye-slash');
    toggle.classList.add('fa-eye');
  }
}

/**
 * Show password requirements
 */
function showPasswordRequirements() {
  passwordRequirements.classList.add('show');
}

/**
 * Hide password requirements
 */
function hidePasswordRequirements() {
  setTimeout(() => {
    if (document.activeElement !== passwordInput) {
      passwordRequirements.classList.remove('show');
    }
  }, 200);
}

/**
 * Validate password strength
 */
function validatePassword() {
  const password = passwordInput.value;
  let allValid = true;
  
  Object.keys(passwordRules).forEach(rule => {
    const isValid = passwordRules[rule].regex.test(password);
    const element = passwordRules[rule].element;
    
    if (isValid) {
      element.classList.add('valid');
    } else {
      element.classList.remove('valid');
      allValid = false;
    }
  });
  
  if (allValid && password.length > 0) {
    markFieldAsValid('password');
  } else if (password.length > 0) {
    markFieldAsInvalid('password');
  }
  
  return allValid;
}

/**
 * Validate password match
 */
function validatePasswordMatch() {
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;
  
  if (confirmPassword.length > 0) {
    if (password === confirmPassword) {
      markFieldAsValid('confirmPassword');
    } else {
      markFieldAsInvalid('confirmPassword');
    }
  }
}

/**
 * Validate email format
 */
function validateEmail() {
  const email = document.getElementById('email').value;
  if (email.length > 0) {
    if (isValidEmail(email)) {
      markFieldAsValid('email');
    } else {
      markFieldAsInvalid('email');
    }
  }
}

/**
 * Validate username
 */
function validateUsername() {
  const username = document.getElementById('username').value;
  if (username.length > 0) {
    if (username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username)) {
      markFieldAsValid('username');
    } else {
      markFieldAsInvalid('username');
    }
  }
}

/**
 * Validate phone number
 */
function validatePhone() {
  const phone = document.getElementById('phone').value;
  if (phone.length > 0) {
    if (/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''))) {
      markFieldAsValid('phone');
    } else {
      markFieldAsInvalid('phone');
    }
  }
}

/**
 * Check if email is valid
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Check if password meets requirements
 */
function isValidPassword(password) {
  return Object.keys(passwordRules).every(rule => 
    passwordRules[rule].regex.test(password)
  );
}

/**
 * Mark field as valid
 */
function markFieldAsValid(fieldId) {
  const input = document.getElementById(fieldId);
  input.classList.remove('error');
  input.classList.add('success');
}

/**
 * Mark field as invalid
 */
function markFieldAsInvalid(fieldId) {
  const input = document.getElementById(fieldId);
  input.classList.remove('success');
  input.classList.add('error');
}

/**
 * Show alert message
 */
function showAlert(message, type = 'error') {
  alertMessage.textContent = message;
  alertMessage.className = `alert ${type}`;
  alertMessage.classList.add('show');
  
  // Hide alert after 5 seconds
  setTimeout(() => {
    alertMessage.classList.remove('show');
  }, 5000);
}

/**
 * Set loading state for signup button
 */
function setLoadingState(loading) {
  if (loading) {
    signupBtn.disabled = true;
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline';
  } else {
    signupBtn.disabled = false;
    btnText.style.display = 'inline';
    btnSpinner.style.display = 'none';
  }
}