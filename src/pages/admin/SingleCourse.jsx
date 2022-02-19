import React from 'react';
import { CheckCircleFilled, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

function SingleCourse({ course }) {
  return (
    <div className='course-container'>
      <div className='left'>
        <img src={course.image.downloadURL} alt={course.name} />
        <div className='left-content'>
          <h3 className='name'>
            <Link to={`/admin/dashboard/course/${course.slug}`}>
              {course.name}
            </Link>
          </h3>
          <p className='sections'>{course.sections.length} Sections</p>
          <p className='info'>
            {course.sections.length < 2
              ? 'At least 2 sections are needed to publish the course'
              : course.published
              ? 'You course is live'
              : 'You are ready to publish the course'}
          </p>
        </div>
      </div>
      <div className='right'>
        {course.published ? (
          <CheckCircleFilled className='icon-check' />
        ) : (
          <CloseCircleOutlined className='icon-close' />
        )}
      </div>
    </div>
  );
}

export default SingleCourse;
