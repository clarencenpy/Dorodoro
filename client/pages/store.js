Template.store.onCreated(function () {
    const template = this
    template.goingBack = !!Session.get('goingBack')
    Session.set('goingBack', false)
})

Template.store.onRendered(function () {
    Session.set('header', 'Gift Store')
})

Template.store.helpers({
    products() {
        return Products.find()
    },
    goingBack() {
        return Template.instance().goingBack
    }
})

Template.store.events({
    'click .group-block'() {
        let pid = this._id
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.getRouteName())
        Session.set('pageStack', pageStack)
        FlowRouter.go('product', {id: pid})
    }
})

Template.store.onDestroyed(function () {
    Session.set('header', null)
})

