var Component = require("montage/ui/component").Component;

/**
 * @class Tweet
 * @extends Component
 */
exports.Tweet = Component.specialize({

    _data: {
        value: null
    },

    data: {
        get: function () {
            return this._data;
        },
        set: function (value) {
            if (this._data !== value) {
                this._data = value;
                this.needsDraw = true;
            }
        }
    },

    handleFullscreenAction: {
        value: function () {
            if (this.classList.contains("Tweet--fullscreen")) {
                this.classList.remove("Tweet--fullscreen");
                this.application.main.classList.remove("Main--fullscreen");
            } else {
                this.classList.add("Tweet--fullscreen");
                this.application.main.classList.add("Main--fullscreen");
            }
            this.placeholder.handleResize();
        }
    },

    draw: {
        value: function () {
            var data = this._data;

            if (data) {
                this.avatarElement.style.backgroundImage = "url(assets/avatars/" + data.avatar + ")";
                this.nameElement.textContent = data.fullname;
                this.usernameElement.textContent = data.username;
                this.timeElement.textContent = data.time;
                this.textElement.innerHTML = data.text;
                if (data.photo) {
                    this.photoElement.style.display = "block";
                    this.photoElement.style.backgroundImage = "url(assets/photos/" + data.photo + ")";
                } else {
                    this.photoElement.style.display = "none";
                }
                if (data.retweets) {
                    this.retweetsElement.textContent = data.retweets;
                } else {
                    this.retweetsElement.textContent = "";
                }
                if (data.likes) {
                    this.likesElement.textContent = data.likes;
                } else {
                    this.likesElement.textContent = "";
                }
                if (typeof data.component === "string") {
                    this.componentWrapperElement.style.display = "block";
                } else {
                    this.componentWrapperElement.style.display = "none";
                }
            }
        }
    }

});
