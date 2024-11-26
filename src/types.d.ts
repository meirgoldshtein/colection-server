declare module 'jsonwebtoken';
declare module 'express';
declare module 'supertest';
declare module 'bcrypt';

declare function describe(name: string, fn: () => void): void;
declare function test(name: string, fn: () => void): void;
declare function expect(value: any): any;
declare function beforeAll(fn: () => void): void;
declare function afterAll(fn: () => void): void;