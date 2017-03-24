var firebase= require('firebase');
var readlineSync = require('readline-sync');
var jsonfile = require('jsonfile');
var fs = require('fs');
var readlineSync = require('readline-sync');
var config = {
    apiKey: "AIzaSyCXblpDaPjl4y4GM-e4McTdgb_IX8oIokY",
    authDomain: "projectx-8d97e.firebaseapp.com",
    databaseURL: "https://projectx-8d97e.firebaseio.com",
    storageBucket: "projectx-8d97e.appspot.com",
    messagingSenderId: "1011421642320"
};
firebase.initializeApp(config);

var messageRef = firebase.database().ref().child('notes');

function createNote(arg,callback) {

	var content= readlineSync.question('Please enter your content:: ');
	var reply;
	while ((content.length<=0 ) || (content === 'exit') ) {
		if (content === 'exit') {
			reply= readlineSync.question('Do you want to exit?, Y for yes and N for no   ');
			if (reply === 'Y') {
				console.log("You will exit back to the menu")
				callback();
				break;
			} else {
				content = readlineSync.question('Please enter your content:: ');
			}
		} else	{
			content= readlineSync.question('Please enter your content:: ');
		}
	}

	if (reply !== 'Y') {
			console.log(content);
			messageRef.push().set({
				content :content
			});
			console.log('Note created');
			callback();
	}
	}
	

function viewNote(arg, callback) {
  var id = arg.id;
  messageRef.once("value", function(snapshot) {
	var i = 1;
    var arr = [""];
    snapshot.forEach(function(childSnapshot) {
      arr.push(childSnapshot.val().content);
    });
    if(arr[id]) {
      console.log(arr[id]);   
      callback();
    }else {     
      console.log(" "+"Not a valid key");
      callback();     
    }
  });
}

function deleteNote(arg,callback) {
	var id = arg.id;	
	messageRef.once("value", function(snapshot) {
		var i=1;		
		snapshot.forEach(function(childSnapshot) {			
			if(i == id) {
				console.log("Note: "+ childSnapshot.val().content);
				childSnapshot.ref.remove();
				console.log("Note deleted");
				callback();
			}
			i++;
		});
			if(id>=i) {

				console.log("Note index is not available. Viewing the note list first might help you confirm the right index");
			}
			else if(id<1) {
				console.log("Note index is not available. It should be greater than 0");
			}		
	});	
	callback();
}

function listNotes(arg,callback) {
	var id =1;
	
	if(!arg.options.limit) {
		getList();
		callback();
	}
	else if(typeof arg.options.limit==='number') {
		if(id>arg.options.limit) {

		console.log("Invalid limit, the note's full list can be displayed for you.");

		callback();
		}

		getListWithLimit(arg.options.limit);
		callback();
	}
	else{
		console.log('Wrong query input, please try again');
		callback();
	}		
}

function getListWithLimit(limit) {
	var id =1;
	 messageRef.limitToFirst(limit).once('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var child = childSnapshot.val();
				console.log("");
				console.log("   "+id+" "+child.content);
				id++;
			});
	});
}

function getList() {
	var id =1;
	messageRef.once('value',function(snapshot) {

			snapshot.forEach(function(childSnapshot) {
				var child = childSnapshot.val();
				console.log("");
				console.log("   "+id+" "+child.content);
				id++;
			});
		
	});

}

function searchNote(arg, callback){
	var i=1;
	var search = arg.query_string;	
	if(typeof arg.options.limit === 'number'){
		getNoteWithLimit(search,arg.options.limit);
		callback();
	}

	else if(!arg.options.limit){
		getNote(search);
		callback();
	}

	else{

		console.log("Wrong input");
		callback();
	}
}

function getNote(arg) {
	var i=1;
	messageRef.once("value", function(snapshot) {			
			snapshot.forEach(function(childSnapshot) {				
      			if (childSnapshot.val().content.indexOf(arg) > -1) {
      				//console.log('Note found');
					console.log(i+" "+ childSnapshot.val().content );
				}
				i++;
			});
	});
}

function getNoteWithLimit(arg,limit) {
	var i=1;
	messageRef.limitToFirst(limit).once('value',function(snapshot){
			snapshot.forEach(function(childSnapshot){
      			if (childSnapshot.val().content.indexOf(arg) >-1) {
      				//console.log('Note found');
					console.log(i+" "+ childSnapshot.val().content );
				}
				i++;
			});
	});
}

function jsonExport(callback){
 		messageRef.once("value", function(snapshot){
		var file = snapshot.val();
		var filename = "/Users/deborahoni/Desktop/Notes.json";
		jsonfile.writeFile(filename,file,(err) => {		
			if(!err){
				console.log("Export complete");
			}
			else{
				console.log("An error occurred");
			}
		})
	});

	callback();	
}



module.exports = {
    searchNote: searchNote,
    listNotes: listNotes,
    deleteNote: deleteNote,
    viewNote: viewNote,
    createNote: createNote,
    jsonExport: jsonExport
}