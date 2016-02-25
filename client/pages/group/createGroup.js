Template.createGroup.onCreated(function() {
    const template = this;
    template.users = new ReactiveVar(Meteor.users.find({_id: {$ne: Meteor.userId()}}, {
        sort: {'profile.name': 1},
        fields: {'profile.name': 1}
    }).fetch())
    template.receiver = new ReactiveVar()
})

Template.createGroup.onRendered(function() {

})

Template.createGroup.helpers({
    users() {
        return Template.instance().users.get()
    },
    receiver() {
        return Meteor.user()
    },
    isReceiver(id) {
        return Template.instance().receiver.get() === id
    }
})

Template.createGroup.events({
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
        let receiver = template.receiver.get()
        if (receiver === id) {
            template.receiver.set('')
        }
    },
    'click .selectReceiver-btn'(event, template) {
        event.stopPropagation()
        let id = this._id
        template.receiver.set(id)
        template.users.set(_.map(template.users.get(), function (u) {
            if (u._id === id) {
                u.selected = false
            }
            return u
        }))
    },
    'click #createGroup-btn'(event, template) {
        let group = {}
        group.eventName = template.$('#name').val()
        group.eventDate = template.$('#date').val()
        let members = []
        _.each(template.users.get(), function (u) {
            if (u.selected) members.push(u._id)
        })
        group.members = members
        group.createdBy = Meteor.userId()
        console.log(group)
        //Groups.insert(group)
    }
})

Template.createGroup.onDestroyed(function() {

})

