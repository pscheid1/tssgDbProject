package Tests
import geb.spock.GebReportingSpec
import Pages.FrontEndPage
import Pages.FrontEndHomePage

class FrontEndSpec extends GebReportingSpec {
    def testKey
    def testResult

    def cleanup() {
        //testResult = () ? "PASS" : "FAIL"
        println "cleanup(): ${testKey} ${specificationContext.currentIteration.name} "
    }

    def setupSpec() {

    }

    def "Verify Frontend can access the Backend"() {
        testKey = "TWS-333"
        given: "the scheduledb frontend service is up"
        and: "the backend service is up"
        and: "the mongo database is healthy"

        when: "log into the FrondEndPage"
            to FrontEndPage
            username = "admin"
            password = "adminpw"
            loginButton.click()
        then:
            at FrontEndHomePage
    }
}