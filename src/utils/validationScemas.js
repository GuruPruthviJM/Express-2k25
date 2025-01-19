export const createUserValidationSchema = {
    name: {
        isLength:{
            options: {
                min: 5,
                max: 32
            },
            errorMessage: 'Name should be between 5 and 32 characters long.'
        },
        notEmpty: {
            errorMessage: 'Name should be a non-empty string.'
        },
        isString: {
            errorMessage: 'Name should be a string.'
        },
    },
    email: {
        isEmail: {
            errorMessage: 'Email should be a valid email address.'
        },
        notEmpty: {
            errorMessage: 'Email should be a non-empty string.'
        },
        isString: {
            errorMessage: 'Email should be a string.'
        },
    }
}