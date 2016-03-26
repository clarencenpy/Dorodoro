Template.addPhoto.onCreated(function() {

})

Template.addPhoto.onRendered(function() {

})

Template.addPhoto.helpers({
    photo() {
        return Session.get('tempPhoto')
    },
    showGroupsModal() {
        return Session.get('showGroupsModal')
    },
    groups() {
        return Groups.find({$or: [{members: Meteor.userId()}, {createdBy: Meteor.userId()}]}, {sort: {date: -1}})
    }
})

Template.addPhoto.events({
    'click #close-btn'(event, template) {
        template.$('.modal-container').addClass('fadeOut')
        Meteor.setTimeout(function () {
            Session.set('showPhoto', false)
        }, 1000)
    },
    'click #submit-btn'(event, template) {
        //additional check for the selected group
        let groupId = FlowRouter.getParam('id')
        if (!groupId) {
            //snap gift from nav, hence group is not selected yet, trigger modal
            Session.set('showGroupsModal', true)
            $('.group-dialog').removeClass("dialog--close").addClass('dialog--open')
            return
        }

        let product = {}
        product.title = template.$('#name').val()
        product.price = Number(template.$('#price').val())
        product.description = template.$('#desc').val()
        product.description = template.$('#desc').val()
        product.location = {name: template.$('#location').val()}
        product.image = Session.get('photo')
        product.isUserSubmitted = true

        let pid = Products.insert(product)
        Groups.update(groupId, {$push: {giftIdeas: {
            contributor: Meteor.userId(),
            date: new Date(),
            productId: pid,
            votes: []
        }}})

        //create a chat!
        Chats.insert({
            groupId: groupId,
            productId: pid
        })

        let group = Groups.findOne(groupId)

        Events.insert({
            date: new Date(),
            userId: Meteor.userId(),
            name: 'ADD_PHOTO',
            metadata: {
                groupId: groupId,
                receiver: Meteor.users.findOne(group.receiver).profile.name,
                productName: product.title
            }
        })

        Session.set('showPhoto', false)
    },
    'click .dialog .btn-close'(event) {
        $(event.target).closest('.dialog').removeClass("dialog--open").addClass("dialog--close")
    },
    'click .group-btn'(event, template) {
        $(event.target).addClass('tick-feedback')

        Meteor.setTimeout(function() {
            $(event.target).closest('.dialog').removeClass("dialog--open").addClass("dialog--close")
            template.$('.modal-container').addClass('fadeOut')
        }, 1000)

        Meteor.setTimeout(function () {
            Session.set('showGroupsModal', null)
            Session.set('showPhoto', false)
        }, 2000)

        let groupId = this._id

        let product = {}
        product.title = template.$('#name').val()
        product.price = Number(template.$('#price').val())
        product.description = template.$('#desc').val()
        product.description = template.$('#desc').val()
        product.location = {name: template.$('#location').val()}
        product.image = Session.get('photo')
        product.isUserSubmitted = true

        let pid = Products.insert(product)
        Groups.update(groupId, {$push: {giftIdeas: {
            contributor: Meteor.userId(),
            date: new Date(),
            productId: pid,
            votes: []
        }}})

        //create a chat!
        Chats.insert({
            groupId: groupId,
            productId: pid
        })

        let group = Groups.findOne(groupId)

        Events.insert({
            date: new Date(),
            userId: Meteor.userId(),
            name: 'ADD_PHOTO_FROM_NAV',
            metadata: {
                groupId: groupId,
                receiver: Meteor.users.findOne(group.receiver).profile.name,
                productName: product.title
            }
        })

    }
})

Template.addPhoto.onDestroyed(function() {
    Session.set('showPhoto', null)
})

