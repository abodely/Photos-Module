import http from "k6/http";

export const options = {
  vus: 120,
  duration: '1m'
}
export default function() {
  http.get(`http://localhost:3001/api/home/${Math.floor(Math.random() * 1e6 + 1)}/photos/`);
};