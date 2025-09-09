import { VercelRequest, VercelResponse } from "@vercel/node";
import { supabaseAdmin } from "./supabase.js";


export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { id } = await req.body;
    const { error } = await supabaseAdmin.auth.admin.deleteUser(id);

    if (error) throw new Error(error.message);
    return res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}