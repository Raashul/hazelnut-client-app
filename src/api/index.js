import axios from 'axios';
import _ from 'lodash';

import { REACT_APP_URL } from 'react-native-dotenv';
import deviceStorage from '../services/deviceStorage';
import { AsyncStorage } from 'react-native';

if (!_.isString(REACT_APP_URL)) {
  throw new Error(`you should define a REACT_APP_URL in a ".env"
    or ".env.local" at the root of the project`);
}

const api = axios.create({ baseURL: REACT_APP_URL });

api.interceptors.request.use(
  async function(config) {
    config.headers.Authorization = await AsyncStorage.getItem('jwt');
    return config;
  },
  function(err) {
    return Promise.reject(err);
  }
);

export function getPrimaryBuckets() {
  return api.get('/home');
}

export async function addBucket(payload) {
  return api.post('/bucket', payload);
}

export function localSignup(payload) {
  return api.post('/local/signup', payload);
}

export function localLogin(payload) {
  return api.post('/local/login', payload);
}

//get secondary list of buckets
export function getSecondaryBuckets(bucket_id) {
  return api.get(`/bucket?id=${bucket_id}`);
}

//get total buckets
export function getAllBuckets() {
  return api.get('/home');
}

//get child buckets
export function getAllChildBuckets() {
  return api.get('/buckets/child');
}

export function getAllBucketsByType() {
  return api.get('/buckets/type');
}

//post with text
export function postWithText (payload) {
  return api.post('/post/add/text', payload);
}

//add specific reminder
export function addSpecificReminder (payload) {
  return api.post('/reminder/specific', payload);
}

//get all reminders
export function getAllReminders () {
  return api.get('/reminders');
}
