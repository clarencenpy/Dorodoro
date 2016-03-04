Template.addMembers.onCreated(function() {

    Session.set('header', 'Add Members')

    const template = this;

    template.group = Session.get('createGroup')
    template.users = new ReactiveVar(Meteor.users.find({_id: {$nin: [Meteor.userId(), template.group.receiver]}}, {
        sort: {'profile.name': 1},
        fields: {'profile.name': 1}
    }).fetch())
})

Template.addMembers.onRendered(function() {

})

Template.addMembers.helpers({
    users() {
        return Template.instance().users.get()
    },
    receiver() {
        return Meteor.users.findOne(Template.instance().group.receiver)
    },
    group() {
        return Template.instance().group
    },
    numMembers() {
        let num = 0
        let users = Template.instance().users.get()
        _.each(users, function (u) {
            if (u.selected) num++
        })
        return num
    }
})

Template.addMembers.events({
    'click .list-item'(event, template) {
        let id = this._id;
        let users = template.users.get()
        users = _.map(users, function (u) {
            if (u._id === id) {
                u.selected = !u.selected
            }
            return u
        })
        template.users.set(users)
    },
    'click #createGroup-btn'(event, template) {
        let group = {}
        group.eventName = template.$('#name').val()
        group.eventDate = template.$('#date').val()
        let members = []
        _.each(template.users.get(), function (u) {
            if (u.selected) members.push(u._id)
        })
        group.pendingMembers = members
        group.createdBy = Meteor.userId()
        group.receiver = template.group.receiver


        let groupId = Groups.insert(group)

        //send a message to all members
        let receiverName = Meteor.users.findOne(group.receiver)
        _.each(members, function (member) {
            let message = {
                from: Meteor.userId(),
                to: member,
                date: new Date(),
                type: 'GROUP_INVITE',
                data: {
                    groupId: groupId,
                    receiverName: receiverName,
                    eventName: group.eventName
                }
            }
            console.log(message)
            Messages.insert(message)
        })

        Session.set('createGroup', null)

        //set pagestack to home page
        let pageStack = []
        pageStack.push('/')
        Session.set('pageStack', pageStack)

        FlowRouter.go('group', {id: groupId})
    }
})

Template.addMembers.onDestroyed(function() {
    Session.set('header', null)
})

