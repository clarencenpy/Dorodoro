Template.groups.onCreated(function() {
    Session.set('header', 'Dorodoro')
})

Template.groups.onRendered(function() {

})

Template.groups.helpers({
    groups() {
        return Groups.find({$or: [{members: Meteor.userId()}, {createdBy: Meteor.userId()}]}, {sort: {date: -1}})
    },
    addOne(n) {
        return n+1
    },
    daysLeft(time) {
        let now = moment()
        return moment(time).diff(now, 'days')
    },
    messages() {
        return Messages.find({to: Meteor.userId()})
    }
})

Template.groups.events({
    'click .groups-container .list-message'() {
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)

        FlowRouter.go('group', {id: this._id})
    },
    'click .footer-btn'() {
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)

        FlowRouter.go('createGroup')
    },
    'click .group-invite .accept-btn'() {
        let groupId = this.data.groupId
        Groups.update(groupId, {
            $push: {members: Meteor.userId()},
            $pull: {pendingMembers: Meteor.userId()}
        })
        Messages.remove(this._id)
    },
    'click .group-invite .reject-btn'() {
        let groupId = this.data.groupId
        Groups.update(groupId, {
            $pull: {pendingMembers: Meteor.userId()}
        })
        Messages.remove(this._id)
    },
    'click .pay-notification .accept-btn'() {
        Messages.remove(this._id)
    }

})

Template.groups.onDestroyed(function() {
    Session.set('header', null)
})

