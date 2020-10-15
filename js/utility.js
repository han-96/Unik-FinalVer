export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function renderID() {
    return Math.random().toString(36).substring(2);
}

export function setCurrentUser(currentUser) {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
}

export function setCurrentGuest(currentGuest) {
    localStorage.setItem('currentGuest', JSON.stringify(currentGuest));
}

export function setCurrentProject(currentProject) {
    localStorage.setItem('currentProject', JSON.stringify(currentProject));
}

export function setHomeList(homeList) {
    localStorage.setItem('homeList', JSON.stringify(homeList));
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

export function getCurrentGuest() {
    return JSON.parse(localStorage.getItem('currentGuest'));
}

export function getCurrentProject() {
    return JSON.parse(localStorage.getItem('currentProject'));
}

export function getHomeList() {
    return JSON.parse(localStorage.getItem('homeList'));
}

export function getDataFromDocs(docs) {
    let data = [];
    docs.forEach(function (doc) {
        data.push(getDataFromDoc(doc));
    });
    return data;
}

export function getDataFromDoc(doc) {
    let data = doc.data();
    data.id = doc.id;
    return data;
}