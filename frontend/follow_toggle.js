const APIUtil = require('./api_util');


class FollowToggle {
  constructor($el, options) {
    this.$el = $el;
    this.userId = (this.$el.data('user-id') || options.userId);
    this.followState = (this.$el.data('initial-follow-state')
    || options.followState);
    this.render();
    this.$el.on('click', this.handleClick.bind(this));
  }

  render() {
    if (this.followState === "followed") {
      this.$el.text("unfollow");
    } else {
      this.$el.text("follow");
    }
  }


  successCallback(followState) {
    return () => {
      this.followState = followState;
      this.$el.prop("disabled", false);
      this.render();
    };

  }

  handleClick(event) {

      event.preventDefault();
      if (this.followState === "followed") {
        this.$el.text("unfollowing...");
        this.$el.prop("disabled", true);
        APIUtil.followUser(this.userId)
            .then(this.successCallback("unfollowed"));
      } else {
        this.$el.text("following...");
        this.$el.prop("disabled", true);
        APIUtil.unfollowUser(this.userId)
            .then(this.successCallback("followed"));

      }
  }

}

module.exports = FollowToggle;
