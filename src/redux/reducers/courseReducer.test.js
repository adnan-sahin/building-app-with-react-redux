import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

it('should add course when passed CREATE_COURSE_SUCCESS', () => {
  //arrange
  const initialState = [{ title: 'A' }, { title: 'B' }];

  const newCourse = { title: 'C' };

  const action = actions.createCourseSuccess(newCourse);

  //act
  const newState = courseReducer(initialState, action);

  //assert
  expect(newState.length).toEqual(3);
  expect(newState[0].title).toEqual('A');
  expect(newState[1].title).toEqual('B');
  expect(newState[2].title).toEqual('C');
});
it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
  //arrange
  const initialState = [
    { id: 1, title: 'A' },
    { id: 2, title: 'B' },
    { id: 3, title: 'C' },
  ];

  const newTitle = 'New title';
  const course = { id: 3, title: newTitle };

  const action = actions.updateCourseSuccess(course);

  //act
  const newState = courseReducer(initialState, action);
  const updatedCourse = newState.find((s) => s.id == course.id);
  const untouchedCourse = newState.find((s) => s.id == 1);

  //assert
  expect(newState.length).toEqual(3);
  expect(updatedCourse.title).toEqual(newTitle);
  expect(untouchedCourse.title).toEqual('A');
});
