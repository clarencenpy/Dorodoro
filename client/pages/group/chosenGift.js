Template.chosenGift.onCreated(function() {

})

Template.chosenGift.onRendered(function() {

})

Template.chosenGift.helpers({
    winner() {
        let groupId = FlowRouter.getParam('id')
        let ideas = Groups.findOne(groupId).giftIdeas
        //find the idea with the most votes
        let winner = ideas[0]
        let maxVotes = 0
        _.each(ideas, function (idea) {
            if (idea.votes.length > maxVotes) {
                maxVotes = idea.votes.length
                winner = idea
            }
        })
        return Products.findOne(winner.productId)
    }
})

Template.chosenGift.events({

})

Template.chosenGift.onDestroyed(function() {

})

