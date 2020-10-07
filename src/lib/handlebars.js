import { format } from 'timeago.js';

const helpers = {};

helpers.timeago = (timestamps) => {
    return format(timestamps);
}

export default helpers;