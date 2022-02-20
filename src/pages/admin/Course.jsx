import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import coursesApi from '../../api/courses';
import LoadingComponent from '../../components/loader/LoadingComponent';
import useFetchData from '../../hooks/useFetchData';
import { listenAdminCourses } from '../../redux/course/courseActions';
import { EditOutlined, CheckOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import './Course.scss';
import { useHistory } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { openModal } from '../../redux/auth/reducer/modalReducer';
import CustomAccordian from '../../components/customAccordian/CustomAccordian';

function Course() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.async);
  const history = useHistory();

  const course = useSelector(state =>
    state.course.adminCourses.find(c => c.slug === slug)
  );

  useFetchData({
    request: () => coursesApi.getSingleCourse(slug),
    data: res => dispatch(listenAdminCourses([res.data.course])),
    deps: [dispatch],
  });

  function openSectionModal() {
    dispatch(openModal({ modalType: 'SectionModal', modalProps: { course } }));
  }

  if (loading || (!course && !error))
    return <LoadingComponent content='Loading course...' />;

  return (
    <div className='single-course'>
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
            <p className='info'>{course.category}</p>
          </div>
        </div>
        <div className='right'>
          <div className='right-icons'>
            <EditOutlined
              className='edit'
              onClick={() =>
                history.push(`/admin/dashboard/course/${course.slug}/edit`)
              }
            />
            <CheckOutlined className='check' />
          </div>
        </div>
      </div>
      {/* Description */}
      <ReactMarkdown>{course.description}</ReactMarkdown>
      {/* Add button to add sections */}
      <Button content='Add Section' color='teal' onClick={openSectionModal} />

      {/* Section List */}
      <div className='sections'>
        <h2>
          {course.sections.length}{' '}
          {course.sections.length > 1 ? 'Sections' : 'Section'}
        </h2>

        {course.sections.map((section, index) => (
          <>
            <CustomAccordian
              key={section._id}
              title={`Section ${index + 1}: ${section.title}`}
            >
              <div className='lesson-upper'>
                <h4>
                  {section.lessons.length}{' '}
                  {section.lessons.length > 1 ? 'Lessons' : 'Lesson'}
                </h4>
                <button>Add Lesson</button>
              </div>

              {section.lessons.map(lesson => (
                <h5 key={lesson._id}>{lesson.title}</h5>
              ))}
            </CustomAccordian>
            <br />
          </>
        ))}
      </div>
    </div>
  );
}

export default Course;
