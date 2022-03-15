import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import coursesApi from '../../api/courses';
import LoadingComponent from '../../components/loader/LoadingComponent';
import useFetchData from '../../hooks/useFetchData';
import { getUserCourses } from '../../redux/course/courseActions';
import { Menu } from 'antd';
import CustomAccordian from '../../components/customAccordian/CustomAccordian';
import ReactPlayer from 'react-player';
import './singleCourse.scss';
import ReactMarkdown from 'react-markdown';
import { PlayCircleOutlined } from '@ant-design/icons';

const { Item } = Menu;

function SingleCoursePage({ match }) {
  const { user } = useSelector(state => state.auth);
  const [clicked, setClicked] = useState(-1);
  const [content, setContent] = useState(null);
  const [secIndex, setSecIndex] = useState(0);
  const [lesIndex, setLesIndex] = useState(0);

  const dispatch = useDispatch();

  const { loading, error } = useSelector(state => state.async);

  const course = useSelector(state =>
    state.course.userCourses.find(course => course.slug === match.params.slug)
  );

  useFetchData({
    request: () => coursesApi.getSingleCourse(match.params.slug),
    data: ({ data }) => dispatch(getUserCourses([data.course])),
    deps: [match.params.slug, dispatch],
  });

  let coursesSlug = [];

  user.courses.forEach(course => {
    coursesSlug.push(course.slug);
  });

  if (loading || (!error && !course))
    return <LoadingComponent content='Fetching content...' />;

  // if (!coursesSlug.includes(match.params.slug))
  //   return (
  //     <div>
  //       <h3>Sorry! You are not enrolled into this courses</h3>
  //     </div>
  //   );

  const { sections } = course;

  function markCompleted(sectionIndex, lessonIndex) {
    setClicked(lessonIndex);
    const lesson = sections[sectionIndex].lessons[lessonIndex];
    if (lesson) {
      setContent(lesson);
    }
  }

  return (
    <div className='student-container'>
      <div className='left'>
        {sections.map((section, sectionIndex) => (
          <div key={section._id} id={section._id}>
            <CustomAccordian title={section.title} key={section._id}>
              <Menu defaultSelectedKeys={[clicked]}>
                {section.lessons.map((lesson, lessonIndex) => (
                  <Item
                    onClick={() => {
                      setClicked(lessonIndex);
                      setContent(lesson);
                      setSecIndex(sectionIndex);
                      setLesIndex(lessonIndex + 1);
                    }}
                    key={lesson._id}
                  >
                    {lessonIndex + 1} {lesson.title}
                  </Item>
                ))}
              </Menu>
            </CustomAccordian>
            <div className='spacer' />
          </div>
        ))}
      </div>
      <div className='right'>
        {content ? (
          <div>
            {content.video ? (
              <>
                <ReactPlayer
                  onEnded={() => markCompleted(secIndex, lesIndex)}
                  playing={true}
                  url={content.video.downloadURL}
                  width='100%'
                  height='500px'
                  controls
                />
                <ReactMarkdown>{content.content}</ReactMarkdown>
              </>
            ) : (
              <ReactMarkdown>{content.content}</ReactMarkdown>
            )}
          </div>
        ) : (
          <div className='empty'>
            <PlayCircleOutlined className='play-icon' />
            <p>Click on a lesson to start learing</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleCoursePage;
