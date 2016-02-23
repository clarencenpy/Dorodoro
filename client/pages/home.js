Template.home.onRendered(function () {
    Session.set('header', 'Home')
})

Template.home.onDestroyed(function () {
    Session.set('header', null)
})
