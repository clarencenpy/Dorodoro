Products = new Mongo.Collection('products')

Products.attachSchema(new SimpleSchema({
    title: {
        type: String,
        max: 50
    },
    description: {
        type: String
    },
    category: {
        type: [String],
        defaultValue: []
    },
    price: {
        type: Number,
        decimal: true
    },
    image: {
        type: String
    },
    likes: {
        type: Number,
        defaultValue: 0
    },
    rating: {
        type: [Number],
        defaultValue: []
    },
    comments: {
        type: [Object],
        defaultValue: []
    },
    'comments.$.name': {
        type: String
    },
    'comments.$.comment': {
        type: String
    },
    'comments.$.date': {
        type: Date
    },
    location: {
        type: Object
    },
    'location.lat': {
        type: Number,
        decimal: true,
        optional: true
    },
    'location.lng': {
        type: Number,
        decimal: true,
        optional: true
    },
    'location.name': {
        type: String
    },
    'location.vicinity': {
        type: String,
        optional: true
    },
    isUserSubmitted: {
        type: Boolean,
        defaultValue: false
    }
}))
