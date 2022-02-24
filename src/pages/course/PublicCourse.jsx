import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Grid, Label } from 'semantic-ui-react';
import coursesApi from '../../api/courses';
import LoadingComponent from '../../components/loader/LoadingComponent';
import useFetchData from '../../hooks/useFetchData';
import { getPublishedCourses } from '../../redux/course/courseActions';
import ReactPlayer from 'react-player';
import './index.scss';
import { openModal } from '../../redux/auth/reducer/modalReducer';
import ReactMarkdown from 'react-markdown';
import CourseSections from './CourseSections';
import { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

function PublicCourse({ match }) {
  const [enrollLoading, setEnrollLoading] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const course = useSelector(state =>
    state.course.publishedCourses.find(c => c.slug === match.params.slug)
  );
  const { authenticated } = useSelector(state => state.auth);
  const { loading, error } = useSelector(state => state.async);
  const dispatch = useDispatch();
  const history = useHistory();

  useFetchData({
    request: () => coursesApi.getSingleCourse(match.params.slug),
    data: ({ data }) => dispatch(getPublishedCourses([data.course])),
    deps: [],
  });

  useEffect(() => {
    setEnrollLoading(true);
    coursesApi
      .checkEnrollmentServer(match.params.slug)
      .then(({ data }) => {
        setIsEnrolled(data.success);
        setEnrollLoading(false);
      })
      .catch(err => {
        console.log(err);
        setEnrollLoading(false);
      });
  }, [match.params.slug]);

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
    slug,
  } = course;

  function getFormattedDate() {
    const date = new Date(updatedAt);
    return `${date.getMonth() + 1}/${date.getFullYear()}`;
  }

  async function handleCourseEnrollment() {
    if (!paid) {
      setEnrollLoading(true);
      try {
        const {
          data: { data, success },
        } = await coursesApi.freeEnroll(course._id);
        setIsEnrolled(success);
        setEnrollLoading(false);
        toast.success(data.message);
      } catch (err) {
        console.log(err);
        setEnrollLoading(false);
      }
    } else {
      toast.error('Paid courses cannot be enrolled at this moment');
    }
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
              {authenticated ? (
                isEnrolled ? (
                  <Button
                    content='Go To Course'
                    onClick={() => history.push(`/user/courses/${slug}`)}
                  />
                ) : (
                  <Button
                    style={{ marginTop: 10 }}
                    content='Enroll'
                    onClick={handleCourseEnrollment}
                    fluid
                    loading={enrollLoading}
                  />
                )
              ) : (
                <Button
                  style={{ marginTop: 10 }}
                  content='Login To Enroll'
                  fluid
                  onClick={() =>
                    dispatch(openModal({ modalType: 'LoginForm' }))
                  }
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
