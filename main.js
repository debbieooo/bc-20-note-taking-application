var firebase= require('firebase');
const vorpal= require('vorpal')();
var app = require('./app.js');


vorpal
	.command('createnote <note_content>')
	.description('Saves the notes to the database')
	.action(function(arguments,callback){
		app.createNote(arguments,callback);
});


vorpal
	.command('viewnote ,<id>')
	.description('To view already stored notes')
	.action(function(arguments,callback){
		app.viewNote(arguments,callback);
});


vorpal
	.command('deletenote ,<id>')
	.description('Deletes already stored notes')
	.action(function(arguments,callback){
		app.deleteNote(arguments,callback);
});

vorpal
	.command('searchnotes <query_string>')
	.description('Search through the notes using a query string')
	.option('--limit','limit your search to the specif number you want')
	.action(function(arguments,callback){
		app.searchNotes(arguments,callback);
});

vorpal
	.command('listnotes')
	.description('')
	.option('--limit','limit your search to the specif number you want')
	.action(function(arguments,callback){
		app.listNotes(arguments,callback);
});

vorpal

	.command('next')
	.description('')
	.action(function(arguments,callback){
		app.next(arguments,callback);
});

vorpal

	.delimiter('Notes:::')
	.show();





