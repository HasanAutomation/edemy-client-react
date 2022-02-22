import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid, Label } from 'semantic-ui-react';
import coursesApi from '../../api/courses';
import LoadingComponent from '../../components/loader/LoadingComponent';
import useFetchData from '../../hooks/useFetchData';
import { getPublishedCourses } from '../../redux/course/courseActions';
import ReactPlayer from 'react-player';
import './index.scss';
import { openModal } from '../../redux/auth/reducer/modalReducer';
import ReactMarkdown from 'react-markdown';
import CourseSections from './CourseSections';

function PublicCourse({ match }) {
  const course = useSelector(state =>
    state.course.publishedCourses.find(c => c.slug === match.params.slug)
  );
  const { loading, error } = useSelector(state => state.async);
  const dispatch = useDispatch();

  useFetchData({
    request: () => coursesApi.getSingleCourse(match.params.slug),
    data: ({ data }) => dispatch(getPublishedCourses([data.course])),
    deps: [],
  });

  if (loading || (!error && !course))
    return <LoadingComponent content='Fetching course...' />;

  const {
    name,
    price,
    paid,
    instructor,
    description,
    category,
    updatedAt,
    sections,
    image,
  } = course;

  function getFormattedDate() {
    const date = new Date(updatedAt);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  return (
    <div className='public-course'>
      <div className='public-course-top'>
        <Container>
          <Grid>
            <Grid.Column width={11}>
              <h2 className='name'>{name}</h2>
              <ReactMarkdown className='desc'>{description}</ReactMarkdown>

              <Label content={category} color='red' />
              <p className='author'>Created by {instructor.name}</p>
              <p className='latest-update'>Last Updated {getFormattedDate()}</p>
              <h4 className='type'>{paid ? `${price} INR` : 'Free'}</h4>
            </Grid.Column>
            <Grid.Column width={5}>
              {sections[0]?.lessons[0]?.video ? (
                <div className='video-container'>
                  <ReactPlayer
                    width='100%'
                    playing={false}
                    onClickPreview={() =>
                      dispatch(
                        openModal({
                          modalType: 'VideoModal',
                          modalProps: {
                            video: sections[0]?.lessons[0]?.video.downloadURL,
                            title: name,
                          },
                        })
                      )
                    }
                    height='225px'
                    controls
                    url={sections[0]?.lessons[0]?.video.downloadURL}
                    light={image.downloadURL}
                  />
                </div>
              ) : (
                <img
                  className='preview-image'
                  src={image.downloadURL}
                  alt={name}
                />
              )}
            </Grid.Column>
          </Grid>
        </Container>
      </div>
      {/* Course Lessons */}
      <Container style={{ marginTop: 50 }}>
        <CourseSections sections={sections} />
      </Container>
    </div>
  );
}

export default PublicCourse;
