const FollowToggle = require('./follow_toggle');

$(() => {
  $('.follow-toggle').each((idx,el) => {
    new FollowToggle($(el));
  });

});
