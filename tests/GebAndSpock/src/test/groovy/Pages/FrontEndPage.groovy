package Pages

import Common.FrontEndBasePage

class FrontEndPage extends FrontEndBasePage {

    static url = "http://192.168.99.103:4200/user/login"

    static at = {
        titleText
    }

    static content = {
        titleText { $("h4", text: "Login") }
        username { $("#username") }
        password { $("#password") }
        loginButton { $("button", text:"Login") }
    }
}
