import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
	configSerivce: ConfigService,
): Promise<MongooseModuleOptions> => {
	return {
		uri: getMongoString(configSerivce),
	};
};

const getMongoString = (configSerivce: ConfigService) => {
	const str =
		'mongodb://' +
		configSerivce.get('MONGO_LOGIN') +
		':' +
		configSerivce.get('MONGO_PASSWORD') +
		'@' +
		configSerivce.get('MONGO_HOST') +
		':' +
		configSerivce.get('MONGO_PORT') +
		'/' +
		configSerivce.get('MONGO_DB');
	return str;
};
