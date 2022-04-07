describe("GET /planets/3", function (){
    beforeEach('', function (){
        cy.request('/planets/3').as('planet')
    })

    it('should verify response status code', function () {
        cy.get('@planet').then(res=>{
            expect(res.status).to.eq(200)
        })
    });
})