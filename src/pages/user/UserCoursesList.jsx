import { PlayCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.scss';

function UserCoursesList({ courses = [] }) {
  const history = useHistory();

  function calculateLessons(sections = []) {
    let totalLessons = 0;
    return sections.reduce(
      (prev, current) => current.lessons.length + prev,
      totalLessons
    );
  }

  return (
    <div className='course-list-container'>
      {courses.map(course => (
        <div className='course-container'>
          <div className='left'>
            <img src={course.image.downloadURL} alt={course.name} />
            <div className='content'>
              <h3 className='title'>{course.name}</h3>
              <p className='lesson'>
                {calculateLessons(course.sections)} Lessons
              </p>
              <p className='instructor'>By {course.instructor.name}</p>
            </div>
          </div>
          <div className='right'>
            <PlayCircleOutlined
              onClick={() => history.push(`/user/courses/${course.slug}`)}
              className='icon-play'
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCoursesList;
