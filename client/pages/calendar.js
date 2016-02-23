Template.calendar.onRendered(function () {
    Session.set('header', 'Calendar')
})
Template.calendar.onDestroyed(function () {
    Session.set('header', null)
})