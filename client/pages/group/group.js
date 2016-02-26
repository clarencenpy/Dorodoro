Template.group.onCreated(function() {
    Session.set('header', 'Brainstorm Gifts')
})

Template.group.onRendered(function() {

})

Template.group.helpers({
    group() {
        return Groups.findOne(FlowRouter.getParam('id'))
    },
    receiver() {
        let group = Groups.findOne(FlowRouter.getParam('id'))
        return Meteor.users.findOne(group.receiver)
    }
})

Template.group.events({
    'click #suggest-btn'() {
        Session.set('giftSelection', {
            group: Groups.findOne(FlowRouter.getParam('id')),
            selection: []
        })
        FlowRouter.go('store')
    }
})

Template.group.onDestroyed(function() {
    Session.set('header', null)
})

