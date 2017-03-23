var firebase= require('firebase');
const vorpal= require('vorpal')();
var app = require('./app.js');
var figlet = require('figlet');
var readlineSync = require('readline-sync');



var content= readlineSync.question("Hey there! What's your name?");

figlet('Hi, '+ content, function(err,data){
	if(err){
		console.log('Something went wrong..');
		return;
	}

	console.log(data)

});

console.log("Please enter help to view the options available");



vorpal
	.command('createnote')
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
  .option('--l, --limit <number>', 'limit the search to some notes')
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

/*vorpal
	.command('next')
	.description('')
	.action(function(arguments,callback){
		app.next(arguments,callback);
});*/

vorpal
  .command('Export JSON')
  .description('Use this to export files in JSON format ')
  .action(function(arguments, callback) {
    app.jsonExport(callback);
});

vorpal
  .command('Export CSV')
  .description('Use this to export files in CSV format ')
  .action(function(arguments, callback) {
    app.csvExport(callback);
});


vorpal

	.delimiter('Notes==>')
	.show();



