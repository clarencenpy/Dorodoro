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
        defaultValue: []
    },
    'giftIdeas.$.date': {
        type: Date
    },
    'giftIdeas.$.contributor': {
        type: String
    },
    'giftIdeas.$.productId': {
        type: String
    },
    'giftIdeas.$.votes': {
        type: Number,
        defaultValue: 0
    }
}))