Groups = new Mongo.Collection('groups')

Groups.attachSchema(new SimpleSchema({
    receiver: {
        type: String
    },
    eventDate: {
        type: Date
    },
    eventName: {
        type: String
    },
    createdBy: {
        type: String
    },
    members: {
        type: [String],
        defaultValue: []
    },
    giftIdeas: {
        type: [Object],
        defaultValue: [],
        blackbox: true
    },
    'giftIdeas.$._id': {
        type: String,
        defaultValue: Random.id()
    },
    'giftIdeas.$.contributor': {
        type: String
    },
    'giftIdeas.$.productId': {
        type: String
    },
    'giftIdeas.$.comments': {
        type: [Object]
    },
    'giftIdeas.$.comments.$.userId': {
        type: String
    },
    'giftIdeas.$.comments.$.comment': {
        type: String
    },
    'giftIdeas.$.comments.$.date': {
        type: Date
    },
    'giftIdeas.$.votes': {
        type: Number,
        defaultValue: 0
    }
}))