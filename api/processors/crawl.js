var async= require('async');
var fs= require('fs');
var shell = require('shelljs');
var pf=function(number){
	// this function cleans up a string containing a number. 
	// removes all charector that is not a digit of a dot. 
	if(number=='')
		number='0';
	var temp ='';
	for (const c of number) {
		// console.log(c);
		// console.log(c.match(/\d+/));
		// if the charector is a digit of a full stop
		if(c.match(/\d+/) || c=='.')
			temp+=c;
	}
	// console.log(temp);
	return parseFloat(temp);
}


// module.exports=function(job){
// 	console.log('this is inside the child process');
// 	console.log('you should be able to use the rest of the website');
// 	const syncWait = ms => {
// 	    const end = Date.now() + ms
// 	    while (Date.now() < end) continue
// 	}
// 	console.log('one')
// 	syncWait(5000)
// 	console.log('two')
// 	return Promise.resolve(result);
// }



module.exports = function (job,callback) {
	console.log('\n\n\n\n\n------------');
	console.log('this is inside the child process');
	console.log('you should be able to use the rest of the website');
	var folder_name = __dirname;
	console.log('\n\n\n\n-------------');
	console.log(__dirname);
	console.log('-------------');
	folder_name = folder_name.split('/api')[0];

	var dir = folder_name+"/automations/data";
	if (!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	var q='node '+folder_name+'/automations/test2.js'			
	shell.exec(q); 

	// if file is empty the throw error
	callback(null);

}
