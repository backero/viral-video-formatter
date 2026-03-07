import { supabase } from "./supabase";

/**
 * Creates a brand-new form session in Supabase.
 * Returns the new session UUID string, or null on error.
 */
export async function createSession(data, currentPage = 1) {
  const { data: row, error } = await supabase
    .from("form_sessions")
    .insert({ data, current_page: currentPage })
    .select("id")
    .single();

  if (error) {
    console.error("[sessionService] createSession error:", error.message);
    return null;
  }
  return row.id;
}

/**
 * Saves (upserts) form data to an existing session.
 * @param {string} id - The session UUID
 * @param {object} data - Full form data object
 * @param {number} currentPage - Current page number
 * @param {boolean} isSubmitted - Whether the form has been submitted
 */
export async function updateSession(
  id,
  data,
  currentPage,
  isSubmitted = false,
) {
  const { error } = await supabase
    .from("form_sessions")
    .update({
      data,
      current_page: currentPage,
      is_submitted: isSubmitted,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("[sessionService] updateSession error:", error.message);
  }
}

/**
 * Loads a session by its UUID.
 * Returns { data, current_page, is_submitted } or null if not found.
 */
export async function loadSession(id) {
  const { data: row, error } = await supabase
    .from("form_sessions")
    .select("data, current_page, is_submitted")
    .eq("id", id)
    .single();

  if (error) {
    console.error("[sessionService] loadSession error:", error.message);
    return null;
  }
  return row;
}
