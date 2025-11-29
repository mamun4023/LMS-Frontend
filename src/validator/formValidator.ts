export const formValidator = (type: string, value: any) => {
    const errors = {
        isValid: false,
        message: '',
    };

    if (type === 'name' || type === 'email' || type === 'password') {
        if (!value || value.length < 3) {
            errors.isValid = true;
            errors.message = `${type} is required!`;
        }
    }

    if (type === 'name') {
        if (!/^[a-zA-Z\s]+$/.test(value)) {
            errors.isValid = true;
            errors.message = 'Name can only contain letters and spaces!';
        }
    }
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errors.isValid = true;
            errors.message = 'Invalid email format!';
        }
    }
    if (type === 'password') {
        if (value.length < 6) {
            errors.isValid = true;
            errors.message = 'Password must be at least 6 characters long!';
        }
    }

    if (type === 'phoneNumber') {
        if (!value) {
            errors.isValid = true;
            errors.message = 'Phone number is required!';
        } else if (value.length != 11) {
            errors.isValid = true;
            errors.message = 'Phone number must be 11 digits long!';
        }
    }

    if (type === 'userType') {
        if (!value) {
            errors.isValid = true;
            errors.message = 'User type is required!';
        }
    }

    if (type === 'businessName') {
        if (!value || value.length < 3) {
            errors.isValid = true;
            errors.message = 'Business name is required!';
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
            errors.isValid = true;
            errors.message = 'Business name can only contain letters and spaces!';
        }
    }

    if (type === 'summary') {
        if (!value || value.length < 10) {
            errors.isValid = true;
            errors.message =
                'Summary is required and must be at least 10 characters long!';
        }
    }

    if (type === 'date') {
        if (!value) {
            errors.isValid = true;
            errors.message = 'Date is required!';
        }
    }

    if (type === 'time') {
        if (!value) {
            errors.isValid = true;
            errors.message = 'Time is required!';
        }
    }
    if (type === 'outlet') {
        if (!value) {
            errors.isValid = true;
            errors.message = 'Outlet is required!';
        }
    }
    if (type === 'service') {
        if (!value) {
            errors.isValid = true;
            errors.message = 'Service is required!';
        }
    }

    return errors;
};

export const matchingPasswords = (password: string, confirmPassword: string) => {
    const errors = {
        isValid: false,
        messsage: '',
    };
    if (password !== confirmPassword) {
        errors.isValid = true;
        errors.messsage = 'Passwords do not match!';
    }
    return errors;
};