'use-restrict'

//sample route
var r = route.create()
r('/', function() {
    tags = riot.mount('#container', 'home');
});