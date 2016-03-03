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
    },
    members() {
        let groupId = FlowRouter.getParam('id')
        let members = Groups.findOne(groupId).members
        return _.map(members, function (m) {
            return Meteor.users.findOne(m)
        })
    },
    creator() {
        let groupId = FlowRouter.getParam('id')
        let creator = Groups.findOne(groupId).createdBy
        return Meteor.users.findOne(creator)
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
    Session.set('showSettings', null)
})

