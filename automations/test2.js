const syncWait = ms => {
    const end = Date.now() + ms
    while (Date.now() < end) continue
}


// syncWait(30000);
// console.log('two')
console.log('start');
for(var i=0;i<30;i++){
	console.log(i);
	syncWait(1000);
}
console.log('end');