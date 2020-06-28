import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CoursesList';

class CoursesPage extends Component {
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
        <h2>Courses</h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
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
  };
}

export default connect(mapStateToProps, mapDispacthToProps)(CoursesPage);
