/*
	This is the Geb configuration file.
	
	See: http://www.gebish.org/manual/current/#configuration
*/


import org.openqa.selenium.chrome.ChromeDriver
import org.openqa.selenium.firefox.FirefoxDriver
import org.openqa.selenium.firefox.FirefoxProfile
import org.openqa.selenium.Platform
import org.openqa.selenium.remote.DesiredCapabilities
import org.openqa.selenium.remote.RemoteWebDriver

waiting {
	timeout = 2
}

environments {
	
    // run via “./gradlew chromeTest”
    // See: http://code.google.com/p/selenium/wiki/ChromeDriver
    chrome {
        //driver = { new ChromeDriver() }
        driver = {
            DesiredCapabilities capabilities = DesiredCapabilities.chrome()
            //capabilities.setVersion("67.0.3396.87")
            capabilities.setPlatform(Platform.LINUX)
            new RemoteWebDriver( new URL("http://hub.technologynursery.org/wd/hub"), capabilities )
        }
    }
	
    // run via “./gradlew firefoxTest”
    // See: http://code.google.com/p/selenium/wiki/FirefoxDriver
    firefoxLinux {
        //driver = { new FirefoxDriver() }
        driver = {
            DesiredCapabilities capabilities = DesiredCapabilities.firefox()
            capabilities.setVersion("45.4.0esr")
            capabilities.setPlatform(Platform.LINUX)
            new RemoteWebDriver( new URL("http://hub:4433/wd/hub"), capabilities )

            //FirefoxProfile profile = new FirefoxProfile()
            //profile.setPreference("intl.accept_languages", "en-us")
            //def driverInstance = new FirefoxDriver(profile)
            //driverInstance
        }
    }

    firefox {
        driver = { new FirefoxDriver() }
    }

}

// To run the tests with all browsers just run “./gradlew test”

// Set the actual baseUrl from alias values.
// For example: in gradle configuration set this VM Option to use the qa environment
// -Dgeb.build.baseUrl=qa
baseUrl = System.properties['geb.build.baseUrl']
switch (baseUrl) {
    case ["dev", "scheduledb"]:
        baseUrl = "https://technologynursery.org/tssgTechScheduledb/"
        break
    case ["multipage"]:
        baseUrl = "https://technologynursery.org/tssgTechMultipage/"
        break
    case ["qa", "stagedMaster"]:
        baseUrl = "https://technologynursery.org/tssgTechStagedMaster/"
        break
    case ["webflowqa"]:
        baseUrl = "https://technologynursery.org/tssgTechWebflow/"
        break
    case ["prod", "tssgTech"]:
        baseUrl = "https://technologynursery.org/tssgTech/"
        break
    default:
        baseUrl = "https://technologynursery.org/tssgTechScheduledb/"
        break
}

