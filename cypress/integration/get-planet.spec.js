//Mocha framework
describe("GET /planets/3", function (){
    //Perform request before each 'it block'
    beforeEach('', function (){
        //'.as' is used as an Alias to avoid repeating long code
        cy.request('/planets/3').as('planet')
    })

    it('should verify response header', function () {
        cy.get('@planet').then(res=>{
            expect(res.status).to.eq(200)
            expect(res.headers[`content-type`]).to.eq('application/json')
            expect(res.headers[`vary`]).to.contain('Accept')
            expect(res.headers[`allow`]).to.eq('GET, HEAD, OPTIONS')
        })
    });
    it('should verify response data', function () {
        cy.get('@planet').then(res=>{
            cy.fixture('planet-data.json').then(data=>{
                for (var key in data.body) {
                    expect(data.body[key]).to.deep.equal(res.body[key])
                }
            })
        })
    });
    it('should verify the JSON Schema', function () {
        cy.get('@planet').then(res=>{
            expect(res.headers[`content-type`]).to.eq('application/json')
            cy.fixture('planet-data.json').then(data=>{
                expect(res.body).to.deep.equal(data.body)
            })
        })
    });
    it('should verify response time does not exceed 3ms', function () {
        cy.get('@planet').then(res=>{
            expect(res.duration).to.not.be.greaterThan(3000)
        })
    });
    it('should mock out the response and return a different value for the name object', function () {
        cy.get('@planet').then(res=>{
            res.body.name = "Rodney"
            expect(res.body.name).to.be.eq("Rodney")
        })
    });
    it('should verify that request does not allow POST Method', function () {
        cy.request({
            method: 'POST',
            url: '/planets/3',
            body: {
                "name": "Automated testing",
                "Completed": true
            },
            failOnStatusCode: false
        }).then(res=>{
            expect(res.status).to.eq(405)
            expect(res.body.detail).to.eq("Method 'POST' not allowed.")
        })
    });
})