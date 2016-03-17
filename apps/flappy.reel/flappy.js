var Component = require("montage/ui/component").Component,
    PressComposer = require("montage/composer/press-composer").PressComposer;

/**
 * @class Flappy
 * @extends Component
 */
exports.Flappy = Component.specialize({

    enterDocument: {
        value: function (isFirstTime) {
            if (isFirstTime) {
                this._pressComposer = new PressComposer();
                this.addComposer(this._pressComposer);
                this._pressComposer.addEventListener("pressStart", this, false);
                this.startGame();
                this._isPlaying = false;
            }
        }
    },

    _isGameOver: {
        value: false
    },

    _isPlaying: {
        value: false
    },

    size: {
        set: function () {
            this._startTime = Date.now();
            this._jumpStartTime = this._startTime - 300;
            this._jumpY = 40;
            this._isPlaying = false;
            this.needsDraw = true;
        }
    },

    handlePressStart: {
        value: function () {
            if (!this._isPlaying) {
                if (this._isGameOver) {
                    this.startGame();
                } else {
                    this._startTime = Date.now();
                    this._jumpStartTime = this._startTime - 300;
                    this._jumpY = 40;
                    this._isPlaying = true;
                    this.needsDraw = true;
                }
            } else {
                this._jumpStartTime = Date.now();
                this._jumpY = this._birdY;
            }
        }
    },

    startGame: {
        value: function () {
            this._isPlaying = true;
            this._isGameOver = false;
            this._startTime = Date.now();
            this.needsDraw = true;
            this._columnsOffset = null;
            this._jumpStartTime = this._startTime - 300;
            this._jumpY = 40;
        }
    },

    willDraw: {
        value: function () {
            this._width = this._element.offsetWidth;
            this._height = this._element.offsetHeight;
        }
    },

    _columns: {
        value: null
    },

    _jumpY: {
        value: 40
    },

    _birdX: {
        value: 40
    },

    _birdY: {
        value: 40
    },

    draw: {
        value: function () {
            var now = Date.now(),
                time = now - this._startTime,
                scroll = time * .05,
                backgroundWidth = (1 + Math.ceil(this._width / 140)) * 140,
                columnsNeeded = (1 + Math.ceil(this._width / 78)),
                column,
                index,
                birdY,
                scale,
                x, y,
                k,
                i;

            scale = Math.min(this._width / 44, this._height / 22) * .5;
            this.playElement.style.transform = "scale3d(" + scale + "," + scale + ",1)";
            this.wrapperElement.style.width = Math.ceil(this._width * 192 / this._height) + "px";
            scale = this._height / 192;
            this.wrapperElement.style.transform = "scale3d(" + scale + "," + scale + ",1)";
            if (!this._columns || this._columns.length !== columnsNeeded) {
                this.columnsElement.innerHTML = "";
                this._columns = [];
                for (i = 0; i < columnsNeeded; i++) {
                    column = document.createElement("div");
                    column.className = "Flappy-column";
                    this.columnsElement.appendChild(column);
                    this._columns.push(column);
                }
            }
            if (!this._columnsOffset) {
                this._columnsOffset = [999, 999, 999];
            }
            k = (now - this._jumpStartTime) / 70 - 4;
            this._birdY = this._jumpY + k * k - 4 * 4;
            if (this._birdY > 192 - 24 - 22) {
                this._isPlaying = false;
                this._isGameOver = true;
            }
            for (i = 0; i < this._columns.length; i++) {
                index = Math.floor(i + scroll / 78);
                if (index >= 0) {
                    column = this._columns[i];
                    if (typeof this._columnsOffset[index] === "undefined") {
                        this._columnsOffset[index] = Math.floor(Math.random() * 70) + 25;
                    }
                    x = (index * 78 - scroll);
                    y = this._columnsOffset[index];
                    if ((this._birdX > x - 24) &&
                        (this._birdX < x + 24) &&
                        (y !== 999) &&
                        ((this._birdY < y - 6) ||
                        (this._birdY > y + 32))) {
                            this._isPlaying = false;
                            this._isGameOver = true;
                    }
                    column.style.transform = "translate3d(" + x + "px," + y + "px,0)";
                }
            }
            this.cloudsElement.style.width = backgroundWidth + "px";
            this.buildingsElement.style.width = backgroundWidth + "px";
            this.treesElement.style.width = backgroundWidth + "px";
            this.groundElement.style.width = backgroundWidth + "px";
            this.cloudsElement.style.transform = "translate3d(" + (((scroll * .1) % 140) * -1) + "px, 0, 0)";
            this.buildingsElement.style.transform = "translate3d(" + (((scroll * .2) % 140) * -1) + "px, 0, 0)";
            this.treesElement.style.transform = "translate3d(" + (((scroll * .4) % 140) * -1) + "px, 0, 0)";
            this.groundElement.style.transform = "translate3d(" + (((scroll * 1.1) % 140) * -1) + "px, 0, 0)";
            this.birdElement.style.transform = "translate3d(" + this._birdX + "px," + this._birdY + "px,0) rotate3d(0,0,1," + (k * 3 - 15) + "deg)";
            if (this._isPlaying) {
                this.playElement.style.display = "none";
                this.needsDraw = true;
            } else {
                this.playElement.style.display = "block";
            }
        }
    }

});
