import request from 'supertest';
import { app } from './app';

describe("ping route", () => {
    it("should return pong", async () => {
        const response = await fetch("http://localhost:3000/ping");
        expect(response.status).toBe(200);
        expect(await response.text()).toBe("pong");
    });
    test("should return pong", async () => {
        const response = await request(app).get("/ping");
        expect(response.status).toBe(200);
        expect(response.text).toBe("pong");
    },
    
    )
});