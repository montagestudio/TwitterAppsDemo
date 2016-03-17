var Component = require("montage/ui/component").Component;

/**
 * @class Size
 * @extends Component
 */
exports.Popcorn = Component.specialize({

    _size: {
        value: null
    },

    size: {
        get: function () {
            return this._size;
        },
        set: function (value) {
            if (this._size !== value) {
                this._size = value;
                this.needsDraw = true;
            }
        }
    },

    draw: {
        value: function () {
            if (this._size) {
            }
        }
    }

});
