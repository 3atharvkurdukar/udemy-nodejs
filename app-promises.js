const users  =[{
    id: 1,
    name: 'Atharv',
    schoolId: 101
}, {
    id: 2,
    name: 'Mahesh',
    schoolId: 102
}];
const grades = [{
    id: 1, 
    schoolId: 101,
    grade: 90
}, {
    id: 2, 
    schoolId: 102,
    grade: 86.3
}, {
    id: 3, 
    schoolId: 101,
    grade: 88.4
}];

const getUsers = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((user) => user.id === id);
        if (user) {
            resolve(user);
        }
        else {
            reject(`Unable to find user with id ${id}`);
        }
    });
};

const getGrades = (schoolId) => {
    return new Promise((resolve, reject) => {
        resolve(grades.filter((grade) => grade.schoolId === schoolId));
    });
};

const getStatus = (userId) => {
    let user;
    return getUsers(userId).then((tempUser) => {
        user = tempUser;
        return getGrades(user.schoolId);
    }).then((grades) => {
        let average = 0;
        if (grades.length > 0) {
            average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
        }

        return `${user.name} has scored ${average}% in the class`;
    });
};

const getStatusAlt = async (userId) => {
    const user = await getUsers(userId);
    const grades = await getGrades(user.schoolId);
    let average = 0;
    if (grades.length > 0) {
        average = grades.map((grade) => grade.grade).reduce((a, b) => a + b) / grades.length;
    }

    return `${user.name} has scored ${average}% in the class`;
};

getUsers(2).then((user) => {
    console.log(user);
}).catch((err) => {
    console.error(err);
});

getGrades(101).then((grades) => {
    console.log(grades);
}).catch((err) => {
    console.error(err);
});

getStatus(2).then((status) => {
    console.log(status);
}).catch((err) => {
    console.error(err);
});

getStatusAlt(2).then((status) => {
    console.log(status);
}).catch((err) => {
    console.error(err);
});
