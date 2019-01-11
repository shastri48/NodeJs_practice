var readline = require('readline');
var os = require('os');
var fs = require('fs');
var events = require('events');
var e = new events.EventEmitter();
let path = require('path');


var cli = {};

cli.init = () => {
	console.log('CLI is running');
};


// cli.squarePrint = (a) => {
// 	if(typeof(a)=="number"){
// 		console.log(a*a);
// 	}
// }

// cli.textLength = (str) => {
// 	if(typeof(str) == "string"){
// 		console.log(str.length);
// 	}
// }


// processInput function
cli.processInput = (str) => {
	var uniqueInput = ['manual', 'help', 'exit', 'date', 'stats','users'];
	if(typeof(str)=== 'string'){
		if(uniqueInput.some(v=> v==str.toLowerCase()))e.emit(str.toLowerCase(),str);
		else console.log('did not match to uniqueInput')
	}
	else console.log('did not match with string value')
}

// total collection of commands for cli
let commands = {
	manual:"Get the manual of the command line",
	help: "Will help with all the commands to walkthrough",
	exit: "It exits the command line",
	date: "It prints the current date",
	stat: "Gives out the stats of the work"
}

// exit
e.on('exit', ()=> {
	console.log('............Have a nice day...........');
	process.exit(0);
});

// users
e.on('users', ()=> {
	pathValue = path.join(__dirname, '..', 'users');
	fs.readdir(pathValue, (err, data)=>{
		if(err)console.log(err);
		data.forEach(value => {
			fs.readFile(pathValue+'/'+value, (err, data)=>{
				if(err)console.log(err);
				console.log(JSON.parse(data.toString()).name);
			})
		})
	})
});



// stats
e.on(('stats'), ()=>{
	printHeader('NUMBER OF CPUS');
	console.log(os.cpus());
	printHeader('CPU ARCHITECTURE');
	console.log(os.arch());
	printHeader('TOTAL MEMORY');
	console.log(os.totalmem()/(1e+9),"GB");
})

// date
e.on('date', ()=> {
	const date = new Date().toDateString();
	console.log(date);
});

// help
e.on('help', ()=> {
	let helpText = "HELP TABLE";
	let printHelpText = "";
	let length = (process.stdout.columns - helpText.length)/2;
	for(i = 0; i<length;i++){
		printHelpText +=" ";
	}
	printHorizontalLine();
	console.log(printHelpText+helpText);
	printHorizontalLine();

	for(key in commands){
		let line = "    "+key;
		for(i = line.length; i <=60; i++){
			line+=" ";
		}
		line+=commands[key];
		console.log(line.toUpperCase());
		console.log("")
	}
});


// printHeader
printHeader = (text) =>{
	let printHelpText = "";
	let length = (process.stdout.columns - text.length)/2;
	for(i = 0; i<length;i++){
		printHelpText +=" ";
	}
	printHorizontalLine();
	console.log(printHelpText+text);
	printHorizontalLine();
}

// print horizontal line in cli
printHorizontalLine = () => {
	let length = process.stdout.columns;
	let line = "";
	for(i = 0; i< length; i++){
		line+= "-";
	}
	console.log(line);
}

module.exports = cli;