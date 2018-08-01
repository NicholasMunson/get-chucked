describe("End to End test of Get Chucked", () => {
    it("should work correctly loading ChuckFacts and quotes depending on what button is pushed", () => {
        cy.visit("http://localhost:3000/")

        cy
        .get("#enterButton > a")
        .click()

        cy
        .url()
        .should("include", "/main.html")

        cy
        .get("#keyWordSearch")
        .type("chuck")
        .get("#randomChuck")
        .should("contain","Get Chucked")
        .click()
        .get("#keyWordSearch")
        .type("{backspace}{backspace}{backspace}{backspace}{backspace}")

        cy
        .get("#keyWordSearch")
        .type("love")
        .get("#unChuck")
        .should("contain","Get Un-Chucked")
        .click()

        cy
        .get("#backButton")
        .click()
        .url()
        .should("include", "/index.html")
    })
})