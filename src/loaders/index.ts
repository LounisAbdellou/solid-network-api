import expressLoader from './express';
import mongooseLoader from './mongoose';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  console.log('✌️ DB loaded and connected!');

  const userModel = {
    name: 'userModel',
    // Notice the require syntax and the '.default' 
    model: require('../models/user').default
  };

  await expressLoader({ app: expressApp });
  console.log('✌️ Express loaded');
}

