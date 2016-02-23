Template.navigation.events({
    'click #logout-btn'() {
        Meteor.logout()
    },
    'click #back-btn'() {
        let pageStack = Session.get('pageStack') || [];
        if (pageStack.length <= 0) return
        let page = pageStack.pop()
        Session.set('pageStack', pageStack)
        Session.set('goingBack', true)
        FlowRouter.go(page)
    }
})

Template.navigation.helpers({
    header() {
        return Session.get('header') || 'Dorodoro';
    },
    showBackButton() {
        let pageStack = Session.get('pageStack') || []
        return pageStack.length > 0
    }
})

Template.navigation.onRendered(function () {
    frameworkInit()
})