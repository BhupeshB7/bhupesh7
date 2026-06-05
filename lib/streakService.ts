import { Streak, StreakPayload } from "@/types/streak";

const BASE = "/api/streak";

export async function fetchStreaks(): Promise<Streak[]> {
  const res = await fetch(BASE);
  if (!res.ok) throw new Error("Failed to fetch streaks");
  return res.json();
}

export async function fetchStreak(id: string): Promise<Streak> {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Streak not found");
  return res.json();
}

export async function createStreak(data: StreakPayload): Promise<Streak> {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create streak");
  return res.json();
}

export async function updateStreak(id: string, data: StreakPayload): Promise<Streak> {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update streak");
  return res.json();
}

export async function deleteStreak(id: string): Promise<void> {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete streak");
}
