Template.navigation.events({
    'click #logout-btn'() {
        Meteor.logout()
    }
})

Template.navigation.helpers({
    header() {
        return Session.get('header') || 'Dorodoro';
    }
})