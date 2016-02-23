Template.product.onCreated(function() {

})

Template.product.onRendered(function() {
    Session.set('header', 'Product Details')
})

Template.product.helpers({
    product() {
        let id = FlowRouter.getParam('id')
        return Products.findOne(id)
    }
})

Template.product.events({

})

Template.product.onDestroyed(function() {
    Session.set('header', null)

})

