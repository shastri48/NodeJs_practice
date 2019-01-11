
// Dependencies

var server = require('./server');
var cli = require('./cli');

const app ={};

app.init = () => {
	//Initialise server
	server.init();

	//Initialise CLI after some time
	setTimeout(() => {
		cli.init();
	}, 50);

	const readline = require('readline');
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
		prompt: 'CLI>>> '
	});


	// manual help exit date stat listuser moreuserinfo


	rl.on('line', (str)=> {
		cli.processInput(str);
		// if(str == "exit") process.exit(0);
		rl.prompt();
	}).on('close', (str)=> {
		console.log('Have a great day...........')
		process.exit(0);
	})

rl.prompt();

}

// Self executing
app.init();
