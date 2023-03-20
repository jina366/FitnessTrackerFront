import React from 'react';
import { updateRoutineActivity } from '../apiAdapters';
import { useNavigate } from 'react-router-dom';

function UpdateRoutineActivity({
  token,
  myRoutineActivityEdit,
  setMyRoutineActivityEdit,
}) {
  const navigate = useNavigate();

  async function onFormSubmit() {
    const result = await updateRoutineActivity(
      token,
      myRoutineActivityEdit.routineActivityId,
      myRoutineActivityEdit.duration,
      myRoutineActivityEdit.count
    );

    if (result.id) {
      setMyRoutineActivityEdit({});
      navigate('/my-routines');
    }
  }

  return (
    <div id="update-routine-activity-parent">
      <h1>Update Routine Activity</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onFormSubmit();
        }}
      >
        <h2>Routine Activity Name</h2>
        <p>{myRoutineActivityEdit.name}</p>
        <h2>Routine Activity Description</h2>
        <p>{myRoutineActivityEdit.description}</p>
        <h2>Routine Activity Duration (in minutes)</h2>
        <input
          name="duration"
          type="number"
          value={myRoutineActivityEdit.duration}
          onChange={(e) => {
            setMyRoutineActivityEdit({
              ...myRoutineActivityEdit,
              duration: e.target.value,
            });
          }}
        />
        <h2>Routine Activity Count</h2>
        <input
          name="count"
          type="number"
          value={myRoutineActivityEdit.count}
          onChange={(e) => {
            setMyRoutineActivityEdit({
              ...myRoutineActivityEdit,
              count: e.target.value,
            });
          }}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateRoutineActivity;
