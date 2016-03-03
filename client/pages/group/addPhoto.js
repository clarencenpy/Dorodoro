Template.addPhoto.onCreated(function() {

})

Template.addPhoto.onRendered(function() {

})

Template.addPhoto.helpers({
    photo() {
        return Session.get('tempPhoto')
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
        let product = {}
        product.title = template.$('#name').val()
        product.price = Number(template.$('#price').val())
        product.description = template.$('#desc').val()
        product.description = template.$('#desc').val()
        product.location = {name: template.$('#location').val()}
        product.image = Session.get('photo')
        product.isUserSubmitted = true

        let pid = Products.insert(product)
        let groupId = FlowRouter.getParam('id')
        Groups.update(groupId, {$push: {giftIdeas: {
            contributor: Meteor.userId(),
            date: new Date(),
            productId: pid,
            votes: []
        }}})

        Session.set('showPhoto', false)
    }
})

Template.addPhoto.onDestroyed(function() {
    Session.set('showPhoto', null)
})

