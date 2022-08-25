import { FINAL_SUBMISSION_TIMER_MINUTES } from './constants';
import { getCollaborators, getCurrentDataURL, setEndDate } from './util/db';

const AdminPanel = () => {
  const onBegin = () => {
    const endDate = new Date(
      new Date().getTime() + FINAL_SUBMISSION_TIMER_MINUTES * 60000
    );
    setEndDate(endDate);
  };

  const onSubmit = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const slug: string = params.slug;
    getCurrentDataURL().then((dataURL) => {
      return getCollaborators().then((collaborators) => {
        fetch(`https://th-preprod.herokuapp.com/i/${slug}/canvas/submissions`, {
          method: 'POST',
          body: JSON.stringify({
            image: dataURL,
            users: collaborators,
          }),
        });
      });
    });
  };

  return (
    <>
      <button onClick={onBegin}>Begin</button>
      <button onClick={onSubmit}>Submit</button>
    </>
  );
};

export default AdminPanel;
