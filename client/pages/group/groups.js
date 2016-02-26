Template.groups.onCreated(function() {
    Session.set('header', 'Current Active Groups')
})

Template.groups.onRendered(function() {

})

Template.groups.helpers({
    groups() {
        return Groups.find({$or: [{members: Meteor.userId()}, {createdBy: Meteor.userId()}]})
    },
    addOne(n) {
        return n+1
    }
})

Template.groups.events({
    'click .list-message'() {
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)

        FlowRouter.go('group', {id: this._id})
    }
})

Template.groups.onDestroyed(function() {
    Session.set('header', null)
})

