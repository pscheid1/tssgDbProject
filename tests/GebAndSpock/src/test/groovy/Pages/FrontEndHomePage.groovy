package Pages

import Common.FrontEndBasePage

class FrontEndHomePage extends FrontEndBasePage {

    static url = "/home"

    static at = {
        titleText
    }

    static content = {
        titleText { waitfor { $("h4", text: "User") } }

    }
}
