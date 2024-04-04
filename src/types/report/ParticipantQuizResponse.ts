export default interface ParticipantQuizResponse {
  displayName: string;
  userId: number;
  score: number;
  quizId: number;
  point: number;
  totalQuestion: number;
  quizJoinedUserId: number;
}
