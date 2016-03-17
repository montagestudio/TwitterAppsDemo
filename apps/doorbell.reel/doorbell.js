var Component = require("montage/ui/component").Component,
    PressComposer = require("montage/composer/press-composer").PressComposer;

/**
 * @class Flappy
 * @extends Component
 */

 /*
 function App() {
     this.isMicroOn = 0;

 }

 App.prototype.timer = function () {
     if (!this.time) this.time = document.getElementById("time");
     var d = new Date();

     this.time.innerHTML = d.format("dayTime");

 }

 App.prototype.phone = function () {
     document.getElementById("micro").src = this.micro ? "microphone_white.svg" : "microphone.svg";
     this.isMicroOn = this.isMicroOn ? 0 : 1;

 }

 App.prototype.build = function (){
     var that = this;
     this.interval = setInterval(function () {
         that.timer();
     },1000);
     return;



 }

 var APP = new App();
*/

exports.Doorbell = Component.specialize({

    enterDocument: {
        value: function (isFirstTime) {

            this._pressComposer = new PressComposer();
            this.addComposerForElement(this._pressComposer,this.microphoneElement);
            this._pressComposer.addEventListener("press", this, false);

            if (isFirstTime) {
                var that = this;
                this.interval = setInterval(function () {
                    that.timer();
                },1000);
            }
        }
    },

    isMicroOn: {
        value: true
    },

    handlePress: {
        value: function () {
            this.isMicroOn = !this.isMicroOn;
            this.needsDraw = true;
        }
    },


    size: {
        set: function () {
            this.needsDraw = true;
        }
    },
    timer: {
        value: function () {
            this.needsDraw = true;
        }
    },
    draw: {
        value: function () {

            this.microphoneElement.src = this.isMicroOn ? "apps/doorbell.reel/microphone_white.svg" : "apps/doorbell.reel/microphone.svg";

            var d = new Date();
            this.timeElement.innerHTML = d.format("dayTime");

        }
    }

});
