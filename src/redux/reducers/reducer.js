const initialState = {
  pullRequestData: [],
  reviewCommentData: [],
  fetchingPullRequestData: false,
  fetchingReviewCommentData: false
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "FETCH_PULL_REQUEST_DATA":
      return {
        ...state,
        fetchingPullRequestData: true
      };
    case "FETCH_REVIEW_COMMENT_DATA":
      return {
        ...state,
        fetchingReviewCommentData: true
      };
    case "FETCH_PULL_REQUEST_DATA_SUCCESS":
      return {
        ...state,
        pullRequestData: action.pullRequestData,
        fetchingPullRequestData: false
      };
    case "FETCH_REVIEW_COMMENT_DATA_SUCCESS":
      return {
        ...state,
        reviewCommentData: action.reviewCommentData,
        fetchingReviewCommentData: false
      };
    case "FETCH_PULL_REQUEST_DATA_FAILURE":
      return {
        ...state,
        fetchingPullRequestData: false
      };
    case "FETCH_REVIEW_COMMENT_DATA_FAILURE":
      return {
        ...state,
        fetchingReviewCommentData: false
      };
    default:
      return state;
  }
}

export default reducer;
