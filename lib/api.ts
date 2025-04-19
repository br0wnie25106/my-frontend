const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function getGameState() {
  const res = await fetch(`${API_BASE_URL}/api/game/state`);
  return res.json();
}

export async function playRound() {
  const res = await fetch(`${API_BASE_URL}/api/game/round/play`, { method: "POST" });
  return res.json();
}

export async function fastForward(rounds: number, speed: number) {
  const res = await fetch(`${API_BASE_URL}/api/game/simulation/fastForward`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rounds, speed }),
  });
  return res.json();
}

export async function resetPlayers() {
  const res = await fetch(`${API_BASE_URL}/api/players/reset`, { method: "POST" });
  return res.ok;
}

export async function addPlayer(name: string, money: number, playerType: string) {
  const res = await fetch(`${API_BASE_URL}/api/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, money, playerType }),
  });

  if (!res.ok) throw new Error("Failed to add player");
  return res.json();
}

export async function deletePlayer(id: string) {
  return fetch(`${API_BASE_URL}/api/players/${id}`, { method: "DELETE" });
}

export async function togglePlayer(id: string) {
  return fetch(`${API_BASE_URL}/api/players/${id}/toggle`, { method: "PUT" });
}

export async function updatePlayer(
  id: string,
  player: Partial<{ name: string; money: number; playerType: string }>
) {
  const res = await fetch(`${API_BASE_URL}/api/players/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  });
  return res.json();
}

export async function shuffleDeck() {
  const res = await fetch(`${API_BASE_URL}/api/game/dealer/shuffle`, { method: "POST" });
  return res.json();
}

export async function getDealerHistory() {
  const res = await fetch(`${API_BASE_URL}/api/game/dealer/history`);
  return res.json();
}
