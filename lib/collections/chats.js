Chats = new Mongo.Collection('chats')

Chats.attachSchema(new SimpleSchema({
    groupId: {
        type: String
    },
    productId: {
        type: String
    },
    messages: {
        type: [Object],
        defaultValue: []
    },
    'messages.$.message': {
        type: String
    },
    'messages.$.userId': {
        type: String
    },
    'messages.$.date': {
        type: Date
    }
}))