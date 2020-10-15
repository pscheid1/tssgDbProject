package Tests
import geb.spock.GebReportingSpec
import spock.lang.Stepwise
import Pages.FrontEndUserLoginPage
import Pages.FrontEndHomePage
import Pages.FrontEndListAllUsersPage

@Stepwise
class FrontEndSpec extends GebReportingSpec {
    def testKey
    def testResult

    def cleanup() {
        //testResult = () ? "PASS" : "FAIL"
        println "cleanup(): ${testKey} ${specificationContext.currentIteration.name} "
    }

    def setupSpec() {

    }

    def "01 Login to frontend as admin user"() {
        testKey = "TWS-333"
        given: "the scheduledb frontend service is up"
        and: "the backend service is up"
        and: "the mongo database is healthy"

        when: "login to the FrondEndUserLoginPage"
            to FrontEndUserLoginPage
            username = "admin"
            password = "adminpw"
            loginButton.click()
        then:
            at FrontEndHomePage
    }

    def "02 Can navigate to List All Users menu"() {
        testKey = "TWS-333"
        given: "The admin user is logged in to FrontEnd"
            //to FrontEndHomePage
        and: "the backend service is up"
        and: "the mongo database is healthy"

        when: "admin user clicks on Users menu item in the main menu"
            mainMenuUsers.click()
        then: "the Users menu drops down"
            usersMenuListAllUsers

        when: "List All Users menu item is selected"
            usersMenuListAllUsers.click()
        then: "the List All Users section header is displayed"
            at FrontEndListAllUsersPage
    }
}