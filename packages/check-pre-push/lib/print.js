function print_info(key, value) {
    if (value || value === 0) {
        console.log('\x1b[32m%s\x1b[0m', `${key}:`, value);
    }else {
        console.log('\x1b[32m%s\x1b[0m', `${key}:`, value);
    }
}
function print_error(value) {
    console.log('\x1b[31;1m%s\x1b[0m', '❌ Error:', value);
}
module.exports = {
    print_info,
    print_error
};
