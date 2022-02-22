import React from 'react';
import { useDispatch } from 'react-redux';
import CustomAccordian from '../../components/customAccordian/CustomAccordian';
import { openModal } from '../../redux/auth/reducer/modalReducer';

function CourseSections({ sections }) {
  const dispatch = useDispatch();
  function openVideoModal(url, title) {
    dispatch(
      openModal({ modalType: 'VideoModal', modalProps: { video: url, title } })
    );
  }

  return (
    <div>
      <h3>Course Content</h3>
      {sections.map(section => (
        <>
          <CustomAccordian title={section.title}>
            {section.lessons.map(lesson =>
              lesson.free_preview ? (
                <div className='lesson-container'>
                  <p className='lesson-title'>{lesson.title}</p>
                  <p
                    className='preview'
                    onClick={() =>
                      openVideoModal(lesson.video.downloadURL, lesson.title)
                    }
                  >
                    Preview
                  </p>
                </div>
              ) : (
                <div className='lesson-container'>
                  <p
                    className='lesson-title'
                    style={{ textDecoration: 'none', cursor: 'auto' }}
                  >
                    {lesson.title}
                  </p>
                </div>
              )
            )}
          </CustomAccordian>
          <br />
        </>
      ))}
    </div>
  );
}

export default CourseSections;
