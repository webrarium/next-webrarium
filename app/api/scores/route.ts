import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );
}

export async function GET() {
  const supabase = getClient();
  const { data, error } = await supabase
    .from("game_scores")
    .select("name, score, created_at")
    .order("score", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const supabase = getClient();
  const { name, email, score } = await req.json();

  if (!name?.trim() || !email?.trim() || typeof score !== "number") {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Only save if score > 0
  if (score <= 0) {
    return NextResponse.json({ error: "Score too low" }, { status: 400 });
  }

  const { error } = await supabase
    .from("game_scores")
    .insert([{ name: name.trim(), email: email.trim().toLowerCase(), score }]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ success: true });
}
