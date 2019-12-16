import {extend} from 'vee-validate';
import {confirmed, email, length, required} from 'vee-validate/dist/rules';

extend('required', {
    ...required,
    message: 'Required'
});

extend('email', {
    ...email,
    message: 'This field must be a valid email'
});

extend('confirmed', {
    ...confirmed,
    message: 'This field confirmation does not match'
});

extend('length', {
    ...length,
    message: '<br /> You must select at least 1'
});

extend('atLeastTwo', (value) => {
    if (value.length > 1) {
        return true;
    }
    return 'Select at least 2 items';
});
