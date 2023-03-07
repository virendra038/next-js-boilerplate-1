let request = require('supertest')
request = request('http://localhost:3000')

let expectedResponse = [
    {
        "_id": "6406deafda609c95912a9c34",
        "task": "School work",
        "priority": "High",
        "dueDate": "2023-12-26T00:00:00.000Z",
        "done": true,
        "createdAt": "2023-03-07T06:50:23.549Z",
        "updatedAt": "2023-03-07T06:50:23.549Z",
        "__v": 0
    },
    {
        "_id": "6406df822baa1467b2c8cdd2",
        "task": "Video_Game",
        "priority": "Low",
        "dueDate": "2021-03-03T00:00:00.000Z",
        "done": false,
        "createdAt": "2023-03-07T06:53:54.783Z",
        "updatedAt": "2023-03-07T06:53:54.783Z",
        "__v": 0
    }
];

describe('Checking GET API endpoints', () => {
    
    test('GET request for api/todo', async () => {

        const response = await request.get('/api/todo')
        expect(response.statusCode).toBe(200)
        expect(response.body[0]).toHaveProperty('task')
        expect(response.body[0]).toHaveProperty('priority')
        expect(response.body).toEqual(
            expect.arrayContaining(expectedResponse)
        )
    })

    test('GET request for api/todo with filters', async () => {
    
        const response = await request.get('/api/todo?isFinished=false&priority=Low&dueDate=2021-03-03T00:00:00.000Z')
        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveLength(1);
        expect(response.body).toEqual([expectedResponse[1]])
    }) 

    test('GET request for api/todo/id', async () => {

        const response = await request.get('/api/todo/6406deafda609c95912a9c34')
        expect(response.statusCode).toBe(200)
        expect(response.body).toEqual(expectedResponse[0])
    })

    test('GET request for api/todo/id with wrong id', async () => {
        let expectedResponse = {
            "message":"id length is not as per mongoose objectID"
        };
        expect(true).toBe(true);
        const response = await request.get('/api/todo/anything')
        expect(response.statusCode).toBe(406)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toEqual(expectedResponse)
    })
  
})


export{}