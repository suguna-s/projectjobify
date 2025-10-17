import React from 'react';
import { useAllJobsContext } from '../pages/AllJobs';
import Wrapper from '../assets/wrappers/JobsContainer';
import Job from './Job';
import { PageBtnConatiner } from '.';

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, numOfPages } = data;

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} Job{totalJobs > 1 && 's'} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {totalJobs > 1 && <PageBtnConatiner />}
    </Wrapper>
  );
};

export default JobsContainer;
