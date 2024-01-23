import request from "supertest";
import config from "config";

const mockPort: number = config.get('mock.port');
const url: string = `http://localhost:${mockPort}`

describe("Mock routes tests", () => {
    it("GET /mocks/getFast", async () => {
        const res = await request(url)
            .get('/mocks/getFast')
            .expect(200)

        expect(res.body.data).toBeDefined();
        expect(res.body.data.id).toEqual(expect.any(Number));
        expect(res.body.data.type).toBe('fast');
    });

    it("GET /mocks/getSlow", async () => {
        const res = await request(url)
            .get('/mocks/getSlow')
            .expect(200)

        expect(res.body.data).toBeDefined();
        expect(res.body.data.id).toEqual(expect.any(Number));
        expect(res.body.data.type).toBe('slow');
    });

    it("GET /mocks/getUnavailable", async () => {
        const res = await request(url)
            .get('/mocks/getUnavailable')
            .expect(502)

        expect(res.body.data).toBeUndefined();
        expect(res.body.errors).toContain('Server currently unavailable');
    });
});
