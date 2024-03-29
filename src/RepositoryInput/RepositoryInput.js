import React, { Component } from "react";
import styles from "./RepositoryInput.styles";
import { connect } from "react-redux";
import {
  fetchPullRequestData,
  fetchReviewCommentData,
  fetchPullRequestDataSuccess,
  fetchReviewCommentDataSuccess
} from "../redux/actions/action";
const fetch = require("isomorphic-fetch");

const BASE_URL = "https://api.github.com/repos/";
const ACCESS_TOKEN = "&access_token=";

class RepositoryInput extends Component {
  state = {
    code: "",
    owner: "newsuk",
    repository: "AyeSpy"
  };

  getData = async () => {
    await this.fetchPullRequests();
    const comments = await this.fetchReviewComments();
    await this.formatData(comments);
  };

  fetchPullRequests = async () => {
    const { owner, repository, code, fetchingPullRequests } = this.state;
    let dataOutstanding = true;
    let pageCounter = 0;
    let prData = [];
    this.props.fetchPullRequestData();
    while (dataOutstanding && !fetchingPullRequests) {
      try {
        const response = await fetch(
          `${BASE_URL}${owner}/${repository}/pulls?state=all${
            code ? ACCESS_TOKEN : ""
          }${code}&per_page=100&page=${pageCounter}`
        );
        const responseJson = await response.json();
        prData = [...prData, ...responseJson];
        pageCounter += 1;
        if (responseJson.length === 0) {
          dataOutstanding = false;
          this.props.fetchPullRequestDataSuccess(prData);
        }
      } catch (err) {
        console.log('There was an error fetching the pull requests:', err);
      }
    }
  };

  fetchReviewComments = async () => {
    let commentData = [];
    const { code } = this.state;
    const { pullRequestData } = this.props;
    this.props.fetchReviewCommentData();
    for (let n in pullRequestData) {
      const response = await fetch(
        `${pullRequestData[n].review_comments_url}?${ACCESS_TOKEN}${code}`
      );
      const responseJson = await response.json();
      commentData = [...commentData, ...responseJson];
    }
    return commentData;
  };

  formatData = async data => {
    const regex = /```(.?)*```/s;
    for (const comment of data) {
      comment.body = comment.body.replace(regex, "");
    }
    this.props.fetchReviewCommentDataSuccess(data);
  };

  handleOAuthCodeChange = e => {
    this.setState({ code: e.target.value });
  };

  handleOwnerChange = e => {
    this.setState({ owner: e.target.value });
  };

  handleRepositoryChange = e => {
    this.setState({ repository: e.target.value });
  };

  render() {
    const { fetchingPullRequestData, fetchingReviewCommentData } = this.props;
    const { owner, code } = this.state;
    return (
      <div style={styles.inputForm}>
        <p>OAuthCode</p>
        <input
          type="text"
          name="code"
          value={this.state.code}
          onChange={this.handleOAuthCodeChange}
        />
        <p>Organisation/Owner</p>
        <input
          type="text"
          name="owner"
          value={this.state.owner}
          onChange={this.handleOwnerChange}
        />
        <p>Repository</p>
        <input
          type="text"
          name="repository"
          value={this.state.repository}
          onChange={this.handleRepositoryChange}
        />
        <button
          type="submit"
          onClick={this.getData}
          disabled={owner === '' || code === ''}
        >
          {" "}
          yes yes mandem, is it true that your dog has one leg?
        </button>
        {fetchingPullRequestData && <p> Fetching pull requests...</p>}
        {fetchingReviewCommentData && <p> Fetching comments...</p>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  pullRequestData: state.pullRequestData,
  fetchingPullRequestData: state.fetchingPullRequestData,
  fetchingReviewCommentData: state.fetchingPullRequestData
});

const mapDispatchToProps = {
  fetchPullRequestData,
  fetchReviewCommentData,
  fetchPullRequestDataSuccess,
  fetchReviewCommentDataSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryInput);
