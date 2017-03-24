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
			reply= readlineSync.question('Do you want to exit?, Y for yes and N for no');
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
    if (arr[id]) {
      console.log(arr[id]);   
      callback();
    } else {     
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
			if (i == id) {
				console.log("Note: "+ childSnapshot.val().content);
				childSnapshot.ref.remove();
				console.log("Note deleted");
				callback();
			}
			i++;
		});
			if (id>=i || id<1) {
				console.log("Note index is not available. Viewing the note list first might help you confirm the right index");
			} 		
	});	
	callback();
}

function listNotes(arg,callback) {
	var id =1;
	if (id>arg.options.limit) {
		console.log("Invalid limit, the note's full list will be displayed for you.");
		callback();
	}
	if (!arg.options.limit) {
		messageRef.once('value',function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var child = childSnapshot.val();
				console.log("");
				console.log("   "+id+" "+child.content);
				id++;
			});
			callback();
		});
	} else if (typeof arg.options.limit==='number') {
		messageRef.limitToFirst(arg.options.limit).once('value', function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
				var child = childSnapshot.val();
				console.log("");
				console.log("   "+id+" "+child.content);
				id++;
			});
		callback();
		});
	  } else {
		console.log('Wrong query input, please try again');
		callback();
	   }		
}

function searchNote(arg, callback) {
	var i=1;
	var search = arg.query_string;	
	if (typeof arg.options.limit === 'number') {
		messageRef.limitToFirst(arg.options.limit).once('value',function(snapshot) {
			snapshot.forEach(function(childSnapshot) {
      			if (childSnapshot.val().content.indexOf(arg.query_string) >-1) {
					console.log(i+" "+ childSnapshot.val().content );
					callback();
				}
				i++;
			});
		});
		callback();
	} else if (!arg.options.limit) {
		messageRef.once("value", function(snapshot){			
			snapshot.forEach(function(childSnapshot){				
      			if (childSnapshot.val().content.indexOf(arg.query_string) > -1) {
					console.log(i+" "+ childSnapshot.val().content );
					callback();
				}
				i++;
			});
		});
		callback();
	  } else {
		console.log("Wrong input");
		callback();
	   }
}

function jsonExport(callback) {
 		messageRef.once("value", function(snapshot) {
		var file = snapshot.val();
		var filename = "/Users/deborahoni/Desktop/Notes.json";
		jsonfile.writeFile(filename,file,(err) => {		
			if (!err) {
				console.log("Export complete");
			} else {
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