Template.groupSettings.onCreated(function() {

})

Template.groupSettings.onRendered(function() {

})

Template.groupSettings.helpers({
    votingClosed() {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        return group.votingClosed
    },
    isAdmin() {
        let groupId = FlowRouter.getParam('id')
        let group = Groups.findOne(groupId)
        return Meteor.userId() === group.createdBy
    }
})

Template.groupSettings.events({
    'click #close-btn'(event, template) {
        template.$('.modal-container').addClass('slideOutRight')
        Meteor.setTimeout(function () {
            Session.set('showSettings', false)
        }, 1000)
    },
    'click .endVoting-btn'() {
        let groupId = FlowRouter.getParam('id')
        Groups.update(groupId, {$set: {votingClosed: true}})
    }
})

Template.groupSettings.onDestroyed(function() {

})

