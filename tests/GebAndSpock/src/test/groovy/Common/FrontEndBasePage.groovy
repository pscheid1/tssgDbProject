package Common

import geb.Page
import org.openqa.selenium.Dimension
import org.openqa.selenium.Point
import org.openqa.selenium.WebElement

class FrontEndBasePage extends Page {

    static url = "${System.properties['geb.build.frontendUrl']}"

    static at = {
        title == "TssgDbApp"
        $("h1 strong", text:"GENERAL MEETING INFORMATION").displayed
    }

    static content = {
        // Header
        homeLinkIcon { $("a img", src: "assets/tssg_logo.png").parent() }
        mainMenuUsers { $("a", text: contains("Users")) }
        usersMenuListAllUsers { $("a", text: "List All Users") }
    }

    /**
     * Checks if the web element is displayed within the viewport.
     *
     * @param WebElement w
     */
    boolean isWebElementVisible(WebElement w) {
        Dimension weD = w.size
        Point weP = w.location

        int x = browser.js."window.innerWidth"
        int y = browser.js."window.innerHeight"
        int x2 = weD.width + weP.x
        int y2 = (weD.height * 0.6) + weP.y
        println "isWebElementVisible " +
            "( weD.x:w.innerWidth, weD.y:w.innerHeight ) : " +
            "( ${x2}:${x}, ${y2}:${y} )"
        println "  window.innerHeight = ${y}"
        println "  weD.height         = ${weD.height}"
        println "  weP.y              = ${weP.y}"
        println "  y2                 = ${y2}"

        return x2 <= x && y2 <= y
    }

    /**
     * Set the viewport size.
     *
     * @param int width Width of the viewport (i.e. browser's viewable width)
     * @param int hwight Height of the viewport (i.e. browser's viewable height)
     */
    def setViewportSize(int width, int height) {
        println "Setting viewport size = ${width}w, ${height}h"
        driver.manage().window().size = new Dimension(
            browser.js."window.outerWidth - window.innerWidth + ${width}" as int,
            browser.js."window.outerHeight - window.innerHeight + ${height}" as int
        )
    }

}