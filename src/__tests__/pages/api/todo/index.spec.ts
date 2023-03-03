const request = require('supertest')
const handler = require('../../../../pages/api/todo/index')

describe('Checking GET API endpoints', () => {
    
    test('GET request for api/todo', async () => {
    
        let expectedResponse = [
            {
              "_id": "6400960f05b4d1e86f36c6ca",
              "task": "testing",
              "priority": "High",
              "dueDate": "2023-12-11T00:00:00.000Z",
              "done": true,
              "createdAt": "2023-03-02T12:26:55.451Z",
              "updatedAt": "2023-03-02T12:26:55.451Z",
              "__v": 0
            },
            {
              "_id": "6400975505b4d1e86f36c6d4",
              "task": "testing",
              "priority": "High",
              "dueDate": "2023-12-11T00:00:00.000Z",
              "done": false,
              "createdAt": "2023-03-02T12:32:21.686Z",
              "updatedAt": "2023-03-02T12:32:21.686Z",
              "__v": 0
            }
        ];
        const response = await request(handler).get('/api/todo')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('task')
        expect(response.body).toHaveProperty('priority')
        expect(response.body).toHaveLength(2);
        expect(response.body).toEqual(expectedResponse)
    })

    test('GET request for api/todo with filters', async () => {
    
        let expectedResponse = [
            {
                "_id": "6400975505b4d1e86f36c6d4",
                "task": "testing",
                "priority": "High",
                "dueDate": "2023-12-11T00:00:00.000Z",
                "done": false,
                "createdAt": "2023-03-02T12:32:21.686Z",
                "updatedAt": "2023-03-02T12:32:21.686Z",
                "__v": 0
            }
        ];
        const response = await request(handler).get('/api/todo?isFinished=false')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1);
        expect(response.body).toEqual(expectedResponse)
    })

    test('GET request for api/todo/id', async () => {
        let expectedResponse = {
            "_id": "6400975505b4d1e86f36c6d4",
            "task": "testing",
            "priority": "High",
            "dueDate": "2023-12-11T00:00:00.000Z",
            "done": true,
            "createdAt": "2023-03-02T12:32:21.686Z",
            "updatedAt": "2023-03-02T12:32:21.686Z",
            "__v": 0
        };
        const response = await request(handler).get('/api/todo/6400975505b4d1e86f36c6d4')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(expectedResponse)
    })

    test('GET request for api/todo/id with wrong id', async () => {
        let expectedResponse = {
            "message":"id length is not as per mongoose objectID"
        };
        const response = await request(handler).get('/api/todo/anything')
        expect(response.statusCode).toBe(406)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedResponse)
    })
  
})


export{}