const getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Vikram'
    };
    callback(user);
};

getUser(31, (user) => {
    console.log(user);
});
// http: //maps.googleapis.com/maps/api/geocode/json?address=shreeram%20residency%20kothrud%20pune