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
})