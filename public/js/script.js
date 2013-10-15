/*jslint browser: true, white: true, indent: 2 */
/*global $: false, prettyDate: false */
(function () {
  "use strict";

  var livefetch, fetcher, currentAnimation;

  livefetch = function (resource, ondata) {
    var pollingOptions, newLatestId, request, aborted;

    pollingOptions = {
      url  : resource,
      cache : false,
      dataType: 'json',
      timeout : 15000,
      success : function (data) {
        if (aborted) {
          return;
        }
        if (data && data.length) {
          newLatestId = data[0].offset;
          pollingOptions.url = resource + '?since=' + newLatestId;
          ondata(data);
        }
        request = $.ajax(pollingOptions);
      },
      error : function () {
        if (!aborted) {
          request = $.ajax(pollingOptions);
        }
      }
    };
    request = $.ajax(pollingOptions);

    return {
      replace : function () {
        aborted = true;
        request.abort();
        return livefetch(resource, ondata);
      }
    };
  };

  fetcher = livefetch('/updates', function (data) {
    var i, tweet, metadata, $container, originalHeight;

    $container = $(document.getElementById('main'));
    originalHeight = $container.height();

    for (i = data.length - 1; i >= 0; i -= 1) {
      tweet = data[i].value;

      $('<div />').addClass('post')
        .append($('<div />').addClass('chatline').text(tweet.text))
        .prependTo($container);
    }

    if (originalHeight) {
      if (currentAnimation) {
        currentAnimation.stop();
      }
      $container.css('margin-top', (originalHeight - $container.height() + parseInt($container.css('margin-top'), 10)) + 'px');
      currentAnimation = $container.animate({
        marginTop : 0
      });
    }
  });
}());
