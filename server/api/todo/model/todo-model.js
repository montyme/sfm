"use strict";

const mongoose = require("mongoose");

const _todoSchema = {
    todoMessage: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    todoArtwork: {type: String, required: true},
    todoDate: {type: Number, required: true},
    todoMedium: {type: String, required: false},
    todoSize: {type: String, required: false},
    todoArtist: {type: String, required: true},
    todoEmail: {type: String, required: false},
    file_url: {type: String, required: true}
}

module.exports = mongoose.Schema(_todoSchema);
