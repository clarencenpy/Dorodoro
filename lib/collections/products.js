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
        type: [String]
    },
    price: {
        type: Number,
        decimal: true
    },
    image: {
        type: String
    },
    likes: {
        type: Number
    },
    rating: {
        type: [Number]
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
    'location.$.lat': {
        type: Number,
        decimal: true
    },
    'location.$.lng': {
        type: Number,
        decimal: true
    },
    'location.$.name': {
        type: Number
    },
    'location.$.vicinity': {
        type: Number
    }
}))
