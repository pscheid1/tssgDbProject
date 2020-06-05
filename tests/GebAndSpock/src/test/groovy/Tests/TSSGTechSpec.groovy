package Tests

import Pages.TSSGTechDataAnalyticsPage
import Pages.TSSGTechDevOpsPage
import Pages.TSSGTechHomePage
import Pages.TSSGTechMobilePage
import Pages.TSSGTechTestimonialsPage
import Pages.TSSGTechSchedulePage
import Pages.TSSGTechWebPage
import Pages.TSSGTechQAPage
import geb.spock.GebReportingSpec
import spock.lang.Unroll
import spock.lang.IgnoreRest
import org.openqa.selenium.Dimension

class TSSGTechSpec extends GebReportingSpec {
    def testKey
    def testResult

    def cleanup() {
        //testResult = () ? "PASS" : "FAIL"
        println "cleanup(): ${testKey} ${specificationContext.currentIteration.name} "
    }

    def setupSpec() {
        println "baseUrl = ${baseUrl}"
    }

    //@IgnoreRest
    def "Can get to the TSSG home page"() {
        testKey = "TWS-87"
        when:
            to TSSGTechHomePage
        then:
            at TSSGTechHomePage
    }

    //@IgnoreRest
    @Unroll
    def "selecting header menu #menuItem goes to #page.name"() {
        testKey = "TWS-30"
        when:
            to TSSGTechHomePage
            "${menuItem}"().click()
        then:
            //waitFor { "${page}"().focused }
            //at Class.forName("Pages.${page}",  false, Thread.currentThread().contextClassLoader) // page must be a string
            //at ("Pages.${page}" as Class)  // page must be a string
            at page

        where:
            menuItem       | page
            "homeLinkIcon" | TSSGTechHomePage
            "generalMenu"  | TSSGTechHomePage
            "testimonialsMenu" | TSSGTechTestimonialsPage
            "scheduleMenu" | TSSGTechSchedulePage
            "webMenu"      | TSSGTechWebPage
            "mobileMenu"   | TSSGTechMobilePage
            "qaMenu"       | TSSGTechQAPage
            "dataMenu"     | TSSGTechDataAnalyticsPage
            "devopsMenu"   | TSSGTechDevOpsPage

    }

    @Unroll
    def "selecting footer icon #footerIcon goes to #page.name"() {
        testKey = "TWS-189"
        when:
            to TSSGTechHomePage
            "${footerIcon}"().click()
        then:
            at page

        where:
            footerIcon           | page
            "webFooterIcon"      | TSSGTechWebPage
            "mobileFooterIcon"   | TSSGTechMobilePage
            "qaFooterIcon"       | TSSGTechQAPage
            "dataFooterIcon"     | TSSGTechDataAnalyticsPage
            "devopsFooterIcon"   | TSSGTechDevOpsPage

    }

    //@IgnoreRest
    def "Verify hamburger icon appears in header on narrow page"() {
        testKey = "TWS-299"

        given: "Set up a narrow browser window"
            to TSSGTechHomePage
            int width = 640
            int height = 960
            setViewportSize(width, height)

        when: "Navigate to the Tssg web page"
            to TSSGTechHomePage

        then: "the hamburger icon is displayed"
            hamburgerButton
    }

    //@IgnoreRest
    def "Verify menu appears when hamburger is clicked on narrow and short page"() {
        testKey = "TWS-311"

        given: "Set up a narrow and short browser window"
            to TSSGTechHomePage
            int width = 640
            int height = 320
            setViewportSize(width, height)

        when: "user navigates to any tssg.tech web page"
            to TSSGTechHomePage
        then: "hamburger icon is displayed"
            hamburgerButton

        when: "hamburger icon is clicked"
            hamburgerButton.click()
        then: "hamburger menu is expanded"
        and: "bottom most menu item is accessible"
            isWebElementVisible(devopsMenu.firstElement())
    }
}
