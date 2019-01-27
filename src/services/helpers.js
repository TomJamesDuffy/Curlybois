const Sentiment = require("sentiment");
const sentiment = new Sentiment();

// This is set by formatContributorsByReviewComments and used by formatContributorsBySentiment

const roundToTwoDP = num => {
  return +(Math.round(num + "e+2") + "e-2");
};

const formatContributorsByReviewComments = reviewCommentData => {
  const commentsPerPerson = {};
  reviewCommentData &&
    reviewCommentData.forEach(reviewComment => {
      if (commentsPerPerson.hasOwnProperty(reviewComment.user.login)) {
        commentsPerPerson[reviewComment.user.login] += 1;
      } else {
        commentsPerPerson[reviewComment.user.login] = 0;
      }
    });

  const formattedCommentsPerPerson = Object.entries(commentsPerPerson).map(
    dataPoint => {
      return { name: dataPoint[0], value: dataPoint[1] };
    }
  );
  return { formattedCommentsPerPerson, commentsPerPerson };
};

const formatContributorsBySentiment = reviewCommentData => {
  const { commentsPerPerson } = formatContributorsByReviewComments(
    reviewCommentData
  );
  const commentsSentimentReviewer = [];
  const sentimentPerPerson = {};
  reviewCommentData &&
    reviewCommentData.forEach(reviewComment => {
      const commentScore = sentiment.analyze(reviewComment.body).score;
      if (sentimentPerPerson.hasOwnProperty(reviewComment.user.login)) {
        commentsSentimentReviewer.push([
          reviewComment.body,
          commentScore,
          reviewComment.user.login
        ]);
        sentimentPerPerson[reviewComment.user.login] += commentScore;
      } else {
        commentsSentimentReviewer.push([
          reviewComment.body,
          commentScore,
          reviewComment.user.login
        ]);
        sentimentPerPerson[reviewComment.user.login] = 0;
      }
    });
  const orderedAverageSentimentPerCommentPerPerson = Object.keys(
    sentimentPerPerson
  )
    .map(person => {
      const rating = roundToTwoDP(
        sentimentPerPerson[person] / commentsPerPerson[person]
      );
      const array = [person, rating];
      return array;
    })
    .sort((a, b) => {
      return b[1] - a[1];
    });
  return {
    orderedAverageSentimentPerCommentPerPerson,
    commentsSentimentReviewer
  };
};

const formatTopFiveReviewCommentsBySentiment = reviewCommentData => {
  const { commentsSentimentReviewer } = formatContributorsBySentiment(
    reviewCommentData
  );
  const highestRatedComments =
    commentsSentimentReviewer &&
    commentsSentimentReviewer
      .sort((a, b) => {
        return b[1] - a[1];
      })
      .slice(0, 5);
  return highestRatedComments;
};

const formatBottomFiveReviewCommentsBySentiment = reviewCommentData => {
  const { commentsSentimentReviewer } = formatContributorsBySentiment(
    reviewCommentData
  );
  const lowestRatedComments =
    commentsSentimentReviewer &&
    commentsSentimentReviewer
      .sort((a, b) => {
        return a[1] - b[1];
      })
      .slice(0, 5);
  return lowestRatedComments;
};

module.exports = {
  roundToTwoDP,
  formatContributorsByReviewComments,
  formatContributorsBySentiment,
  formatTopFiveReviewCommentsBySentiment,
  formatBottomFiveReviewCommentsBySentiment
};
