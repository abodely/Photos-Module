import http from "k6/http";

export const options = {
  vus: 50,
  duration: '5m'
}
export default function() {
  http.get(`http://localhost:3001/api/home/${Math.floor(Math.random() * 10000000 + 1)}/photos/`);
};