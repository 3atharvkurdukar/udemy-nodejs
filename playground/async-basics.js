console.log('Starting app...');

setTimeout(() => {
    console.log('Inside a callback');
}, 2000);

setTimeout(() => {
    console.log('Inside second callback');
}, 0);

console.log('Finishing Up...');