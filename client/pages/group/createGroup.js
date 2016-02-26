Template.createGroup.onCreated(function() {
    Session.set('header', 'Create Group')
    const template = this
    let group = Session.get('createGroup')
    let receiverId = group ? group.receiver : undefined
    template.receiver = new ReactiveVar(Meteor.users.findOne(receiverId))
})

Template.createGroup.onRendered(function() {

})

Template.createGroup.helpers({
    users() {
        return Meteor.users.find({_id: {$ne: Meteor.userId()}}, {
            sort: {'profile.name': 1}
        })
    },
    receiver() {
        return Template.instance().receiver.get()
    },
    isReceiver(id) {
        let receiver = Template.instance().receiver.get()
        return receiver ? receiver._id === id : false
    },
    group() {
        return Session.get('createGroup')
    }
})

Template.createGroup.events({
    'click .list-item'(event, template) {
        template.receiver.set(this)
    },
    'click #next-btn'(event, template) {
        let group = {}
        group.eventName = template.$('#name').val()
        group.eventDate = template.$('#date').val()
        group.receiver = template.receiver.get()._id
        Session.set('createGroup', group)

        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)

        FlowRouter.go('addMembers')
    }
})

Template.createGroup.onDestroyed(function() {
    Session.set('header', null)
})

