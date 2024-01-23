import {Request, Response} from "express";
import {Faker} from "@faker-js/faker";

export default class MocksController {
    private faker: Faker;

    constructor(faker: Faker) {
        this.faker = faker
    }

    getFast(): (req: Request, res: Response) => void {
        const faker: Faker = this.faker

        return (req: Request, res: Response): void => {
            setTimeout(() => res.send({
                data: {
                    id: faker.number.int({min: 1, max: 999}),
                    type: 'fast',
                }
            }), 10)
        }
    }

    getSlow(): (req: Request, res: Response) => void {
        const faker: Faker = this.faker

        return (req: Request, res: Response): void => {
            setTimeout(() => res.send({
                data: {
                    id: faker.number.int({min: 1, max: 999}),
                    type: 'slow',
                }
            }), 400)
        }
    }

    getUnstable(): (req: Request, res: Response) => void {
        const faker: Faker = this.faker

        return (req: Request, res: Response): void => {
            setTimeout(
                () => res
                    .status(faker.datatype.boolean() ? 200 : 502)
                    .send({
                        data: {
                            id: faker.number.int({min: 1, max: 999}),
                            type: 'unstable',
                        }
                    }),
                faker.number.int({min: 100, max: 500})
            )
        }
    }

    getUnavailable(): (req: Request, res: Response) => void {
        const faker: Faker = this.faker

        return (req: Request, res: Response): void => {
            res
                .status(502)
                .send({
                    data: {
                        id: faker.number.int({min: 1, max: 999}),
                        type: 'unavailable',
                    }
                })
        }
    }

    getTimeout(): (req: Request, res: Response) => void {
        const faker: Faker = this.faker

        return (req: Request, res: Response): void => {
            setTimeout(
                () => res
                    .status(502)
                    .send({
                        data: {
                            id: faker.number.int({min: 1, max: 999}),
                            type: 'timeout',
                        }
                    }),
                5000
            )
        }
    }
}
