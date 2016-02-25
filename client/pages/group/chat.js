Template.chat.onCreated(function() {

})

Template.chat.onRendered(function() {

})

Template.chat.helpers({
    product() {
        return Products.findOne({title: 'Tan Derbies'})
    }
})

Template.chat.events({

})

Template.chat.onDestroyed(function() {

})

