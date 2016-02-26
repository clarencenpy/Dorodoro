Template.chat.onCreated(function() {
    Session.set('header', 'Idea Chat')
})

Template.chat.onRendered(function() {

})

Template.chat.helpers({
    product() {
        let id = FlowRouter.getParam('productId')
        return Products.findOne(id)
    },
    giftIdea() {
        let group = Groups.findOne(FlowRouter.getParam('groupId'))
        let pid = FlowRouter.getParam('productId')
        let idea =  _.find(group.giftIdeas, function (idea) {
            return idea.productId === pid
        })
        idea.contributorName = Meteor.users.findOne(idea.contributor).profile.name
        return idea
    }
})

Template.chat.events({
    'click .details-btn'() {
        let pid = this._id
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)
        FlowRouter.go('product', {id: pid})
    }
})

Template.chat.onDestroyed(function() {
    Session.set('header', null)
})

