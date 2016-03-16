var Component = require("montage/ui/component").Component,
    Data = require("core/data").Data;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize({

    enterDocument: {
        value: function (isFirstTime) {
            this.data = Data;
        }
    }

});
