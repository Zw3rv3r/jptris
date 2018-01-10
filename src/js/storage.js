const HighscoreKey = "__highscore";

export const setHighscore = highscore => window.localStorage.setItem(HighscoreKey, highscore);
export const getHighscore = () => window.localStorage.getItem(HighscoreKey) || 0;