Template.createGroup.onCreated(function() {
    Session.set('header', 'Create Group')
    const template = this
    let group = Session.get('createGroup')
    let receiverId = group ? group.receiver : undefined
    template.receiver = new ReactiveVar(Meteor.users.findOne(receiverId))

    template.searchFilter = new ReactiveVar('')
})

Template.createGroup.onRendered(function() {

})

Template.createGroup.helpers({
    users() {
        let searchFilter = Template.instance().searchFilter.get()
        let queryParams = {
            _id: {$ne: Meteor.userId()}
        }
        if (searchFilter.length > 0) queryParams['profile.name'] = {$regex: searchFilter, $options: 'i'}
        return Meteor.users.find(queryParams, {
            sort: {'profile.name': 1},
            fields: {'profile.name': 1}
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
    'keyup #search-input'(event, template) {
        let name = $(event.target).val()
        template.searchFilter.set(name)
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

