import axios from "axios";
const anyDifficulty = "Any difficulty";
const getQuestionsService = async (difficulty) => {
  const paramDifficulty =
    difficulty !== anyDifficulty
      ? `&difficulty=${difficulty?.toLowerCase()}`
      : "";
  const response = await axios.get(
    `https://opentdb.com/api.php?amount=5${paramDifficulty}&type=multiple`
  );
  return response;
};
export default getQuestionsService;
