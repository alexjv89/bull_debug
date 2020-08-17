/**
 * BullBootstrap.js
 * Bootstrap module that setups the queue and worker
 */
const async = require('async');

var Bull = require('bull');
// create our job queue
var queue = new Bull('queue', { 
    redis: sails.config.bull.redis,
    setting:{
        lockDuration: 15*60*1000, // Key expiration time for job locks.
        lockRenewTime: 15*60*1000/2, // Interval on which to acquire the job lock
        stalledInterval: 15*60*1000, // How often check for stalled jobs (use 0 for never checking).
        maxStalledCount: 1, // Max amount of times a stalled job will be re-processed.
    }
});
sails.config.queue = queue;

module.exports = function (callback) {
    var folder_name = __dirname;
    folder_name = folder_name.split('/bootstraps')[0];
    queue.process('crawl',1,folder_name+'/api/processors/crawl.js');
    /**
     * crons
     */

    // Repeat check for hung charging sessions  once every hour
    _.forEach(sails.config.bull.repeats, function (task) {
        if (task.active) {
            queue.add(task.name, task.data, { repeat: task.repeat });
            sails.log.info(`bull repeatable job registered: ${task.name}`);
        }
    });


    queue.process('clean_completed_jobs', 1, function(job,done){
		BullService.deleteBullTasks(1000, 'completed')
		done();
    });
    
    queue.process('clean_failed_jobs', 1, function(job,done){
		BullService.deleteBullTasks(1000, 'failed')
		done();
	});

    callback(null);
};
