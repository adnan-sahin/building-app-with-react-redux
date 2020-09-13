import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CoursesList';
import { Redirect } from 'react-router-dom';
import Spinner from '../common/Spinner';

class CoursesPage extends Component {
  state = {
    redirectToAddCoursePage: false,
  };
  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (!courses.length) {
      actions.loadCourses().catch((error) => {
        alert('Loading courses failed :' + error);
      });
    }
    if (!authors.length) {
      actions.loadAuthors().catch((error) => {
        alert('Loading authors failed :' + error);
      });
    }
  }

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList courses={this.props.courses} />
          </>
        )}
      </>
    );
  }
}
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapDispacthToProps(dispatch) {
  return {
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}
function mapStateToProps(state) {
  return {
    courses: !state.authors.length
      ? []
      : state.courses.map((course) => {
          return {
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId)
              .name,
          };
        }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(CoursesPage);
