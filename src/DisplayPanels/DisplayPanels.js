import React from "react";
import { connect } from "react-redux";
import InfoPanel from "./InfoPanel/InfoPanel.js";
import styles from "./DisplayPanels.styles";
import {
  formatContributorsByReviewComments,
  formatContributorsBySentiment,
  formatTopFiveReviewCommentsBySentiment,
  formatBottomFiveReviewCommentsBySentiment
} from "../services/helpers";

const DisplayPanels = ({ reviewCommentData }) => {
  const formattedProportionCommentData = formatContributorsByReviewComments(
    reviewCommentData
  );
  const formattedContributorsBySentimentData = formatContributorsBySentiment(
    reviewCommentData
  );
  const formattedTopFiveData = formatTopFiveReviewCommentsBySentiment(
    reviewCommentData
  );
  const formattedBottomFiveData = formatBottomFiveReviewCommentsBySentiment(
    reviewCommentData
  );
  return (
    <div style={styles.panelContainer}>
      <InfoPanel
        heading={"Number of review comments made by each contributor"}
        pieData={formattedProportionCommentData}
        textData={formattedProportionCommentData}
      />
      <InfoPanel
        heading={"On a per comment basis, who is the nicest reviewer?"}
        textData={formattedContributorsBySentimentData}
      />
      <InfoPanel
        heading={"Which review comments were the most positive?"}
        textData={formattedTopFiveData}
      />
      <InfoPanel
        heading={"Which review comments were the most negative?"}
        textData={formattedBottomFiveData}
      />
    </div>
  );
};

const mapStateToProps = state => ({
  reviewCommentData: state.reviewCommentData
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DisplayPanels);
