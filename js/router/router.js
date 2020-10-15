var root = null;
var useHash = true; // Defaults to: false
var hash = '#!'; // Defaults to: '#'
window.router = new Navigo(root, useHash, hash);

let $screen = document.getElementById('screen');

window.router.on('/', function () {
    $screen.innerHTML = '<get-started-screen></get-started-screen>';
}).resolve();

window.router.on('/sign-up', function () {
    $screen.innerHTML = '<sign-up-screen></sign-up-screen>';
}).resolve();

window.router.on('/sign-in', function () {
    $screen.innerHTML = '<sign-in-screen></sign-in-screen>';
}).resolve();

window.router.on('/choose-first-topic', function () {
    $screen.innerHTML = '<choose-first-topic></choose-first-topic>';
}).resolve();

window.router.on('/home', function () {
    $screen.innerHTML = '<home-screen></home-screen>';
}).resolve();

window.router.on('/publish-project', function () {
    $screen.innerHTML = '<publish-project-screen></publish-project-screen>';
}).resolve();

window.router.on('/explore', function () {
    $screen.innerHTML = '<explore-screen></explore-screen>';
}).resolve();

window.router.on('/search', function () {
    $screen.innerHTML = '<search-screen></search-screen>';
}).resolve();

window.router.on('/user-board', function () {
    $screen.innerHTML = '<user-board></user-board>';
}).resolve();

window.router.on('/view-board', function () {
    $screen.innerHTML = '<view-board></view-board>';
}).resolve();

window.router.on('/update-profile', function () {
    $screen.innerHTML = '<update-profile-screen></update-profile-screen>';
}).resolve();

window.router.notFound(function () {
    $screen.innerHTML = `<p>404 Error</p>`;
});