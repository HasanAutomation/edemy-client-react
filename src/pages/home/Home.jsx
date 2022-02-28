import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Container, Grid, Label } from 'semantic-ui-react';
import coursesApi from '../../api/courses';
import useFetchData from '../../hooks/useFetchData';
import { getPublishedCourses } from '../../redux/course/courseActions';
import './home.scss';

function Home() {
  const dispatch = useDispatch();
  const { publishedCourses } = useSelector(state => state.course);

  useFetchData({
    request: () => coursesApi.getPublishedCourses(),
    data: ({ data }) => dispatch(getPublishedCourses(data.courses)),
    deps: [dispatch],
  });

  return (
    <Container>
      <div className='home'>
        <h1>Featured Courses</h1>
        <Grid columns={3}>
          {publishedCourses.map(
            ({ image, instructor, name, slug, category, paid, price }) => (
              <Grid.Column key={slug}>
                <Card
                  fluid
                  as={Link}
                  to={`/courses/${slug}`}
                  className='custom-card'
                  description={
                    <Label className='category' color='red'>
                      {category}
                    </Label>
                  }
                  extra={paid ? `${price} INR` : 'Free'}
                  // raised
                  image={image.downloadURL}
                  header={name}
                  meta={`By ${instructor.name}`}
                />
              </Grid.Column>
            )
          )}
        </Grid>
      </div>
    </Container>
  );
}

export default Home;
