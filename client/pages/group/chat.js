Template.chat.onCreated(function() {
    Session.set('header', 'Idea Chat')
})

Template.chat.onRendered(function() {
    const template = this

    let $chat = template.$('.chat-container')
    $chat.scrollTop($chat[0].scrollHeight)
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
    },
    messages() {
        let messages =Chats.findOne({
            groupId: FlowRouter.getParam('groupId'),
            productId: FlowRouter.getParam('productId')
        }).messages
        return messages.reverse()
    },
    isOwner(userId) {
        return Meteor.userId() === userId
    }
})

Template.chat.events({
    'click .details-btn'() {
        let pid = this._id
        let pageStack = Session.get('pageStack') || []
        pageStack.push(FlowRouter.current().path)
        Session.set('pageStack', pageStack)
        FlowRouter.go('product', {id: pid})
    },
    'click #send-btn'(event, template) {
        let message = template.$('#chat-message').val()

        if (message.length === 0) return

        template.$('#chat-message').val('')

        let chatId = Chats.findOne({
            groupId: FlowRouter.getParam('groupId'),
            productId: FlowRouter.getParam('productId')
        })._id

        Chats.update(chatId, {
            $push: {messages: {
                message: message,
                userId: Meteor.userId(),
                date: new Date()
            }}
        })

        Tracker.afterFlush(function () {
            let $chat = template.$('.chat-container')
            $chat.scrollTop($chat[0].scrollHeight)
        })


    }
})

Template.chat.onDestroyed(function() {
    Session.set('header', null)
})

