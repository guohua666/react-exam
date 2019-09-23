/*
 * @Author: jiaze 
 * @Date: 2019-09-15 22:51:58 
 * @Last Modified by:   jiaze 
 * @Last Modified time: 2019-09-15 22:51:58 
 */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
	/**
	 * built-in config
	 * @type {Egg.EggAppConfig}
	 **/
	const config = (exports = {});

	// use for cookie sign key, should change to your own and keep security
	config.keys = appInfo.name + '_1567152559817_3470';

	// add your middleware config here
	config.middleware = ["router"];

	// add your user config here
	const userConfig = {
		// myAppName: 'egg',
	};
	userConfig.security = {
		csrf: {
			enable: false
		}
	};
	userConfig.mysql = {
		client: {
			host: 'localhost',
			port: '3306',
			user: 'root',
			password: '123321',
			database: 'db_01g3_exam'
		},
		app: true,
		agent: false
	};
	return {
		...config,
		...userConfig
	};
};
