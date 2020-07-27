package Pages

import Common.FrontEndBasePage

class FrontEndHomePage extends FrontEndBasePage {

    static url = "http://192.168.99.103:4200/home"

    static at = {
        titleText
    }

    static content = {
        titleText { waitfor { $("h4", text: "User") } }

    }
}
