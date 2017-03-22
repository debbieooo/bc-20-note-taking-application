
//var prompt = require('readline');
var firebase= require('firebase');
var readlineSync = require('readline-sync');


/*const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});*/


var config = {
    apiKey: "AIzaSyCXblpDaPjl4y4GM-e4McTdgb_IX8oIokY",
    authDomain: "projectx-8d97e.firebaseapp.com",
    databaseURL: "https://projectx-8d97e.firebaseio.com",
    storageBucket: "projectx-8d97e.appspot.com",
    messagingSenderId: "1011421642320"
};
firebase.initializeApp(config);

var messageRef = firebase.database().ref().child('notes');


function getWords(arg,callback){

	var result = arg.note_content.split('');
	return result;

}

function createNote(arg,callback){

	var content = arg.note_content;
	console.log(content);

		messageRef.push().set({
			content :content
		});

		console.log('Note created');
		callback();
	

}

function viewNote(arg){
	var messag



}


module.exports = {

    //searchNote: searchNote,
    //listNotes: listNotes,
    //deleteNote: deleteNote,
    //viewNote: viewNote,
    createNote: createNote
    

}

