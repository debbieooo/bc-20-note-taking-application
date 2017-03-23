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
	.command('viewnote <id>')
	.description('To view already stored notes')
	.action(function(arguments,callback){
		app.viewNote(arguments,callback);
});


vorpal
	.command('deletenote <id>')
	.description('Deletes already stored notes')
	.action(function(arguments,callback){
		app.deleteNote(arguments,callback);
});

vorpal
  .command('searchnotes <query_string>')
  .description('It searches a note for a query string')
  .option('-l, --limit <number>', 'limit the search to some notes')
  .action(function(arguments, callback) {
    app.searchNote(arguments, callback);
  });


vorpal
  .command('listnotes')
  .description('use this with the --limit to return a number of note entries.')
  .option('-l, --limit <number>', 'limit the number of notes displayed.')
  .action(function(arguments, callback) {
    app.listNotes(arguments, callback);
  });

vorpal

	.command('next')
	.description('')
	.action(function(arguments,callback){
		app.next(arguments,callback);
});

vorpal

	.delimiter('Notes==>')
	.show();





