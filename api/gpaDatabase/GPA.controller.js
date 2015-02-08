/**
 * Created by denz0045 on 2/5/15.
 */
'use strict';

var mongoose = require('mongoose');

// Defining Model
// =====================================================

var Gpa = mongoose.model('Gpa', {
    classes: String,
    grade: String,
    credits: Number

});

// Defining Routes
// =====================================================

exports.index = function(req, res) {
    Gpa.find(function (err, GPA) {
        if (err) {
            console.log("Error getting data from database");
            res.send(err)
        } else {
            res.json(GPA); // return results
        }
    });
};

exports.create = function(req, res) {
    Gpa.create(req.body, function (err, gpa) {
        if (err) {
            res.send(err);
        } else {
            Gpa.find(function (err, GPA) {
                if (err) {
                    res.send(err);
                }

                res.json(GPA);
            });
        }
    });
};

exports.destroy = function(req, res) {
    Gpa.findById(req.params.gpa_id, function(err, gpa){
        if(err) { res.send(err); return "error: " + err; }
        if(!gpa) { return res.sendStatus(404); }

        gpa.remove(function(err){
            if(err) { return "error: " + err}
            return res.sendStatus(204);
        });
    });
};