
export const groupQuizCardsBySubject = (quizCardList = []) => {
  const subjectGroups = {};

  for (const cardSet of quizCardList) {
    const subject = cardSet.subject;

    if (!subjectGroups[subject]) {
      subjectGroups[subject] = [];
    }

    subjectGroups[subject].push(cardSet);
  }

  const finalGroupedData = Object.entries(subjectGroups).map(
    ([subject, sets]) => ({
      subject,
      sets,
    })
  );

  return finalGroupedData;
};
