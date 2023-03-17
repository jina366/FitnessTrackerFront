import React, { useState, useEffect } from 'react';
import { getMyUser } from '../apiAdapters';

const MyRoutines = () => {
  const [routine, setRoutine] = useState([]);

  async function getRoutines() {
    try {
      const result = await getMyUser();
      setRoutine(result);
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getRoutines();
  }, []);

  return (
    <div id="full-routines-page">
      <h1>Routines</h1>
      <div id="routine-page-container">
        {routine.map((post, idx) => {
          return (
            <div id="routine-container" key={idx}>
              <h2>Name: {post.name}</h2>
              <h3>Goal: {post.goal}</h3>
              <h3>Creator: {post.creatorName}</h3>
              {post.activities.map((activity, idx) => {
                return (
                  <div id="routine-activity-container" key={`activity${idx}`}>
                    <h4>Name: {activity.name}</h4>
                    <h5>{activity.description}</h5>
                    <h5>Duration: {activity.duration}</h5>
                    <h5>Count: {activity.count}</h5>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyRoutines;