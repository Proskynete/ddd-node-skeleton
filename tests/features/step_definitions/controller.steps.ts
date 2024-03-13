import { AfterAll, BeforeAll, Given, Then } from '@cucumber/cucumber';
import assert from 'assert';
import request from 'supertest';

import { App } from '../../../src/app';

let _request: request.Test;
let application: App;
let _response: request.Response;

Given('I send a GET request to {string}', (route: string) => {
  _request = request(application.httpServer!).get(route);
});

Given('I send a GET request to {string} with body:', (route: string, body: string) => {
  console.log(body);
  _request = request(application.httpServer!).get(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response body should be empty:', async () => {
  assert.deepStrictEqual(_response.body, {});
});

BeforeAll(async () => {
  application = new App();
  await application.start();
});

AfterAll(async () => {
  await application.stop();
});
