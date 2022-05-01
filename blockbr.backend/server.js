var express = require('express');
var cors = require('cors');

var post          = require('../blockbr.backend/blockbr.backend.service/controller/post.controller');

// Set up the express app
const app = express(cors());