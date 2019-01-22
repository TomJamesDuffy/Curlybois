export const fetchPullRequestData = () => ({
  type: "FETCH_PULL_REQUEST_DATA"
});

export const fetchReviewCommentData = () => ({
  type: "FETCH_REVIEW_COMMENT_DATA"
});

export const fetchPullRequestDataSuccess = pullRequestData => ({
  type: "FETCH_PULL_REQUEST_DATA_SUCCESS",
  pullRequestData
});

export const fetchReviewCommentDataSuccess = reviewCommentData => ({
  type: "FETCH_REVIEW_COMMENT_DATA_SUCCESS",
  reviewCommentData
});

export const fetchPullRequestDataFailure = () => ({
  type: "FETCH_PULL_REQUEST_DATA_FAILURE"
});

export const fetchReviewCommentDataFailure = () => ({
  type: "FETCH_REVIEW_COMMENT_DATA_FAILURE"
});
