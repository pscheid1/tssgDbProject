package Pages

import Common.FrontEndBasePage

class FrontEndUserLoginPage extends FrontEndBasePage {

    static url = "${System.properties['geb.build.frontendUrl']}/user/login"

    static at = {
        titleText
    }

    static content = {
        titleText { waitFor { $("h4", text: "Login") } }
        username { $("#username") }
        password { $("#password") }
        loginButton { $("button", text:"Login") }
    }
}
