package Pages

import Common.TSSGTechBasePage

class TSSGTechTestimonialsPage extends TSSGTechBasePage {

    static url = "testimonials.html#top"

    static at = {
        titleText
    }

    static content = {
        titleText { $("strong", text: "TSSG TESTIMONIALS") }
    }
}

