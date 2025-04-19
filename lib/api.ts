const BASE_URL = "http://localhost:8080/api"

export async function getGameState() {
  const res = await fetch(`${BASE_URL}/game/state`)
  return res.json()
}

export async function playRound() {
  const res = await fetch(`${BASE_URL}/game/round/play`, { method: "POST" })
  return res.json()
}

export async function fastForward(rounds: number, speed: number) {
  const res = await fetch(`${BASE_URL}/game/simulation/fastForward`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ rounds, speed }),
  })
  return res.json()
}

export async function resetPlayers() {
  const res = await fetch(`${BASE_URL}/players/reset`, { method: "POST" }) // ✅ fixed path
  return res.ok // ✅ just a 200 response, no JSON
}

export async function addPlayer(name: string, money: number, playerType: string) {
  const res = await fetch(`${BASE_URL}/players`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, money, playerType }),
  })

  if (!res.ok) throw new Error("Failed to add player")
  return res.json()
}

export async function deletePlayer(id: string) {
  return fetch(`${BASE_URL}/players/${id}`, { method: "DELETE" })
}

export async function togglePlayer(id: string) {
  return fetch(`${BASE_URL}/players/${id}/toggle`, { method: "PUT" })
}

export async function updatePlayer(
  id: string,
  player: Partial<{ name: string; money: number; playerType: string }>
) {
  const res = await fetch(`${BASE_URL}/players/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(player),
  })
  return res.json()
}

export async function shuffleDeck() {
  const res = await fetch(`${BASE_URL}/game/dealer/shuffle`, { method: "POST" })
  return res.json()
}

export async function getDealerHistory() {
  const res = await fetch(`${BASE_URL}/game/dealer/history`)
  return res.json()
}
