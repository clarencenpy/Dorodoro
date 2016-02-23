Template.store.onRendered(function () {
    Session.set('header', 'store')
})
Template.store.helpers({
    products() {
        return Products.find()
    }
})
Template.store.onDestroyed(function () {
    Session.set('header', null)
})

