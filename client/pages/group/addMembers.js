Template.addMembers.onCreated(function() {

    Session.set('header', 'Add Members')

    const template = this;

    template.group = Session.get('createGroup')
    template.selectedUsers = new ReactiveVar([])

    template.searchFilter = new ReactiveVar('')
})

Template.addMembers.onRendered(function() {

})

Template.addMembers.helpers({
    selectedUsers() {
        let searchFilter = Template.instance().searchFilter.get()
        let queryParams = {_id: {$in: Template.instance().selectedUsers.get()}}
        if (searchFilter.length > 0) queryParams['profile.name'] = {$regex: searchFilter, $options: 'i'}
        return Meteor.users.find(queryParams, {
            sort: {'profile.name': 1},
            fields: {'profile.name': 1}
        })
    },
    otherUsers() {
        let searchFilter = Template.instance().searchFilter.get()
        let excludedUsers = [Meteor.userId(), Template.instance().group.receiver]
        excludedUsers = excludedUsers.concat(Template.instance().selectedUsers.get())
        let queryParams = {
            _id: {$nin: excludedUsers}
        }
        if (searchFilter.length > 0) queryParams['profile.name'] = {$regex: searchFilter, $options: 'i'}
        return Meteor.users.find(queryParams, {
            sort: {'profile.name': 1},
            fields: {'profile.name': 1}
        })
    },
    receiver() {
        return Meteor.users.findOne(Template.instance().group.receiver)
    },
    group() {
        return Template.instance().group
    },
    numMembers() {
        return Template.instance().selectedUsers.get().length
    },
    isSelected(id) {
        return _.find(Template.instance().selectedUsers.get(), function (user) {
            return user === id
        })
    }
})

Template.addMembers.events({
    'click .list-item'(event, template) {
        let id = this._id;
        let selectedUsers = template.selectedUsers.get()
        if (selectedUsers.indexOf(id) >= 0) {
            selectedUsers = _.without(selectedUsers, id)
        } else {
            selectedUsers.push(id)
        }
        template.selectedUsers.set(selectedUsers)
        $(template.$('#search-input')[0]).val('')
        template.searchFilter.set('')
    },
    'keyup #search-input'(event, template) {
        let name = $(event.target).val()
        template.searchFilter.set(name)
    },
    'click #createGroup-btn'(event, template) {
        let group = {}
        let selectedUsers = template.selectedUsers.get()
        group.eventName = template.$('#name').val()
        group.eventDate = template.$('#date').val()
        group.pendingMembers = []
        group.members = []
        _.each(selectedUsers, function (userId) {
            let user = Meteor.users.findOne(userId)
            if (user.services.facebook) {
                //real user, send invite
                group.pendingMembers.push(userId)
            } else {
                //fake user, auto accept and dont send notifications
                group.members.push(userId)
            }
        })
        group.createdBy = Meteor.userId()
        group.receiver = template.group.receiver
        group.date = new Date()

        let groupId = Groups.insert(group)
        //send a message to all members
        _.each(group.pendingMembers, function (userId) {

            let message = {
                from: Meteor.userId(),
                to: userId,
                date: new Date(),
                type: 'GROUP_INVITE',
                data: {
                    groupId: groupId,
                    receiverId: group.receiver,
                    eventName: group.eventName
                }
            }
            Messages.insert(message)
        })

        Session.set('createGroup', null)

        //set pagestack to home page
        let pageStack = []
        pageStack.push('/')
        Session.set('pageStack', pageStack)

        Events.insert({
            date: new Date(),
            userId: Meteor.userId(),
            name: 'GROUP_CREATED'
        })

        FlowRouter.go('group', {id: groupId})
    }
})

Template.addMembers.onDestroyed(function() {
    Session.set('header', null)
})

